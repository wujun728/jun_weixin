package com.github.sd4324530.firePusher;

import com.github.sd4324530.firePusher.config.IOSPushConfig;
import com.github.sd4324530.firePusher.config.OpenFirePushConfig;
import com.github.sd4324530.firePusher.message.SimpleFMessage;
import com.github.sd4324530.firePusher.pusher.PusherFactory;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author peiyu
 */
public class PushTest {

    private static final Logger LOG = LoggerFactory.getLogger(PushTest.class);

    @Test
    public void test() {
//        testOpenfire();
//        testIOS();
    }

    private void testIOS() {
        PusherFactory pusherManager = PusherFactory.me();
        IOSPushConfig iosParam = new IOSPushConfig();
        iosParam.setP12Path("E:/Certificates.p12");
        iosParam.setPassword("123456");
        Pusher pusher = pusherManager.getPusher(iosParam);
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
    }

    private void testOpenfire() {
        PusherFactory pusherManager = PusherFactory.me();
        OpenFirePushConfig openfireParam = new OpenFirePushConfig();
        openfireParam.setServerIP("10.20.16.74");
        openfireParam.setServerPort(5222);
        openfireParam.setUserName("admin");
        openfireParam.setPassword("asdasd");
        openfireParam.setServiceName("asiadev1");
        Pusher pusher = pusherManager.getPusher(openfireParam);

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
    }
}
