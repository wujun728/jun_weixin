package com.weixin.fastweixin.message.req;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class TemplateMsgEvent extends BaseEvent {
	private String msgId;
	private String status;

	public TemplateMsgEvent() {
	}

	public TemplateMsgEvent(String msgId, String status) {
		this.msgId = msgId;
		this.status = status;
	}

	public String getMsgId() {
		return msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

}
