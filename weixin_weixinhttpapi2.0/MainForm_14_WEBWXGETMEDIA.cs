using FluorineFx.Json;
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
        /// 获取其他文件
        /// </summary>
        /// <param name="MsgID"></param>
        void _14_WEBWXGETMEDIA(string MsgID, JavaScriptObject json)
        {
            //&type=slave
            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);

            Dictionary<string, string> KEYS = new Dictionary<string, string>();
            KEYS["MEDIAID"] = json["MediaId"]+"";
            KEYS["FILENAME"] = System.Web.HttpUtility.UrlEncode(
                json["FileName"]+"", WEB.Encoding);
            KEYS["FROMUSER"] = json["FromUserName"] + "";

            var response = WEB.SendRequest(@"GET https://file{NUMBER}.wx.qq.com/cgi-bin/mmwebwx-bin/webwxgetmedia?sender={FROMUSER}&mediaid={MEDIAID}&filename={FILENAME}&fromuser={WXUIN}&pass_ticket={PASS_TICKET}&webwx_data_ticket={WEBWX_DATA_TICKET} HTTP/1.1
Host: file.wx.qq.com
Connection: keep-alive
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Cookie: pgv_pvid=5421692288; ptcz=4e0a323b1662b719e627137efa1221bb5c435b44a27cba4b09293c0e2cb57516; pt2gguin=o0007103505; pgv_pvi=1998095360; webwxuvid=2be019a311a30a82471c657deb21d97e9d1f45d435bfe8cc3c6d44572bc274f1e6b73083e1be6658fafce8b8da910d9f; pgv_si=s1289632768; mm_lang=zh_CN; wxloadtime=1452566666_expired; wxpluginkey=1452560151; wxuin=840648442; wxsid=dIBYM9GLd2uGFXUR; webwx_data_ticket=AQes8oz/tWrY4mE1SyL1tTnM

", null, KEYS);


            _14_Response(response);
        }

        void _14_Response(LxwResponse o){

            var folders = CreateWeiXinFilesFolder();

            //Bitmap map = new Bitmap(o.BodyStream);
            var type = o.ResponseHeader.ContentType.ToLower();
            //if(type.StartsWith("audio/"))
            //if (type.StartsWith("image/"))
            //if (type.StartsWith("audio/"))
            var ext = MimeMapping.GetExtByMime(type);

            //写入文件
            using (FileStream fs = new FileStream(Path.Combine(folders, DateTime.Now.ToString("yyyyMMddHHmmssfff") + generateDeviceId() + o.ResponseHeader.AttachmentFilername), FileMode.OpenOrCreate))
            {
                fs.Write(o.Body, 0, o.Body.Length);
            }
        }
    }
}
