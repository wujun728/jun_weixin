using System;
using System.ComponentModel;
using System.Net;
using System.Web;

namespace FokiteQQcore_http://fokite.com/
{
    /// <summary>
    /// 此类通常只包含属性和常量
    /// </summary>
    public partial class FokiteCore
    {
        private readonly CookieContainer rqcookies = new CookieContainer();
        private readonly String clientid = getClientID();
        private readonly System.Timers.Timer timers = new System.Timers.Timer();
        /// <summary>
        /// 总是获取本文件的所在目录
        /// </summary>
        private readonly String SELFPATH = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
        private readonly String LOGFILE;

        /// <summary>
        /// 12个属性的运行信息
        /// </summary>
        private String[] runinfo = 
        {
            String.Empty,
            String.Empty,
            "http://web.qq.com/",
            "版权所有：fokite.com",
            String.Empty,
            String.Empty,
            String.Empty,
            String.Empty,
            String.Empty,
            String.Empty,
            String.Empty,
            "作者QQ：279495496",
            "http://www.fokite.com/",
        };

        //private String qqnum = String.Empty;//0
        //private String qqpwd = String.Empty;//1
        //private String refurl = "http://web.qq.com/"; //2
        //private String errlog = String.Empty;//3
        //private String ptwebqq = String.Empty;//4
        //private String vfwebqq = String.Empty;//5
        //private String psessionid = String.Empty;//6
        //private String verifysession = String.Empty;//7
        //8验证码获取值
        //9 Port属性 屏蔽群用
        //10 index 
        //11 gface_key
        //12 gface_sig
        
        private Int64 badcount = 0;
        
        /// <summary>
        /// 被踢下线是事件
        /// </summary>
        public event EventHandler<FokiteQQKickEvent> KickEventHandler;
        /// <summary>
        /// 消息事件
        /// </summary>
        public event EventHandler<FokiteQQMessageEvent> MessageEventHandler;
        /// <summary>
        /// 文件发送事件
        /// </summary>
        public event EventHandler<FokiteQQFileMessageEvent> FileMessagePollEventHandler;
        /// <summary>
        /// 所有消息回调响应事件
        /// </summary>
        public event EventHandler<FokiteQQEventArgsPollMsg> MsgPollEventHandler;
        /// <summary>
        /// 收到抖动的时候发生
        /// </summary>
        public event EventHandler<FokiteQQShakeMessageEvent> ShakeMessageEventHandler;
        /// <summary>
        /// 收到群消息的时候发生
        /// </summary>
        public event EventHandler<FokiteQQGroupMessageEvent> GroupMessageEventHandler;
        /// <summary>
        /// 收到系统消息时候发生
        /// </summary>
        public event EventHandler<FokiteQQSystemMessageEvent> SystemMessageEventHandler;
        /// <summary>
        /// 好友状态改变发生
        /// </summary>
        public event EventHandler<FokiteQQBuddiesStatusChangeEvent> BuddiesStatusChangeEventHandler;
        /// <summary>
        /// 好友正在输入发生
        /// </summary>
        public event EventHandler<FokiteQQInputNotify> InputNotifyEventHandler;

        /// <summary>
        /// verifysession值
        /// </summary>
        public String Verifysession
        {
            get { return runinfo[7]; }
            set { runinfo[7] = value; }
        }
        /// <summary>
        /// 登陆完成后的psessionid
        /// </summary>
        public String Psessionid
        {
            get { return runinfo[6]; }
        }
        /// <summary>
        /// 失败计数
        /// </summary>
        public Int64 Badcount
        {
            get { return badcount; }
        }

        /// <summary>
        /// 获取刚才轮询到的信息，如果确实需要获取，建议5秒一次
        /// </summary>
        public String Poll
        {
            get
            {
                if (String.IsNullOrEmpty(runinfo[6]))
                {
                    return String.Empty;
                }
                else
                {
                    return HttpRuntime.Cache.Get("MSGPOLL") as String;
                }                
            }
        }

        /// <summary>
        /// 设置验证码的值
        /// </summary>
        public String Vcode
        {
            set {runinfo[8] = value;}
            get { return String.Empty; }
        }

