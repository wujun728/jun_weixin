# firePusher
对smack和javapns进行简单的封装，做到更加方便的向各种设备进行消息推送<br>
smack实现推送基于openfire服务器<br>
最低需要jdk 1.7

## 使用样例(通过苹果服务器推送)
```Java
        PusherFactory pusherFactory = PusherFactory.me();
        IOSPushConfig iosConfig = new IOSPushConfig();
        iosConfig.setP12Path("E:/Certificates.p12");
        iosConfig.setPassword("123456");
        Pusher pusher = pusherFactory.getPusher(iosConfig);
        SimpleFMessage simpleFMessage = new SimpleFMessage();
        simpleFMessage.setContext("test message!");
        simpleFMessage.setTitle("hello test");
        simpleFMessage.setTo("1ad18d84a40437f7a1b949c95cd2686d0bbb21645b5d996e335920b64b1f4f38");
        pusher.push(simpleFMessage);
        try {
            pusher.close();
        } catch (Exception e) {
            LOG.error("关闭连接异常");
        }
        LOG.debug("通过苹果推送服务器发送消息成功......");
```

## 使用样例(通过openfire服务器推送)
```Java
        PusherFactory pusherFactory = PusherFactory.me();
        OpenFirePushConfig openfireConfig = new OpenFirePushConfig();
        openfireConfig.setOpenfireIP("10.20.16.74");
        openfireConfig.setOpenfirePort(5222);
        openfireConfig.setUserName("admin");
        openfireConfig.setPassword("123456");
        Pusher pusher = pusherFactory.getPusher(openfireConfig);
        SimpleFMessage simpleFMessage = new SimpleFMessage();
        simpleFMessage.setContext("test message!");
        simpleFMessage.setTitle("hello test");
        simpleFMessage.setTo("test1");
        pusher.push(simpleFMessage);
        try {
            pusher.close();
        } catch (Exception e) {
            LOG.error("关闭连接异常");
        }
        LOG.debug("通过xmpp服务器发送消息成功......");
```

Maven 项目引入
==========
```xml
<dependency>
    <groupId>com.github.sd4324530</groupId>
    <artifactId>firePusher</artifactId>
    <version>0.2</version>
</dependency>
```

开源协议
==========
[Apache License](http://www.apache.org/licenses/LICENSE-2.0)