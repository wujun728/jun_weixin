using FluorineFx.Json;
using HttpSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace demo_win_httpsocket
{
    partial class MainForm
    {
        void _5_WEBWXINIT()
        {
            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);

            var response = WEB.SendRequest(@"POST https://wx{NUMBER}.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r=-784058664&lang=zh_CN&pass_ticket={PASS_TICKET} HTTP/1.1
Host: wx.qq.com
Connection: keep-alive
Content-Length: 148
Accept: application/json, text/plain, */*
Origin: https://wx.qq.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Content-Type: application/json;charset=UTF-8
Referer: https://wx.qq.com/?&lang=zh_CN
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8
Cookie: pgv_pvid=5421692288; ptcz=4e0a323b1662b719e627137efa1221bb5c435b44a27cba4b09293c0e2cb57516; pt2gguin=o0007103505; pgv_pvi=1998095360; webwxuvid=2be019a311a30a82471c657deb21d97e9d1f45d435bfe8cc3c6d44572bc274f1e6b73083e1be6658fafce8b8da910d9f; pgv_si=s9303685120; wxpluginkey=1452474574; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; wxuin=840648442; wxsid=5D8s8i5gHhv7JbGO; wxloadtime=1452483021; mm_lang=zh_CN; webwx_data_ticket=AQfq+7neXON/cnHqx9WtuaT/
",

@"{""BaseRequest"":{""Uin"":""{WXUIN}"",""Sid"":""{WXSID}"",""Skey"":""{SKEY}"",""DeviceID"":""{DEVICEID}""}}");
            _5_Response(response);
        }

        void _5_Response(LxwResponse o)
        {
            var value = o.Value;
            if (!value.Contains("\"Ret\": 0"))
            {
                throw new Exception("没有返回正确的数据，webwxinit错误!");
            }

            var retJSON = JavaScriptConvert.DeserializeObject(value) as JavaScriptObject;
            var User = retJSON["User"] as JavaScriptObject;
            //USER_INFO
            UserName = User["UserName"] + "";
            NickName = User["NickName"] + "";

            this.Text = NickName + ">>>微信模拟客户端 V1.0 20160111  By LXW";

            JavaScriptObject obj = retJSON["SyncKey"] as JavaScriptObject;
            JavaScriptArray list = obj["List"] as JavaScriptArray;

            List<string> temp = new List<string>();
            foreach (JavaScriptObject kv in list)
                temp.Add(kv["Key"] + "_" + kv["Val"]);

            WEB.Add(SYNCKEY, string.Join("|", temp.ToArray()));
            if (obj != null && obj.ContainsKey("Count"))
            {
                WEB.Add(SYNCKEY_LONG, JavaScriptConvert.SerializeObject(retJSON["SyncKey"]));
            }
        }
    }
}