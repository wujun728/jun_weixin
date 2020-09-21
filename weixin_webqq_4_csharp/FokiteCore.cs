using System;


namespace FokiteQQcore_http://fokite.com/
{
    /// <summary>
    /// 该类包含操作QQ的常用方法
    /// </summary>
    public partial class FokiteCore : ServiceBase
    {
        /// <summary>
        /// 初始化QQ信息，并判断是否需要验证码
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        public FokiteCore(String account, String password)
        {
            runinfo[0] = account;
            runinfo[1] = password;
            LOGFILE = ReadConfig(ref runinfo[0], ref runinfo[1]);//配置优先

            ConfigServiceBase();

            //监听待机，以及网络是否连接
            NetworkChange.NetworkAvailabilityChanged += new NetworkAvailabilityChangedEventHandler(NetworkChange_NetworkAvailabilityChanged);
            //Microsoft.Win32.SystemEvents.PowerModeChanged += new Microsoft.Win32.PowerModeChangedEventHandler(SystemEvents_PowerModeChanged);

            timers.Interval = TimeSpan.FromSeconds(5).TotalMilliseconds;//5秒
            timers.AutoReset = true;
            //timers.Enabled = true;
            timers.Elapsed += new System.Timers.ElapsedEventHandler(MsgPoll);
        }

        //void SystemEvents_PowerModeChanged(Object sender, Microsoft.Win32.PowerModeChangedEventArgs e)
        //{
        //    if(e.Mode == Microsoft.Win32.PowerModes.Suspend){
        //        ChangerStatus(QQstatus.Offline);
        //    }
        //}

        void NetworkChange_NetworkAvailabilityChanged(Object sender, NetworkAvailabilityEventArgs e)
        {
            timers.Enabled = e.IsAvailable;
        }

        /// <summary>
        /// 读取配置，改成反射成自己所有属性的
        /// </summary>
        /// <param name="qqnumber"></param>
        /// <param name="qqpassword"></param>
        /// <returns>返回日志文件路径</returns>
        private String ReadConfig(ref String qqnumber, ref String qqpassword)
        {
            var configcontent = System.IO.Path.Combine(SELFPATH, "FokiteConfig.json");
            try
            {
                var fileconfiginfo = new System.IO.FileInfo(configcontent);
                if (!fileconfiginfo.Exists) { return String.Empty; }//不存在不读

                configcontent = System.IO.File.ReadAllText(configcontent);

                Object jsonengine = new System.Web.Script.Serialization.JavaScriptSerializer().DeserializeObject(configcontent);
                Dictionary<String, Object> dickey = (Dictionary<String, Object>)jsonengine;

                configcontent = dickey["logfile"].ToString();

                qqnumber = String.IsNullOrEmpty(dickey["qqnumber"].ToString()) ? qqnumber : dickey["qqnumber"].ToString();
                qqpassword = String.IsNullOrEmpty(dickey["qqpassword"].ToString()) ? qqpassword : dickey["qqpassword"].ToString();

                fileconfiginfo = new System.IO.FileInfo(configcontent);
                configcontent = fileconfiginfo.FullName;
            }
            catch (KeyNotFoundException)
            {
                configcontent = String.Empty;
            }
            catch (ArgumentException)
            {
                //System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "info.txt")
                configcontent = String.Empty;
            }
            return configcontent;
        }

        /// <summary>
        /// 消息轮询
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        internal void MsgPoll(Object sender, System.Timers.ElapsedEventArgs e)
        {
            if (IsOnlines)//检测是否在线
            {
                MsgPoll();
            }
        }
        
        /// <summary>
        /// 退出QQ登录
        /// </summary>
        /// <returns>true为退出成功</returns>
        public Boolean Logout()
        {
            badcount = 11;
            String url = String.Format("http://d.web2.qq.com/channel/logout2?clientid={0}&psessionid={1}&t={2}&vfwebqq={3}", Clientid, Psessionid, getTime(), Vfwebqq);
            return CreateRequest(url, String.Empty, false).Contains("retcode\":0");
        }

