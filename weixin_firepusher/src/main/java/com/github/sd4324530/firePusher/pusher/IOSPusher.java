package com.github.sd4324530.firePusher.pusher;

import com.github.sd4324530.firePusher.FMessage;
import com.github.sd4324530.firePusher.Pusher;
import com.github.sd4324530.firePusher.config.IOSPushConfig;
import com.github.sd4324530.firePusher.exception.FirePusherException;
import javapns.devices.implementations.basic.BasicDevice;
import javapns.notification.AppleNotificationServerBasicImpl;
import javapns.notification.PushNotificationManager;
import javapns.notification.PushNotificationPayload;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;

/**
 * 苹果推送服务器消息推送器
 *
 * @author peiyu
 */
class IOSPusher implements Pusher {

    private static final Logger  LOG    = LoggerFactory.getLogger(IOSPusher.class);
    private              boolean isOpen = false;
    private final PushNotificationManager pushNotificationManager;
    private final PushNotificationPayload payLoad;
    private final String                  key;
    private final IOSPushConfig           config;


    IOSPusher(final IOSPushConfig iosConfig) {
        this.config = iosConfig;
        this.pushNotificationManager = new PushNotificationManager();
        this.payLoad = new PushNotificationPayload();
        try {
            this.payLoad.addBadge(1);
            this.payLoad.addSound("default");
            this.key = iosConfig.getP12Path();
            init();
        } catch (Exception e) {
            LOG.warn("连接苹果服务器失败", e);
            throw new FirePusherException(e);
        }
    }

    void init() throws Exception {
        //true：表示的是产品发布推送服务 false：表示的是产品测试推送服务
        this.pushNotificationManager.initializeConnection(new AppleNotificationServerBasicImpl(this.config.getP12Path(), this.config.getPassword(), !this.config.isDev()));
        isOpen = true;
    }

    @Override
    public void push(final FMessage message) throws FirePusherException {
        this.push(Collections.singletonList(message));
    }

    @Override
    public void push(final List<FMessage> messages) throws FirePusherException {
        if (!isOpen()) {
            throw new FirePusherException("推送器:" + getKey() + "已经关闭.....");
        }
        if (null != messages && !messages.isEmpty()) {
            try {
                for (FMessage message : messages) {
                    this.payLoad.addAlert(message.getContext());
                    this.pushNotificationManager.sendNotification(new BasicDevice(message.getTo()), payLoad, false);
                }
            } catch (Exception e) {
                LOG.error("发送消息出现异常:", e);
                throw new FirePusherException(e);
            }
        }
    }

    @Override
    public String getKey() {
        return this.key;
    }

    @Override
    public boolean isOpen() {
        return this.isOpen;
    }

    @Override
    public void close() throws Exception {
        this.pushNotificationManager.stopConnection();
        this.isOpen = false;
//        PusherFactory.me().releasePusher(this);
    }
}
