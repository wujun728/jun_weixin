/**
 * Copyright (c) 2011-2014, James Zhan 詹波 (jfinal@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.msg.in.event;

/**
 * <pre>
 扫描带参数二维码事件
 1. 用户未关注时，进行关注后的事件推送
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;123456789&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[subscribe]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[qrscene_123123]]&gt;&lt;/EventKey&gt;
 &lt;Ticket&gt;&lt;![CDATA[TICKET]]&gt;&lt;/Ticket&gt;
 &lt;/xml&gt;

 2. 用户已关注时的事件推送
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;123456789&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[SCAN]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[SCENE_VALUE]]&gt;&lt;/EventKey&gt;
 &lt;Ticket&gt;&lt;![CDATA[TICKET]]&gt;&lt;/Ticket&gt;
 &lt;/xml&gt;
 </pre>
 */
@SuppressWarnings("serial")
public class InQrCodeEvent extends EventInMsg {

    // 1. 用户未关注时，进行关注后的事件推送： subscribe
    public static final String EVENT_INQRCODE_SUBSCRIBE = "subscribe";
    // 2. 用户已关注时的事件推送： SCAN
    public static final String EVENT_INQRCODE_SCAN = "SCAN";

    // 1. 用户未关注时，进行关注后的事件推送： qrscene_123123
    // 2. 用户已关注时的事件推送： SCENE_VALUE
    private String eventKey;
    private String ticket;

    public InQrCodeEvent(String toUserName, String fromUserName, Integer createTime, String event) {
        super(toUserName, fromUserName, createTime, event);
    }

    public String getEventKey() {
        return eventKey;
    }

    public void setEventKey(String eventKey) {
        this.eventKey = eventKey;
    }

    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }
}




