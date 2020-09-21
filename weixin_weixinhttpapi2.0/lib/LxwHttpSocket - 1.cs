using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

/// <summary>
/// 20160111 lxw beijing
/// 主要作用socket模拟http请求
/// 用c# httpwebrequest httpclient webclient 总是感觉操作不是很爽快，总有什么卡住
/// 这个类可以直接发送request 头 内容
/// </summary>
namespace HttpSocket
{
    class LxwHttpSocket
    {
        /// <summary>
        /// 存储cookies
        /// </summary>
        public Dictionary<string, LxwCookie> LST_COOKIE = new Dictionary<string, LxwCookie>();

        /// <summary>
        /// 设置默认编码
        /// </summary>
        /// <param name="Encoding"></param>
        public LxwHttpSocket(Encoding Encoding = null, int TimeOut = 3)
        {
            this.Encoding = Encoding ?? Encoding.UTF8;
            this.WriteTimeOut = TimeOut;
            ReadTimeOut = 30;
        }

        /// <summary>
        /// 存储一些全局信息
        /// </summary>
        Dictionary<string, string> DI_KEYS = new Dictionary<string, string>();
        public void Add(string Key, string Value)
        {
            DI_KEYS[Key] = Value;
        }

        public string this[string key]
        {
            get
            {
                if (DI_KEYS.ContainsKey(key))
                    return DI_KEYS[key];

                return "";
            }
        }

        /// <summary>
        /// 编码
        /// </summary>
        public Encoding Encoding { get; set; }

        /// <summary>
        /// request 里面第一条必须是method
        /// </summary>
        /// <param name="request"></param>
        /// <param name="body"></param>
        /// <returns></returns>
        public LxwResponse SendRequest(string request, string body = null)
        {
            var sendBody = FormatBody(body);
            var sendHeader = FormatHeader(request, sendBody);

            Console.WriteLine(sendHeader.Uri.ToString());
            TcpClient client = new TcpClient(sendHeader.Uri.Host, sendHeader.Uri.Port);

            try
            {
                if (!client.Connected)
                    throw new Exception("client.Connected is false");

                if (sendHeader.SSL)
                    return SendSSLRequest(client, sendBody, sendHeader);

                return SendNoSSLRequest(client, sendBody, sendHeader);
            }
            finally
            {
                client.Close();
            }
        }

        /// <summary>
        /// SSL 请求
        /// </summary>
        /// <param name="client"></param>
        /// <param name="sendBody"></param>
        /// <param name="sendHeader"></param>
        /// <returns></returns>
        LxwResponse SendSSLRequest(TcpClient client, byte[] sendBody, LxwRequest sendHeader)
        {
            SslStream sslStream = new SslStream(client.GetStream(), true
                        , new RemoteCertificateValidationCallback((sender, certificate, chain, sslPolicyErrors)
                           =>
                        {
                            return sslPolicyErrors == SslPolicyErrors.None;
                        }
                            ), null);

            sslStream.ReadTimeout = ReadTimeOut * 1000;
            sslStream.WriteTimeout = WriteTimeOut * 1000;

            X509Store store = new X509Store(StoreName.My);

            sslStream.AuthenticateAsClient(
                sendHeader.Uri.Host,
                store.Certificates,
                System.Security.Authentication.SslProtocols.Default,
                false);

            if (!sslStream.IsAuthenticated)
            {
                throw new Exception("sslStream.IsAuthenticated is false");
            }

            sslStream.Write(sendHeader.HeaderByte);
            sslStream.Write(LINE);
            sslStream.Write(LINE);
            if (sendBody != null)
                sslStream.Write(sendBody);
            //sslStream.Write(LINE);

            sslStream.Flush();

            return ReadResponse(sslStream);
        }

        /// <summary>
        /// 普通请求
        /// </summary>
        /// <param name="client"></param>
        /// <param name="sendBody"></param>
        /// <param name="sendHeader"></param>
        /// <returns></returns>
        LxwResponse SendNoSSLRequest(TcpClient client, byte[] sendBody, LxwRequest sendHeader)
        {
            NetworkStream stream = client.GetStream();

            stream.ReadTimeout = WriteTimeOut * 1000;
            stream.WriteTimeout = WriteTimeOut * 1000;

            stream.Write(sendHeader.HeaderByte, 0, sendHeader.HeaderByte.Length);
            stream.Write(LINE, 0, LINE.Length);
            if (sendBody != null)
                stream.Write(sendBody, 0, sendBody.Length);
            stream.Write(LINE, 0, LINE.Length);

            stream.Flush();

            return ReadResponse(stream);
        }

