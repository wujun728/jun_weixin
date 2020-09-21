using HttpSocket;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace demo_win_httpsocket
{
    partial class MainForm
    {
        /// <summary>
        /// 获取微信图片
        /// </summary>
        /// <param name="MsgID"></param>
        /// <param name="slave"></param>
        void _12_WEBWXGETMSGIMG(string MsgID,bool slave = false)
        {
            //&type=slave
            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);

            Dictionary<string, string> KEYS = new Dictionary<string, string>();
            KEYS["MSGID"] = MsgID;
            KEYS["SLAVE"] = slave ? "&type=slave" : "";

            var response = WEB.SendRequest(@"GET https://wx{NUMBER}.qq.com/cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID={MSGID}&skey={SKEY}{SLAVE} HTTP/1.1
Host: wx.qq.com
Connection: keep-alive
Accept: image/webp,image/*,*/*;q=0.8
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Referer: https://wx.qq.com/
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Cookie: pgv_pvid=5421692288; ptcz=4e0a323b1662b719e627137efa1221bb5c435b44a27cba4b09293c0e2cb57516; pt2gguin=o0007103505; pgv_pvi=1998095360; webwxuvid=2be019a311a30a82471c657deb21d97e9d1f45d435bfe8cc3c6d44572bc274f1e6b73083e1be6658fafce8b8da910d9f; pgv_si=s1289632768; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; mm_lang=zh_CN; wxloadtime=1452566666_expired; wxpluginkey=1452560151; wxuin=840648442; wxsid=dIBYM9GLd2uGFXUR; webwx_data_ticket=AQes8oz/tWrY4mE1SyL1tTnM

", null, KEYS);


            _12_Response(response);
        }

        void _12_Response(LxwResponse o){

            var folders = CreateWeiXinFilesFolder();

            Bitmap map = new Bitmap(o.BodyStream);
            var type = o.ResponseHeader.ContentType.ToLower();
            //if(type.StartsWith("audio/"))
            //if (type.StartsWith("image/"))
            //if (type.StartsWith("audio/"))
            var ext = MimeMapping.GetExtByMime(type);
            map.Save(Path.Combine(folders, DateTime.Now.ToString("yyyyMMddHHmmssfff") + generateDeviceId() + ext),
                MimeMapping.GetImageFormat(ext)
                );

            if (map != null) map.Dispose();
        }
    }
}
