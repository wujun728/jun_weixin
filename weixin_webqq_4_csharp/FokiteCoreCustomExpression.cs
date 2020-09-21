using System;


namespace FokiteQQcore_http://fokite.com/
{
    public partial class FokiteCore
    {
        /// <summary>
        /// 添加一个本地自定义表情，不能大于1.0MB图片
        /// </summary>
        /// <param name="filename">文件本地物理位置</param>
        /// <returns></returns>
        public Boolean UpLoadCustomExpression(String filename)
        {
            var fileinfo = new FileInfo(filename);
            if (fileinfo.Length > 1050000 || !fileinfo.Exists) //太大，不存在的不传
            {
                return false;
            }
            HttpRuntime.Cache.Remove("CustomExpressionList");//删掉缓存
            
            filename = DateTime.Now.Ticks.ToString("x");//重用变量
            var url = String.Format("{0}{1}", new String('-', 29), filename);//重用变量
            var headbuft = new StringBuilder();
            headbuft.AppendFormat("\r\n\r\n{0}\r\n", url);
            headbuft.Append("Content-Disposition: form-data; name=\"f\"\r\n\r\n");
            headbuft.Append("EQQ.View.ChatBox.uploadCustomFaceCallback\r\n");
            headbuft.AppendFormat("{0}--", url);

            var headbuftbyte = Encoding.UTF8.GetBytes(headbuft.ToString());
            headbuft.Clear();
            //Boundary 头结束

            headbuft.AppendFormat("{0}\r\n", url);
            headbuft.AppendFormat("Content-Disposition: form-data; name=\"custom_face\"; filename=\"{0}\"\r\n",fileinfo.Name);
            headbuft.Append("Content-Type: image/jpeg \r\n");

            //System.IO.BinaryReader br = new System.IO.BinaryReader(fs);

            //String fileType = String.Empty;

            //byte data = br.ReadByte();
            //fileType += data.ToString();
            //data = br.ReadByte();
            //fileType += data.ToString();
            //JPG = 255216,
            //GIF = 7173,
            //PNG = 13780,

            //headbuft.AppendFormat("{0}\r\n", url);
            //headbuft.Append("Content-Disposition: form-data; name=\"widthlimit\"\r\n\r\n");
            //headbuft.Append("540\r\n");
            //headbuft.AppendFormat("{0}\r\n", url);
            //headbuft.Append("Content-Disposition: form-data; name=\"heightlimit\"\r\n\r\n");
            //headbuft.Append("440\r\n");
            //headbuft.AppendFormat("{0}\r\n", url);
            //headbuft.Append("Content-Disposition: form-data; name=\"scale\"\r\n\r\n");
            //headbuft.Append("true\r\n");
            //headbuft.AppendFormat("{0}--", url);
            //PING二头结束
            Byte[] headbuftfileheadbyte = Encoding.UTF8.GetBytes(headbuft.ToString());
            return CreateRequest("http://up.web2.qq.com/cgi-bin/cface_upload",headbuftbyte, headbuftfileheadbyte, fileinfo.OpenRead(),filename).Contains(":0");
        }

        ///// <summary>
        ///// 传送离线文件
        ///// </summary>
        ///// <returns></returns>
        //public Boolean UpLoadOffliceFile()
        //{
        //    //"http://weboffline.ftn.qq.com/ftn_access/upload_offline_pic?time=1317386893802"
        //    /***
        //     * Skey cookie 里面
        //     * appid 固定 WEBQQ登陆一样的
        //     * clientversion 估计固定
        //     * locallangid 固定
        //     * Content-Type: multipart/form-data; boundary=---------------------------41184676334
        //    Content-Length: 2432 -----------------------------41184676334
        //    Content-Disposition: form-data; name="callback" parent.EQQ.Model.ChatMsg.callbackSendPic -----------------------------41184676334 
        //    Content-Disposition: form-data; name="locallangid" 2052 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="clientversion" 1409 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="uin" 568685755 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="skey" @NapUAXkAJ -----------------------------41184676334 
        //    Content-Disposition: form-data; name="appid" 1002101 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="peeruin" 593023668 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="file"; filename="icon_sina.gif" Content-Type: image/gif {内容} -----------------------------41184676334 
        //    Content-Disposition: form-data; name="fileid" 1 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="vfwebqq" vfwebqq内容 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="senderviplevel" 0 -----------------------------41184676334 
        //    Content-Disposition: form-data; name="reciverviplevel" 0 -----------------------------41184676334--
        //     ***/
        //    return false;
        //}

