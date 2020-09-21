package com.github.sd4324530.firePusher;

import com.github.sd4324530.firePusher.exception.FirePusherException;

import java.util.List;

/**
 * 消息推送器接口
 *
 * @author peiyu
 */
public interface Pusher extends AutoCloseable {
    /**
     * 推送一条消息
     *
     * @param message 消息
     * @throws FirePusherException 推送异常
     */
    void push(FMessage message) throws FirePusherException;

    /**
     * 推送一批消息
     *
     * @param messages 消息列表
     * @throws FirePusherException 推送异常
     */
    void push(List<FMessage> messages) throws FirePusherException;

    /**
     * 获取推送器唯一标识
     * @return 推送器唯一标识
     */
    String getKey();

    /**
     * 获取当前推送器是否还可用
     * @return 是否可用
     */
    boolean isOpen();
}
