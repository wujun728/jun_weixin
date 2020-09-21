package com.hotlcc.wechat4j.handler;

import com.hotlcc.wechat4j.Wechat;
import com.hotlcc.wechat4j.enums.ExitType;

/**
 * 退出事件处理器
 *
 * @author Allen
 */
public interface ExitEventHandler {
    /**
     * 针对所有类型的退出事件
     *
     * @param wechat 微信客户端
     * @param type   退出类型
     * @param t      异常
     */
    void handleAllType(Wechat wechat, ExitType type, Throwable t);

    /**
     * 针对错误导致的退出事件
     *
     * @param wechat 微信客户端
     */
    void handleErrorExitEvent(Wechat wechat);

    /**
     * 针对远程人为导致的退出事件
     *
     * @param wechat 微信客户端
     */
    void handleRemoteExitEvent(Wechat wechat);

    /**
     * 针对本地任务导致的退出事件
     *
     * @param wechat 微信客户端
     */
    void handleLocalExitEvent(Wechat wechat);
}
