package com.jfinal.weixin.sdk.msg.in.card;

import com.jfinal.weixin.sdk.utils.XmlHelper;

/**
 * 卡券消息解析接口
 * @author L.cm
 */
public interface ICardMsgParse {
    /**
     * 分而治之
     * @param xmlHelper xml解析工具
     */
    void parse(XmlHelper xmlHelper);
}