        class TaskArguments
        {
            public TaskArguments(CancellationTokenSource cancelSource, Stream sm)
            {
                this.CancelSource = cancelSource;
                this.Stream = sm;
            }
            public CancellationTokenSource CancelSource { get; private set; }
            public Stream Stream { get; private set; }
        }

        void CookieMethod(string cookie)
        {
            //Set-Cookie: wxsid=; Domain=wx.qq.com; Path=/; Expires=Thu, 01-Jan-1970 00:00:30 GMT
            LxwCookie cook = new LxwCookie();
            cookie.Split(';').Foreach((o) => {
                var arr = o.Split('=');
                if (arr.Length != 2) return;
                if (arr[0].ToLower().Contains("domain"))
                {
                    cook.Domain = arr[1].Trim();
                    return;
                }
                    

                if (arr[0].ToLower().Contains("path"))
                {
                    cook.Path = arr[1].Trim();
                    return;
                }
                    

                if (arr[0].ToLower().Contains("expires"))
                {
                    cook.Expires = arr[1].Trim();
                    return;
                }

                {
                    if(arr[0].Trim()!="")
                    {
                        cook.Key = arr[0].Trim();
                        cook.Value = arr[1].Trim();
                        return;
                    }
                }
            });

            if (!string.IsNullOrEmpty(cook.Key))
                LST_COOKIE[cook.Key] = cook;
        }

        private LxwResponse ReadResponse(Stream sm)
        {   
            LxwResponse response = null;

            //头部信息
            string header = ReadHeaderProcess(sm);

            if (!string.IsNullOrEmpty(header))
            {
                //代表继续接收信息，这部分信息先不考虑处理
                if (header.StartsWith("HTTP/1.1 100"))
                {
                    return ReadResponse(sm);
                }

                //处理头文件信息
                var responseHeader = new LxwResponseHeader(header, CookieMethod);

                while (true)
                {
                    if (responseHeader.ContentLength > 0)
                    {
                        var buff = new byte[responseHeader.ContentLength];
                        int inread = sm.Read(buff, 0, buff.Length);
                        while (inread < buff.Length)
                        {
                            inread += sm.Read(buff, inread, buff.Length - inread);
                        }
                        response = new LxwResponse(buff, responseHeader);
                        break;
                    }

                    if (responseHeader.TransferEncoding)
                    {
                        var buff = ChunkedReadResponse(sm);
                        response = new LxwResponse(buff, responseHeader);
                        break;
                    }

                    {
                        //如果走到这里，就比较特殊了，可以不考虑
                        var buff = SpecialReadResponse(sm);
                        response = new LxwResponse(buff, responseHeader);
                        break;
                    }
                }
            }

            return response;
        }

        /// <summary>
        /// 这里不是通用的，根据自己的情况调整。
        /// </summary>
        /// <param name="sm"></param>
        /// <returns></returns>
        byte[] SpecialReadResponse(Stream sm)
        {
            ArrayList array = new ArrayList();
            StringBuilder bulider = new StringBuilder();
            int length = 0;
            DateTime now = DateTime.Now;
            while (true)
            {
                byte[] buff = new byte[1024 * 10];
                int len = sm.Read(buff, 0, buff.Length);
                if (len > 0)
                {
                    length += len;
                    byte[] reads = new byte[len];
                    Array.Copy(buff, 0, reads, 0, len);
                    array.Add(reads);
                    bulider.Append(Encoding.GetString(reads));
                }
                else
                {
                    break;
                }

                //string temp = bulider.ToString();
                //if (temp.ToUpper().Contains("</HTML>"))
                //{
                //    break;
                //}
                if (DateTime.Now.Subtract(now).TotalSeconds >= 30)
                {
                    break;//超时30秒则跳出
                }
            }
            byte[] bytes = new byte[length];
            int index = 0;
            for (int i = 0; i < array.Count; i++)
            {
                byte[] temp = (byte[])array[i];
                Array.Copy(temp, 0, bytes,
                    index, temp.Length);
                index += temp.Length;
            }
            return bytes;
        }

