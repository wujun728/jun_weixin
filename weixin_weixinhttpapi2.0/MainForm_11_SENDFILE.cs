using HttpSocket;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace demo_win_httpsocket
{
    partial class MainForm
    {
        void _11_SENDFILE(string userid,string filename)
        {
            _ShowMessage(System.Reflection.MethodInfo.GetCurrentMethod().Name);

            var MediaId = _17_WEBWXUPLOADMEDIA(filename);

            var type =  MimeMapping.GetMimeMappingByFile(filename).ToLower();
            //if(type.StartsWith("audio/"))
            //{
                
            //}
            if (type.StartsWith("image/"))
            {
                //发送图片
                _15_WEBWXSENDEMOTICON(userid, UserName, MediaId, 47);
            }
            else
            {
                var Message = "<appmsg appid='" + WEB["APPID"] + "' sdkver=''><title>{filename}</title><des></des><action></action><type>6</type><content></content><url></url><lowurl></lowurl><appattach><totallen>{filelength}</totallen><attachid>{attachid}</attachid><fileext>{filetype}</fileext></appattach><extinfo></extinfo></appmsg>";
                Message = Message.Replace("{attachid}", MediaId);
                Message = Message.Replace("{filename}", Path.GetFileName(filename));
                Message = Message.Replace("{filelength}", "" + File.ReadAllBytes(filename).Length);
                Message = Message.Replace("{filetype}", Path.GetExtension(filename).TrimStart(new char[] { '.' }));

                _16_WEBWXSENDAPPMSG(userid, UserName, Message, 6);
            }
        }
    }
}
