package com.weixin.fastweixin.message.req;

/**
 * 微信事件基类
 * 
 * @author 	Lian
 * @date	2016年4月11日
 * @since	1.0	
 */
public class BaseEvent extends BaseReq {
	private String event;

	public BaseEvent() {
		setMsgType(ReqType.EVENT);
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}
}