        /// <summary>
        /// 读取Response 头部信息
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        string ReadHeaderProcess(Stream sm)
        {
            StringBuilder bulider = new StringBuilder();
            while (true)
            {
                try
                {
                    int read = sm.ReadByte();
                    if (read != -1)
                    {
                        byte b = (byte)read;
                        bulider.Append((char)b);
                        string temp = bulider.ToString();
                        //Http协议头尾
                        if (temp.EndsWith("\r\n\r\n"))
                        {
                            break;
                        }
                    }
                    else
                    {
                        break;
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex.Message);
                    break;
                }
            }
            return bulider.ToString();
        }

        byte[] LINE
        {
            get
            {
                return this.Encoding.GetBytes("\r\n");
            }
        }

        byte[] ChunkedReadResponse(Stream sm)
        {
            ArraySegmentList<byte> arraySegmentList = new ArraySegmentList<byte>();
            int chunked = GetChunked(sm);
            while (chunked > 0)
            {
                byte[] buff = new byte[chunked];
                try
                {
                    int inread = sm.Read(buff, 0, buff.Length);
                    while (inread < buff.Length)
                    {
                        inread += sm.Read(buff, inread, buff.Length - inread);
                    }
                    arraySegmentList.Add(new ArraySegment<byte>(buff));
                    if (sm.ReadByte() != -1)//读取段末尾的\r\n
                    {
                        sm.ReadByte();
                    }
                }
                catch (Exception)
                {
                    break;
                }
                chunked = GetChunked(sm);
            }
            return arraySegmentList.ToArray();
        }

        int GetChunked(Stream sm)
        {
            int chunked = 0;
            StringBuilder bulider = new StringBuilder();
            while (true)
            {
                try
                {
                    int read = sm.ReadByte();
                    if (read != -1)
                    {
                        byte b = (byte)read;
                        bulider.Append((char)b);
                        string temp = bulider.ToString();
                        if (temp.EndsWith("\r\n"))
                        {
                            chunked = Convert.ToInt32(temp.Trim(), 16);
                            break;
                        }
                    }
                    else
                    {
                        break;
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine(ex.Message);
                    break;
                }
            }
            return chunked;
        }

        LxwRequest FormatHeader(string request, byte[] body = null)
        {
            if (request == null)
                throw new ArgumentNullException("byte[] FormatHeader(string request), request is null");

            request = FormatKeys(request);

            LxwRequest req = new LxwRequest();
            var bodys = Regex.Split(request, "\r\n");
            var list = new List<string>();
            var start = 0;
            var end = bodys.Length - 1;
            {
                for (; start < bodys.Length; start++)
                {
                    if (bodys[start] != "") break;
                }
                for (; end > start; end--)
                {
                    if (bodys[end] != "") break;
                }

                for (; start <= end; start++)
                {
                    if (bodys[start].StartsWith("Content-Length", StringComparison.OrdinalIgnoreCase))
                        continue;

                    if (bodys[start].StartsWith("Cookie:", StringComparison.OrdinalIgnoreCase))
                        continue;

                    {
                        //这里还可以扩充
                        var arr = bodys[start].Split(' ');
                        if (arr[0] == "GET" ||
                            arr[0] == "POST" ||
                            arr[0] == "OPTIONS")
                        {
                            req.SSL = arr[1].StartsWith("https://", StringComparison.OrdinalIgnoreCase);
                            req.Uri = new Uri(arr[1]);
                            arr[1] = req.Uri.PathAndQuery;
                            bodys[start] = string.Join(" ", arr);
                        }
                    }

                    list.Add(bodys[start]);
                }

                if (body != null)
                    list.Add("Content-Length: " + body.Length);
                if (LST_COOKIE.Count > 0)
                    list.Add("Cookie: " + CreateCookies());

                //输出信息
                Debug.WriteLine(string.Join("\r\n", list.ToArray()));

                req.HeaderByte = Encoding.GetBytes(string.Join("\r\n", list.ToArray()));
            }

            //返回
            return req;
        }

        /// <summary>
        /// 生成cookies
        /// </summary>
        /// <returns></returns>
        string CreateCookies()
        {
            List<string> lst = new List<string>();
            LST_COOKIE.Foreach(o => {
                if (o.Key != "")
                    lst.Add(o.Value.ToString());
            });

            return string.Join(";", lst.ToArray());
        }

        byte[] FormatBody(string body = null)
        {
            if (body == null) return null;
            body = FormatKeys(body);

            var bodys = Regex.Split(body, "\r\n");
            var list = new List<string>();
            var start = 0;
            var end = bodys.Length - 1;
            {
                for (; start < bodys.Length; start++)
                {
                    if (bodys[start] != "") break;
                }
                for (; end > start; end--)
                {
                    if (bodys[end] != "") break;
                }

                for (; start <= end; start++)
                {
                    list.Add(bodys[start]);
                }
            }

            //返回
            return Encoding.GetBytes(string.Join("\r\n", list.ToArray()));
        }

        /// <summary>
        /// 格式化信息
        /// </summary>
        /// <param name="body"></param>
        /// <returns></returns>
        string FormatKeys(string body)
        {
            foreach (string key in DI_KEYS.Keys)
                body = body.Replace("{" + key + "}", DI_KEYS[key]);

            foreach (var cookies in LST_COOKIE.Values)
            {
                if (cookies.Key != "")
                {
                    body = body.Replace("{" + cookies.Key + "}", cookies.Value);
                }
            }

            //生成时间
            body = body.Replace("{TIME}", DateTimeToStamp(DateTime.Now)+"");

            return body;
        }

        int DateTimeToStamp(System.DateTime time)
        {
            System.DateTime startTime = TimeZone.CurrentTimeZone.ToLocalTime(new DateTime(1970, 1, 1));
            return (int)(time - startTime).TotalSeconds;
        }
        /// <summary>
        /// 设置超时时间
        /// </summary>
        public int WriteTimeOut { get; set; }

        /// <summary>
        /// 默认30秒
        /// </summary>
        public int ReadTimeOut { get; set; }
    }

