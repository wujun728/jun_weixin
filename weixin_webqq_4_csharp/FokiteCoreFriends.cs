using System;


namespace FokiteQQcore_http://fokite.com/
{`
    /// <summary>
    /// 这个是管理好友分分拆类
    /// </summary>
    public partial class FokiteCore
    {
       //http://cgi.web2.qq.com/cgi/top/get_desk?from=pc&vfwebqq={0} //GET
        /// <summary>
        /// 给指定UIN号码发送QQ消息
        /// </summary>
        /// <param name="uin">目标UIN号码</param>
        /// <param name="msgid">消息ID</param>
        /// <param name="content">发送内容</param>
        /// <param name="fontname">字体名字</param>
        /// <param name="fontsize">字体大小</param>
        /// <param name="fontcolor">字体颜色</param>
        /// <param name="b">是否加粗</param>
        /// <param name="u">是否下划线</param>
        /// <param name="i">是否斜体</param>
        /// <returns></returns>
        public Boolean SendMessage(Object uin, Object msgid, String content, String fontname, Int64 fontsize, String fontcolor, Boolean b, Boolean u, Boolean i)
        {
            if (String.IsNullOrEmpty(content)) { return false; }
            //Console.Write("消息内容:");
            //Console.WriteLine(msg);

            if (!content.StartsWith("\\\"") && !content.EndsWith("\\\"") && !content.StartsWith("["))
            {//匹配非表情开头，非表情结尾（没有在Messaging方法处理过），的普通字符串加引号转义，这里还可以封装下
                content = String.Format("\\\"{0}\\\"", content);
            }

            //msg = HttpUtility.UrlEncode(msg, Encoding.GetEncoding("utf-8"));
            fontname = HttpUtility.UrlEncode(fontname, Encoding.GetEncoding("utf-8"));
            content = HttpUtility.UrlEncode(content, Encoding.GetEncoding("utf-8"));

            //content = String.Format("r=%7B%22to%22%3A{0}%2C%22face%22%3A0%2C%22content%22%3A%22%5B{1}%2C%5B%5C%22font%5C%22%2C%7B%5C%22name%5C%22%3A%5C%22{2}%5C%22%2C%5C%22size%5C%22%3A%5C%22{3}%5C%22%2C%5C%22style%5C%22%3A%5B{4}%2C{5}%2C{6}%5D%2C%5C%22color%5C%22%3A%5C%22{7}%5C%22%7D%5D%5D%22%2C%22msg_id%22%3A{8}%2C%22clientid%22%3A%22{9}%22%2C%22psessionid%22%3A%22{10}%22%7D", uin, content, fontname, fontsize, (b ? 1 : 0), (u ? 1 : 0), (i ? 1 : 0),fontcolor, msgid, Clientid, Ptwebqq);

            content = String.Format("r=%7B%22to%22%3A{0}%2C%22face%22%3A0%2C%22content%22%3A%22%5B{1}%2C%5B%5C%22font%5C%22%2C%7B%5C%22name%5C%22%3A%5C%22{5}%5C%22%2C%5C%22size%5C%22%3A%5C%22{10}%5C%22%2C%5C%22style%5C%22%3A%5B{7}%2C{8}%2C{9}%5D%2C%5C%22color%5C%22%3A%5C%22{6}%5C%22%7D%5D%5D%22%2C%22msg_id%22%3A{2}%2C%22clientid%22%3A%22{3}%22%2C%22psessionid%22%3A%22{4}%22%7D", uin, content, msgid, Clientid, Psessionid, fontname, fontcolor, (b ? 1 : 0), (u ? 1 : 0), (i ? 1 : 0),fontsize);

            //msg = HttpUtility.UrlDecode(msg, Encoding.UTF8);
            //Console.WriteLine(HttpUtility.UrlDecode(postdata, Encoding.UTF8));
            //msg = CreateRequest("http://d.web2.qq.com/channel/send_msg2", msg, true, rqcookies); WEB2.0
            content = CreateRequest("http://d.web2.qq.com/channel/send_buddy_msg2", content, true);
            //Console.Write("消息发送");
            //Console.WriteLine(postdata);
            return content.Contains("retcode\":0") || content.Contains("ok");
        }

        /// <summary>
        /// 获取全部好友信息，好友备注、昵称、分组，有缓存
        /// </summary>
        public Dictionary<String, Object> AllFriends()
        {
            const String KEYNAME = "AllFriends";//当前的缓存KEY
            var resultdictionary = HttpRuntime.Cache.Get(KEYNAME) as Dictionary<String, Object>;

            if (resultdictionary == null)
            {
                String postdata = String.Format("r=%7B%22h%22%3A%22hello%22%2C%22vfwebqq%22%3A%22{0}%22%7D", Vfwebqq);
                //Console.Write("获取全部好友：");
                postdata = CreateRequest("http://s.web2.qq.com/api/get_user_friends2", postdata, true);//变量重用
                //Console.WriteLine(postdata);
                //返回范例：url = "{\"retcode\":0,\"result\":{\"categories\":[{\"index\":1,\"name\":\"名字\"}],\"friends\":[{\"uin\":1973701053,\"categories\":1},{\"uin\":301522366,\"categories\":0},{\"uin\":2841614283,\"categories\":0},{\"uin\":2475211773,\"categories\":0},{\"uin\":828809046,\"categories\":0}],\"info\":[{\"uin\":1973701053,\"nick\":\"\u7A7A\u95F4\u673A\u5668\u4EBA\",\"face\":0,\"flag\":526},{\"uin\":301522366,\"nick\":\"97319419\",\"face\":0,\"flag\":514},{\"uin\":2841614283,\"nick\":\"\u5929\u751F\u4E86\u5929\u6D3E\",\"face\":189,\"flag\":16898},{\"uin\":2475211773,\"nick\":\"\u9A6C\u9A6C\u9A6C\u5A77\",\"face\":540,\"flag\":514},{\"uin\":828809046,\"nick\":\"\u8046\u549A\u535F\u52A8\",\"face\":81,\"flag\":514}],\"marknames\":[{\"uin\":2841614283,\"markname\":\"DHA\"}]}}";

                if (!postdata.Contains("\"retcode\":0"))
                {
                    //Console.Write("没有获取到");
                    ++badcount;
                    return null;
                }
                postdata = new StringBuilder(postdata)//转码
                    .Replace("\"sort\":", "\"sort\":999")//把有可能与分组编号相同的替换成不同的
                    .Replace("\"is_vip\":0", "\"is_vip\":\"false\"")
                    .Replace("\"is_vip\":1", "\"is_vip\":\"true\"")
                    .ToString();                

                //为了降低圈可复杂度，采取原生写法，貌似效率高了毫秒级别，但是全局变量的开销又使之总体持平
                resultdictionary = (Dictionary<String, Object>)new JavaScriptSerializer().DeserializeObject(postdata);
                resultdictionary = (Dictionary<String, Object>)resultdictionary["result"];
                HttpRuntime.Cache.Insert(KEYNAME, resultdictionary, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(30), CacheItemPriority.Normal, null);
            }
            return resultdictionary;
        }

        //this.friendsinfo = (Object[])allfriendsdic["info"];//好友昵称、头像等
        //this.friendsgropid = (Object[])allfriendsdic["friends"];//好友分组ID
        //this.friendsgroup = (Object[])allfriendsdic["categories"];//好友分组，为0是我的好友分组
        //this.friendsmarkname = (Object[])allfriendsdic["marknames"];//好友备注名

        /// <summary>
        /// 获取该UIN是否是VIP
        /// </summary>
        /// <param name="uin"></param>
        /// <returns></returns>
        public Boolean FriendsIsVip(Object uin)
        {
            var friendsisvip = AllFriends()["vipinfo"] as Object[];
            if (friendsisvip == null)
            {
                return false;
            }
            return Convert.ToBoolean(dictionaryValue(friendsisvip, uin, "is_vip"));
        }

        /// <summary>
        /// 获取改UIN的会员等级
        /// </summary>
        /// <param name="uin"></param>
        /// <returns></returns>
        public Int64 FriendsVipLevel(Object uin)
        {
            var friendsisvip = AllFriends()["vipinfo"] as Object[];
            if (friendsisvip == null)
            {
                return 0;
            }
            return Convert.ToInt64(dictionaryValue(friendsisvip, uin, "vip_level"));
        }

        /// <summary>
        /// 根据UIN获取该QQ的备注名
        /// </summary>
        /// <param name="uin">uin号码</param>
        /// <returns></returns>
        public Object FriendsMakeName(Object uin)
        {
            var friendsmarknames = AllFriends()["marknames"] as Object[];
            if (friendsmarknames == null)
            {
                return null;
            }
            return dictionaryValue(friendsmarknames, uin, "markname");
        }

        /// <summary>
        /// 根据UIN获取该QQ的昵称
        /// </summary>
        /// <param name="uin">uin号码</param>
        /// <returns></returns>
        public Object FriendsNick(Object uin)
        {
            var friendsmarknames = AllFriends()["info"] as Object[];
            if (friendsmarknames == null)
            {
                return null;
            }
            return dictionaryValue(friendsmarknames, uin, "nick");
        }

        /// <summary>
        /// 获取UIN号码所属分组的ID号
        /// </summary>
        /// <param name="uin">UIN号码</param>
        /// <returns>分组ID号码</returns>
        public Int64 FriendsGroupId(Object uin)
        {
            var friends = AllFriends()["friends"] as Object[];
            if (friends == null)
            {
                return 0;
            }
            return Convert.ToInt64(dictionaryValue(friends, uin, "categories"));
        }

        /// <summary>
        /// 获取某个UIN对应的好友分组名
        /// </summary>
        /// <param name="uin">UIN号码</param>
        /// <returns>即时失败也会返回“我的好友”</returns>
        public String FriendsGroupName(Int64 uin)
        {
            return GetGroupName(FriendsGroupId(uin)).ToString();
        }

        /// <summary>
        /// 获取某个组ID的好友分组名
        /// </summary>
        /// <param name="id">组ID号码</param>
        /// <returns></returns>
        public String GetGroupName(Object id)
        {
            var friendname = AllFriends()["categories"] as Object[];
            if (friendname == null)
            {
                return "我的好友";
            }
            return dictionaryValue(friendname, id, "name").ToString();
        }

        /// <summary>
        /// 获取在线好友，不包含隐身
        /// </summary>
        /// <returns>        
        /// <example> 
        /// 获取某个UIN的，status，online，client_type
        /// <code>
        ///foreach (var item in GetOnlineFries())
        ///{
        /// item["uin"];
        ///}
        /// </code>
        /// </example></returns>
        /**返回成功范例
        * var url = "{\"retcode\":0,\"result\":[{\"uin\":1819691728,\"status\":\"online\",\"client_type\":1},{\"uin\":204965818,\"status\":\"online\",\"client_type\":1},{\"uin\":1835595440,\"status\":\"online\",\"client_type\":1}]}";
        **/
        public Object[] GetOnlineFriends()
        {
            String url = String.Format("http://d.web2.qq.com/channel/get_online_buddies2?clientid={0}&psessionid={1}&t={2}&vfwebqq={3}", Clientid, Psessionid, getTime(DateTime.Now), Vfwebqq);
            //Console.Write("获取全部好友：");
            using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
            {
                url = sre.ReadToEnd();
                //Console.WriteLine(url);
                if (!url.Contains("retcode\":0")) { return null; }
                Dictionary<String, Object> jsonengine = (Dictionary<String, Object>)new JavaScriptSerializer().DeserializeObject(url);
                return jsonengine["result"] as Object[];
            }
        }
        
        /// <summary>
        /// GUIN相互转换，可以转换群，有缓存
        /// </summary>
        /// <param name="guin">Gin号码或UIN号码</param>
        /// <param name="grouptypes">是否是群ID</param>
        /// <returns>UIN对应的号码</returns>
        public String Uin2QQnumber(Object guin, Boolean grouptypes)
        {
            String url = HttpRuntime.Cache.Get(guin.ToString()) as String;
            if (String.IsNullOrEmpty(url))
            {
                url = String.Format("http://s.web2.qq.com/api/get_friend_uin2?tuin={0}&verifysession=&type={1}&code=&vfwebqq={2}&t={3}", guin, grouptypes ? 2 : 4, Vfwebqq, getTime(DateTime.Now));
                using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
                {
                    url = sre.ReadToEnd();//变量重用
                    //Console.Write("获取真实QQ号码：");
                    //Console.WriteLine(url);
                    if (!url.Contains("\"retcode\":0")) { return String.Empty; }
                    dynamic jsonengine = new JavaScriptSerializer().DeserializeObject(url);
                    //Console.WriteLine(@jsonengine["result"]["account"]);
                    url = jsonengine["result"]["account"].ToString();
                    HttpRuntime.Cache.Insert(guin.ToString(), url, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, 120, 0), CacheItemPriority.Normal, null);
                    //System.Diagnostics.Trace.WriteLine(uin);
                }
            }
            return url;
        }
        
        /// <summary>
        /// 获取指定QQUIN等级信息，有缓存
        /// </summary>
        /// <param name="uin">UIN号码</param>
        /// <returns>返回如下键 hours、days、level、remainDays</returns>
        /**
         * 成功返回的范例
         * {"retcode":0,"result":{"tuin":2523767139,"hours":9542,"days":1612,"level":38,"remainDays":65}}
         **/
        public Dictionary<String, Object> Levenlinfo(Object uin)
        {
            String keyname = String.Format("{0}Levenlinfo", uin);//拼当前的缓存KEY
            var resultdictionary = HttpRuntime.Cache.Get(keyname) as Dictionary<String, Object>; 
            if(resultdictionary == null){//获取不到
                var url = String.Format("http://s.web2.qq.com/api/get_qq_level2?tuin={0}&vfwebqq={1}&t={2}", uin, Vfwebqq, getTime(DateTime.Now));
                using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
                {
                    url = sre.ReadToEnd();
                    if (!url.Contains("\"retcode\":0"))
                    {
                        ++badcount;
                        return null;
                    }
                    uin = new JavaScriptSerializer().DeserializeObject(url);//变量重用
                    resultdictionary = (Dictionary<String, Object>)uin;
                    resultdictionary = (Dictionary<String, Object>)resultdictionary["result"];
                    // jsonengine["result"];
                    HttpRuntime.Cache.Insert(keyname, resultdictionary, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, 30, 0), CacheItemPriority.Normal, null);
                }
            }
            return resultdictionary;
        }

        /// <summary>
        /// 获取好友信息，获取非好友可能需要验证码，有缓存
        /// </summary>
        /// <param name="uin">当前好友的UIN</param>
        /// <returns></returns>
        public Dictionary<String, Object> GetFriendsInfo(Object uin)
        {
            var keyname = String.Format("{0}FriendsInfo", uin);
            var resultdictionary = HttpRuntime.Cache.Get(keyname) as Dictionary<String, Object>;

            if (resultdictionary == null)
            {
                var url = String.Format("http://s.web2.qq.com/api/get_friend_info2?tuin={0}&verifysession=&code=&vfwebqq={1}&t={2}", uin, Vfwebqq, getTime(DateTime.Now));

                using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
                {
                    url = new StringBuilder().Append(sre.ReadToEnd()).ToString();
                    //Console.Write("好友信息JSON：");
                    //Console.WriteLine(url);
                    uin = new JavaScriptSerializer().DeserializeObject(url); //变量重用
                    resultdictionary = (Dictionary<String, Object>)uin;
                    resultdictionary = (Dictionary<String, Object>)resultdictionary["result"];
                    //Console.WriteLine(qqfriendsinfodic.GetType());
                    //qqfriendsinfodic.Remove("birthday");
                    //qqfriendsinfodic.Add("birthday", String.Format("{0}年{1}月{2}日", qqfriendsinfodic["birthday"]["year"], qqfriendsinfodic["birthday"]["month"], qqfriendsinfodic["birthday"]["day"]));
                    //qqfriendsinfodic["birthday"] = String.Format("{0}年{1}月{2}日", qqfriendsinfodic["birthday"]["year"], qqfriendsinfodic["birthday"]["month"], qqfriendsinfodic["birthday"]["day"]);
                    HttpRuntime.Cache.Insert(keyname, resultdictionary, null, Cache.NoAbsoluteExpiration, new TimeSpan(0, 30, 0), CacheItemPriority.Normal, null);
                }
            }
            return resultdictionary;
        }

        /// <summary>
        /// 发送正在输入消息
        /// </summary>
        /// <param name="uin"></param>
        /// <returns></returns>
        public Boolean InputNotify(String uin)
        {
            uin = String.Format("http://d.web2.qq.com/channel/input_notify2?to_uin={0}&clientid={1}&psessionid={2}",uin,Clientid,Psessionid);
            uin = CreateRequest(uin, String.Empty, false);
            return uin.Contains("ok");
        }
        
        /// <summary>
        /// 拒绝添加好友请求
        /// </summary>
        /// <param name="requestqqnum">QQ号码</param>
        /// <param name="denymessage">拒绝内容</param>
        /// <returns>是否成功</returns>
        public Boolean DenyAddFriends(String requestqqnum, String denymessage)
        {            
            // 发送范例 r={"account":{0},"msg":"{1}","vfwebqq":"{2}"}
            //if (String.IsNullOrEmpty(denymessage)) { return false; }
            requestqqnum = String.Format("r=%7B%22account%22%3A{0}%2C%22msg%22%3A%22{1}%22%2C%22vfwebqq%22%3A%22{2}%22%7D", requestqqnum, HttpUtility.UrlEncode(denymessage, Encoding.GetEncoding("utf-8")), Vfwebqq);
            requestqqnum = CreateRequest("http://s.web2.qq.com/api/deny_added_request2", requestqqnum, true);
            //Console.Write("返回");
            //Console.WriteLine(SignatureContent);
            return requestqqnum.Contains("retcode\":0");
        }

        /// <summary>
        /// 通过并添加好友，需要再次调用获取好友UIN方法
        /// </summary>
        /// <param name="tuin">请求的QQ号码</param>
        /// <param name="gid">好友分组，0</param>
        /// <param name="mname">好友备注名</param>
        /// <returns></returns>
        public Boolean PassFriendsRequestAdd(String tuin, String mname, Int64 gid)
        {
            // 发送范例 r={"account":{0},"gid":{1},"mname":"{2}","vfwebqq":"{3}"}
            //if (gid == null) { gid = 0; }
            tuin = String.Format("r=%7B%22account%22%3A{0}%2C%22gid%22%3A{1}%2C%22mname%22%3A%22{2}%22%2C%22vfwebqq%22%3A%22{3}%22%7D", tuin, gid, HttpUtility.UrlEncode(mname, Encoding.GetEncoding("utf-8")), Vfwebqq);
            tuin = CreateRequest("http://s.web2.qq.com/api/allow_and_add2", tuin, true);
            //Console.Write("返回");
            //Console.WriteLine(SignatureContent);
            //dynamic jsonengine = new System.Web.Script.Serialization.JavaScriptSerializer().DeserializeObject(tuin);
            return tuin.Contains("retcode\":0");
        }

        /// <summary>
        /// 仅仅通过请求，不添加好友，需要再次调用获取好友UIN方法
        /// </summary>
        /// <param name="tuin">请求的QQ</param>
        /// <returns></returns>
        public Boolean PassFriendsRequest(String tuin)
        {
            // 发送范例 r={"account":{0},"gid":{1},"mname":"{2}","vfwebqq":"{3}"}
            //if (gid == null) { gid = 0; }
            tuin = String.Format("r=%7B%22account%22%3A{0}%2C%22vfwebqq%22%3A%22{1}%22%7D", tuin, Vfwebqq);
            tuin = CreateRequest("http://s.web2.qq.com/api/allow_added_request2", tuin, true);
            //Console.Write("返回");
            //Console.WriteLine(SignatureContent);
            return tuin.Contains("retcode\":0");
        }

        /// <summary>
        /// 删除好友
        /// </summary>
        /// <param name="uin">要删除的UIN</param>
        /// <param name="delsideotherlist">是否从对方好友中删除自己</param>
        /// <returns></returns>
        public Boolean DelFriends(String uin,Boolean delsideotherlist)
        {//POST
            uin = String.Format("?tuin={0}&delType={1}&vfwebqq={2}",uin,(delsideotherlist ? 2 : 1),Vfwebqq);
            uin = CreateRequest("http://s.web2.qq.com/api/delete_friend", uin, true);
            return uin.Contains(":0");
        }

        /// <summary>
        /// 修改好友备注
        /// </summary>
        /// <param name="uin">要修改的UIN</param>
        /// <param name="newmarkname">新的备注名</param>
        /// <returns></returns>
        public Boolean ChangeMarkName(Object uin,String newmarkname)
        {
            //?markname=%E8%94%A1%E7%BB%B4%E9%B9%8F1&tuin=3914934187&vfwebqq=9b262a4ed3b590fd5f71340a7ee686c1229b930b2a92e1c063c7a946913f497f5895e75d8410bfad
            newmarkname = HttpUtility.UrlEncode(newmarkname,Encoding.UTF8);
            newmarkname = String.Format("markname={0}&tuin={1}&vfwebqq={2}",newmarkname,uin,Vfwebqq);
            newmarkname = CreateRequest("http://s.web2.qq.com/api/change_mark_name2", newmarkname, true);
            return newmarkname.Contains(":0");
        }

        /// <summary>
        /// 拒绝接收好友发来的文件
        /// </summary>
        /// <param name="uin">UIN号码</param>
        /// <param name="sessionlcid">文件Session编号</param>
        /// <returns>是否成功</returns>
        public Boolean Refusereceivefile(Object uin, Object sessionlcid)
        {
            String url = String.Format("http://d.web2.qq.com/channel/refuse_file2?to={0}&lcid={1}&clientid={2}&psessionid={3}&t={4}", uin, sessionlcid, Clientid, Psessionid, getTime());
            return CreateRequest(url, String.Empty, false).Contains("retcode\":0");
        }

        /// <summary>
        /// 获取加群或者加好友的验证码
        /// </summary>
        /// <returns></returns>
        public Stream VcodeStream()
        {
            var url = "http://captcha.qq.com/getimage?aid=1003901";
            return CreateRequest(url,String.Empty);
        }

        /// <summary>
        /// 查找QQ，需要输入验证码，请注意Vcode属性的设置和VcodeStream的调用
        /// </summary>
        /// <param name="qqnumber"></param>
        /// <returns></returns>
        public Dictionary<String, Object> SearchQQ(String qqnumber)
        {//get
            qqnumber = String.Format("http://s.web2.qq.com/api/search_qq_by_uin2?tuin={0}&verifysession={1}&code={2}&vfwebqq={3}&t={4}",qqnumber,Verifysession,Vcode,Vfwebqq,getTime());
            qqnumber = CreateRequest(qqnumber, String.Empty,false);
            if (!qqnumber.Contains(":0"))
            {
                return null;
            }

            var result = (Dictionary<String, Object>)new JavaScriptSerializer().DeserializeObject(qqnumber);
            result = (Dictionary<String, Object>)result["result"];
            HttpRuntime.Cache.Insert(qqnumber, result["token"], null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(3), CacheItemPriority.Normal, null);
            return result;
        }

        /// <summary>
        /// 添加QQ好友，必须依次完成VcodeStream、Vcode、SearchQQ的调用或设置才能成功
        /// </summary>
        /// <param name="qqnumber">要添加的QQ号码</param>
        /// <param name="mname">备注名称</param>
        /// <param name="groupid">添加到分组ID</param>
        /// <returns></returns>
        public Boolean AddFriends(String qqnumber, String mname, Int16 groupid)
        {
            var token = HttpRuntime.Cache.Get(qqnumber) as String;
            if (!String.IsNullOrEmpty(token))
            {
                //{"account":17008888,"myallow":1,"groupid":0,"mname":"马化腾","token":"9bd2771e072f288660638ed51daa5250854f5315bca7bfb4","vfwebqq":"9b262a4ed3b590fd5f71340a7ee686c1229b930b2a92e1c063c7a946913f497f5895e75d8410bfad"}//URLDECODE
                var postserializer = new {
                    account = qqnumber,
                    myallow = 1,
                    groupid = groupid,
                    mname = mname,
                    token = token,
                    vfwebqq = Vfwebqq
                };
                var result = new JavaScriptSerializer();

                token = new StringBuilder("r=").Append(HttpUtility.UrlEncode(result.Serialize(postserializer))).ToString();
                token = CreateRequest("http://s.web2.qq.com/api/add_no_verify2", token, true);
                if (token.Contains(qqnumber))
                {
                    HttpRuntime.Cache.Remove(qqnumber);//移除token
                    HttpRuntime.Cache.Remove("AllFriends");//移除所有好友缓存
                    var resultdic = (Dictionary<String,Object>)result.DeserializeObject(token);
                    resultdic = (Dictionary<String, Object>)resultdic["result"];
                    HttpRuntime.Cache.Insert(resultdic["tuin"].ToString(), qqnumber, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(120), CacheItemPriority.Normal, null);//添加UIN转QQ缓存
                    return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 获取指定好友UIN的头像流
        /// </summary>
        /// <param name="uin">好友的UIN</param>
        /// <returns></returns>
        public Stream GetFace(Object uin)
        {
            String[] faceurl = { "http://face1.qun.qq.com/", "http://face2.qun.qq.com/", "http://face3.qun.qq.com/", "http://face4.qun.qq.com/", "http://face5.qun.qq.com/", "http://face6.qun.qq.com/", "http://face7.qun.qq.com/", "http://face8.qun.qq.com/", "http://face9.qun.qq.com/", "http://face10.qun.qq.com/" };

            String url = String.Format("{0}cgi/svr/face/getface?cache=0&type=1&fid=0&uin={1}&vfwebqq={2}", faceurl[Convert.ToInt64(String.IsNullOrEmpty(uin.ToString()) ? 0 : uin) % 10], uin, Vfwebqq);

            return CreateRequest(url, String.Empty);

            //try
            //{
            //    
            //}
            //catch (System.OverflowException e)
            //{
            //    return new MemoryStream(Encoding.ASCII.GetBytes(e.ToString()));
            //}
            //catch (System.FormatException e)
            //{
            //    return new MemoryStream(Encoding.ASCII.GetBytes(e.ToString()));
            //}
            //catch (System.InvalidCastException e)
            //{
            //    return new MemoryStream(Encoding.ASCII.GetBytes(e.ToString()));
            //}
        }
    }
}