        /// <summary>
        /// 获取各种消息，本方法需要线程调用
        /// </summary>
        private void MsgPoll()
        {
            var url = "{0}\"clientid\":\"{1}\",\"psessionid\":\"{2}\",\"key\":0,\"ids\":[]{3}";
            url = String.Format(url, "{", Clientid, Psessionid, "}");
            url = HttpUtility.UrlEncode(url,Encoding.UTF8);
            url = String.Format("r={0}&clientid={1}&psessionid={2}",url,Clientid,Psessionid);
            
            //System.Diagnostics.Debug.WriteLine("失败计数：{0}",badcount);
            //System.Diagnostics.Debug.WriteLine("拼接请求串");
            //System.Diagnostics.Debug.WriteLine(url);
            try
            {
                url = CreateRequest("http://d.web2.qq.com/channel/poll2", url, true);
                HttpRuntime.Cache.Insert("MSGPOLL", url, null, Cache.NoAbsoluteExpiration, TimeSpan.FromSeconds(5.5), CacheItemPriority.Normal, null);
                //System.Diagnostics.Debug.WriteLine("得到请求");
                //System.Diagnostics.Trace.WriteLine(url);
                if (url.Contains("result"))
                {
                    Object jsonengine = new JavaScriptSerializer().DeserializeObject(url);
                    PutEvent(url, jsonengine);
                }
                else
                {
                     if(url.Contains("121")){
                         badcount = 100;//表示掉线
                     }
                     if (url.Contains("errmsg"))
                     {
                         runinfo[3] = url;
                     }
                     if (url.Contains("103"))
                     {
                         ++badcount;
                     }
                }
                //return new JavaScriptSerializer().DeserializeObject(url);
            }
            catch (KeyNotFoundException e)
            {
                 runinfo[3] = e.Message;                
            }
            catch (System.ArgumentNullException e)
            {
                ////Console.Write("消息原始内容");
                ////Console.WriteLine(url);
                SimpleLog(url, e);
                //return new Dictionary<String, Object>();
            }
            catch (System.ArgumentException e)
            {
                SimpleLog(url, e);
                //return new Dictionary<String, Object>();
            }
            catch (System.InvalidOperationException e)
            {
                SimpleLog(url, e);
                //return new Dictionary<String, Object>();
            }
        }

        internal void PutEvent(String url, Object jsonengine)
        {
            if (String.IsNullOrEmpty(url)) { return; }
            if (MsgPollEventHandler != null) { MsgPollEventHandler(this, new FokiteQQEventArgsPollMsg(url, jsonengine)); }

            Dictionary<String, Object> dic = (Dictionary<String, Object>)jsonengine;
            if (dic["result"] is Object[])//这里在长期运行的时候居然有错。
            {
                Object[] ects = (Object[])dic["result"];
                foreach (Dictionary<String, Object> dicitem in ects)
                {
                    switch (dicitem["poll_type"].ToString().ToLower())
                    {
                        case "kick_message":
                            badcount = 11;//判断是否被T，找到为真。断线值为假
                            if (KickEventHandler != null) { KickEventHandler(this, new FokiteQQKickEvent(url, jsonengine)); }
                            break;
                        case "buddies_status_change":
                            if (BuddiesStatusChangeEventHandler != null) { BuddiesStatusChangeEventHandler(this, new FokiteQQBuddiesStatusChangeEvent(url, jsonengine)); }
                            badcount = badcount < 0 ? 0 : --badcount;
                            break;
                        case "group_message":
                            if (GroupMessageEventHandler != null) { GroupMessageEventHandler(this, new FokiteQQGroupMessageEvent(url, jsonengine)); }
                            break;
                        case "message":
                            if (MessageEventHandler != null) { MessageEventHandler(this, new FokiteQQMessageEvent(url, jsonengine)); }
                            break;
                        case "system_message":
                            if (SystemMessageEventHandler != null) { SystemMessageEventHandler(this, new FokiteQQSystemMessageEvent(url, jsonengine)); }
                            break;
                        case "file_message":
                            if (FileMessagePollEventHandler != null) { FileMessagePollEventHandler(this, new FokiteQQFileMessageEvent(url, jsonengine)); }
                            break;
                        case "shake_message":
                            if (ShakeMessageEventHandler != null) { ShakeMessageEventHandler(this, new FokiteQQShakeMessageEvent(url, jsonengine)); }
                            break;
                        case "input_notify":
                            if (InputNotifyEventHandler != null) { InputNotifyEventHandler(this, new FokiteQQInputNotify(url, jsonengine)); }
                            break;
                        default:
                            //tips
                            //视频
                            break;
                    }
                }
            }
            else
            {
                SimpleLog(url, new HttpParseException("返回的非JSON字符串序列错！",null));
            }
        }
        /// <summary>
        /// 简单的错误日志输出，调用此方法会增加掉线检测权重
        /// </summary>
        /// <param name="content"></param>
        /// <param name="e"></param>
        public void SimpleLog(String content, Exception e)
        {
            ++badcount;
            content = String.Format("时间：{0} ；出错的方法名：{1} 错误原因：{2} 出错行号：{3} 出错代码：{4} 出错实例：{5}  消息原始内容：\r\n{6}\r\n",
                DateTime.Now.ToString("yyyy年M月d日 H:mm:ss dddd"),
                new System.Diagnostics.StackTrace(true).GetFrame(1).GetMethod().Name,
                e.Message,
                e.StackTrace,
                e.Source,
                e.InnerException,
                content
                );
            System.Diagnostics.Debug.WriteLine("Fokite简单错误输出：");
            System.Diagnostics.Debug.WriteLine(content);
            System.Diagnostics.Trace.WriteLine(content);
            if (String.IsNullOrEmpty(LOGFILE)) { return; }
            System.IO.File.AppendAllText(LOGFILE, content , new UTF8Encoding(false));
        }