        /// <summary>
        /// 创建请求，为文件上传所有
        /// </summary>
        /// <param name="url">请求地址</param>
        /// <param name="requestheadbyte"></param>
        /// <param name="filesectionbyte"></param>
        /// <param name="submitstream"></param>
        /// <param name="timeseparator">分隔符</param>       
        /// <returns></returns>
        internal String CreateRequest(String url, Byte[] requestheadbyte, Byte[] filesectionbyte, Stream submitstream, String timeseparator)
        {
            try
            {
                HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
                request.Method = WebRequestMethods.Http.Post;
                request.ReadWriteTimeout = 30000;
                request.Timeout = 30000;
                request.CookieContainer = rqcookies;
                request.ContentType = String.Format("multipart/form-data; boundary=---------------------------{0}", timeseparator);
                request.Referer = Refurl;
                //request.KeepAlive = true;
                request.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
                request.AllowWriteStreamBuffering = false;
                request.UserAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0 .NET4.0E)";
                request.ContentLength = requestheadbyte.LongLength + filesectionbyte.LongLength + submitstream.Length;
                request.Headers.Add(HttpRequestHeader.Pragma, "no-cache");
                request.Headers.Add(HttpRequestHeader.CacheControl, "no-cache");
                //request.Headers.Add(HttpRequestHeader.KeepAlive, "true");

                using (var birfilestr = new BinaryReader(submitstream))
                {
                    // 输入文件流数据 
                    byte[] buffer = new Byte[checked((uint)Math.Min(4096, (Int32)submitstream.Length))];

                    submitstream = request.GetRequestStream();//重用变量
                    submitstream.Write(filesectionbyte, 0, filesectionbyte.Length);//文件定义头

                    var size = birfilestr.Read(buffer, 0, buffer.Length);
                    while (size > 0)
                    {
                        submitstream.Write(buffer, 0, size);
                        size = birfilestr.Read(buffer, 0, buffer.Length);
                    }

                    submitstream.Write(requestheadbyte, 0, requestheadbyte.Length);//文件定义尾
                }

                using (var responsestring = new StreamReader(request.GetResponse().GetResponseStream()))
                {
                    url = responsestring.ReadToEnd();
                    //System.Diagnostics.Debug.WriteLine("上传后的字符：");
                    //System.Diagnostics.Debug.WriteLine(url);
                }
            }
            catch (System.ObjectDisposedException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
            }
            catch (System.ArgumentNullException e)
            {
                SimpleLog("空对象错误\r\n", e);
            }
            catch (System.Net.ProtocolViolationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                ++badcount;
            }
            catch (System.Net.NetworkInformation.NetworkInformationException e)
            {
                SimpleLog("获取网络流出错\r\n", e);
                ++badcount;
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
            return url;
        }

