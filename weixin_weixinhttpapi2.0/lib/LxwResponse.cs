using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HttpSocket
{
    public class LxwResponse
    {
        internal LxwResponse(
            byte[] body, LxwResponseHeader responseHeader)
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
                if (Body == null)
                    return "";

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
}
