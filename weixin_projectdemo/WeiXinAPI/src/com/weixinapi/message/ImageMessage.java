package com.weixinapi.message;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.weixinapi.contract.FieldContract;

/**
 * 图片类型消息
 * @author misswhen
 *
 */
public class ImageMessage extends BaseMessage {
	private String msgId;
	private String picUrl;
	private String mediaId;

	public ImageMessage(){
		messageHead = new MessageHead();
		messageHead.setMsgType(FieldContract.MSG_TYPE_IMAGE);
	}

	public ImageMessage(MessageHead messageHead){
		this.messageHead = messageHead;
	}
	
	public void read(Document document){
		msgId = document.getElementsByTagName(FieldContract.MSG_ID).item(0).getTextContent();
		picUrl = document.getElementsByTagName(FieldContract.PIC_URL).item(0).getTextContent();
		mediaId = getElementContent(document, FieldContract.MEDIA_ID);
	}

	public void write(Document document){
		Element root = document.createElement(FieldContract.ROOT);
		messageHead.write(root, document);
		Element imageElement = document.createElement(FieldContract.IMAGE);
		Element mediaIdElement = document.createElement(FieldContract.MEDIA_ID);
		imageElement.appendChild(mediaIdElement);
		root.appendChild(imageElement);
		document.appendChild(root);
	}

	public String getMsgId(){
		return msgId;
	}
	public void setMsgId(String msgId){
		this.msgId = msgId;
	}

	public String getPicUrl(){
		return picUrl;
	}
	public void setPicUrl(String picUrl){
		this.picUrl = picUrl;
	}

	public String getMediaId(){
		return mediaId;
	}

	public void setMediaId(String mediaId){
		this.mediaId = mediaId;
	}
}
