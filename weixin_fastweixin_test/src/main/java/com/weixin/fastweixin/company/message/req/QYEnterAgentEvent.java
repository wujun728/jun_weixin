package com.weixin.fastweixin.company.message.req;

/**
 * 微信企业号进入应用事件消息
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYEnterAgentEvent extends QYMenuEvent {

	public QYEnterAgentEvent() {
		super("");
	}

	@Override
	public String toString() {
		return "QYMenuEvent [eventKey=" + getEventKey() + ", toUserName=" + toUserName + ", fromUserName=" + fromUserName + ", createTime="
				+ createTime + ", msgType=" + msgType + ", event=" + event + ", agentId=" + agentId + "]";
	}
}
