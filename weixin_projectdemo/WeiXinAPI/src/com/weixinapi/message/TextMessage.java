package com.weixinapi.message;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.weixinapi.contract.FieldContract;

/**
 * 文本类型消息
 * @author misswhen
 *
 */
public class TextMessage extends BaseMessage {
	private String msgId;
	private String content;
	
	public TextMessage(){
		messageHead = new MessageHead();
		messageHead.setMsgType(FieldContract.MSG_TYPE_TEXT);
	}

	public TextMessage(MessageHead messageHead){
		this.messageHead = messageHead;
	}

	public void read(Document document){
		msgId = document.getElementsByTagName(FieldContract.MSG_ID).item(0).getTextContent();
		content = document.getElementsByTagName(FieldContract.CONTENT).item(0).getTextContent();
	}
	
	public void write(Document document){
		Element root = document.createElement(FieldContract.ROOT);
		messageHead.write(root, document);
		Element contentElement = document.createElement(FieldContract.CONTENT);
		contentElement.setTextContent(content);
		root.appendChild(contentElement);
		document.appendChild(root);
	}
	
	public String getMsgId(){
		return msgId;
	}
	public void setMsgId(String msgId){
		this.msgId = msgId;
	}

	public String getContent(){
		return content;
	}
	public void setContent(String content){
		this.content = content;
	}
}