        /// <summary>
        /// 检查QQ是否在线，隐身QQ一律返回0，默认参数为Qqnum属性
        /// </summary>
        /// <param name="online">要检测的在线QQ号码</param>
        /// <returns>在线QQ是否在线，1在线0不在线</returns>
        public Object[] IsOnline(params Object[] online)
        {
            StringBuilder url = new StringBuilder("http://webpresence.qq.com/getonline?Type=1&");

            if (online.Length == 0)
            {
                url.Append(Qqnumber).Append(":");
            }
            else
            {
                foreach (var onlineitem in online)
                {
                    url.Append(onlineitem).Append(":");
                }
            }

            var onlineresult = CreateRequest(url.ToString(), String.Empty, false);
            onlineresult = new Regex(@"online\[\d*?\]=", RegexOptions.Compiled).Replace(onlineresult, String.Empty);
            return onlineresult.TrimEnd(';').Split(';');
        }
        
        /// <summary>
        /// 获取好友的个人签名
        /// </summary>
        /// <param name="uin">UIN</param>
        /// <returns>签名内容</returns>
        /** 成功返回范例
         * {"retcode":0,"result":[{"uin":UIN,"lnick":"签名内容"}]}
         * Console.WriteLine(url);
         * */
        public String Signature(Object uin)
        {
            String url = String.Format("http://s.web2.qq.com/api/get_single_long_nick2?tuin={0}&vfwebqq={1}&t={2}", uin, Vfwebqq, getTime(DateTime.Now));
            using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
            {
                url = sre.ReadToEnd();
                if (!url.Contains("\"retcode\":0")) { return String.Empty; }
                Dictionary<String, Object> jsonengine = new JavaScriptSerializer().DeserializeObject(url) as Dictionary<String, Object>;
                var obj = (Object[])jsonengine["result"];
                jsonengine = (Dictionary<String, Object>) obj[0];
                return new StringBuilder().Append(@jsonengine["lnick"]).ToString();//转码
            }
        }

        /// <summary>
        /// 修改自己的QQ签名
        /// </summary>
        /// <param name="signaturecontent">签名内容</param>
        /// <returns>是否成功</returns>
        public Boolean ChangeSignature(String signaturecontent)
        {
            if (String.IsNullOrEmpty(signaturecontent)) { return false; }
            signaturecontent = String.Format("r=%7B%22nlk%22%3A%22{0}%22%2C%22vfwebqq%22%3A%22{1}%22%7D", HttpUtility.UrlEncode(signaturecontent, Encoding.GetEncoding("utf-8")), Vfwebqq);
            signaturecontent = CreateRequest("http://s.web2.qq.com/api/set_long_nick2", signaturecontent, true);
            //Console.Write("返回");
            //Console.WriteLine(SignatureContent);
            return signaturecontent.Contains("retcode\":0");
        }

