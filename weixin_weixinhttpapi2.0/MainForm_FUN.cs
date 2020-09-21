using FluorineFx.Json;
using HttpSocket;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace demo_win_httpsocket
{
    partial class MainForm
    {
        void _ShowMessage(string msg, JavaScriptObject obj = null)
        {
            DelegateFun.ExeControlFun(lstMessage, new DelegateFun.delegateExeControlFun(delegate
            {
                //全部清除
                if (lstMessage.Items.Count > 3000) lstMessage.Items.Clear();

                if (obj != null)
                {
                    var _FormUserName = obj["FromUserName"] + "";
                    var _ToUserName = obj["ToUserName"] + "";
                    var FormUserName = GetDIName(_FormUserName);
                    var ToUserName = GetDIName(_ToUserName);

                    lstMessage.Items.Add(DateTime.Now.ToString("MM-dd HH:mm") + ">" + FormUserName + ">" + ToUserName + ":" + msg);
                }
                else
                {
                    lstMessage.Items.Add(DateTime.Now.ToString("MM-dd HH:mm") + ">noJson=>" + msg);
                }

                this.lstMessage.TopIndex = this.lstMessage.Items.Count - (int)(this.lstMessage.Height / this.lstMessage.ItemHeight);

            }));
        }

        ///// <summary>
        ///// 得到文件类型
        ///// </summary>
        ///// <param name="fileName"></param>
        ///// <returns></returns>
        //string getFileType(string fileName)
        //{
        //    string mimeType = "application/unknown";
        //    string ext = Path.GetExtension(fileName).ToLower();
        //    RegistryKey regKey = Registry.ClassesRoot.OpenSubKey(ext);
        //    if (regKey != null && regKey.GetValue("Content Type") != null)
        //    {
        //        mimeType = regKey.GetValue("Content Type").ToString();
        //    }
        //    return mimeType;
        //}
    }
}