        /// <summary>
        /// 获取登陆返回值
        /// </summary>
        public String Port
        {
            get { return runinfo[9]; }
        }

        /// <summary>
        /// 获取登陆返回值
        /// </summary>
        public String Index
        {
            get { return runinfo[10]; }
        }

        /// <summary>
        /// 获取自定义头像KEY
        /// </summary>
        public String Gfacekey
        {
            get { return runinfo[11]; }
        }

        /// <summary>
        /// 获取自定义头像SIG
        /// </summary>
        public String Gfacesig
        {
            get{return runinfo[12];}
        }

        /// <summary>
        /// 登陆完成后返回的跳转页面的引用页
        /// </summary>
        public String Refurl
        {
            get { return runinfo[2]; }
        }
        /// <summary>
        /// 登陆完成后的Vfwebqq
        /// </summary>
        public String Vfwebqq
        {
            get { return runinfo[5]; }
        }

        /// <summary>
        /// 获取本次的Clientid
        /// </summary>
        public String Clientid
        {
            get { return clientid; }
        }
        /// <summary>
        /// PtwebQQ值
        /// </summary>
        public String Ptwebqq
        {
            get { return runinfo[4]; }
            set { runinfo[4] = value; }
        }

        /// <summary>
        /// 服务的名字
        /// </summary>
        public new String ServiceName
        {
            get { return base.ServiceName; }
        }

        /// <summary>
        /// 指示服务是否可以处理计算机电源通知
        /// </summary>
        public new Boolean CanHandlePowerEvent
        {
            get { return base.CanHandlePowerEvent; }
        }

        /// <summary>
        /// 系统关闭是否通知服务
        /// </summary>
        public new Boolean CanShutdown
        {
            get { return base.CanShutdown; }
        }

        ///// <summary>
        ///// 是否接收终端会话事件
        ///// </summary>
        //public new Boolean CanHandleSessionChangeEvent { get { return base.CanHandleSessionChangeEvent; } }

        /// <summary>
        /// 获取登陆期间的错误信息
        /// </summary>
        public String Errlog
        {
            get { return runinfo[3]; }
        }

        /// <summary>
        /// 内核轮询模式判断是否在线，与方法判断并不一样
        /// </summary>
        public Boolean IsOnlines
        {
            get {return Badcount < 10; }
        }
        /// <summary>
        /// QQ号码
        /// </summary>
        public String Qqnumber
        {
            get { return runinfo[0]; }
        }
        /// <summary>
        /// QQ密码
        /// </summary>
        public String Qqpassword
        {
            get { return runinfo[1]; }
        }
    }

    /// <summary>
    /// 表示QQ的5个状态值
    /// </summary>
    public enum QQstatus
    {
        /// <summary>
        /// 在线
        /// </summary>
        None = 0,
        /// <summary>
        /// 离线
        /// </summary>
        Offline = -1,      

        /// <summary>
        /// 找我吧
        /// </summary>
        Callme = 60,

        /// <summary>
        /// 隐身
        /// </summary>
        Hidden = 40,
        /// <summary>
        /// 在线
        /// </summary>
        Online = 10,
        /// <summary>
        /// 离开
        /// </summary>
        Away = 30,
        /// <summary>
        /// 请勿打扰
        /// </summary>
        Silent = 70,
        /// <summary>
        /// 忙碌
        /// </summary>
        Busy = 50
    }

    ///// <summary>
    ///// 客户端类型枚举
    ///// </summary>
    ////public enum ClientTypeEnum
    ////{
    ////    /// <summary>
    ////    /// PC登陆
    ////    /// </summary>
    ////    PC,
    ////    /// <summary>
    ////    /// 手机QQ
    ////    /// </summary>
    ////    Phone,
    ////    /// <summary>
    ////    /// WebQQ
    ////    /// </summary>
    ////    WebQQ,
    ////    /// <summary>
    ////    /// 未知客户端
    ////    /// </summary>
    ////    Unknow
    ////}

