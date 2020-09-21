package com.weixin.fastweixin.company.message.req;

/**
 * 微信企业号菜单事件
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYMenuEvent extends QYBaseEvent {

	private String eventKey;

	public QYMenuEvent(String eventKey) {
		super();
		this.eventKey = eventKey;
	}

	public String getEventKey() {
		return eventKey;
	}

	public void setEventKey(String eventKey) {
		this.eventKey = eventKey;
	}

	@Override
	public String toString() {
		return "QYMenuEvent [eventKey=" + eventKey + ", toUserName=" + toUserName + ", fromUserName=" + fromUserName + ", createTime=" + createTime
				+ ", msgType=" + msgType + ", event=" + event + ", agentId=" + agentId + "]";
	}
}
