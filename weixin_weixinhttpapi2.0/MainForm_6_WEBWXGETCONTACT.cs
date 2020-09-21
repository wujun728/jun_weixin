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
        void _6_WEBWXGETCONTACT()
        {
            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);
            var response = WEB.SendRequest(@"GET https://wx{NUMBER}.qq.com/cgi-bin/mmwebwx-bin/webwxgetcontact?lang=zh_CN&pass_ticket={PASS_TICKET}&r={TIME}&seq=0&skey={SKEY} HTTP/1.1
Host: wx.qq.com
Connection: keep-alive
Accept: application/json, text/plain, */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Referer: https://wx.qq.com/?&lang=zh_CN
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Cookie: pgv_pvid=5421692288; ptcz=4e0a323b1662b719e627137efa1221bb5c435b44a27cba4b09293c0e2cb57516; pt2gguin=o0007103505; pgv_pvi=1998095360; webwxuvid=2be019a311a30a82471c657deb21d97e9d1f45d435bfe8cc3c6d44572bc274f1e6b73083e1be6658fafce8b8da910d9f; pgv_si=s1289632768; wxpluginkey=1452474574; MM_WX_NOTIFY_STATE=1; MM_WX_SOUND_STATE=1; wxuin=840648442; wxsid=+tGm0ywQU38jT5PG; wxloadtime=1452502754; mm_lang=zh_CN; webwx_data_ticket=AQd2WpESNN3Z2JoHNxnridSy


");
            _6_Response(response);
        }

        void _6_Response(LxwResponse o)
        {
            var value = o.Value;
            var USER_LIST = JavaScriptConvert.DeserializeObject(value) as JavaScriptObject;

            //显示到list中
            var arr = USER_LIST["MemberList"] as JavaScriptArray;

            lstBoxUser.Items.Clear();
            foreach (JavaScriptObject user in arr)
            {
                USER_DI[user["UserName"] + ""] = user["NickName"] + "";                
            }

            //排序
            var lst = from obj in USER_DI orderby obj.Value ascending select obj;

            lst.Foreach(K=> {
                lstBoxUser.Items.Add(K.Value + ">" + K.Key);
            });            
        }
    }
}
