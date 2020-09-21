using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace HttpSocket
{
    public class LxwResponseHeader
    {
        public LxwResponseHeader(string header, Action<string> CookieMethod = null)
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
                    if (ContentType.Contains(";"))
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
                    if (CookieMethod != null)
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

                //Content-Disposition: attachment; filename="1.sql"
                if (key.StartsWith("Content-Disposition:", StringComparison.OrdinalIgnoreCase))
                {
                    var arr = Regex.Split(key, "filename=\"", RegexOptions.IgnoreCase);
                    if (arr.Length > 1)
                    {
                        AttachmentFilername = arr[1].TrimEnd(new char[] { '"' });
                        try
                        {
                            AttachmentFilername = HttpUtility.UrlDecode(AttachmentFilername, Encoding.UTF8);
                        }
                        catch { }                        
                    }
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

        /// <summary>
        /// 附件的名称
        /// </summary>
        public string AttachmentFilername { get; private set; }
    }
}
