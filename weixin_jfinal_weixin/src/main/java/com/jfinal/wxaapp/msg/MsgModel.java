/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.msg;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 消息模型
 * 
 * fastjson本身支持首字母大写的转换
 * 
 * Jackson采用注解的形式支持
 * 
 * @author L.cm
 *
 */
public class MsgModel {
    @JsonProperty("ToUserName")
    @XPath("//ToUserName")
    private String toUserName;
    @JsonProperty("FromUserName")
    @XPath("//FromUserName")
    private String fromUserName;
    @JsonProperty("CreateTime")
    @XPath("//CreateTime")
    private Integer createTime;
    @JsonProperty("MsgType")
    @XPath("//MsgType")
    private String msgType;
    
    // 文本消息
    @JsonProperty("Content")
    @XPath("//Content")
    private String content;
    @JsonProperty("MsgId")
    @XPath("//MsgId")
    private Long msgId;
    
    // 图片消息
    @JsonProperty("PicUrl")
    @XPath("//PicUrl")
    private String picUrl;
    @JsonProperty("MediaId")
    @XPath("//MediaId")
    private String mediaId;
    
    // 事件消息
    @JsonProperty("Event")
    @XPath("//Event")
    private String event;
    @JsonProperty("SessionFrom")
    @XPath("//SessionFrom")
    private String sessionFrom;
    
    public String getToUserName() {
        return toUserName;
    }
    public void setToUserName(String toUserName) {
        this.toUserName = toUserName;
    }
    public String getFromUserName() {
        return fromUserName;
    }
    public void setFromUserName(String fromUserName) {
        this.fromUserName = fromUserName;
    }
    public Integer getCreateTime() {
        return createTime;
    }
    public void setCreateTime(Integer createTime) {
        this.createTime = createTime;
    }
    public String getMsgType() {
        return msgType;
    }
    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Long getMsgId() {
        return msgId;
    }
    public void setMsgId(Long msgId) {
        this.msgId = msgId;
    }
    public String getPicUrl() {
        return picUrl;
    }
    public void setPicUrl(String picUrl) {
        this.picUrl = picUrl;
    }
    public String getMediaId() {
        return mediaId;
    }
    public void setMediaId(String mediaId) {
        this.mediaId = mediaId;
    }
    public String getEvent() {
        return event;
    }
    public void setEvent(String event) {
        this.event = event;
    }
    public String getSessionFrom() {
        return sessionFrom;
    }
    public void setSessionFrom(String sessionFrom) {
        this.sessionFrom = sessionFrom;
    }
    
    @Override
    public String toString() {
        return JsonUtils.toJson(this);
    }
}
