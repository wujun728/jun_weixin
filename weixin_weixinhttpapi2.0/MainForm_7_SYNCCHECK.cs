using HttpSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;

namespace demo_win_httpsocket
{
    partial class MainForm
    {
        bool bFirst = true;
        void _7_SYNCCHECK()
        {
            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);

            bool bRun = true;
            ThreadPool.QueueUserWorkItem(new WaitCallback(delegate
            {                
                while (bRun)
                {
                    try
                    {
                        var response = WEB.SendRequest(@"GET https://webpush{NUMBER}.weixin.qq.com/cgi-bin/mmwebwx-bin/synccheck?r={TIME}&skey={SKEY}&sid={WXSID}&uin={WXUIN}&deviceid={DEVICEID}&synckey={SYNCKEY}&_={TIME} HTTP/1.1
Host: webpush.weixin.qq.com
Connection: keep-alive
Accept: */*
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Referer: https://wx.qq.com/?&lang=zh_CN
Accept-Encoding: gzip, deflate, sdch
Accept-Language: zh-CN,zh;q=0.8
Cookie: ts_uid=7490200750; o_cookie=7103505; pgv_pvid=4255253068; pt_clientip=4c950af78b5036b4; pt_serverip=feef0abf0662c02f; ptui_loginuin=7103505; ptcz=6a354e61d971ccc416a5d9fa461f67c599f02d19c0bbb5cc8dad6d82c7850721; pt2gguin=o0007103505; uin=o0007103505; skey=@SVm04rrY6; qm_username=7103505; qm_sid=65f2ed6111bef5d92e7dbf710aec3449,qb3BUenJOMmtmUndFenl3MVFmaExsQkJOYmpVLWRqeC1qNG0xeGxGdDZVUV8.; pgv_pvi=9815860224; pgv_si=s1555394560; webwx_data_ticket=AQfiPZdvOnP2C2jMbzfG7DN/


");
                        bRun = _7_Response(response);
                    }
                    catch { }
                    Thread.Sleep(2000);
                }
            }));            
        }

        bool _7_Response(LxwResponse o)
        {
            string value = o.Value;
            if (value.Contains("1101"))
            {
                _ShowMessage("登录失败，请关闭重新尝试:"+WEB[SYNCKEY]);
                return false;
            }
            else
            {
                if (bFirst)
                {
                    _ShowMessage("登录成功!");
                    bFirst = false;
                }
                //1=>window.synccheck={retcode:"0",selector:"2"}
                if (value.IndexOf("selector:\"0\"") == -1 &&
                    value.IndexOf("retcode:\"0\"") != -1)
                        _8_WEBWXSYNC();

                return true;
            }
        }
    }
}
