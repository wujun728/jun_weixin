/**
 * Copyright (c) 2011-2015, Unas 小强哥 (unas@qq.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.msg.out;

import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.msg.in.InMsg;

/**
 * <pre>
 转发多客服消息
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[toUser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[fromUser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;12345678&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[transfer_customer_service]]&gt;&lt;/MsgType&gt;
 &lt;/xml&gt;
 或者转发到指定客服
 &lt;xml&gt;
 &lt;ToUserName&gt;&lt;![CDATA[touser]]&gt;&lt;/ToUserName&gt;
 &lt;FromUserName&gt;&lt;![CDATA[fromuser]]&gt;&lt;/FromUserName&gt;
 &lt;CreateTime&gt;1399197672&lt;/CreateTime&gt;
 &lt;MsgType&gt;&lt;![CDATA[transfer_customer_service]]&gt;&lt;/MsgType&gt;
 &lt;TransInfo&gt;
 &lt;KfAccount&gt;&lt;![CDATA[test1@test]]&gt;&lt;/KfAccount&gt;
 &lt;/TransInfo&gt;
 &lt;/xml&gt;
 </pre>
*/
@SuppressWarnings("serial")
public class OutCustomMsg extends OutMsg {

    private TransInfo transInfo;

    public OutCustomMsg() {
        this.msgType = "transfer_customer_service";
    }

    public OutCustomMsg(InMsg inMsg) {
        super(inMsg);
        this.msgType = "transfer_customer_service";
    }

    @Override
    protected void subXml(StringBuilder sb) {
        if (null != transInfo && StrKit.notBlank(transInfo.getKfAccount())) {
            sb.append("<TransInfo>\n");
            sb.append("<KfAccount><![CDATA[").append(transInfo.getKfAccount()).append("]]></KfAccount>\n");
            sb.append("</TransInfo>\n");
        }
    }

    public TransInfo getTransInfo() {
        return transInfo;
    }

    public void setTransInfo(TransInfo transInfo) {
        this.transInfo = transInfo;
    }

}


