using System;
using System.Linq;
namespace FokiteQQcore_http://fokite.com/
{
    /// <summary>
    /// QQ被踢下线事件
    /// </summary>
    public sealed class FokiteQQKickEvent : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }
        /// <summary>
        /// 获取被T下线原因
        /// </summary>
        public String KickReason
        {
            get {
                if (Jsonengine == null){return String.Empty;}
                //dynamic jsonengine = new System.Web.Script.Serialization.JavaScriptSerializer().DeserializeObject(url);
                Dictionary<String, Object> dic = (Dictionary<String, Object>)jsonengine;
                Object[] ects = (Object[])dic["result"];
                dic = (Dictionary<String, Object>)ects[ects.LongLength - 1];
                dic = (Dictionary<String, Object>)dic["value"];
                return  dic["reason"].ToString();
            }
        }
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQKickEvent(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;
        }
    }

    /// <summary>
    /// QQ好友状态改变事件
    /// </summary>
    public sealed class FokiteQQBuddiesStatusChangeEvent : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }
        /// <summary>
        /// 改变状态的UIN号码
        /// </summary>
        public String Uin
        {
            get {
                return runinfo["uin"].ToString();
            }
        }
        /// <summary>
        /// 得到改变状态的值
        /// </summary>
        public QQstatus Status
        {
            get
            {
                return (QQstatus)Enum.Parse(typeof(QQstatus), runinfo["status"].ToString(), true);
            }
        }

        private readonly Hashtable runinfo = new Hashtable();
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQBuddiesStatusChangeEvent(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;

            if (Jsonengine == null) { return ; }
            Dictionary<String, Object> dic = (Dictionary<String, Object>)jsonengine;
            Object[] ects = (Object[])dic["result"];

            dic = (Dictionary<String, Object>)ects[0];
            dic = (Dictionary<String, Object>)dic["value"];

            runinfo.Add("uin", dic["uin"]);
            runinfo.Add("status", dic["status"]);

           // {"retcode":0,"result":[{"poll_type":"buddies_status_change","value":{"uin":3927610183,"status":"offline","client_type":1}}]}

            //new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(;
        }
    }

    /// <summary>
    /// QQ群消息事件
    /// </summary>
    public sealed class FokiteQQGroupMessageEvent : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }

        private readonly Dictionary<String, Object> runinfo;

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQGroupMessageEvent(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;

            if (Jsonengine == null) { return; }
            runinfo = (Dictionary<String, Object>)jsonengine;
            Object[] ects = (Object[])runinfo["result"];

            runinfo = (Dictionary<String, Object>)ects[0];
            runinfo = (Dictionary<String, Object>)runinfo["value"];

            ects = (Object[])runinfo["content"];
            runinfo["contents"] = FokiteCore.receiveMsgFormat(ects, ref ects, true);
            //runinfo["msgformat"] = ects;  
        }

        /// <summary>
        /// 群的Gcode
        /// </summary>
        public Object Groupcode
        {
            get
            {
                return runinfo["group_code"];
            }
        }

        /// <summary>
        /// 回复MSGID属性
        /// </summary>
        public Object ReplyMsgid
        {
            get
            {
                return runinfo["msg_id2"];
            }
        }

        /// <summary>
        /// 消息发送的时间
        /// </summary>
        public DateTime MessageSendTime
        {
            get
            {
                return FokiteCore.convertFromUnixTimestamp(Convert.ToDouble(runinfo["time"]));
            }
        }

        /// <summary>
        /// 群内发言人UIN
        /// </summary>
        public Object SendUin
        {
            get
            {
                return runinfo["send_uin"];
            }
        }

        /// <summary>
        /// 消息ID，可用于多条消息的拼接
        /// </summary>
        public Object Msgid
        {
            get
            {
                return runinfo["msg_id"];
            }
        }

        /// <summary>
        /// 群的UIN号码
        /// </summary>
        public Object Uin
        {
            get
            {
                return runinfo["from_uin"];
            }
        }

        /// <summary>
        /// 可以解码的消息IP
        /// </summary>
        public Object ReplyIp
        {
            get
            {
                return runinfo["reply_ip"];
            }
        }

        /// <summary>
        /// 消息内容
        /// </summary>
        public Object Content
        {
            get { return runinfo["contents"]; }
        }

    }

    /// <summary>
    /// QQ消息事件
    /// </summary>
    public sealed class FokiteQQMessageEvent : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }

        private readonly Hashtable runinfo = new Hashtable();

        /// <summary>
        /// 获取消息内容
        /// </summary>
        public String Messagecontent
        {
            get
            {
                return runinfo["content"].ToString();
            }
        }
        /// <summary>
        /// 获取消息字体、色彩等格式信息
        /// </summary>
        public Object[] Messageformatinfo()
        {
            return (Object[])runinfo["msgformat"];
        }
        /// <summary>
        /// 回复MSGID属性
        /// </summary>
        public Int64 ReplyMsgid
        {
            get
            {
                return Convert.ToInt64(runinfo["msg_id2"]);
            }
        }
        /// <summary>
        /// 发送人的UID
        /// </summary>
        public Int64 Uin
        {
            get
            {
                return Convert.ToInt64(runinfo["from_uin"]);
            }
        }

        /// <summary>
        /// 消息发送的时间
        /// </summary>
        public DateTime MessageSendTime
        {
            get
            {
                return (DateTime) runinfo["time"];
            }
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQMessageEvent(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;

            if (Jsonengine == null) { return ; }
            Dictionary<String, Object> dic = (Dictionary<String, Object>)jsonengine;
            Object[] ects = (Object[])dic["result"];
            dic = (Dictionary<String, Object>)ects[0];
            dic = (Dictionary<String, Object>)dic["value"];

            runinfo["from_uin"] = dic["from_uin"];
            runinfo["msg_id2"] = dic["msg_id2"];
            runinfo["time"] = FokiteCore.convertFromUnixTimestamp(Convert.ToDouble(dic["time"]));
            
            ects = (Object[])dic["content"];
            runinfo["content"] = FokiteCore.receiveMsgFormat(ects, ref ects, true);
            runinfo["msgformat"] = ects;            
        }
    }
    
    /// <summary>
    /// QQ系统消息事件
    /// </summary>
    public sealed class FokiteQQSystemMessageEvent : EventArgs
    {
        private Object jsonengine = null;
        private String receiveresultset = String.Empty;
        #region FokiteQQMessageEventInterface 成员
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }

        #endregion

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQSystemMessageEvent(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;
        }
    }

    /// <summary>
    /// QQ抖动事件
    /// </summary>
    public sealed class FokiteQQShakeMessageEvent : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }
        /// <summary>
        /// 抖动人的UID
        /// </summary>
        public Object Uin
        {
            get
            {
                return runinfo["from_uin"];
            }
        }
        /// <summary>
        /// 回复消息的ID
        /// </summary>
        public Object ReplyMsgid
        {
            get
            {
                return runinfo["msg_id2"];
            }
        }
        private readonly Dictionary<String, Object> runinfo;
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQShakeMessageEvent(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;
            if (Jsonengine == null) { return ; }

            runinfo = (Dictionary<String, Object>)jsonengine;
            Object[] ects = (Object[])runinfo["result"];
            runinfo = (Dictionary<String, Object>)ects[0];
            runinfo = (Dictionary<String, Object>)runinfo["value"];
        }
    }
    
    /// <summary>
    /// QQ文件传送事件
    /// </summary>
    public sealed class FokiteQQFileMessageEvent : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }

        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQFileMessageEvent(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;             
        }
    }

    /// <summary>
    /// 正在输入响应类
    /// </summary>
    public sealed class FokiteQQInputNotify : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }
        /// <summary>
        /// 正在输入好友的UID
        /// </summary>
        public Object Uin
        {
            get
            {
                return runinfo["from_uin"];
            }
        }
        /// <summary>
        /// 回复消息的ID
        /// </summary>
        public Object ReplyMsgid
        {
            get
            {
                return runinfo["msg_id2"];
            }
        }
        private readonly Dictionary<String, Object> runinfo;
        /// <summary>
        /// 构造函数
        /// </summary>
        /// <param name="notresolvejssring">未解析的字符串</param>
        /// <param name="jsstring">可供解析的字符串</param>
        internal FokiteQQInputNotify(String notresolvejssring, Object jsstring)
        {
            this.jsonengine = jsstring;
            this.receiveresultset = notresolvejssring;
            if (Jsonengine == null) { return ; }

            runinfo = (Dictionary<String, Object>)jsonengine;
            Object[] ects = (Object[])runinfo["result"];
            runinfo = (Dictionary<String, Object>)ects[0];
            runinfo = (Dictionary<String, Object>)runinfo["value"];
        }
    }

    /// <summary>
    /// 所有消息轮询事件响应类
    /// </summary>
    public sealed class FokiteQQEventArgsPollMsg : EventArgs
    {
        private Object jsonengine = null;
        /// <summary>
        /// 可供处理的JSON格式
        /// </summary>
        public Object Jsonengine
        {
            get { return jsonengine; }
        }

        private String receiveresultset = String.Empty;
        /// <summary>
        /// 接收到的未解析文本
        /// </summary>
        public String Receiveresultset
        {
            get { return receiveresultset; }
        }
        /// <summary>
        /// 消息轮询事件响应类
        /// </summary>
        public FokiteQQEventArgsPollMsg()
        {
        }
        /// <summary>
        /// 消息轮询事件响应类
        /// </summary>
        /// <param name="receiveresultsets">接收到的原始消息文本</param>
        /// <param name="jsonengines">序列化的JSON访问</param>
        internal FokiteQQEventArgsPollMsg(String receiveresultsets, Object jsonengines)
        {
            this.receiveresultset = receiveresultsets;
            this.jsonengine = jsonengines;
        }
    }
}