    ///// <summary>
    ///// 用户类型枚举
    ///// </summary>
    ////public enum UserClassType
    ////{
    ////    Online,
    ////    Stranger,
    ////    BlackList
    ////}
    ///// <summary>
    ///// 组状态枚举
    ///// </summary>
    ////public enum GroupType
    ////{
    ////    CommonGroup,
    ////    SeniorGroup,
    ////    SuperGroup,
    ////    ForbiddenGroup,
    ////    EnterpriseGroup,
    ////    ExpireSuperGroup
    ////}

    /// <summary>
    /// QQ表情枚举
    /// </summary>
    public enum QQexpression
    {
        /// <summary>
        /// 【惊讶】
        /// </summary>
        [Description("【惊讶】")]
        None = 0,
        /// <summary>
        /// 【撇嘴】
        /// </summary>
        [Description("【撇嘴】")]
        Piezui = 1,
        /// <summary>
        /// 【色】
        /// </summary>
        [Description("【色】")]
        Se = 2,
        /// <summary>
        /// 【发呆】
        /// </summary>
        [Description("【发呆】")]
        Fadai = 3,
        /// <summary>
        /// 【得意】
        /// </summary>
        [Description("【得意】")]
        Deyi = 4,
        /// <summary>
        /// 【流泪】
        /// </summary>
        [Description("【流泪】")]
        Liulei = 5,
        /// <summary>
        /// 【害羞】
        /// </summary>
        [Description("【害羞】")]
        Haixiu = 6,
        /// <summary>
        /// 【闭嘴】
        /// </summary>
        [Description("【闭嘴】")]
        Bizui = 7,
        /// <summary>
        /// 【睡】
        /// </summary>
        [Description("【睡】")]
        Shui = 8,
        /// <summary>
        /// 【大哭】
        /// </summary>
        [Description("【大哭】")]
        Daku = 9,
        /// <summary>
        /// 【尴尬】
        /// </summary>
        [Description("【尴尬】")]
        Ganga = 10,
        /// <summary>
        /// 【发怒】
        /// </summary>
        [Description("【发怒】")]
        Falu = 11,
        /// <summary>
        /// 【调皮】
        /// </summary>
        [Description("【调皮】")]
        Tiaopi = 12,
        /// <summary>
        /// 【呲牙】
        /// </summary>
        [Description("【呲牙】")]
        Ciya = 13,
        /// <summary>
        /// 【微笑】
        /// </summary>
        [Description("【微笑】")]
        Weixiao = 14,
        /// <summary>
        /// 【女企鹅】
        /// </summary>
        [Description("【女企鹅】")]
        NvQie = 20,
        /// <summary>
        /// 【飞吻】
        /// </summary>
        [Description("【飞吻】")]
        Feiwen = 21,
        /// <summary>
        /// 【跳跳】
        /// </summary>
        [Description("【跳跳】")]
        Tiaotiao = 23,
        /// <summary>
        /// 【发抖】
        /// </summary>
        [Description("【发抖】")]
        Fadou = 25,
        /// <summary>
        /// 【喷火】
        /// </summary>
        [Description("【喷火】")]
        Penhuo = 26,
        /// <summary>
        /// 【爱情】
        /// </summary>
        [Description("【爱情】")]
        Aiqing = 27,

        /// <summary>
        /// 【酒瓶】
        /// </summary>
        [Description("【酒瓶】")]
        JiuPing = 28,

        /// <summary>
        /// 【足球】
        /// </summary>
        [Description("【足球】")]
        Zuqiu = 29,

        /// <summary>
        /// 【可乐】
        /// </summary>
        [Description("【可乐】")]
        Kele = 30,

        /// <summary>
        /// 【鸡尾酒】
        /// </summary>
        [Description("【鸡尾酒】")]
        Jiweijiu = 31,

        /// <summary>
        /// 【西瓜】
        /// </summary>
        [Description("【西瓜】")]
        Xigua = 32,
        /// <summary>
        /// 【玫瑰】
        /// </summary>
        [Description("【玫瑰】")]
        Meigui = 33,
        /// <summary>
        /// 【凋谢】
        /// </summary>
        [Description("【凋谢】")]
        Diaoxie = 34,

        /// <summary>
        /// 【红颜祸水】
        /// </summary>
        [Description("【红颜祸水】")]
        Hongyanhuoshui = 35,

