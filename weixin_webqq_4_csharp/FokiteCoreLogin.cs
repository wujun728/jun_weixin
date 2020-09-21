using System;


namespace FokiteQQcore_http://fokite.com/
{
    public partial class FokiteCore
    {
        /// <summary>
        /// 检查QQ是否要输入验证码，不用输入返回null，要输入返回验证码图片流
        /// </summary>
        /// <returns></returns>
        public Stream CheckQQ()
        {
            var rs = "http://ptlogin2.qq.com/check?uin={0}&appid=1003903&r={1}";
            rs = String.Format(rs, Qqnumber, new Random().NextDouble());
            using (StreamReader sre = new StreamReader(CreateRequest(rs, String.Empty)))
            {
                rs = sre.ReadToEnd();
                String[] loginingmsg = { String.Empty, String.Empty };
                loginingmsg = rs.Replace("ptui_checkVC('", String.Empty).Replace("');", String.Empty).Replace("','", "|").Split('|');
                Vcode = loginingmsg[1];
                if (rs.Contains("'1'"))
                {
                    badcount = 10;
                    rs = String.Format("http://captcha.qq.com/getimage?uin={0}&aid=1003903&vc_type={1}&r={2}", Qqnumber, loginingmsg[1], new Random().NextDouble().ToString());
                    return CreateRequest(rs, String.Empty);
                }
                return null;
            }
        }

        /// <summary>
        /// 登陆QQ
        /// </summary>
        /// <see>http://www.fokite.com/</see>
        /// <param name="status">在线状态</param>
        /// <returns>是否成功</returns>
        public Boolean Login(QQstatus status)
        {
            if (String.IsNullOrEmpty(runinfo[3]))//没有密钥
            {
                badcount = 11;
                var rs = "http://ptlogin2.qq.com/login?u={0}&p={1}&verifycode={2}&webqq_type={3}&remember_uin=1&login2qq=1&aid=1003903&u1=http%3A%2F%2Fweb.qq.com%2Floginproxy.html%3Flogin2qq%3D1%26webqq_type%3D{3}&h=1&ptredirect=0&ptlang=2052&from_ui=1&pttype=1&dumy=&fp=loginerroralert&mibao_css=m_webqq";
                rs = String.Format(rs, Qqnumber, getPassword(Qqpassword, runinfo[8]), runinfo[8], (Int32)status);
                using (StreamReader sre = new StreamReader(CreateRequest(rs, String.Empty)))
                {
                    String[] loginingmsg = new String[5];
                    loginingmsg = sre.ReadToEnd().Replace("ptuiCB('", String.Empty).Replace("');", String.Empty).Replace("','", "|").Split('|');
                    if ( !( loginingmsg[1].StartsWith("0") && loginingmsg[2].Contains("qq.com") ) )
                    {
                        return false;
                    }
                    runinfo[2] = loginingmsg[2];//放进引用页
                    runinfo[3] = loginingmsg[4];//放进登陆密钥
                }
            }
            return LoginWebQQ(status);
        }

        private Boolean LoginWebQQ(QQstatus status)
        {
            //* 成功JSON范例
            //* {"retcode":0,"result":{"uin":QQ,"mode":"master","index":1056,"port":39085,"status":"online","vfwebqq":"80个字符","psessionid":"134个字符"}}
            var rs = "{0}\"status\":\"{1}\",\"ptwebqq\":\"{2}\",\"passwd_sig\":\"\",\"clientid\":\"{3}\",\"psessionid\":\"{4}\"{5}";
            rs = String.Format(rs, "r={", status.ToString().ToLower(),Ptwebqq,Clientid,Psessionid ,"}");
            rs = String.Format("{0}&clientid={1}&psessionid={2}",rs,Clientid,Psessionid);
            //rs = HttpUtility.UrlDecode(rs, Encoding.UTF8);
            rs = CreateRequest("http://d.web2.qq.com/channel/login2", rs, true);

            //Console.Write("登陆WEB结果：");
            //Console.WriteLine(rs);
            if (!rs.Contains("retcode\":0"))
            {
                badcount = 10;
                return false;
            }
            dynamic jsonengine = new JavaScriptSerializer().DeserializeObject(rs);

            this.runinfo[5] = jsonengine["result"]["vfwebqq"].ToString();
            this.runinfo[6] = jsonengine["result"]["psessionid"].ToString();
            this.runinfo[9] = jsonengine["result"]["port"].ToString();//post属性，屏蔽群用
            this.runinfo[10] = jsonengine["result"]["index"].ToString();//index属性，屏蔽群用

            badcount = 0;
            timers.Start();
            return IsOnlines;
        }
    }
}
