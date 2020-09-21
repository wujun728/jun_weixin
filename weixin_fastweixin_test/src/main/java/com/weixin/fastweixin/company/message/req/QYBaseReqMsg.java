package com.weixin.fastweixin.company.message.req;

/**
 * 微信企业号普通消息事件基类
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYBaseReqMsg extends QYBaseReq {

	String msgId;

	public String getMsgId() {
		return msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}
}
