package com.weixinapi.message;

import org.w3c.dom.Document;

import com.weixinapi.contract.FieldContract;

/**
 * 位置类型消息
 * @author misswhen
 *
 */
public class LocationMessage extends BaseMessage {
	private String msgId;
	private String scale;
	private String label;
	private String location_X;
	private String location_Y;

	public LocationMessage(){
		messageHead = new MessageHead();
		messageHead.setMsgType(FieldContract.MSG_TYPE_LOCATION);
	}

	public LocationMessage(MessageHead messageHead){
		this.messageHead = messageHead;
	}

	public void read(Document document){
		msgId = document.getElementsByTagName(FieldContract.MSG_ID).item(0).getTextContent();
		scale = document.getElementsByTagName(FieldContract.SCALE).item(0).getTextContent();
		label = document.getElementsByTagName(FieldContract.LABEL).item(0).getTextContent();
		location_X = document.getElementsByTagName(FieldContract.LOCATION_X).item(0).getTextContent();
		location_Y = document.getElementsByTagName(FieldContract.LOCATION_Y).item(0).getTextContent();
	}
	
	public void write(Document document1){ }
	
	public String getMsgId(){
		return msgId;
	}
	public void setMsgId(String msgId){
		this.msgId = msgId;
	}
	
	public String getScale(){
		return scale;
	}
	public void setScale(String scale){
		this.scale = scale;
	}

	public String getLabel(){
		return label;
	}
	public void setLabel(String label){
		this.label = label;
	}

	public String getLocation_X(){
		return location_X;
	}
	public void setLocation_X(String location_X){
		this.location_X = location_X;
	}

	public String getLocation_Y(){
		return location_Y;
	}
	public void setLocation_Y(String location_Y){
		this.location_Y = location_Y;
	}
}