        /// <summary>
        /// 【爱心】
        /// </summary>
        [Description("【爱心】")]
        Aixin = 36,
        /// <summary>
        /// 【心碎】
        /// </summary>
        [Description("【心碎】")]
        Xinsui = 37,
        /// <summary>
        /// 【蛋糕】
        /// </summary>
        [Description("【蛋糕】")]
        Dangao = 38,
        /// <summary>
        /// 【礼物】
        /// </summary>
        [Description("【礼物】")]
        Liwu = 39,

        /// <summary>
        /// 【下雨】
        /// </summary>
        [Description("【下雨】")]
        Xiayu = 40,

        /// <summary>
        /// 【晴天】
        /// </summary>
        [Description("【晴天】")]
        Qingtian = 41,

        /// <summary>
        /// 【太阳】
        /// </summary>
        [Description("【太阳】")]
        Taiyang = 42,

        /// <summary>
        /// 【雪人】
        /// </summary>
        [Description("【雪人】")]
        Xueren = 43,

        /// <summary>
        /// 【星星】
        /// </summary>
        [Description("【星星】")]
        Xingxing = 44,

        /// <summary>
        /// 【月亮】
        /// </summary>
        [Description("【月亮】")]
        Yueliang = 45,
        /// <summary>
        /// 【强】
        /// </summary>
        [Description("【强】")]
        Qiang = 46,
        /// <summary>
        /// 【弱】
        /// </summary>
        [Description("【弱】")]
        Ruo = 47,
        /// <summary>
        /// 【美女】
        /// </summary>
        [Description("【美女】")]
        Meinv = 48,

        /// <summary>
        /// 【帅哥】
        /// </summary>
        [Description("【帅哥】")]
        Shuaige = 49,

        /// <summary>
        /// 【难过】
        /// </summary>
        [Description("【难过】")]
        Nanguo = 50,
        /// <summary>
        /// 【酷】
        /// </summary>
        [Description("【酷】")]
        Ku = 51,

        /// <summary>
        /// 【口罩】
        /// </summary>
        [Description("【口罩】")]
        Kouzhao = 52,

        /// <summary>
        /// 【抓狂】
        /// </summary>
        [Description("【抓狂】")]
        Zhuakuang = 53,
        /// <summary>
        /// 【吐】
        /// </summary>
        [Description("【吐】")]
        Tu = 54,
        /// <summary>
        /// 【惊恐】
        /// </summary>
        [Description("【惊恐】")]
        Jingkong = 55,
        /// <summary>
        /// 【流汗】
        /// </summary>
        [Description("【流汗】")]
        Liuhan = 56,
        /// <summary>
        /// 【憨笑】
        /// </summary>
        [Description("【憨笑】")]
        Hanxiao = 57,
        /// <summary>
        /// 【大兵】
        /// </summary>
        [Description("【大兵】")]
        Dabing = 58,
        /// <summary>
        /// 【猪头】
        /// </summary>
        [Description("【猪头】")]
        Zhutou = 59,

        /// <summary>
        /// 【猫咪】
        /// </summary>
        [Description("【猫咪】")]
        Maomi = 60,

        /// <summary>
        /// 【狗狗】
        /// </summary>
        [Description("【狗狗】")]
        GouGou = 61,

        /// <summary>
        /// 【拥抱】
        /// </summary>
        [Description("【拥抱】")]
        Yongbao = 62,
        /// <summary>
        /// 【咖啡】
        /// </summary>
        [Description("【咖啡】")]
        Kafei = 63,
        /// <summary>
        /// 【饭】
        /// </summary>
        [Description("【饭】")]
        Fan = 64,

        /// <summary>
        /// 【药丸】
        /// </summary>
        [Description("【药丸】")]
        Yaowan = 65,

        /// <summary>
        /// 【桌子】
        /// </summary>
        [Description("【桌子】")]
        Zhuozi = 66,

        /// <summary>
        /// 【电话】
        /// </summary>
        [Description("【电话】")]
        Dianhua = 67,

        /// <summary>
        /// 【时间】
        /// </summary>
        [Description("【时间】")]
        Shijian = 68,

