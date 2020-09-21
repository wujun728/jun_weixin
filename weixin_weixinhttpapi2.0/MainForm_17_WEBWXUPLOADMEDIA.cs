using FluorineFx.Json;
using HttpSocket;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;

namespace demo_win_httpsocket
{
    partial class MainForm
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="FromUserName"></param>
        /// <param name="ToUserName"></param>
        /// <param name="message"></param>
        /// <param name="type"></param>
        string _17_WEBWXUPLOADMEDIA(string filename)
        {
            Dictionary<string, string> KEYS = new Dictionary<string, string>();
            KEYS["id"] = "WU_FILE_0";
            KEYS["name"] = Path.GetFileName(filename);
            KEYS["type"] = MimeMapping.GetMimeMappingByFile(filename);
            KEYS["lastModifiedDate"] = "Thu Jan 07 2016 20:33:28 GMT+0800 (中国标准时间)";
            KEYS["size"] = File.ReadAllBytes(filename).Length+"";
            KEYS["mediatype"] = "doc";

            KEYS["uploadmediarequest"] =
                WEB.FormatKeys(@"{""BaseRequest"":{""Uin"":{WXUIN},""Sid"":""{WXSID}"",""Skey"":""{SKEY}"",""DeviceID"":""{DEVICEID}""},""ClientMediaId"":{TIME}363,""TotalLen"":"+KEYS["size"]+@",""StartPos"":0,""DataLen"":"+KEYS["size"]+@",""MediaType"":4}");

            KEYS["webwx_data_ticket"] = WEB["webwx_data_ticket"];
            KEYS["pass_ticket"] = WEB["PASS_TICKET"];

            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);

            var response = WEB.SendUpload(@"POST https://file.wx.qq.com/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json HTTP/1.1
Host: file.wx.qq.com
Connection: keep-alive
Content-Length: 3386
Origin: https://wx.qq.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryuM55vqcAjmXSlVHa
Accept: */*
Referer: https://wx.qq.com/?&lang=zh_CN
Accept-Encoding: gzip, deflate
Accept-Language: zh-CN,zh;q=0.8",
filename, KEYS);
            return _17_Response(response);
        }

        string _17_Response(LxwResponse o)
        {
            var obj = JavaScriptConvert.DeserializeObject(o.Value) as JavaScriptObject;

            var MediaId = obj["MediaId"] + "";

            return MediaId;
        }
    }
}
