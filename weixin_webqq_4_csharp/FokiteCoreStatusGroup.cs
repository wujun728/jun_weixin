using System;


namespace FokiteQQcore_http://fokite.com/
{
    public partial class FokiteCore
    {
        /// <summary>
        /// 更改群消息接收方式
        /// </summary>
        /// <param name="changetype">需要更改的类型 123 </param>
        /// <param name="gid">需要更改的群gid号码，和改变群的布尔状态</param>
        /// <returns></returns>
        public Boolean ChangeGroupMessage(Int32 changetype, Dictionary<Int64,Boolean> gid)
        {   
            if(changetype < 1 || changetype > 3){
                return false;
            }
            var postdataclass = new
            {
                groupmask = new
                    {
                        cAll = changetype,
                        idx = Index,
                        port = Port
                    }
            };//匿名类序列化成JSON字符串
            var gcode = new StringBuilder(new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(postdataclass));
            gcode.Remove(gcode.Length - 2, 2);
            foreach (var item in gid)
            {
                gcode.AppendFormat(",\"{0}\":\"{1}\"", item.Key, Convert.ToInt16(item.Value));
            }
            gcode.Append("}}");

            var postdata = HttpUtility.UrlEncode(gcode.ToString(), Encoding.UTF8);
            postdata = String.Format("app=EQQ&itemlist={0}&retype={1}&vfwebqq={2}",postdata,changetype,Vfwebqq);
            //Console.WriteLine(postdata);
            using (var str = new StreamReader(CreateRequest("http://cgi.web2.qq.com/keycgi/qqweb/uac/messagefilter.do",postdata)))
            {
                return str.ToString().Contains(":0");
            }            
            //Console.WriteLine(url);

            //范例
            //{"groupmask":{"cAll":2,"idx":1075,"port":55702,"4179558504":"0",……}}
            //call 123 idx 是index属性 port port属性 必须是所有群GID号码 ，0是屏蔽，1是打开
        }

        /// <summary>
        /// 获取某个群当前QQ的群名片
        /// </summary>
        /// <param name="gcode"></param>
        /// <returns></returns>
        public Dictionary<String, Object> GroupCarte(Object gcode)
        {
            var url = "http://s.web2.qq.com/api/get_self_business_card2?gcode={0}&vfwebqq={1}&t={2}";
            url = String.Format(url, gcode, Vfwebqq, getTime(DateTime.Now));//GET
            using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
            {
                url = sre.ReadToEnd();
                dynamic jsonengine = new JavaScriptSerializer().DeserializeObject(url);
                return jsonengine["result"];
            }
        }

        /// <summary>
        /// 更改指定群群名片
        /// </summary>
        /// <param name="gcode">群Gcode号码</param>
        /// <param name="gender">性别，真女人，假小子</param>
        /// <param name="phone">手机</param>
        /// <param name="email">邮件</param>
        /// <param name="remark">群中名字</param>
        /// <returns></returns>
        public Boolean ChangeGroupCarte(Object gcode, Boolean gender, Int64 phone, String email, String remark)
        {
            var postdata = "{0}\"gcode\":{1},\"gender\":\"{2}\",\"phone\":\"{3}\",\"email\":\"{4}\",\"remark\":\"{5}\",\"vfwebqq\":\"{6}\"{7}";
            postdata = String.Format(postdata, "{", gcode, Convert.ToInt32(gender), phone, email, remark, Vfwebqq, "}");
            postdata = HttpUtility.UrlEncode(postdata, Encoding.UTF8);
            postdata = String.Format("r={0}", postdata);
            using (var sre = new StreamReader( CreateRequest("http://s.web2.qq.com/api/update_group_business_card2", postdata) ) )
            {
                postdata = sre.ReadToEnd();
                return postdata.Contains(":0");
            }
        }

        /// <summary>
        /// 改变QQ状态，不要尝试更改为下线，如需下线请调用方法
        /// </summary>
        /// <param name="qqstaus">在线状态描述</param>
        /// <returns>返回是否成功</returns>
        public Boolean ChangerStatus(Object qqstaus)
        {
            if(!Enum.IsDefined(typeof(QQstatus),qqstaus)){
                return false;
            }
            return ChangerStatus((QQstatus)Enum.Parse(typeof(QQstatus), qqstaus.ToString(), true));
        }

        /// <summary>
        /// 改变QQ状态
        /// </summary>
        /// <param name="qqstaus">在线状态枚举</param>
        /// <returns>更改是否成功</returns>
        public Boolean ChangerStatus(QQstatus qqstaus)
        {
            using (var sre = new StreamReader(CreateRequest(String.Format("http://d.web2.qq.com/channel/change_status2?newstatus={0}&clientid={1}&psessionid={2}&t={3}&vfwebqq={4}", qqstaus.ToString().ToLower(), Clientid, Psessionid, getTime(DateTime.Now), Vfwebqq), String.Empty)))
            {
                return sre.ReadToEnd().Contains("ok");
            }
        }
    }
}
