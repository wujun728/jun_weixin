package com.weixinapi.message;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.weixinapi.contract.FieldContract;

/**
 * 语音类型消息
 * @author misswhen
 *
 */
public class VoiceMessage extends BaseMessage {
	private String msgId;
	private String mediaId;
	private String format;
	private String recognition;

	public VoiceMessage(){
		messageHead = new MessageHead();
		messageHead.setMsgType(FieldContract.MSG_TYPE_VOICE);
	}

	public VoiceMessage(MessageHead messageHead){
		this.messageHead = messageHead;
	}
	
	public void read(Document document){
		msgId = getElementContent(document, FieldContract.MSG_ID);
		mediaId = getElementContent(document, FieldContract.MEDIA_ID);
		format = getElementContent(document, FieldContract.FORMAT);
		recognition = getElementContent(document, FieldContract.RECOGNITION);
	}

	public void write(Document document){
		Element root = document.createElement(FieldContract.ROOT);
		messageHead.write(root, document);
		Element voiceElement = document.createElement(FieldContract.VOICE);
		Element mediaIdElement = document.createElement(FieldContract.MEDIA_ID);
		voiceElement.appendChild(mediaIdElement);
		root.appendChild(voiceElement);
		document.appendChild(root);
	}
	
	public String getMsgId(){
		return msgId;
	}
	public void setMsgId(String msgId){
		this.msgId = msgId;
	}

	public String getMediaId(){
		return mediaId;
	}
	public void setMediaId(String mediaId){
		this.mediaId = mediaId;
	}

	public String getFormat(){
		return format;
	}
	public void setFormat(String format){
		this.format = format;
	}

	public String getRecognition(){
		return recognition;
	}
	public void setRecognition(String recognition){
		this.recognition = recognition;
	}
}
