/**
 * Copyright (c) 2011-2014, James Zhan 詹波 (jfinal@126.com).
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.msg.in.event;

/**
 * <pre>
     接收 关注/取消关注事件
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;123456789&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[subscribe]]&gt;&lt;/Event&gt;
 &lt;/xml&gt;

     关注实测数据结果： 比官方文档多出一个 EventKey 标记
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[gh_e21b62f685f4]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[o5Ljujn78A_S0uk_WvAM_fKFEXm4]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1411785252&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[subscribe]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[]]&gt;&lt;/EventKey&gt;
 &lt;/xml&gt;

     取消关注实测数据结果：比官方文档多出一个 EventKey 标记
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[gh_e21b62f685f4]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[o5Ljujn78A_S0uk_WvAM_fKFEXm4]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1411785559&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[unsubscribe]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[]]&gt;&lt;/EventKey&gt;
 &lt;/xml&gt;
 </pre>
 */
@SuppressWarnings("serial")
public class InFollowEvent extends EventInMsg {
    // 订阅：subscribe
    public static final String EVENT_INFOLLOW_SUBSCRIBE = "subscribe";
    // 取消订阅：unsubscribe
    public static final String EVENT_INFOLLOW_UNSUBSCRIBE = "unsubscribe";

    public InFollowEvent(String toUserName, String fromUserName, Integer createTime, String event)
    {
        super(toUserName, fromUserName, createTime, event);
    }
}






