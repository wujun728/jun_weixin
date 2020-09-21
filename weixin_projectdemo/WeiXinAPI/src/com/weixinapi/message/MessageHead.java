package com.weixinapi.message;

import java.util.Date;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import com.weixinapi.contract.FieldContract;

/**
 * 获取或设置消息头部内容
 * @author misswhen
 *
 */
public class MessageHead {
	private String toUserName;
	private String fromUserName;
	private String createTime;
	private String msgType;
	
	public MessageHead(){
		createTime = FieldContract.DATE_FORMAT.format(new Date());
	}
	
	public void read(Document document){
		toUserName = document.getElementsByTagName(FieldContract.TO_USER_NAME).item(0).getTextContent();
		fromUserName = document.getElementsByTagName(FieldContract.FROM_USER_NAME).item(0).getTextContent();
		createTime = document.getElementsByTagName(FieldContract.CREATE_TIME).item(0).getTextContent();
		msgType = document.getElementsByTagName(FieldContract.MSG_TYPE).item(0).getTextContent();
	}
	
	public void write(Element root, Document document){
		Element toUserNameElement = document.createElement(FieldContract.TO_USER_NAME);
		toUserNameElement.setTextContent(toUserName);
		Element fromUserNameElement = document.createElement(FieldContract.FROM_USER_NAME);
		fromUserNameElement.setTextContent(fromUserName);
		Element createTimeElement = document.createElement(FieldContract.CREATE_TIME);
		createTimeElement.setTextContent(createTime);
		Element msgTypeElement = document.createElement(FieldContract.MSG_TYPE);
		msgTypeElement.setTextContent(msgType);
		root.appendChild(toUserNameElement);
		root.appendChild(fromUserNameElement);
		root.appendChild(createTimeElement);
		root.appendChild(msgTypeElement);
	}

	public String getToUserName(){
		return toUserName;
	}
	public void setToUserName(String toUserName){
		this.toUserName = toUserName;
	}

	public String getFromUserName(){
		return fromUserName;
	}
	public void setFromUserName(String fromUserName){
		this.fromUserName = fromUserName;
	}

	public String getCreateTime(){
		return createTime;
	}
	public void setCreateTime(String createTime){
		this.createTime = createTime;
	}

	public String getMsgType(){
		return msgType;
	}
	public void setMsgType(String msgType){
		this.msgType = msgType;
	}
}
