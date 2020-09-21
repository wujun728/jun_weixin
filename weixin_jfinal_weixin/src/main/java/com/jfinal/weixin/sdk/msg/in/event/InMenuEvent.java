/**
 * Copyright (c) 2011-2014, James Zhan 詹波 (jfinal@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.msg.in.event;

/**
 * <pre>
    自定义菜单事件
 1： 点击菜单拉取消息时的事件推送
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;123456789&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[CLICK]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[EVENTKEY]]&gt;&lt;/EventKey&gt;
 &lt;/xml&gt;

 2： 点击菜单跳转链接时的事件推送
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;123456789&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[VIEW]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[www.jfinal.com]]&gt;&lt;/EventKey&gt;
 &lt;/xml&gt;

 3. scancode_push：扫码推事件
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412075451&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[scancode_push]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[rselfmenu_0_1]]&gt;&lt;/EventKey&gt;
 &lt;ScanCodeInfo&gt;
 &lt;ScanType&gt;&lt;![CDATA[qrcode]]&gt;&lt;/ScanType&gt;
 &lt;ScanResult&gt;&lt;![CDATA[http://www.jfinal.com]]&gt;&lt;/ScanResult&gt;
 &lt;/ScanCodeInfo&gt;
 &lt;/xml&gt;

 4. scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1446526359&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[scancode_waitmsg]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[2_1]]&gt;&lt;/EventKey&gt;
 &lt;ScanCodeInfo&gt;
 &lt;ScanType&gt;&lt;![CDATA[qrcode]]&gt;&lt;/ScanType&gt;
 &lt;ScanResult&gt;&lt;![CDATA[http://www.jfinal.com]]&gt;&lt;/ScanResult&gt;
 &lt;/ScanCodeInfo&gt;
 &lt;/xml&gt;

 5. pic_sysphoto：弹出系统拍照发图，这个后台其实收不到该菜单的消息，点击它后，调用的是手机里面的照相机功能，而照相以后再发过来时，就收到的是一个图片消息了
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412135923&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[image]]&gt;&lt;/MsgType&gt;
 &lt;PicUrl&gt;&lt;![CDATA[http://www.jfinal.com]]&gt;&lt;/PicUrl&gt;
 &lt;MsgId&gt;6065077606992462276&lt;/MsgId&gt;
 &lt;MediaId&gt;&lt;![CDATA[mediaId]]&gt;&lt;/MediaId&gt;
 &lt;/xml&gt;

 6. pic_photo_or_album方式，先推送菜单事件，再推送图片消息
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412075614&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[pic_photo_or_album]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[rselfmenu_1_1]]&gt;&lt;/EventKey&gt;
 &lt;SendPicsInfo&gt;
 &lt;Count&gt;1&lt;/Count&gt;
 &lt;PicList&gt;
 &lt;item&gt;
 &lt;PicMd5Sum&gt;&lt;![CDATA[md5]]&gt;&lt;/PicMd5Sum&gt;
 &lt;/item&gt;
 &lt;/PicList&gt;
 &lt;/SendPicsInfo&gt;
 &lt;/xml&gt;

 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412075618&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[image]]&gt;&lt;/MsgType&gt;
 &lt;PicUrl&gt;&lt;![CDATA[http://www.jfinal.com]]&gt;&lt;/PicUrl&gt;
 &lt;MsgId&gt;6064818598989675467&lt;/MsgId&gt;
 &lt;MediaId&gt;&lt;![CDATA[mediaId]]&gt;&lt;/MediaId&gt;
 &lt;/xml&gt;

 7. pic_weixin ,下面是一次推送3张相片时的数据，再推送图片消息
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412075552&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[pic_weixin]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[rselfmenu_1_2]]&gt;&lt;/EventKey&gt;
 &lt;SendPicsInfo&gt;
 &lt;Count&gt;3&lt;/Count&gt;
 &lt;PicList&gt;
 &lt;item&gt;
 &lt;PicMd5Sum&gt;&lt;![CDATA[md5]]&gt;&lt;/PicMd5Sum&gt;
 &lt;/item&gt;
 &lt;item&gt;
 &lt;PicMd5Sum&gt;&lt;![CDATA[md5]]&gt;&lt;/PicMd5Sum&gt;
 &lt;/item&gt;
 &lt;item&gt;
 &lt;PicMd5Sum&gt;&lt;![CDATA[md5]]&gt;&lt;/PicMd5Sum&gt;
 &lt;/item&gt;
 &lt;/PicList&gt;
 &lt;/SendPicsInfo&gt;
 &lt;/xml&gt;
 回应上述消息，用户收不到，但微信会继续推送3个图片消息给接口
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412075562&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[image]]&gt;&lt;/MsgType&gt;
 &lt;PicUrl&gt;&lt;![CDATA[http://www.jfinal.com]]&gt;&lt;/PicUrl&gt;
 &lt;MsgId&gt;6064818358471506877&lt;/MsgId&gt;
 &lt;MediaId&gt;&lt;![CDATA[mediaId]]&gt;&lt;/MediaId&gt;
 &lt;/xml&gt;

 8. location_select：弹出地理位置选择器，菜单的响应用户收不到，在用户发送位置之后，会再推送一个地理位置消息功能给用户
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412075681&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[event]]&gt;&lt;/MsgType&gt;
 &lt;Event&gt;&lt;![CDATA[location_select]]&gt;&lt;/Event&gt;
 &lt;EventKey&gt;&lt;![CDATA[rselfmenu_2_0]]&gt;&lt;/EventKey&gt;
 &lt;SendLocationInfo&gt;
 &lt;Location_X&gt;&lt;![CDATA[22.538145]]&gt;&lt;/Location_X&gt;
 &lt;Location_Y&gt;&lt;![CDATA[113.952298]]&gt;&lt;/Location_Y&gt;
 &lt;Scale&gt;&lt;![CDATA[13]]&gt;&lt;/Scale&gt;
 &lt;Label&gt;&lt;![CDATA[label]]&gt;&lt;/Label&gt;
 &lt;Poiname&gt;&lt;![CDATA[]]&gt;&lt;/Poiname&gt;
 &lt;/SendLocationInfo&gt;
 &lt;/xml&gt;

 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[FromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1412075681&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[location]]&gt;&lt;/MsgType&gt;
 &lt;Location_X&gt;22.538145&lt;/Location_X&gt;
 &lt;Location_Y&gt;113.952298&lt;/Location_Y&gt;
 &lt;Scale&gt;13&lt;/Scale&gt;
 &lt;Label&gt;&lt;![CDATA[label]]&gt;&lt;/Label&gt;
 &lt;MsgId&gt;6064818869572615123&lt;/MsgId&gt;
 &lt;/xml&gt;

 9. media_id：下发消息（除文本消息）

 10. view_limited：跳转图文消息URL
 </pre>
 */
