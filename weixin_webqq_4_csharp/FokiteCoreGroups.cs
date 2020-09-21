using System;


namespace FokiteQQcore_http://fokite.com/
{
    public partial class FokiteCore
    {
        ///// <summary>
        ///// 发送群消息，
        ///// </summary>
        ///// <param name="groupuin">群UIN</param>
        ///// <param name="text">消息内容</param>
        ///// <param name="messagecount">消息计数</param>
        ///// <returns></returns>
        //public Boolean SendGroupMsg(String groupuin, String text, String messagecount)
        //{
        //    String postdata = String.Format("r=%7B%22group_uin%22%3A{0}%2C%22content%22%3A%22%5B%5C%22{1}%5C%22%2C%5B%5C%22font%5C%22%2C%7B%5C%22name%5C%22%3A%5C%22%E5%AE%8B%E4%BD%93%5C%22%2C%5C%22size%5C%22%3A%5C%2210%5C%22%2C%5C%22style%5C%22%3A%5B0%2C0%2C0%5D%2C%5C%22color%5C%22%3A%5C%22000000%5C%22%7D%5D%5D%22%2C%22msg_id%22%3A{2}%2C%22clientid%22%3A%22{3}%22%2C%22psessionid%22%3A%22{4}%22%7D", groupuin, HttpUtility.UrlEncode(text, Encoding.GetEncoding("utf-8")), (Int64.Parse(messagecount) + 21), Clientid, Psessionid);
        //    var sre = CreateRequest("http://d.web2.qq.com/channel/send_group_msg2", postdata, true);
        //    //Console.Write("群消息：");
        //    //Console.WriteLine(sre);
        //    return sre.Contains("\"retcode\":0");
        //}

        /// <summary>
        /// 发送群消息
        /// </summary>
        /// <param name="guin">群uin</param>
        /// <param name="msgid">消息ID</param>
        /// <param name="content">发送内容</param>
        /// <param name="fontname">字体名字</param>
        /// <param name="fontsize">字体大小</param>
        /// <param name="fontcolor">字体颜色</param>
        /// <param name="b">是否加粗</param>
        /// <param name="u">是否下划线</param>
        /// <param name="i">是否斜体</param>
        /// <returns></returns>
        public Boolean SendGroupMessage(Object guin, Object msgid,String content,String fontname, Int64 fontsize,String fontcolor, Boolean b, Boolean u, Boolean i)
        {
            #region 序列化类
            /***
            var postclass = new
                 {
                     group_uin = guin,
                     content = new Object[]{
                            "内容",
                            new Object[]{ 
                                "font",
                                new {
                                    name = fontname,
                                    size = fontsize,
                                    style = new int32[]{
                                        //Convert.ToInt16(b),
                                        //Convert.ToInt16(u),
                                        b?1:0,
                                        u?1:0,
                                        i?1:0
                                    },
                                    color = fontcolor
                                }
                            }
                        },
                     msg_id = 16050007,
                     clientid = Clientid,
                     psessionid = Psessionid
                 }; 
             ***/
            #endregion

            //{"group_uin":2377934933,"content":"[\"123\",[\"font\",{\"name\":\"宋体\",\"size\":\"10\",\"style\":[0,0,0],\"color\":\"000000"}]]","msg_id":76580002,"clientid":"40658494","psessionid":"psessionid"}&clientid=40658494&psessionid=psessionid

            if (content == null || fontcolor.Length < 6) { return false; }//16进制RGB所以要有6个
            //Console.Write("消息内容:");
            //Console.WriteLine(msg);

            if (!content.StartsWith("\\\"") && !content.EndsWith("\\\"") && !content.StartsWith("["))
            {//匹配非表情开头，非表情结尾（没有在Messaging方法处理过），的普通字符串加引号转义，这里还可以封装下
                content = String.Format("\\\"{0}\\\"", content);
            }

            content = HttpUtility.UrlEncode(content, Encoding.GetEncoding("utf-8"));
            fontname = HttpUtility.UrlEncode(fontname, Encoding.GetEncoding("utf-8"));

            var url = String.Format("r=%7B%22group_uin%22%3A{0}%2C%22content%22%3A%22%5B{3}%2C%5B%5C%22font%5C%22%2C%7B%5C%22name%5C%22%3A%5C%22{4}%5C%22%2C%5C%22size%5C%22%3A%5C%22{9}%5C%22%2C%5C%22style%5C%22%3A%5B{5}%2C{6}%2C{7}%5D%2C%5C%22color%5C%22%3A%5C%22{8}%5C%22%7D%5D%5D%22%2C%22msg_id%22%3A{10}%2C%22clientid%22%3A%22{1}%22%2C%22psessionid%22%3A%22{2}%22%7D&clientid={1}&psessionid={2}", guin, Clientid, Psessionid, content, fontname, (b ? 1 : 0), (u ? 1 : 0), (i ? 1 : 0), fontcolor, fontsize, Convert.ToInt32(msgid)+1);
            url = CreateRequest("http://d.web2.qq.com/channel/send_qun_msg2", url, true);
            return url.Contains("\"retcode\":0");
        }

