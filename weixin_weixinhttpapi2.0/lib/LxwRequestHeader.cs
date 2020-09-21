using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HttpSocket
{

    public class LxwRequestHeader
    {
        public LxwRequestHeader(Encoding encoding)
        {
            this.Encoding = encoding;
        }
        public Uri Uri { get; set; }
        public byte[] HeaderByte { get {
            if (!string.IsNullOrEmpty(Header))
                return Encoding.GetBytes(Header);
            return null;
        } }

        public string Header { get; set; }

        public bool SSL { get; set; }

        public Encoding Encoding { get;private set; }
    }

}