@SuppressWarnings("serial")
public class InMenuEvent extends EventInMsg {
    // 1. 点击菜单拉取消息时的事件推送： CLICK
    public static final String EVENT_INMENU_CLICK = "CLICK";
    // 2. 点击菜单跳转链接时的事件推送： VIEW
    public static final String EVENT_INMENU_VIEW = "VIEW";
    // 3. scancode_push：扫码推事件
    public static final String EVENT_INMENU_SCANCODE_PUSH = "scancode_push";
    // 4. scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框
    public static final String EVENT_INMENU_scancode_waitmsg = "scancode_waitmsg";
    // 5. pic_sysphoto：弹出系统拍照发图
    public static final String EVENT_INMENU_PIC_SYSPHOTO = "pic_sysphoto";
    // 6. pic_photo_or_album：弹出拍照或者相册发图，先推送菜单事件，再推送图片消息
    public static final String EVENT_INMENU_PIC_PHOTO_OR_ALBUM = "pic_photo_or_album";
    // 7. pic_weixin：弹出微信相册发图器
    public static final String EVENT_INMENU_PIC_WEIXIN = "pic_weixin";
    // 8. location_select：弹出地理位置选择器
    public static final String EVENT_INMENU_LOCATION_SELECT = "location_select";
    // 9. media_id：下发消息（除文本消息）
    public static final String EVENT_INMENU_MEDIA_ID = "media_id";
    // 10. view_limited：跳转图文消息URL
    public static final String EVENT_INMENU_VIEW_LIMITED = "view_limited";

    private String eventKey;
    private ScanCodeInfo scanCodeInfo;

    public InMenuEvent(String toUserName, String fromUserName, Integer createTime,String event) {
        super(toUserName, fromUserName, createTime, event);
    }

    public String getEventKey() {
        return eventKey;
    }

    public void setEventKey(String eventKey) {
        this.eventKey = eventKey;
    }

    public ScanCodeInfo getScanCodeInfo() {
        return scanCodeInfo;
    }

    public void setScanCodeInfo(ScanCodeInfo scanCodeInfo) {
        this.scanCodeInfo = scanCodeInfo;
    }

}



