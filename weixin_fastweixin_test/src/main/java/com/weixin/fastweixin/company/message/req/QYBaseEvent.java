package com.weixin.fastweixin.company.message.req;

/**
 * 微信企业号事件消息基类
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYBaseEvent extends QYBaseReq {

	String event;

	public QYBaseEvent() {
		setMsgType(QYReqType.EVENT);
	}

	public String getEvent() {
		return event;
	}

	public void setEvent(String event) {
		this.event = event;
	}
}