        /// <summary>
        /// 获取群列表，包含群备注，群GID号码，群名字等，该方法有缓存
        /// </summary>
        /// 成功返回示例
        /// <returns></returns>
        /// {"retcode":0,"result":{"gnamelist":[{"gid":2207502912,"code":3498779700,"flag":17825793,"name":"群名字unicode编码"},{"gid":4038215591,"code":2525388998,"flag":17825793,"name":"\u6B64\u7FA4\u51FA\u552E"},{"gid":877411004,"code":3121055762,"flag":17825793,"name":"\u6B64\u7FA4\u51FA\u552E"},{"gid":4169871056,"code":167938484,"flag":17825793,"name":"\u6B64\u7FA4\u51FA\u552E"},{"gid":2386686198,"code":168918136,"flag":51381265,"name":"GroupName(D\u7EC4)"},{"gid":1755354542,"code":3209893333,"flag":16778257,"name":"GroupName(C\u7EC4)"}],"gmasklist":[{"gid":1000,"mask":0}],"gmarklist":[]}}
        public Dictionary<String, Object> AllGroups()
        {
            const String KEYNAME = "AllGroups";//当前的缓存KEY
            var resultdictionary = HttpRuntime.Cache.Get(KEYNAME) as Dictionary<String, Object>;
            
            if (resultdictionary == null)
            {
                var rs = CreateRequest("http://s.web2.qq.com/api/get_group_name_list_mask2", String.Format("r=%7B%22vfwebqq%22%3A%22{0}%22%7D", Vfwebqq), true);
                if (!rs.Contains("\"retcode\":0"))
                {
                    ++badcount;
                    return null;
                }
                resultdictionary = (Dictionary<String, Object>)new JavaScriptSerializer().DeserializeObject(rs);
                resultdictionary = (Dictionary<String, Object>)resultdictionary["result"];
                //this.groupname = (Object[])jsonengine["gnamelist"];
                HttpRuntime.Cache.Insert(KEYNAME, resultdictionary, null, Cache.NoAbsoluteExpiration, TimeSpan.FromMinutes(30),CacheItemPriority.Normal, null);
            }
            return resultdictionary;
        }

        /// <summary>
        /// 获取所有群通知
        /// <param name="gcode">群号码，默认为全部</param>
        /// </summary>
        public Object[] AllGroupNotice(params Object[] gcode){//get
            //URL GET 请求原型
            //http://s.web2.qq.com/api/get_group_info?gcode=%5B{0}%5D&retainKey=memo%2cgcode&vfwebqq={1}&t={2}
            var url = new StringBuilder("http://s.web2.qq.com/api/get_group_info?gcode=%5B");
            var resultdic = new Dictionary<String, Object>(0);
            var resultstring = String.Empty;
            //{0,1,2} = urldecode 的URL
            if(gcode.LongLength == 0){
                gcode = (Object[])AllGroups()["gnamelist"];                
                foreach (Dictionary<String, Object> itemgcode in gcode)
                {
                    url.Append(itemgcode["code"]).Append("%2C");
                }
                
                //Console.WriteLine("长度是：{0}", url.Length);
                //Console.WriteLine(url);
                url.Remove(url.Length - 3, 3);//去最后多出的%2c
                //Console.WriteLine("长度是：{0}", url.Length);
                //Console.WriteLine(url);
            }else{
                url.Append(String.Join("%2C", gcode));
            }
            url.AppendFormat("%5D&retainKey=memo%2cgcode&vfwebqq={0}&t={1}",Vfwebqq,getTime());//加其余参数闭合
            resultstring = CreateRequest(url.ToString(), String.Empty, false);

            if (resultstring.Contains(":0"))
            {
                url.Clear();//重用
                url.Append(resultstring);//转码
                resultstring = url.ToString();

                resultdic = (Dictionary<String, Object>)new JavaScriptSerializer().DeserializeObject(resultstring);
                return (Object[])resultdic["result"];
            }
            else
            {
                return new Object[0];
            }
        }

