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
        /// <summary>
        /// 处理消息
        /// </summary>
        /// <param name="msg"></param>
        /// <param name="json"></param>
        /// <param name="MsgId"></param>
        void _9_DoMessage(string msg, JavaScriptObject json, string MsgId)
        {
            var _FormUserName = json["FromUserName"] + "";
            var _ToUserName = json["ToUserName"] + "";

            var FormUserName = GetDIName(_FormUserName);
            var ToUserName = GetDIName(_ToUserName);

            

            var MsgType = json["MsgType"] + "";
            _ShowMessage("["+MsgType+"]"+msg, json);

            //图片
            if (MsgType == "3")
            {
                _12_WEBWXGETMSGIMG(json["MsgId"] + "");
                return;
            }

            //文件
            if (MsgType == "49")
            {
                _14_WEBWXGETMEDIA(json["MsgId"] + "",  json);
                return;
            }

            //语音
            if (MsgType == "34")
            {
                _13_WEBWXGETVOICE(json["MsgId"] + "");
                return;
            }


            //处理消息反馈
            if (msg.StartsWith("<msg><op id='1'>")) return;

            //webwxvoipnotifymsg
            //处理广告图片
            if (msg.StartsWith("<msg><img length="))
            {
                //if (USER_AD.ContainsKey(_FormUserName))
                //{
                //    var MsgID = obj["MsgId"] + "";
                //    SendMsg(_FormUserName, _ToUserName, "正在处理广告，请稍后...", false);
                //    UploadWxImage(MsgID, _FormUserName, FormUserName, USER_AD[_FormUserName]);
                //    Console.WriteLine("3=>" + MsgID);
                //}
                return;
            }

            //处理连接
            if (msg.StartsWith("<msg>") && msg.Contains("<url>"))
            {
                //如何得到原来的标题和描述
                //ShowMsg(msg);
                var url = SubString(msg, "<url>", "</url>");
                //键	值
                //请求	GET /cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgID=567846155428648917&skey=%40crypt_688681e4_72dbe72e2947fd5ecbca14ab4637d962&type=slave HTTP/1.1
                //下载图片
                Console.WriteLine("4=>" + url);

                //正在转换文章
                //if (url.StartsWith("<![CDATA", StringComparison.OrdinalIgnoreCase)) return;

                if (!url.StartsWith("<![CDATA", StringComparison.OrdinalIgnoreCase) && !url.StartsWith("http://mp.weixin.qq.com", StringComparison.OrdinalIgnoreCase))
                {
                    var title = "";
                    var des = "";
                    var img = "";

                    //title = SubString(msg, "<title>", "</title>");
                    //des = SubString(msg, "<des>", "</des>");
                    //img = GetBase64FromImage(DownLoadImage(MsgId));
                }


                //SendMsg(_FormUserName, _ToUserName, "正在转换文章，请稍后...", false);
                //DownLoadPage(msg, _FormUserName, FormUserName, title, des, img, _ToUserName);

                return;
            }

            //未识别消息
            if (msg.StartsWith("<msg>"))
            {
                return;
            }

            if (_FormUserName == UserName)
            {
                Console.WriteLine("5=>" + _FormUserName + ">" + _ToUserName);
                return;
            }

            if (_FormUserName.StartsWith("@@")|| _ToUserName.StartsWith("@@"))
            {
                Console.WriteLine("6=>" + _FormUserName + ">" + _ToUserName);
                return;
            }

            //微信团队不要发
            if (FormUserName.Contains("微信团队"))
            {
                //Console.WriteLine("5=>" + _FormUserName + ">" + _ToUserName);
                return;
            }
        }
    }
}