    class ArraySegmentList<T>
    {
        List<ArraySegment<T>> m_SegmentList = new List<ArraySegment<T>>();
        public ArraySegmentList() { }

        int m_Count = 0;
        public void Add(ArraySegment<T> arraySegment)
        {
            m_Count += arraySegment.Count;
            m_SegmentList.Add(arraySegment);
        }

        public T[] ToArray()
        {
            T[] array = new T[m_Count];
            int index = 0;
            for (int i = 0; i < m_SegmentList.Count; i++)
            {
                ArraySegment<T> arraySegment = m_SegmentList[i];
                Array.Copy(arraySegment.Array,
                    0,
                    array,
                    index,
                    arraySegment.Count);
                index += arraySegment.Count;
            }
            return array;
        }
    }
    public class LxwResponseHeader
    {
        public LxwResponseHeader(string header,Action<string> CookieMethod = null)
        {
            Header = header;
            var headers = Regex.Split(header, "\r\n");
            foreach (string key in headers)
            {
                if (key.StartsWith("HTTP/", StringComparison.OrdinalIgnoreCase))
                {
                    var arrs = key.Split(' ');
                    HttpVer = arrs[0];
                    Statue = int.Parse(arrs[1]);
                    continue;
                }

                if (key.StartsWith("Content-Type:", StringComparison.OrdinalIgnoreCase))
                {
                    ContentType = key.Substring("Content-Type:".Length).Trim();
                    if(ContentType.Contains(";"))
                    {
                        var temp = ContentType.Split(';')[1].Trim();
                        if (temp.ToLower().Contains("Charset="))
                            Charset = temp.Split('=')[0];
                        ContentType = ContentType.Split(';')[0].Trim();
                    }
                    continue;
                }

                //Set-Cookie: wxsid=; Domain=wx.qq.com; Path=/; Expires=Thu, 01-Jan-1970 00:00:30 GMT
                if (key.StartsWith("Set-Cookie:", StringComparison.OrdinalIgnoreCase))
                {
                    if(CookieMethod!=null)
                        CookieMethod(key.Substring("Set-Cookie:".Length).Trim());
                    continue;
                }

                //Content-Encoding: gzip
                //deflate
                if (key.StartsWith("Content-Encoding:", StringComparison.OrdinalIgnoreCase))
                {
                    GZip = key.ToLower().Contains("gzip");
                    Deflate = key.ToLower().Contains("deflate");
                    continue;
                }


                if (key.StartsWith("Content-Length:", StringComparison.OrdinalIgnoreCase))
                {
                    ContentLength = int.Parse(
                        key.Substring("Content-Length:".Length).Trim()
                        );
                    continue;
                }


                if (key.StartsWith("TRANSFER-ENCODING:", StringComparison.OrdinalIgnoreCase))
                {
                    TransferEncoding =
                        key.Substring("TRANSFER-ENCODING:".Length).ToLower().Contains("chunked");

                    continue;
                }

            }
        }


