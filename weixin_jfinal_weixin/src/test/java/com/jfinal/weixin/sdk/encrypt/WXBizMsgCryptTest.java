package com.jfinal.weixin.sdk.encrypt;

import com.jfinal.weixin.sdk.utils.XmlHelper;
import junit.framework.Assert;
import org.junit.Test;
import org.xml.sax.SAXException;

import javax.xml.parsers.ParserConfigurationException;
import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;

public class WXBizMsgCryptTest {
    String encodingAesKey = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFG";
    String token = "pamtest";
    String timestamp = "1409304348";
    String nonce = "xxxxxx";
    String appId = "wxb11529c136998cb6";
    String replyMsg = "我是中文abcd123";
    String xmlFormat = "<xml><ToUserName><![CDATA[toUser]]></ToUserName><Encrypt><![CDATA[%1$s]]></Encrypt></xml>";
    String afterAesEncrypt = "jn1L23DB+6ELqJ+6bruv21Y6MD7KeIfP82D6gU39rmkgczbWwt5+3bnyg5K55bgVtVzd832WzZGMhkP72vVOfg==";
    String randomStr = "aaaabbbbccccdddd";

    String replyMsg2 = "<xml><ToUserName><![CDATA[oia2Tj我是中文jewbmiOUlr6X-1crbLOvLw]]></ToUserName><FromUserName><![CDATA[gh_7f083739789a]]></FromUserName><CreateTime>1407743423</CreateTime><MsgType><![CDATA[video]]></MsgType><Video><MediaId><![CDATA[eYJ1MbwPRJtOvIEabaxHs7TX2D-HV71s79GUxqdUkjm6Gs2Ed1KF3ulAOA9H1xG0]]></MediaId><Title><![CDATA[testCallBackReplyVideo]]></Title><Description><![CDATA[testCallBackReplyVideo]]></Description></Video></xml>";
    String afterAesEncrypt2 = "jn1L23DB+6ELqJ+6bruv23M2GmYfkv0xBh2h+XTBOKVKcgDFHle6gqcZ1cZrk3e1qjPQ1F4RsLWzQRG9udbKWesxlkupqcEcW7ZQweImX9+wLMa0GaUzpkycA8+IamDBxn5loLgZpnS7fVAbExOkK5DYHBmv5tptA9tklE/fTIILHR8HLXa5nQvFb3tYPKAlHF3rtTeayNf0QuM+UW/wM9enGIDIJHF7CLHiDNAYxr+r+OrJCmPQyTy8cVWlu9iSvOHPT/77bZqJucQHQ04sq7KZI27OcqpQNSto2OdHCoTccjggX5Z9Mma0nMJBU+jLKJ38YB1fBIz+vBzsYjrTmFQ44YfeEuZ+xRTQwr92vhA9OxchWVINGC50qE/6lmkwWTwGX9wtQpsJKhP+oS7rvTY8+VdzETdfakjkwQ5/Xka042OlUb1/slTwo4RscuQ+RdxSGvDahxAJ6+EAjLt9d8igHngxIbf6YyqqROxuxqIeIch3CssH/LqRs+iAcILvApYZckqmA7FNERspKA5f8GoJ9sv8xmGvZ9Yrf57cExWtnX8aCMMaBropU/1k+hKP5LVdzbWCG0hGwx/dQudYR/eXp3P0XxjlFiy+9DMlaFExWUZQDajPkdPrEeOwofJb";

    @Test
    public void testNormal() throws ParserConfigurationException, SAXException, IOException {
        try {
            WXBizMsgCrypt pc = new WXBizMsgCrypt(token, encodingAesKey, appId);
            String afterEncrpt = pc.encryptMsg(replyMsg, timestamp, nonce);

            XmlHelper xmlHelper = XmlHelper.of(afterEncrpt);
            String encrypt = xmlHelper.getString("//Encrypt");
            String msgSignature = xmlHelper.getString("//MsgSignature");

            Assert.assertNotSame(encrypt, "");
            Assert.assertNotSame(msgSignature, "");

            String fromXML = String.format(xmlFormat, encrypt);

            // 第三方收到公众号平台发送的消息
            String afterDecrpt = pc.decryptMsg(msgSignature, timestamp, nonce, fromXML);
            assertEquals(replyMsg, afterDecrpt);
        } catch (AesException e) {
            e.printStackTrace();
            fail("正常流程，怎么就抛出异常了？解决方案：http://git.oschina.net/jfinal/jfinal-weixin/wikis/%E6%B6%88%E6%81%AF%E7%9A%84%E5%8A%A0%E8%A7%A3%E5%AF%86%E6%8E%A5%E5%8F%A3JCE%E6%97%A0%E9%99%90%E5%88%B6%E6%9D%83%E9%99%90%E7%AD%96%E7%95%A5");
        }
    }

    @Test
    public void testAesEncrypt() {
        try {
            WXBizMsgCrypt pc = new WXBizMsgCrypt(token, encodingAesKey, appId);
            assertEquals(afterAesEncrypt, pc.encrypt(randomStr, replyMsg));
        } catch (AesException e) {
            fail(e.getMessage());
        }
    }

    @Test
    public void testAesEncrypt2() {
        try {
            WXBizMsgCrypt pc = new WXBizMsgCrypt(token, encodingAesKey, appId);
            assertEquals(afterAesEncrypt2, pc.encrypt(randomStr, replyMsg2));
        } catch (AesException e) {
            fail(e.getMessage());
        }
    }

    @Test
    public void testIllegalAesKey() {
        try {
            new WXBizMsgCrypt(token, "abcde", appId);
        } catch (AesException e) {
            assertEquals(AesException.IllegalAesKey, e.getCode());
            return;
        }
    }

    @Test
    public void testValidateSignatureError() throws ParserConfigurationException, SAXException,
            IOException {
        try {
            WXBizMsgCrypt pc = new WXBizMsgCrypt(token, encodingAesKey, appId);
            String afterEncrpt = pc.encryptMsg(replyMsg, timestamp, nonce);

            XmlHelper xmlHelper = XmlHelper.of(afterEncrpt);
            String encrypt = xmlHelper.getString("//Encrypt");

            Assert.assertNotSame(encrypt, "");

            String fromXML = String.format(xmlFormat, encrypt);
            pc.decryptMsg("12345", timestamp, nonce, fromXML); // 这里签名错误
        } catch (AesException e) {
            assertEquals(AesException.ValidateSignatureError, e.getCode());
            return;
        }
    }

    @Test
    public void testVerifyUrl() throws AesException {
        WXBizMsgCrypt wxcpt = new WXBizMsgCrypt("QDG6eK",
                "jWmYm7qr5nMoAUwZRjGtBxmz3KA1tkAj3ykkR6q2B2C", "wx5823bf96d3bd56c7");
        String verifyMsgSig = "5c45ff5e21c57e6ad56bac8758b79b1d9ac89fd3";
        String timeStamp = "1409659589";
        String nonce = "263014780";
        String echoStr = "P9nAzCzyDtyTWESHep1vC5X9xho/qYX3Zpb4yKa9SKld1DsH3Iyt3tP3zNdtp+4RPcs8TgAE7OaBO+FZXvnaqQ==";
        wxcpt.verifyUrl(verifyMsgSig, timeStamp, nonce, echoStr);
        // 只要不抛出异常就好
    }
}
