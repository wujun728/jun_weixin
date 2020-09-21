package com.jfinal.weixin.sdk.msg;

import org.junit.Assert;
import org.junit.Test;

import com.jfinal.weixin.sdk.msg.in.InMsg;
import com.jfinal.weixin.sdk.msg.in.InTextMsg;
import com.jfinal.weixin.sdk.msg.out.OutCustomMsg;
import com.jfinal.weixin.sdk.msg.out.OutTextMsg;
import com.jfinal.weixin.sdk.msg.out.OutVideoMsg;
import com.jfinal.weixin.sdk.msg.out.OutVoiceMsg;
import com.jfinal.weixin.sdk.msg.out.TransInfo;

public class OutMsgTest {

    @Test
    public void test1() {
        OutTextMsg msg = new OutTextMsg();
        msg.setToUserName("to james");
        msg.setFromUserName("from james");
        msg.setCreateTime(msg.now());
        msg.setContent("jfinal weixin 极速开发平台碉堡了");

        System.out.println();
        System.out.println(msg.toXml());
        InMsg inMsg = InMsgParser.parse(msg.toXml());
        Assert.assertTrue(inMsg instanceof InTextMsg);
    }

    @Test
    public void test2() {
        OutCustomMsg msg = new OutCustomMsg();
        msg.setToUserName("to james");
        msg.setFromUserName("from james");
        msg.setCreateTime(msg.now());

        System.out.println();
        System.out.println(msg.toXml());
    }

    @Test
    public void test3() {
        OutVoiceMsg msg = new OutVoiceMsg();
        msg.setToUserName("to james");
        msg.setFromUserName("from james");
        msg.setCreateTime(msg.now());
        msg.setMediaId("media_id");

        System.out.println();
        System.out.println(msg.toXml());
    }

    @Test
    public void test4() {
        OutVideoMsg msg = new OutVideoMsg();
        msg.setToUserName("to james");
        msg.setFromUserName("from james");
        msg.setCreateTime(msg.now());
        msg.setMediaId("media_id");

        System.out.println();
        System.out.println(msg.toXml());
    }

    @Test
    public void test5() {
        OutVoiceMsg msg = new OutVoiceMsg();
        msg.setToUserName("to james");
        msg.setFromUserName("from james");
        msg.setCreateTime(msg.now());
        msg.setMediaId("media_id");

        System.out.println();
        System.out.println(msg.toXml());
    }

    @Test
    public void test6() {
        OutCustomMsg msg = new OutCustomMsg();
        msg.setToUserName("to james");
        msg.setFromUserName("from james");
        msg.setCreateTime(msg.now());

        TransInfo transInfo = new TransInfo("test1@test");
        msg.setTransInfo(transInfo);

        System.out.println();
        System.out.println(msg.toXml());
    }

}