        /// <summary>
        /// 【信封】
        /// </summary>
        [Description("【信封】")]
        Xinfeng = 69,

        /// <summary>
        /// 【电视】
        /// </summary>
        [Description("【电视】")]
        Dianshi = 70,

        /// <summary>
        /// 【握手】
        /// </summary>
        [Description("【握手】")]
        Woshou = 71,
        /// <summary>
        /// 【便便】
        /// </summary>
        [Description("【便便】")]
        Bianbian = 72,
        /// <summary>
        /// 【偷笑】
        /// </summary>
        [Description("【偷笑】")]
        Touxiao = 73,
        /// <summary>
        /// 【可爱】
        /// </summary>
        [Description("【可爱】")]
        Keai = 74,
        /// <summary>
        /// 【白眼】
        /// </summary>
        [Description("【白眼】")]
        Baiyan = 75,
        /// <summary>
        /// 【傲慢】
        /// </summary>
        [Description("【傲慢】")]
        Aoman = 76,
        /// <summary>
        /// 【饥饿】
        /// </summary>
        [Description("【饥饿】")]
        Jie = 77,
        /// <summary>
        /// 【困】
        /// </summary>
        [Description("【困】")]
        Kun = 78,
        /// <summary>
        /// 【奋斗】
        /// </summary>
        [Description("【奋斗】")]
        Fengdou = 79,
        /// <summary>
        /// 【咒骂】
        /// </summary>
        [Description("【咒骂】")]
        Zhouma = 80,
        /// <summary>
        /// 【疑问】
        /// </summary>
        [Description("【疑问】")]
        Yiwen = 81,
        /// <summary>
        /// 【嘘】
        /// </summary>
        [Description("【嘘】")]
        Xu = 82,
        /// <summary>
        /// 【晕】
        /// </summary>
        [Description("【晕】")]
        Yun = 83,
        /// <summary>
        /// 【折磨】
        /// </summary>
        [Description("【折磨】")]
        Zhemo = 84,
        /// <summary>
        /// 【帅】
        /// </summary>
        [Description("【帅】")]
        Shuai = 85,
        /// <summary>
        /// 【骷髅】
        /// </summary>
        [Description("【骷髅】")]
        Kulou = 86,
        /// <summary>
        /// 【敲打】
        /// </summary>
        [Description("【敲打】")]
        Qiaoda = 87,
        /// <summary>
        /// 【再见】
        /// </summary>
        [Description("【再见】")]
        Zaijian = 88,
        /// <summary>
        /// 【人民币】
        /// </summary>
        [Description("【人民币】")]
        Rmb = 89,

        /// <summary>
        /// 【灯泡】
        /// </summary>
        [Description("【灯泡】")]
        Dengpao = 90,

        /// <summary>
        /// 【闪电】
        /// </summary>
        [Description("【闪电】")]
        Shandian = 91,
        /// <summary>
        /// 【炸弹】
        /// </summary>
        [Description("【炸弹】")]
        Zhadan = 92,
        /// <summary>
        /// 【刀】
        /// </summary>
        [Description("【刀】")]
        Dao = 93,

        /// <summary>
        /// 【音乐】
        /// </summary>
        [Description("【音乐】")]
        Yinyue = 94,

