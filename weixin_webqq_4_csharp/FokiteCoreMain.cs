using System;
using System.Windows.Forms;

namespace FokiteQQcore_http://fokite.com/
{
    public partial class FokiteCore
    {
        static FokiteCore qq = new FokiteCore("你的QQ账户", "你的QQ密码");
        //static FokiteCore qq = new FokiteCore("", "");//如果不写就读配置文件

        /***
        * 
        * 为了防止拿来主义，代码我已经轻度手工添加几个错误并且去掉关键using语句。
        * 以上操作绝对不影响想认真阅读代码的人。
        * QQ群是 8033525 代码作者是：http://fokite.com 微博是：http://weibo.com/fokite
        * 正如你所看到的，代码注释几乎做到了 3行一句，没有被我删除掉。
        * 正如你所看到的，TA已经十分稳定，并且实现了WEBQQ全部功能。
        * 采用VS编辑器，通过自动生成文档功能，能得到这份代码的详细使用文档。
        * 
        ***/

        [STAThread]
        static void Main()
        {
            FokiteCoreInstaller.InStallSelf();

            ServiceBase[] ServicesToRun;
            ServicesToRun = new ServiceBase[] { qq };
            ServiceBase.Run(ServicesToRun);


            //qq = new FokiteCore("", "");

            //qq.MsgPollEventHandler += new EventHandler<FokiteQQEventArgsPollMsg>(qq_MsgPollEventHandler);
            //qq.ShakeMessageEventHandler += new EventHandler<FokiteQQShakeMessageEvent>(qq_ShakeMessageEventHandler);
            //qq.GroupMessageEventHandler += new EventHandler<FokiteQQGroupMessageEvent>(qq_GroupMessageEventHandler);
            //qq.BuddiesStatusChangeEventHandler += new EventHandler<FokiteQQBuddiesStatusChangeEvent>(qq_BuddiesStatusChangeEventHandler);
            //qq.MessageEventHandler += new EventHandler<FokiteQQMessageEvent>(qq_MessageEventHandler);

            //var s = qq.CheckQQ();
            //if (s != null)
            //{
            //    qq.SaveImagesToFile(s,String.Empty);
            //    Console.ForegroundColor = ConsoleColor.Yellow;
            //    Console.WriteLine("要输入验证码");
            //    qq.Vcode = Console.ReadLine();
            //}
            //qq.Login(QQstatus.Online);

            //Console.ReadLine();
            //qq.Logout();
            }

            static void qq_MessageEventHandler(Object sender, FokiteQQMessageEvent e)
            {
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine(qq.InputNotify(e.Uin.ToString()));
                Console.WriteLine("发送人：{0}， QQ号码：{1}", e.Uin,qq.Uin2QQnumber(e.Uin,false));
                Console.WriteLine("发送人备注：{0}", qq.FriendsMakeName(e.Uin));
                Console.WriteLine("发送人组名：{0}", qq.FriendsGroupName(e.Uin));
                Console.WriteLine("发送人名字：{0}", qq.FriendsNick(e.Uin));
                Console.WriteLine("发送人的签名：{0}",qq.Signature(e.Uin));
                Console.WriteLine("发送消息时间：{0}", e.MessageSendTime.ToString("yyyy年M月d日 H:mm:ss dddd"));
                Console.WriteLine("是否是会员：{0}，会员等级是：{1}", qq.FriendsIsVip(e.Uin),qq.FriendsVipLevel(e.Uin));
                Console.WriteLine("消息内容：");
                Console.WriteLine(e.Messagecontent);

                //qq.SendMsg(e.Uin, e.ReplyMsgid, qq.CustomExpressionFormatString(Console.ReadLine()));
                Console.ResetColor();
            }

            static void qq_BuddiesStatusChangeEventHandler(Object sender, FokiteQQBuddiesStatusChangeEvent e)
            {
                //if (e.Status == QQstatus.Online)
                //{
                //    using (System.Media.SoundPlayer media = new System.Media.SoundPlayer(@"E:\QQ2011\Misc\Sound\Office\msg.wav"))
                //    {
                //        media.PlaySync();
                //    }
                //}
                Console.WriteLine("改变状态了啊！");
                Console.WriteLine("uin号码是：{0}，状态改为：{1}",e.Uin,e.Status);
            }

            static void qq_GroupMessageEventHandler(Object sender, FokiteQQGroupMessageEvent e)
            {
                Console.ForegroundColor = ConsoleColor.Magenta;
                Console.Title = String.Format("群的Gcode：{0}",e.Groupcode);
                Console.WriteLine("群消息：{0}\r\n{1}\r\n",e.Receiveresultset,new String('-',Console.WindowWidth));
                Console.WriteLine("回复消息成功么？：{0}", qq.SendGroupMessage(guin: e.Uin, msgid: e.ReplyMsgid, content: FokiteCore.messaGing("好的知道了！", Guid.NewGuid().ToString(), new Random().Next(1, 100).ToString()), fontname: "宋体", fontsize: new Random().Next(9, 23), fontcolor: "ff0080", b: false, u: true, i: false));
                Console.ResetColor();
             }

            static void qq_ShakeMessageEventHandler(Object sender, FokiteQQShakeMessageEvent e)
            {
                Console.WriteLine("抖动了！");
                Console.WriteLine("消息内容：{0}", e.Receiveresultset);
                qq.SendShake(e.Uin.ToString());
                Console.WriteLine("发送成功否？{0}", qq.SendMessage(e.Uin, e.ReplyMsgid, FokiteCore.messaGing("表抖啦~", new Random().Next(1, 100)), "宋体", new Random().Next(9, 23), "FF0080", true, false, true));
            }

            static void qq_MsgPollEventHandler(Object sender, FokiteQQcore.FokiteQQEventArgsPollMsg e)
            {
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine(e.Receiveresultset);
                Console.WriteLine("\r\n失败计数：{0}\r\n", qq.Badcount);
                Console.ResetColor();
            }       
    }
}
