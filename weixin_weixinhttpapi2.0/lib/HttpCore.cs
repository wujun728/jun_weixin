using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Text;

namespace HttpSocket
{
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
            catch
            {
                throw new Exception("Encoding.GetEncoding(encoding),encoding is " + encoding);
            }
        }
        public static string UnDeflate(byte[] body, Encoding encoding)
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
}
