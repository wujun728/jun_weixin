package com.hotlcc.wechat4j.handler;

import com.hotlcc.wechat4j.Wechat;
import com.hotlcc.wechat4j.model.ReceivedMsg;

/**
 * 接收消息的消息处理器
 *
 * @author Allen
 */
public interface ReceivedMsgHandler {
    /**
     * 处理所有类型的消息
     *
     * @param wechat 微信客户端
     * @param msg    接收的消息
     */
    void handleAllType(Wechat wechat, ReceivedMsg msg);
}
