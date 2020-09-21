package com.jfinal.weixin.sdk.msg.in;

import com.jfinal.weixin.sdk.utils.XmlHelper;

/**
 * 没有找到对应的消息类型
 */
@SuppressWarnings("serial")
public class InNotDefinedMsg extends InMsg {
    /**
     * 新增xmlHelper，用于用户扩展。
     * 对于不支持的消息类型中，获取xml中想要的参数。
     */
    protected transient XmlHelper xmlHelper;
    
    public InNotDefinedMsg(String toUserName, String fromUserName, Integer createTime, String msgType) {
        super(toUserName, fromUserName, createTime, msgType);
    }

    public XmlHelper getXmlHelper() {
        return xmlHelper;
    }

    public void setXmlHelper(XmlHelper xmlHelper) {
        this.xmlHelper = xmlHelper;
    }

}
