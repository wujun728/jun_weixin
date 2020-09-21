#weichat
整个项目使用到的技术如下

Spring， hibernate，memcache，Netty，protobuf，FastDFS，GreenDao。

核心通信部分是netty 和protobuf 

未来将加入webrtc 以实现在线通话、视频聊天

项目分为服务端和客户端，代码都在这里。代码量有点儿大，相当一个在线应用的70%。对于一般的程序员有很好的启发作用。

如想运行需要将服务端程序运行起来。数据库建表语句都是自动的，建好数据库就行了。

memcache， fastDFS服务器也需要自己搭建。（如果这也觉得难那么代码运行起来你也看不出他的价值）


阅读入口：weichatApp/org.weishe.weichat.service.Session

	weichat/com.weishe.weichat.core.NettyServerBootstrap

1.请了解整个聊天系统的设计思路，请阅读  doc/云推送介绍和架构分享.ppt
  在这个之中我有一个地方没说清楚的就是服务端的的消息转发，有时间我会补上的。
2.整个项目用Eclipse开发，将源码下载下来之后导入即可

3.导入项目之后请修改 weichat/config db-config.properties文件中的数据库配置
/#connection.url=jdbc:mysql://XXXXXXXXXX:3306/WeiChat?autoReconnect=true&autoReconnectForPools=true&useUnicode=true&characterEncoding=utf8
/#connection.username= 
/#connection.password= 

4.修改weichatApp/org.weishe.weichat.api.ApiHttpClient中的服务端连接地址
	public final static String HOST = "";
	private static String API_URL = "http:// /weichat/%s";

5.修改weichatApp/org.weishe.weichat.service.Session
   129行 服务端对应地址

6.修改FastDFS系统地址
 weichatApp/org.weishe.weichat.util 第57行
 weichat/com.weishe.weichat.util.FastDFSUtil 第69行
 
7.修改memcache 地址  
 weichat/config/applicationContext.xml 240行

8.因为代码使用的服务器是我个人的一个云服务器，不太会管理怕被攻击所以与地址相关的都去掉了。
  大家使用内网ip也是可以的，只要手机跟服务端在一个局域网中即可。

9.这个项目的android端的有些控件是应用的网路上其他网友的的源码，代码中留了开发者的信息，在此特别感谢。

10.由于是利用业余时间做的，有些地方还可以有很好的设计但是由于时间问题.......。代码没有仔细整理过可能有些凌乱请见谅。

11.如有疑问或者好的改造方案请发送至邮箱735859399@qq.com


效果图如下：

![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142223_96e5d920_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142646_e992dd13_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142657_10bec13a_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142707_af0fae70_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142719_c751ac0b_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142732_4740db35_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142741_e0707ddf_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142751_054c8c52_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142800_542dbd4e_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142816_94d93c50_27827.png "在这里输入图片标题")
![输入图片说明](http://git.oschina.net/uploads/images/2015/0907/142828_57c27c4f_27827.png "在这里输入图片标题")