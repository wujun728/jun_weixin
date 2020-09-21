using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace HttpSocket
{
    /// <summary>
    /// 返回信息
    /// </summary>
    public class WeiXinTicket
    {
        public int ret { get; set; }
        public string message { get; set; }
        public string skey { get; set; }
        public string wxsid { get; set; }
        public string wxuin { get; set; }
        public string pass_ticket { get; set; }
        public string isgrayscale { get; set; }
    }
}
