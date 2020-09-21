package com.jfinal.weixin.sdk.utils;

import org.junit.Assert;

import com.jfinal.weixin.sdk.msg.InMsgParser;
import com.jfinal.weixin.sdk.msg.in.InMsg;

public class DomTest {

    public static void test1() {
        String xml = "<xml><ToUserName><![CDATA[gh_5f58ae0646df]]></ToUserName>"
                + "<FromUserName><![CDATA[oy_CjjrWbbbBQxMGSZxpA48XgIbo]]></FromUserName>"
                + "<CreateTime>1449500550</CreateTime>"
                + "<MsgType><![CDATA[location]]></MsgType>"
                + "<Location_X>39.845342</Location_X>"
                + "<Location_Y>116.314655</Location_Y>"
                + "<Scale>15</Scale>"
                + "<Label><![CDATA[北京市丰台区花乡万芳园(二区)内(樊羊路东)]]></Label>"
                + "<MsgId>6225557458185254102</MsgId>"
                + "</xml>";

        InMsg in = InMsgParser.parse(xml);

        Assert.assertNotNull(in);
    }

    public static void test2() {
        String xml = "<xml>"
                + "<ToUserName><![CDATA[oy_CjjrWbbbBQxMGSZxpA48XgIbo]]></ToUserName>"
                + "<FromUserName><![CDATA[gh_5f58ae0646df]]></FromUserName>"
                + "<CreateTime>1449500550</CreateTime>"
                + "<MsgType><![CDATA[text]]></MsgType>"
                + "<Content><![CDATA[已收到地理位置消息:"
                + "location_X = 39.845342"
                + "location_Y = 116.314655"
                + "scale = 15"
                + "label = 北京市丰台区花乡万芳园(二区)内(樊羊路东)]]></Content>"
                + "</xml>";

        InMsg in = InMsgParser.parse(xml);
        Assert.assertNotNull(in);
    }

    public static void main(String[] args) {
        test1();
        test2();
    }
}
