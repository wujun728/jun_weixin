using HttpSocket;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;

namespace demo_win_httpsocket
{
    partial class MainForm
    {
        void _2_QRCODE()
        {
            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);

            var response = WEB.SendRequest(@"GET https://login.weixin.qq.com/qrcode/{UUID} HTTP/1.1
Host: login.weixin.qq.com
Connection: keep-alive
Accept: image/webp,image/*,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Referer: https://wx.qq.com/?&lang=zh_CN
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Cookie: pgv_pvid=5421692288; ptcz=4e0a323b1662b719e627137efa1221bb5c435b44a27cba4b09293c0e2cb57516; pt2gguin=o0007103505; pgv_pvi=1998095360; pgv_si=s9303685120


");
            _2_Response(response);
        }

        void _2_Response(LxwResponse o)
        {
            this.picErWeiMa.BackgroundImage = Image.FromStream(o.BodyStream);
        }
    }
}
