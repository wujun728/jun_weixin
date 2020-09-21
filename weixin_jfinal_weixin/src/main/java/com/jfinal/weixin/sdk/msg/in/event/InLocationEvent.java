/**
 * Copyright (c) 2011-2014, James Zhan 詹波 (jfinal@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.msg.in.event;

/**
 * <pre>
    上报地理位置事件
 &lt;xml&gt;
        &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
        &lt;FromUserName&gt;&lt;![CDATA[fromUser]]&gt;&lt;/FromUserName&gt;
        &lt;CreateTime&gt;123456789&lt;/CreateTime&gt;
        &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
        &lt;Event&gt;&lt;![CDATA[LOCATION]]&gt;&lt;/Event&gt;
        &lt;Latitude&gt;23.137466&lt;/Latitude&gt;
        &lt;Longitude&gt;113.352425&lt;/Longitude&gt;
        &lt;Precision&gt;119.385040&lt;/Precision&gt;
 &lt;/xml&gt;
 * </pre>
 */
@SuppressWarnings("serial")
public class InLocationEvent extends EventInMsg {

    private String latitude;
    private String longitude;
    private String precision;

    public InLocationEvent(String toUserName, String fromUserName, Integer createTime, String event) {
        super(toUserName, fromUserName, createTime, event);
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getPrecision() {
        return precision;
    }

    public void setPrecision(String precision) {
        this.precision = precision;
    }
}




