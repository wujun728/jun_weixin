package com.weixin.fastweixin.message.req;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public final class MenuEvent extends BaseEvent {

	private String eventKey;

	public MenuEvent(String eventKey) {
		super();
		this.eventKey = eventKey;
	}

	public String getEventKey() {
		return eventKey;
	}

	@Override
	public String getEvent() {
		return super.getEvent();
	}

	@Override
	public String toString() {
		return "MenuEvent [eventKey=" + eventKey + ", toUserName=" + toUserName + ", fromUserName=" + fromUserName + ", createTime=" + createTime
				+ ", msgType=" + msgType + "]";
	}

}