        /// <summary>
        /// 写入流到文件
        /// </summary>
        /// <param name="filestream">文件流</param>
        /// <param name="filename">文件名</param>
        /// <returns></returns>
        public Boolean SaveImagesToFile(Stream filestream,String filename)
        {
            //System.Web.HttpContext.Current.Server.MapPath
            if (String.IsNullOrEmpty(filename) || String.IsNullOrEmpty(System.IO.Path.GetDirectoryName(String.Concat(filename,@"\"))))//如果传入的是一个无法获取路径的目录
            {
                filename = System.IO.Path.GetFileNameWithoutExtension(System.IO.Path.GetRandomFileName());//随机一个文件名
                filename = System.IO.Path.Combine(SELFPATH, String.Concat(filename, ".png"));//合并当前运行目录下的随机文件名PNG图片
            }
            
            using (var imageswritestream = new FileStream(filename, FileMode.OpenOrCreate) )
            {                
                //var ms = new MemoryStream();
                filestream.CopyTo(imageswritestream);
                //BinaryWriter w = new BinaryWriter(imageswritestream);
                //w.Write(ms.ToArray());
                //ms.Close();
            }

            //采取GD库，没必要加载
            //using (var facestram = new System.Drawing.Bitmap(filestream))
            //{
            //    facestram.Save(filename, System.Drawing.Imaging.ImageFormat.Png);
            //}
            return File.Exists(filename);
        }

        ///// <summary>
        ///// 写入流到文件
        ///// </summary>
        ///// <param name="filestream">文件流</param>
        ///// <param name="uinpath">UIN号码</param>
        ///// <returns></returns>
        //public Boolean SaveImagesToFile(Stream filestream, FileInfo path)
        //{
        //    using (StreamWriter sw = File.CreateText(path.ToString());
        //    {
        //        var filesavastream = new StreamReader(filestream);
        //        sw
        //        filesavastream.Close();
        //    }

        //    return File.Exists(path.ToString());
        //}

        ///// <summary>
        ///// 获取聊天自定义表情或图片
        ///// </summary>
        ///// <param name="lcid">获取到的消息msg_id</param>
        ///// <param name="guid"><see cref="ReceiveMsgFormat"/>cface值</param>
        ///// <param name="uin"><see cref="ReceiveMsgFormat"/>获取到的对方的UID</param>
        ///// <returns></returns>
        //public Stream GetChatImages(Int64 lcid, String guid, Int64 uin)
        //{
        //    //Path.GetExtension(@guid);获取扩展名
        //    String url = String.Format("http://d.web2.qq.com/channel/get_cface2?lcid={0}&guid={1}&to={2}&count=5&time=1&clientid={3}&psessionid={4}", lcid, guid, uin, Clientid, Psessionid);
        //    url = GetTheRedirectUrl(url);

        //    using (var imagesstram = CreateRequest(url, String.Empty, this.Refurl))
        //    {
        //        new System.Drawing.Bitmap(imagesstram).Save(System.IO.Path.Combine(SELFPATH, guid), System.Drawing.Imaging.ImageFormat.Png);
        //        return imagesstram;
        //    }
        //}

        ///// <summary>
        ///// 获得重定向的Url
        ///// </summary>
        ///// <param name="url">原Url</param>
        ///// <returns>重定向后的Url</returns>
        //public String GetTheRedirectUrl(String url)
        //{
        //    WebResponse responses = WebRequest.Create(new Uri(url)).GetResponse();
        //    url = responses.ResponseUri.ToString();
        //    responses.Close();
        //    return url;
        //}

        ///// <summary>
        ///// 获得重定向的Url
        ///// </summary>
        ///// <param name="url">原Url</param>
        ///// <returns>重定向后的Url</returns>
        //public String GetTheRedirectUrl(Uri uri)
        //{
        //    return GetTheRedirectUrl(uri);
        //}

        /// <summary>
        /// 发送某个好友的震屏
        /// </summary>
        /// <param name="uin">好友UID</param>
        /// <returns></returns>
        public Boolean SendShake(String uin)
        {
            uin = String.Format("http://d.web2.qq.com/channel/shake2?to_uin={0}&clientid={1}&psessionid={2}&t={3}", uin, Clientid, Psessionid, getTime());
            uin = CreateRequest(uin, String.Empty, false);
            return uin.Contains("ok");
        }

        /// <summary>
        /// 获取聊天记录，无实质效果
        /// <example>
        /// <code>
        /// 返回范例
        /// alloy.app.chatLogViewer.rederChatLog({ret:0,tuin:583730301,page:1,total:1,chatlogs:[{ver:3,cmd:16,seq:49,time:1313074040,type:1,msg:["HI\u3002","\n\u3010\u63D0\u793A\uFF1A\u6B64\u7528\u6237\u6B63\u5728\u4F7F\u7528WebQQ\uFF1Ahttp://web.qq.com/\u3011"] },{ver:3,cmd:17,seq:14343,time:1313074088,type:1,msg:["\u3000\u55EF"] }]});
        /// </code>
        /// </example>
        /// </summary>
        /// <param name="uin">好友的UIN</param>
        /// <param name="page">第几页</param>
        /// <param name="row">显示多少行数</param>
        /// <returns></returns>
        public String GetChatLog(Object uin, Int64 page, Int64 row)
        {
            //http://web.qq.com/cgi-bin/webqq_chat/?cmd=2&tuin=3331096154&vfwebqq=393ed30cdaee217f6fd613d9ff6b31a51111eea56a9e7768b6f898e7868177860e6b37a5fc9a2c60&callback=alloy.app.chatLogViewer.showDeleteResult&t=1317192108897
            //删除某个UIN消息记录
            //返回 alloy.app.chatLogViewer.showDeleteResult({ret:0},{tuin:3331096154});
            String url = String.Format("http://web.qq.com/cgi-bin/webqq_chat/?cmd=1&tuin={0}&vfwebqq={1}&page={2}&row={3}&callback=alloy.app.chatLogViewer.rederChatLog&t={4}"
                    , uin, this.Vfwebqq, page, row, getTime()
                );
            //alloy.app.chatLogViewer.rederChatLog
            url = CreateRequest(url, String.Empty, false);
            //Console.WriteLine("获取好友UIN");
            //Console.WriteLine(url);
            //.Contains("ret:0")
            return url;
        }
        
        /// <summary>
        /// 创建请求流，一般是get
        /// </summary>
        /// <param name="url">地址</param>
        /// <param name="postdata">post 提交的字符串</param>
        /// <param name="ispost">是否是post</param>
        /// <returns>html </returns>
        internal String CreateRequest(String url, String postdata, Boolean ispost)
        {
            ServicePointManager.Expect100Continue = false;

            HttpWebRequest request = null;
            HttpWebResponse response = null;
            String html = String.Empty;
            try
            {
                byte[] byterequest = Encoding.Default.GetBytes(postdata);

                request = (HttpWebRequest)HttpWebRequest.Create(url);
                request.CookieContainer = rqcookies;
                request.ServicePoint.ConnectionLimit = 200;
                //request.Timeout = 60;
                request.Referer = Refurl;
                //request.KeepAlive = true;
                //request.ReadWriteTimeout = 60;
                request.Accept = "*/*";
                request.UserAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Http://fokite.com/; Trident/6.0 .NET4.0E)";
                request.Headers.Add(HttpRequestHeader.Pragma, "no-cache");
                request.Headers.Add(HttpRequestHeader.CacheControl, "no-cache");
                
                if (ispost)
                {
                    request.ContentType = "application/x-www-form-urlencoded";
                    request.Method = WebRequestMethods.Http.Post;
                    request.ContentLength = byterequest.Length;

                    Stream stream = request.GetRequestStream();
                    stream.Write(byterequest, 0, byterequest.Length);
                    stream.Close();
                }
                else
                {
                    request.Method = WebRequestMethods.Http.Get;
                    request.AllowAutoRedirect = false;
                }

                response = (HttpWebResponse)request.GetResponse();
                Stream responseStream = response.GetResponseStream();
                StreamReader streamReader = new StreamReader(responseStream, Encoding.UTF8);
                html = streamReader.ReadToEnd();
                //streamReader.Close();
                //responseStream.Close();

                //request.Abort();
                //response.Close();
                Setptwebqqandverity(response);

                return html;
            }
            catch (System.ObjectDisposedException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                return String.Empty;
            }
            catch (System.ArgumentNullException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                return String.Empty;
            }
            catch (System.Net.ProtocolViolationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                ++badcount;
                return String.Empty;
            }
            catch (System.Net.NetworkInformation.NetworkInformationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                ++badcount;
                return String.Empty;
            }
            catch (System.Net.WebException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                return String.Empty;
            }
            catch (System.InvalidOperationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                return String.Empty;
            }
            catch (System.NotSupportedException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                return String.Empty;
            }
            catch (System.ArgumentOutOfRangeException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                return String.Empty;
            }
        }

        /// <summary>
        /// 设置 ptwebqq 和 verifysession 的值
        /// </summary>
        /// <param name="response"></param>
        private void Setptwebqqandverity(HttpWebResponse response)
        {//rqcookies全局变量
            foreach (Cookie cookie in response.Cookies)
            {
                rqcookies.Add(cookie);
                if(cookie.Name.ToLower() == "ptwebqq" ){
                    this.Ptwebqq = cookie.Value;
                }
                if (cookie.Name.ToLower() == "verifysession")
                {
                    Verifysession = cookie.Value;
                }
                //if (cookie.ToString().StartsWith("ptwebqq="))
                //{
                //    this.Ptwebqq = cookie.ToString().Replace("ptwebqq=", String.Empty);
                //}
                //if (cookie.ToString().StartsWith("verifysession="))
                //{
                //    this.Verifysession = cookie.ToString().Replace("verifysession=", String.Empty);
                //}
                //System.IO.File.AppendAllText(System.IO.Path.Combine(System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location), "info.txt"), String.Format("{0}\r\n", cookie.ToString()));
            }
        }

        /// <summary>
        /// 创建连接POST
        /// </summary>
        /// <param name="url">地址</param>
        /// <param name="postData">提交数据</param>
        /// <returns></returns>
        internal Stream CreateRequest(String url, String postData)
        {
            ServicePointManager.Expect100Continue = false;
            HttpWebResponse response = null;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.CookieContainer = rqcookies;
            Stream responsestream = null;
            try
            {
                request.Accept = "*/*";
                request.UserAgent = "Mozilla/5.0 (compatible; MSIE 10.0; http://fokite.com ; Trident/6.0 .NET4.0E)";
                request.KeepAlive = true;
                request.AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate;
                request.Headers.Add(HttpRequestHeader.Pragma, "no-cache");
                request.Headers.Add(HttpRequestHeader.CacheControl, "no-cache");
                request.AllowAutoRedirect = false;
                request.Referer = String.IsNullOrEmpty(runinfo[2]) ? url : runinfo[2];
                if (!String.IsNullOrEmpty(postData))
                {
                    request.Method = WebRequestMethods.Http.Post;
                    //request.Headers.Set(HttpRequestHeader.Cookie,rqcookies);
                    request.ContentType = "application/x-www-form-urlencoded";
                    byte[] data = Encoding.Default.GetBytes(postData);
                    request.ContentLength = data.Length;
                    using (Stream newStream = request.GetRequestStream())
                    {
                        newStream.Write(data, 0, data.Length);
                        //newStream.Close();
                    }
                }
                response = (HttpWebResponse)request.GetResponse();
                responsestream = response.GetResponseStream();
                response.Cookies = rqcookies.GetCookies(request.RequestUri);
                Setptwebqqandverity(response);
                //request.Abort();
            }
            catch (System.ObjectDisposedException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
            }
            catch (System.ArgumentNullException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
            }
            catch (System.Net.ProtocolViolationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                ++badcount;
            }
            catch (System.Net.NetworkInformation.NetworkInformationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
            }
            catch (System.Net.WebException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                ++badcount;
            }
            catch (System.InvalidOperationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
            }
            catch (System.NotSupportedException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
            }
            catch (System.ArgumentOutOfRangeException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
            }
            //response.Close();
            return responsestream;
        }
    }
}
