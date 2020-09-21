/**
 * Copyright (c) 2011-2015, Unas 小强哥 (unas@qq.com).
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.msg.in.event;

/**
 * <pre>
     接入会话：
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[touser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[fromuser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1399197672&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[kf_create_session]]&gt;&lt;/Event&gt;
 &lt;KfAccount&gt;&lt;![CDATA[test1@test]]&gt;&lt;/KfAccount&gt;
 &lt;/xml&gt;

     关闭会话：
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[touser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[fromuser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1399197672&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[kf_close_session]]&gt;&lt;/Event&gt;
 &lt;KfAccount&gt;&lt;![CDATA[test1@test]]&gt;&lt;/KfAccount&gt;
 &lt;/xml&gt;

     转接会话：
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[touser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[fromuser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1399197672&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[kf_switch_session]]&gt;&lt;/Event&gt;
 &lt;FromKfAccount&gt;&lt;![CDATA[test1@test]]&gt;&lt;/FromKfAccount&gt;
 &lt;ToKfAccount&gt;&lt;![CDATA[test2@test]]&gt;&lt;/ToKfAccount&gt;
 &lt;/xml&gt;
 </pre>
 */
@SuppressWarnings("serial")
public class InCustomEvent extends EventInMsg {
    // 接入会话：kf_create_session
    public static final String EVENT_INCUSTOM_KF_CREATE_SESSION = "kf_create_session";
    // 关闭会话：kf_close_session
    public static final String EVENT_INCUSTOM_KF_CLOSE_SESSION = "kf_close_session";
    // 转接会话：kf_switch_session
    public static final String EVENT_INCUSTOM_KF_SWITCH_SESSION = "kf_switch_session";

    private String kfAccount;
    private String toKfAccount;

    public InCustomEvent(String toUserName, String fromUserName, Integer createTime, String event)
    {
        super(toUserName, fromUserName, createTime, event);
    }

    public String getKfAccount()
    {
        return kfAccount;
    }

    public void setKfAccount(String kfAccount)
    {
        this.kfAccount = kfAccount;
    }

    public String getToKfAccount()
    {
        return toKfAccount;
    }

    public void setToKfAccount(String toKfAccount)
    {
        this.toKfAccount = toKfAccount;
    }

}






