package com.github.sd4324530.firePusher.pusher;

import com.github.sd4324530.firePusher.FMessage;
import com.github.sd4324530.firePusher.Pusher;
import com.github.sd4324530.firePusher.config.OpenFirePushConfig;
import com.github.sd4324530.firePusher.exception.FirePusherException;
import org.jivesoftware.smack.AbstractXMPPConnection;
import org.jivesoftware.smack.ConnectionConfiguration;
import org.jivesoftware.smack.SmackException;
import org.jivesoftware.smack.packet.Message;
import org.jivesoftware.smack.tcp.XMPPTCPConnection;
import org.jivesoftware.smack.tcp.XMPPTCPConnectionConfiguration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collections;
import java.util.List;

/**
 * 基于XMPP协议，openfire推送服务器的消息推送器
 *
 * @author peiyu
 */
class OpenFirePusher implements Pusher {

    private static final Logger  LOG    = LoggerFactory.getLogger(OpenFirePusher.class);
    private              boolean isOpen = false;
    private final AbstractXMPPConnection connection;
    private final String                 serverName;
    private final String                 key;

    OpenFirePusher(final OpenFirePushConfig openFireConfig) {
        XMPPTCPConnectionConfiguration configuration = XMPPTCPConnectionConfiguration.builder()
                .setServiceName(openFireConfig.getServiceName())
                .setHost(openFireConfig.getServerIP())
                .setPort(openFireConfig.getServerPort())
                .setCompressionEnabled(true)
                .setSecurityMode(ConnectionConfiguration.SecurityMode.disabled)
                .setDebuggerEnabled(false)
                .setSendPresence(true)
                .setUsernameAndPassword(openFireConfig.getUserName(), openFireConfig.getPassword())
                .build();
        this.connection = new XMPPTCPConnection(configuration);
        this.serverName = openFireConfig.getServiceName();
        this.key = openFireConfig.getServerIP() + ":" + openFireConfig.getServerPort();
        init();
    }

    void init() {
        try {
            if (!this.connection.isConnected()) {
                this.connection.connect();
                this.connection.login();
            }
            this.isOpen = true;
        } catch (Exception e) {
            LOG.warn("连接openfire服务器异常", e);
            throw new FirePusherException(e);
        }
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
            for (FMessage message : messages) {
                LOG.debug("通过XMPP协议推送消息:{}", message.toString());
                Message msg = new Message(message.getTo() + "@" + this.serverName);
                msg.setBody(message.getContext());
                msg.setSubject(message.getTitle());
                try {
                    this.connection.sendStanza(msg);
                } catch (SmackException.NotConnectedException e) {
                    throw new FirePusherException(e);
                } catch (Exception e) {
                    LOG.warn("发送出现异常:{}", e.toString());
                    LOG.warn("继续发送其余消息");
                }
            }
        }
    }

    @Override
    public String getKey() {
        return this.key;
    }

    @Override
    public boolean isOpen() {
        this.isOpen = this.connection.isConnected();
        return this.isOpen;
    }

    @Override
    public void close() throws Exception {
        if (isOpen()) {
            this.connection.disconnect();
        }
        this.isOpen = false;
//        PusherFactory.me().releasePusher(this);
    }
}