        public string Location { get; private set; }
        public string Header { get; private set; }
        public int ContentLength { get; private set; }
        public string ContentType { get; private set; }

        public string HttpVer { get; private set; }
        public int Statue { get; private set; }
        public bool TransferEncoding { get; private set; }
        /// <summary>
        /// 接收的内容解析编码
        /// </summary>
        public string Charset { get; private set; }
        /// <summary>
        /// 需要解压缩
        /// </summary>
        public bool GZip { get; private set; }
        public bool Deflate { get; private set; }
    }

    public class LxwRequest
    {
        public Uri Uri { get; set; }
        public byte[] HeaderByte { get; set; }

        public bool SSL { get; set; }
    }

    /// <summary>
    /// 返回信息
    /// </summary>
    public class LxwResponse
    {
        internal LxwResponse(
            byte[] body,LxwResponseHeader responseHeader)
        {
            this.Header = responseHeader.Header;
            this.Body = body;
            this.ResponseHeader = responseHeader;
        }

        //暂未将回应HTTP协议头转换为HttpHeader类型
        public string Header
        {
            get;
            private set;
        }

        public byte[] Body
        {
            get;
            private set;
        }
        public string Value
        {
            get
            {
                var encoding = HttpCore.FormatEncoding(ResponseHeader.Charset);
                if (ResponseHeader.Deflate)
                    return HttpCore.UnDeflate(Body, encoding);

                if (ResponseHeader.GZip)
                    return HttpCore.UnGzip(Body, encoding);

                encoding = encoding ?? Encoding.UTF8;

                return encoding.GetString(Body);
            }
        }

        /// <summary>
        /// 主要是一些图片和文件流
        /// </summary>
        public Stream BodyStream
        {
            get
            {
                return new MemoryStream(Body);
            }
        }
        public LxwResponseHeader ResponseHeader { get; private set; }
    }

    public class HttpCore
    {
        public static Encoding FormatEncoding(string encoding = null)
        {
            if (string.IsNullOrEmpty(encoding))
                return null;

            try
            {
                return Encoding.GetEncoding(encoding);
            }
            catch {
                throw new Exception("Encoding.GetEncoding(encoding),encoding is "+encoding);
            }
        }
        public static string UnDeflate(byte[] body,Encoding encoding)
        {
            encoding = encoding ?? Encoding.UTF8;
            using (DeflateStream gs = new DeflateStream(new MemoryStream(body), CompressionMode.Decompress))
            {
                var result = new MemoryStream(1024);

                byte[] buffer = new byte[1024];
                int length = -1;

                do
                {
                    length = gs.Read(buffer, 0, buffer.Length);
                    result.Write(buffer, 0, length);
                }
                while (length != 0);

                return (encoding.GetString(result.ToArray()));
            }
        }

        public static string UnGzip(byte[] body, Encoding encoding)
        {
            encoding = encoding ?? Encoding.UTF8;
            using (GZipStream gs = new GZipStream(new MemoryStream(body), CompressionMode.Decompress))
            {
                var result = new MemoryStream(1024);
                byte[] buffer = new byte[1024];
                int length = -1;

                do
                {
                    length = gs.Read(buffer, 0, buffer.Length);
                    result.Write(buffer, 0, length);
                }
                while (length != 0);

                return (encoding.GetString(result.ToArray()));
            }
        }
    }
    /// <summary>
    /// 存储Cookies
    /// </summary>
    public class LxwCookie
    {
        public string Key { get; set; }
        public string Value { get; set; }
        public string Domain { get; set; }
        public string Path { get; set; }
        public string Expires { get; internal set; }

        public override string ToString()
        {
            return Key + "=" + Value;
        }
    }

    public static class ExMethod
    {
        public static void Foreach<T>(this IEnumerable<T> objValue, Action<T> fun)
        {
            foreach (T t in objValue)
            {
                fun(t);
            }
        }
    }
}