/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.msg.bean;

import com.jfinal.wxaapp.msg.MsgModel;

/**
 * 图片消息
 * @author L.cm
 *
 */
public class WxaImageMsg extends WxaMsg {
    private static final long serialVersionUID = 7044451698431281586L;

    private String picUrl;
    private String mediaId;
    private Long msgId;
    
    public WxaImageMsg(MsgModel msgModel) {
        super(msgModel);
        this.msgId = msgModel.getMsgId();
        this.picUrl = msgModel.getPicUrl();
        this.mediaId = msgModel.getMediaId();
    }

    public String getPicUrl() {
        return picUrl;
    }
    public String getMediaId() {
        return mediaId;
    }
    public Long getMsgId() {
        return msgId;
    }
}
