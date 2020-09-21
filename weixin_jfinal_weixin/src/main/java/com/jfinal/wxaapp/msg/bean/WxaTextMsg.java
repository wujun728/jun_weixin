/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.msg.bean;

import com.jfinal.wxaapp.msg.MsgModel;

/**
 * 文本消息
 * @author L.cm
 *
 */
public class WxaTextMsg extends WxaMsg {
    private static final long serialVersionUID = -5656735737008641147L;

    // 文本消息内容
    private String content;
    // 消息id，64位整型
    private Long msgId;
    
    public WxaTextMsg(MsgModel msgModel) {
        super(msgModel);
        this.msgId = msgModel.getMsgId();
        this.content = msgModel.getContent();
    }

    public String getContent() {
        return content;
    }

    public Long getMsgId() {
        return msgId;
    }
}
