package com.weixin.fastweixin.company.message.req;

/**
 * 信企业号文本消息事件
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYTextReqMsg extends QYBaseReqMsg {

	private String content;

	public QYTextReqMsg(String content) {
		super();
		this.content = content;
		setMsgType(QYReqType.TEXT);
	}

	public String getContent() {
		return content;
	}

	@Override
	public String toString() {
		return "QYTextReqMsg [content=" + content + ", toUserName=" + toUserName + ", fromUserName=" + fromUserName + ", createTime=" + createTime
				+ ", msgType=" + msgType + ", msgId=" + msgId + ", agentId=" + agentId + "]";
	}
}
