using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace HttpSocket
{
    public class LxwUploadBody
    {
        public LxwUploadBody(Encoding encoding, string filename, Dictionary<string, string> KEYS = null)
        {
            this.Encoding = encoding;
            //uM55vqcAjmXSlVHa
            this.Boundary = "----WebKitFormBoundaryLXW"+DateTime.Now.ToString("MMddHHmmssfff");

            CreateBody(filename, KEYS);
        }

        /// <summary>
        /// 生成body
        /// </summary>
        /// <param name="filename"></param>
        /// <param name="KEYS"></param>
        private void CreateBody(string filename, Dictionary<string, string> KEYS)
        {
            KEYS.Keys.Foreach(o => {
                AddDisposition(o, KEYS[o]);
            });

            var name = Path.GetFileName(filename);
            //插入body
            AddString("--"+Boundary);
            AddString(LINE);
            AddString("Content-Disposition: form-data; name=\"filename\"; filename=\"" + name + "\"");
            AddString(LINE);
            AddString("Content-Type: " + MimeMapping.GetMimeMapping(Path.GetExtension(filename)));
            AddString(LINE);
            AddString(LINE);
            var temp = File.ReadAllBytes(filename);
            temp.Foreach(o => {
                body.Add(o);
            });
            AddString(LINE);
            AddString("--" + Boundary + "--");
            //如果这里差一个，就发送不出去
            AddString(LINE);
        }

        void AddDisposition(string key, string value)
        {
            AddString("--"+Boundary);
            AddString(LINE);
            AddString("Content-Disposition: form-data; name=\""+key+"\"");
            AddString(LINE);
            AddString(LINE);
            AddString(value);
            AddString(LINE);
        }

        string LINE = "\r\n";

        void AddString(string data)
        {
            var byts = Encoding.GetBytes(data);
            byts.Foreach(o => {
                body.Add(o);
            });
        }

        List<byte> body = new List<byte>();
        public byte[] Body
        {
            get
            {
                return body.ToArray();
            }
        }

        public Encoding Encoding { get; set; }

        public string Boundary { get; set; }
    }
}
