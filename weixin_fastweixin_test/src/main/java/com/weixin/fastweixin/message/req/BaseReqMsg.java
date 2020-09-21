package com.weixin.fastweixin.message.req;

/**
 * 微信请求信息基类
 * 
 * @author 	Lian
 * @date	2016年4月11日
 * @since	1.0	
 */
public class BaseReqMsg extends BaseReq {
	String msgId;

	public String getMsgId() {
		return msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}

}
