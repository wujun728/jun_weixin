using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Security;
using System.Net.Sockets;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

namespace WeiXinZhuaFaWang.lib
{
    public class HttpResponse
    {
        internal HttpResponse(string header,
            byte[] body)
        {
            this.Header = header;
            this.Body = body;
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
    }

    class lxwHttp
    {
        public HttpResponse SendHeader(string RequestHeader, string filePath, int TimeOut = 3)
        {
            var send = GetSendHeaders(RequestHeader, filePath);
            TcpClient client = new TcpClient(send.Uri.Host, send.Uri.Port);

            try
            {
                if (client.Connected)
                {
                    SslStream sslStream = new SslStream(client.GetStream(), true
                        , new RemoteCertificateValidationCallback((sender, certificate, chain, sslPolicyErrors)
                           =>
                        {
                            return sslPolicyErrors == SslPolicyErrors.None;
                        }
                            ), null);

                    sslStream.ReadTimeout = TimeOut * 1000;
                    sslStream.WriteTimeout = TimeOut * 1000;

                    X509Store store = new X509Store(StoreName.My);

                    sslStream.AuthenticateAsClient(send.Uri.Host, store.Certificates, System.Security.Authentication.SslProtocols.Default, false);

                    if (sslStream.IsAuthenticated)
                    {
                        FileStream fs2 = new FileStream(@"C:\Users\Administrator\Desktop\aa2144.data", FileMode.Create);
                        fs2.Write(send.HeaderByte, 0, send.HeaderByte.Length);
                        fs2.Close();

                        sslStream.Write(send.HeaderByte, 0, send.HeaderByte.Length);
                        sslStream.Flush();

                        return ReadResponse(sslStream);
                    }

                }
            }
            finally
            {
                client.Close();
            }

            return null;
        }