        /// <summary>
        /// 【胜利】
        /// </summary>
        [Description("【胜利】")]
        Shengli = 95,
        /// <summary>
        /// 【冷汗】
        /// </summary>
        [Description("【冷汗】")]
        Lenghan = 96,
        /// <summary>
        /// 【擦汗】
        /// </summary>
        [Description("【擦汗】")]
        Cahan = 97,
        /// <summary>
        /// 【抠鼻】
        /// </summary>
        [Description("【抠鼻】")]
        Koubi = 98,
        /// <summary>
        /// 【鼓掌】
        /// </summary>
        [Description("【故障】")]
        Guzhang = 99,
        /// <summary>
        /// 【糗大了】
        /// </summary>
        [Description("【溴大了】")]
        Qiudale = 100,
        /// <summary>
        /// 【坏笑】
        /// </summary>
        [Description("【坏笑】")]
        Huaixiao = 101,
        /// <summary>
        /// 【左哼哼】
        /// </summary>
        [Description("【左哼哼】")]
        Zuohengheng = 102,
        /// <summary>
        /// 【右哼哼】
        /// </summary>
        [Description("【右哼哼】")]
        Youhengheng = 103,
        /// <summary>
        /// 【哈欠】
        /// </summary>
        [Description("【哈欠】")]
        Haqian = 104,
        /// <summary>
        /// 【鄙视】
        /// </summary>
        [Description("【鄙视】")]
        Bishi = 105,
        /// <summary>
        /// 【委屈】
        /// </summary>
        [Description("【委曲】")]
        Weiqu = 106,
        /// <summary>
        /// 【快哭了】
        /// </summary>
        [Description("【快哭了】")]
        Kuaikule = 107,
        /// <summary>
        /// 【阴险】
        /// </summary>
        [Description("【阴险】")]
        Yingxian = 108,
        /// <summary>
        /// 【亲亲】
        /// </summary>
        [Description("【亲亲】")]
        Qinqin = 109,
        /// <summary>
        /// 【吓】
        /// </summary>
        [Description("【吓】")]
        Xia = 110,
        /// <summary>
        /// 【可怜】
        /// </summary>
        [Description("【可怜】")]
        Kelian = 111,
        /// <summary>
        /// 【菜刀】
        /// </summary>
        [Description("【菜刀】")]
        Caidao = 112,
        /// <summary>
        /// 【啤酒】
        /// </summary>
        [Description("【啤酒】")]
        Pijiu = 113,
        /// <summary>
        /// 【篮球】
        /// </summary>
        [Description("【篮球】")]
        Lanqiu = 114,
        /// <summary>
        /// 【乒乓球】
        /// </summary>
        [Description("【乒乓球】")]
        Pingpangqiu = 115,
        /// <summary>
        /// 【示爱】
        /// </summary>
        [Description("【示爱】")]
        Shiai = 116,
        /// <summary>
        /// 【瓢虫】
        /// </summary>
        [Description("【瓢虫】")]
        Piaochong = 117,
        /// <summary>
        /// 【抱拳】
        /// </summary>
        [Description("【抱拳】")]
        Baoquan = 118,
        /// <summary>
        /// 【勾引】
        /// </summary>
        [Description("【勾引】")]
        Gouyin = 119,
        /// <summary>
        /// 【握拳】
        /// </summary>
        [Description("【握拳】")]
        Quantou = 120,
        /// <summary>
        /// 【差劲】
        /// </summary>
        [Description("【差劲】")]
        Chajing = 121,
        /// <summary>
        /// 【六和一】
        /// </summary>
        [Description("【六合一】")]
        Liuheyi = 122,
        /// <summary>
        /// 【不行】
        /// </summary>
        [Description("【不行】")]
        Buxing = 123,
        /// <summary>
        /// 【没问题】
        /// </summary>
        [Description("【没问题】")]
        Meiwenti = 124,
        /// <summary>
        /// 【转圈】
        /// </summary>
        [Description("【转圈】")]
        Zhuanquan = 125,
        /// <summary>
        /// 【磕头】
        /// </summary>
        [Description("【磕头】")]
        Ketou = 126,
        /// <summary>
        /// 【回头】
        /// </summary>
        [Description("【回头】")]
        Huitou = 127,
        /// <summary>
        /// 【跳绳】
        /// </summary>
        [Description("【跳绳】")]
        Tiaosheng = 128,
        /// <summary>
        /// 【挥手】
        /// </summary>
        [Description("【挥手】")]
        Huishou = 129,
        /// <summary>
        /// 【激动】
        /// </summary>
        [Description("【激动】")]
        Jidong = 130,
        /// <summary>
        /// 【街舞】
        /// </summary>
        [Description("【街舞】")]
        Jiewu = 131,
        /// <summary>
        /// 【献吻】
        /// </summary>
        [Description("【献吻】")]
        Xianwen = 132,
        /// <summary>
        /// 【左太极】
        /// </summary>
        [Description("【左太极】")]
        Zuotaiji = 133,
        /// <summary>
        /// 【右太极】
        /// </summary>
        [Description("【右太极】")]
        Youtaiji = 134
    }
}