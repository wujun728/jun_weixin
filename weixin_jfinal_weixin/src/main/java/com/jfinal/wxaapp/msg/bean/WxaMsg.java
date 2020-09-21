/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.msg.bean;

import java.io.Serializable;

import com.jfinal.wxaapp.msg.MsgModel;

@SuppressWarnings("serial")
public class WxaMsg implements Serializable {
    // 开发者微信号
    protected String toUserName;
    // 发送方帐号（一个OpenID）
    protected String fromUserName;
    // 消息创建时间 （整型）
    protected Integer createTime;
    /**
     * 消息类型
     * 1：text 文本消息
     * 2：image 图片消息
     * 3: Event 事件消息
     */
    protected String msgType;
    
    public WxaMsg(MsgModel msgModel) {
        this.toUserName = msgModel.getToUserName();
        this.fromUserName = msgModel.getFromUserName();
        this.createTime = msgModel.getCreateTime();
        this.msgType = msgModel.getMsgType();
    }

    public String getToUserName() {
        return toUserName;
    }
    public String getFromUserName() {
        return fromUserName;
    }
    public Integer getCreateTime() {
        return createTime;
    }
    public String getMsgType() {
        return msgType;
    }
}