        /// <summary>
        /// 获取指定群具体信息，群内用户列表
        /// <param name="gcode">群Gcode号码</param>
        /// <returns>
        /// <example>
        /// <code>
        /// [gid, ]
        /// [code, ]
        /// [flag, ]
        /// [owner, ]
        /// [option, ]
        /// [createtime, ]
        /// [class, ]
        /// [name, 群名字]
        /// [level, 0]
        /// [face, 0]
        /// [memo, ]
        /// [fingermemo, ]
        /// [members, System.Object[
        ///     System.Collections.Generic.Dictionary`2[System.String,System.Object]
        ///     System.Collections.Generic.Dictionary`2[System.String,System.Object]
        ///     System.Collections.Generic.Dictionary`2[System.String,System.Object]
        /// ]]
        /// [markname, ]
        /// </code>
        /// </example>
        /// </returns>
        /// </summary>
        /// 返回示例
        /// {"retcode":0,"result":{"ginfo":{"gid":1038308825,"code":3474837227,"flag":17825793,"owner":2180435433,"option":2,"createtime":1065845796,"class":193,"name":"\u6B64\u7FA4\u51FA\u552E","level":0,"face":0,"memo":"","fingermemo":"","members":[{"muin":263999916,"mflag":0},{"muin":2180435433,"mflag":8},{"muin":2961665540,"mflag":1}],"markname":""},"minfo":[{"uin":263999916,"nick":"\u5929\u751F\u4E86\u5929\u6D3E"},{"uin":2180435433,"nick":"\u9A6C\u9A6C\u9A6C\u5A77"},{"uin":2961665540,"nick":"\u8046\u549A\u535F\u52A8"}],"stats":[{"uin":263999916,"stat":10,"client_type":41},{"uin":2180435433,"stat":10,"client_type":1},{"uin":2961665540,"stat":10,"client_type":41}],"cards":[]}}
        public Dictionary<String, Object> GroupsUserInfo(Object gcode)
        {
            String url = String.Format("http://s.web2.qq.com/api/get_group_info_ext2?gcode={0}&vfwebqq={1}&t={2}", gcode, Vfwebqq, getTime(DateTime.Now));
            using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
            {
                url = sre.ReadToEnd();
                if (!url.Contains("\"retcode\":0"))
                {
                    ++badcount;
                    return null;
                }
                Object jsonengine = new JavaScriptSerializer().DeserializeObject(url);
                Dictionary<String, Object> dics = (Dictionary<String, Object>)jsonengine;

                return (Dictionary<String, Object>)dics["result"];
            }
        }
        
        /// <summary>
        /// 退出某个群
        /// </summary>
        /// <param name="gcode">退出群的Gcode号码</param>
        /// <returns>是否成功</returns>
        public Boolean ExitGroup(String gcode)
        {
            if (String.IsNullOrEmpty(gcode)) { return false; }
            gcode = String.Format("r=%7B%22gcode%22%3A%22{0}%22%2C%22vfwebqq%22%3A%22{1}%22%7D", HttpUtility.UrlEncode(gcode, Encoding.GetEncoding("utf-8")), Vfwebqq);
            gcode = CreateRequest("http://s.web2.qq.com/api/quit_group2", gcode, true);
            //Console.Write("返回");
            //Console.WriteLine(SignatureContent);
            return gcode.Contains("retcode\":0");
        }
    }
}