        /// <summary>
        /// 获取已有的自定义表情，此方法有内核缓存
        /// </summary>
        /// <returns></returns>
        /// 返回范例
        /// var custom_face={"ret":"0",data:[["06B2EDAD27A395CD9D3B8C6C7BB07965.PNG", 1317118303,142]]};
        public String CustomExpressionList()
        {
            var url = HttpRuntime.Cache.Get("CustomExpressionList") as String;
            if (String.IsNullOrEmpty(url))
            {
                url = "http://web.qq.com/cgi-bin/webqq_app/?cmd=1?vfwebqq={0}&t={1}";
                url = String.Format(url, Vfwebqq, getTime());
                url = CreateRequest(url, String.Empty, false);
                url = url.Substring(url.IndexOf("{"));
                url = url.TrimEnd(';');
                //Dictionary<String, Object> jsonengine = (Dictionary<String, Object>)new JavaScriptSerializer().DeserializeObject(url);            
                //System.Diagnostics.Debug.WriteLine("截取后的字符JSON：");
                //System.Diagnostics.Debug.WriteLine(url);
                //System.Diagnostics.Debug.WriteLine(((Object[])jsonengine["data"]).Length);
                HttpRuntime.Cache.Add("CustomExpressionList", url, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, 5, 0), CacheItemPriority.Normal, null);
            }
            return url;
        }

        /// <summary>
        /// 获取自定义表情图片流，往往在腾讯服务器会返回失败
        /// </summary>
        /// <param name="filename"></param>
        /// <returns></returns>
        public Stream CustomExpression(String filename)
        {
            filename = String.Format("http://web.qq.com/cgi-bin/webqq_app/?cmd=2&bd={0}",filename);
            return CreateRequest(filename,String.Empty);
        }

        /// <summary>
        /// 获取自定义表情格式，未测试
        /// </summary>
        /// <param name="customexpressionfilename">已经上传的文件名</param>
        /// <returns></returns>
        public String CustomExpressionFormatString(params String[] customexpressionfilename)
        {
            //[\"cface\",\"06B2EDAD27A395CD9D3B8C6C7BB07965.PNG\"],[\"cface\",\"F09964AC3A60DF879EA1D4740DFC37EE.GIF\"]
            if (customexpressionfilename.Length == 0)
            {
                return String.Empty;
            }
            var returncustomfacestring = new StringBuilder();

            var customfacelist = CustomExpressionList();//自定义表情列表判断是否存在表情用
            foreach (var customexpressionfilenameitem in customexpressionfilename)
            {
                if (customfacelist.IndexOf(customexpressionfilenameitem) != -1)//在当前列表存在
                {
                    returncustomfacestring.AppendFormat("[\\\"cface\\\",\\\"{0}\\\"],", customexpressionfilenameitem);//"[\"cface\",\"{0}\"],"
                }                
            }
            //System.Diagnostics.Debug.WriteLine("自定义表情串：");
            //System.Diagnostics.Debug.WriteLine(returncustomfacestring);
            //.Replace("\\\",\\\"", String.Empty)
            return returncustomfacestring.ToString().TrimEnd(',');
        }

        /// <summary>
        /// 删除自定义表情
        /// </summary>
        /// <param name="filename"></param>
        /// <returns></returns>
        public Boolean DelCustomExpression(String filename)
        {
            filename = String.Format("http://web.qq.com/cgi-bin/webqq_app/?cmd=12&bd={0}&vfwebqq={1}",filename,Vfwebqq);
            filename = CreateRequest(filename, String.Empty, false);
            return filename.Contains("\"0\"");
        }

        /// <summary>
        /// 获取sig和Key，往往与接收表情文件有关
        /// </summary>
        /// "{\"retcode\":0,\"result\":{\"reply\":0,\"gface_key\":\"\",\"gface_sig\":\"\"}}"
        public Boolean GfaceSigandKey()
        {
            String url = "http://d.web2.qq.com/channel/get_gface_sig2?clientid={0}&psessionid={1}&vfwebqq={2}&t={3}";
            url = String.Format(url, Clientid, Psessionid, Vfwebqq, getTime());
            url = CreateRequest(url, String.Empty, false);
            if (url.Contains("ok"))
            {
                dynamic jsonengine = new JavaScriptSerializer().DeserializeObject(url);

                //System.Diagnostics.Trace.WriteLine(url);
                runinfo[11] = jsonengine["result"]["gface_key"];
                runinfo[12] = jsonengine["result"]["gface_sig"];
                return true;
            }
            return false;
        }
    }
}
