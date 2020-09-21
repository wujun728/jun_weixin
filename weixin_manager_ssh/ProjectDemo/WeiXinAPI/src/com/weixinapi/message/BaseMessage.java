package com.weixinapi.message;

import org.w3c.dom.Document;

/**
 * 消息基类
 * @author misswhen
 *
 */
public abstract class BaseMessage {
	protected MessageHead messageHead;
	
	public abstract void write(Document document);

	public abstract void read(Document document);

	protected String getElementContent(Document document, String element)
	{
		if (document.getElementsByTagName(element).getLength() > 0)
			return document.getElementsByTagName(element).item(0).getTextContent();
		else
			return null;
	}

	public MessageHead getMessageHead(){
		return messageHead;
	}
	public void setMessageHead(MessageHead messageHead){
		this.messageHead = messageHead;
	}

	public String getToUserName(){
		return messageHead.getToUserName();
	}
	public void setToUserName(String toUserName){
		messageHead.setToUserName(toUserName);
	}

	public String getFromUserName(){
		return messageHead.getFromUserName();
	}
	public void setFromUserName(String fromUserName){
		messageHead.setFromUserName(fromUserName);
	}

	public String getCreateTime(){
		return messageHead.getCreateTime();
	}
	public void setCreateTime(String createTime){
		messageHead.setCreateTime(createTime);
	}
}
