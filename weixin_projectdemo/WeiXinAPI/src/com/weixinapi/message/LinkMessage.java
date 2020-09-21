package com.weixinapi.message;

import org.w3c.dom.Document;

import com.weixinapi.contract.FieldContract;

/**
 * 链接类型消息
 * @author misswhen
 *
 */
public class LinkMessage extends BaseMessage {
	private String msgId;
	private String title;
	private String url;
	private String description;

	public LinkMessage(){
		messageHead = new MessageHead();
		messageHead.setMsgType(FieldContract.MSG_TYPE_LINK);
	}

	public LinkMessage(MessageHead messageHead){
		this.messageHead = messageHead;
	}

	public void read(Document document){
		msgId = document.getElementsByTagName(FieldContract.MSG_ID).item(0).getTextContent();
		title = document.getElementsByTagName(FieldContract.TITLE).item(0).getTextContent();
		url = document.getElementsByTagName(FieldContract.URL).item(0).getTextContent();
		description = document.getElementsByTagName(FieldContract.DESCRITION).item(0).getTextContent();
	}
	
	public void write(Document document1){ }
	
	public String getMsgId(){
		return msgId;
	}
	public void setMsgId(String msgId){
		this.msgId = msgId;
	}

	public String getTitle(){
		return title;
	}
	public void setTitle(String title){
		this.title = title;
	}
	
	public String getUrl(){
		return url;
	}
	public void setUrl(String url){
		this.url = url;
	}

	public String getDescription(){
		return description;
	}
	public void setDescription(String description){
		this.description = description;
	}
}
