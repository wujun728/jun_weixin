using System;


namespace FokiteQQcore_http://fokite.com/
{
    public partial class FokiteCore
    {
        /// <summary>
        /// 获取最近联系人
        /// </summary>
        public Dictionary<String, Object> RecentContact()
        {
            var postdata = "{0}\"vfwebqq\":\"{1}\",\"clientid\":\"{2}\",\"psessionid\":\"{3}\"{4}";
            postdata = String.Format(postdata,"{",Vfwebqq,Clientid,Psessionid,"}");
            postdata = HttpUtility.UrlEncode(postdata, Encoding.UTF8);
            postdata = String.Format("r={0}&clientid={1}&psessionid={2}", postdata,Clientid,Psessionid);
            using (var sre = new StreamReader( CreateRequest("http://d.web2.qq.com/channel/get_recent_list2", postdata) ) )
            {
                postdata = sre.ReadToEnd();
                dynamic jsonengine = new System.Web.Script.Serialization.JavaScriptSerializer().DeserializeObject(postdata);
                return jsonengine["result"];
            }
        }
        
        /// <summary>
        /// 获取自己的信息
        /// </summary>
        /// <returns></returns>
        public Dictionary<String, Object> SelfInfo()
        {
            var url = "http://s.web2.qq.com/api/get_self_info2?t={0}";
            url = String.Format(url, getTime(DateTime.Now));

            using (var sre = new StreamReader(CreateRequest(url, String.Empty)))
            {
                url = sre.ReadToEnd();
                dynamic jsonengine = new JavaScriptSerializer().DeserializeObject(url);
                return jsonengine["result"];
            }
        }
    }
}
