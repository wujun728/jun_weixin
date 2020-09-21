package com.jfinal.weixin.sdk.msg;

import com.jfinal.weixin.sdk.msg.in.InTextMsg;

public class InMsgParserTest {

    public static void main(String[] args) {
        String xml =
            "<xml>\n" +
                "<ToUserName><![CDATA[James]]></ToUserName>\n" +
                "<FromUserName><![CDATA[JFinal]]></FromUserName>\n" +
                "<CreateTime>1348831860</CreateTime>\n" +
                "<MsgType><![CDATA[text]]></MsgType>\n" +
                    "<Content><![CDATA[this is a test]]></Content>\n" +
                    "<MsgId>1234567890123456</MsgId>\n" +
            "</xml>";

        InTextMsg msg = (InTextMsg) InMsgParser.parse(xml);
        System.out.println(msg.getToUserName());
        System.out.println(msg.getFromUserName());
        System.out.println(msg.getContent());

        String xml_2 =
                "<xml>\n" +
                    "<ToUserName><![CDATA[James]]></ToUserName>\n" +
                    "<FromUserName><![CDATA[JFinal]]></FromUserName>\n" +
                    "<CreateTime>1348831860</CreateTime>\n" +
                    "<MsgType><![CDATA[text]]></MsgType>\n" +
                        "<Content><![CDATA[this is a test]]></Content>\n" +
                        "<MsgId>1234567890123456</MsgId>\n" +
                "</xml>";

        InTextMsg msg1 = (InTextMsg) InMsgParser.parse(xml_2);
        System.out.println(msg1.getToUserName());
        System.out.println(msg1.getFromUserName());
        System.out.println(msg1.getContent());
    }
}
