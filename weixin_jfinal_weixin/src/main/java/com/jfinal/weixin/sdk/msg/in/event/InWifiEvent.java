/**
 * Copyright (c) 2011-2015, Unas 小强哥 (unas@qq.com).
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.msg.in.event;

/**
 * <pre>
     WIFI连网后下发消息  http://mp.weixin.qq.com/wiki/19/bac84e64da24f928c3e536c742d4e0b7.html
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;123456789&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[WifiConnected]]&gt;&lt;/Event&gt;
 &lt;ConnectTime&gt;0&lt;/ConnectTime&gt;
 &lt;ExpireTime&gt;0&lt;/ExpireTime&gt;
 &lt;VendorId&gt;![CDATA[3001224419]]&lt;/VendorId&gt;
 &lt;ShopId&gt;![CDATA[PlaceId]]&lt;/ShopId&gt;
 &lt;DeviceNo&gt;![CDATA[DeviceNo]]&lt;/DeviceNo&gt;
 &lt;/xml&gt;
 </pre>
 */
@SuppressWarnings("serial")
public class InWifiEvent extends EventInMsg {
    public static final String EVENT = "WifiConnected";
    private String connectTime;
    private String expireTime;
    private String vendorId;
    private String shopId;

    public String getConnectTime()
    {
        return connectTime;
    }

    public void setConnectTime(String connectTime)
    {
        this.connectTime = connectTime;
    }

    public String getExpireTime()
    {
        return expireTime;
    }

    public void setExpireTime(String expireTime)
    {
        this.expireTime = expireTime;
    }

    public String getVendorId()
    {
        return vendorId;
    }

    public void setVendorId(String vendorId)
    {
        this.vendorId = vendorId;
    }

    public String getShopId()
    {
        return shopId;
    }

    public void setShopId(String shopId)
    {
        this.shopId = shopId;
    }

    public String getDeviceNo()
    {
        return deviceNo;
    }

    public void setDeviceNo(String deviceNo)
    {
        this.deviceNo = deviceNo;
    }

    private String deviceNo;

    public InWifiEvent(String toUserName, String fromUserName, Integer createTime)
    {
        super(toUserName, fromUserName, createTime, EVENT);
    }


}