        public HttpResponse SendHeader(string RequestHeader,string RequestBoby, string filePath, int TimeOut = 3)
        {
            var send = GetSendHeaders(RequestHeader, filePath);
            var body = GetSendHeaders(RequestBoby, filePath);

            //body
            var newSend = send.Header + "\r\n" + "Content-Length: " + body.HeaderByte.Length + "\r\n\r\n";



            TcpClient client = new TcpClient(send.Uri.Host, send.Uri.Port);

            try
            {
                if (client.Connected)
                {
                    SslStream sslStream = new SslStream(client.GetStream(), true
                        , new RemoteCertificateValidationCallback((sender, certificate, chain, sslPolicyErrors)
                           =>
                        {
                            return sslPolicyErrors == SslPolicyErrors.None;
                        }
                            ), null);

                    sslStream.ReadTimeout = TimeOut * 1000;
                    sslStream.WriteTimeout = TimeOut * 1000;

                    X509Store store = new X509Store(StoreName.My);

                    sslStream.AuthenticateAsClient(send.Uri.Host, store.Certificates, System.Security.Authentication.SslProtocols.Default, false);

                    if (sslStream.IsAuthenticated)
                    {
                        FileStream fs2 = new FileStream(@"C:\Users\Administrator\Desktop\aa214422.data", FileMode.Create);
                        var t = Encoding.UTF8.GetBytes(newSend);
                        fs2.Write(t,0,t.Length);
                        fs2.Write(body.HeaderByte, 0, body.HeaderByte.Length);
                        fs2.Close();

                        sslStream.Write(Encoding.UTF8.GetBytes(newSend));
                        sslStream.Write(body.HeaderByte);
                        sslStream.Flush();

                        return ReadResponse(sslStream);
                    }

                }
            }
            finally
            {
                client.Close();
            }

            return null;
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

        private static HttpResponse ReadResponse(Stream sm)
        {
            HttpResponse response = null;
            CancellationTokenSource cancelSource = new CancellationTokenSource();
            Task<string> myTask = Task.Factory.StartNew<string>(
                new Func<object, string>(ReadHeaderProcess),
                new TaskArguments(cancelSource, sm),
                cancelSource.Token);
            if (myTask.Wait(3 * 1000)) //尝试3秒时间读取协议头
            {
                string header = myTask.Result;
                if (!string.IsNullOrEmpty(header))
                {
                    if (header.StartsWith("HTTP/1.1 100"))
                    {
                        return ReadResponse(sm);
                    }

                    byte[] buff = null;
                    int start = header.ToUpper().IndexOf("CONTENT-LENGTH");
                    int content_length = -1;  //fix bug
                    if (start > 0)
                    {
                        string temp = header.Substring(start, header.Length - start);
                        string[] sArry = Regex.Split(temp, "\r\n");
                        content_length = Convert.ToInt32(sArry[0].Split(':')[1]);
                        if (content_length > 0)
                        {
                            buff = new byte[content_length];
                            int inread = sm.Read(buff, 0, buff.Length);
                            while (inread < buff.Length)
                            {
                                inread += sm.Read(buff, inread, buff.Length - inread);
                            }
                        }
                    }
                    else
                    {
                        start = header.ToUpper().IndexOf("TRANSFER-ENCODING: CHUNKED");
                        if (start > 0)
                        {
                            //buff = ChunkedReadResponse(sm);
                        }
                        else
                        {
                            //buff = SpecialReadResponse(sm);//例外
                        }
                    }
                    response = new HttpResponse(header, buff);
                }
            }
            else
            {
                cancelSource.Cancel(); //超时的话，别忘记取消任务哦
            }
            return response;
        }

        static string ReadHeaderProcess(object args)
        {
            TaskArguments argument = args as TaskArguments;
            StringBuilder bulider = new StringBuilder();
            if (argument != null)
            {
                Stream sm = argument.Stream;
                while (!argument.CancelSource.IsCancellationRequested)
                {
                    try
                    {
                        int read = sm.ReadByte();
                        if (read != -1)
                        {
                            byte b = (byte)read;
                            bulider.Append((char)b);
                            string temp = bulider.ToString();
                            if (temp.EndsWith("\r\n\r\n"))//Http协议头尾
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
            }
            return bulider.ToString();
        }

        public class SendHeaderInfo
        {
            public Uri Uri { get; set; }
            public byte[] HeaderByte { get; set; }
            public string Header { get; set; }
        }

        private SendHeaderInfo GetSendHeaders(string header)
        {
            SendHeaderInfo send = new SendHeaderInfo();
            var headers = Regex.Split(header, "\r\n");

            List<string> listHeader = new List<string>();
            for (int i = 0; i < headers.Length; i++)
            {
                var arr = headers[i].Split(' ');
                if (arr[0] == "GET" ||
                    arr[0] == "POST" ||
                    arr[0] == "OPTIONS")
                {
                    send.Uri = new Uri(arr[1]);
                    //arr[1] = send.Uri.PathAndQuery;

                    //headers[i] = string.Join(" ", arr);
                }

                if (headers[i].StartsWith("Content-Length", StringComparison.OrdinalIgnoreCase))
                {
                    continue;
                }

                listHeader.Add(headers[i]);
            }

            send.Header = header;// string.Join("\r\n", listHeader);
            return send;
        }

        private SendHeaderInfo GetSendHeaders(string header,string fileName = "")
        {
            var strFileName = "";
            byte[] temp = null;
            if (fileName != "")
            {
                strFileName = Path.GetFileName(fileName);
                temp = File.ReadAllBytes(fileName);
                header = header.Replace("[CD]", temp.Length + "");

                header = header.Replace("{filename}", strFileName);
                if(strFileName.EndsWith("mp3", StringComparison.OrdinalIgnoreCase))
                    header = header.Replace("{filetype}", "audio/mp3");

                if (strFileName.EndsWith("gif", StringComparison.OrdinalIgnoreCase))
                    header = header.Replace("{filetype}", "image/gif");

                if (strFileName.EndsWith("png", StringComparison.OrdinalIgnoreCase))
                    header = header.Replace("{filetype}", "image/png");

                if (strFileName.EndsWith("jpg", StringComparison.OrdinalIgnoreCase))
                    header = header.Replace("{filetype}", "image/jpg");
            }

            SendHeaderInfo send = new SendHeaderInfo();
            var headers = Regex.Split(header, "\r\n");

            List<byte> body = new List<byte>();
            List<string> sbody = new List<string>();
            for (int i = 0; i < headers.Length; i++)
            {
                var arr = headers[i].Split(' ');
                if (arr[0] == "GET" ||
                    arr[0] == "POST" ||
                    arr[0] == "OPTIONS")
                {
                    send.Uri = new Uri(arr[1]);
                    //arr[1] = send.Uri.PathAndQuery;

                    //headers[i] = string.Join(" ", arr);
                }

                if (headers[i].StartsWith("Content-Length", StringComparison.OrdinalIgnoreCase))
                {                   
                    continue;
                }

                if (headers[i] == "[FILE]")
                {
                    if (temp != null)
                    {
                        var byt = temp;
                        foreach (var b in byt)
                            body.Add(b);

                        continue;
                    }
                }

                {
                    var line = "";
                    if (body.Count > 0) line = "\r\n";
                    var byt = Encoding.UTF8.GetBytes(line + headers[i]);
                    foreach (var b in byt)
                        body.Add(b);

                    sbody.Add(headers[i]);
                    continue;
                }
            }

            send.HeaderByte = body.ToArray();
            send.Header = string.Join("\r\n", sbody);
            return send;
        }
    }
}
