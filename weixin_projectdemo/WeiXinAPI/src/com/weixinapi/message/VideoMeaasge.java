package com.weixinapi.message;

import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.weixinapi.contract.FieldContract;

/**
 * 视频类型消息
 * @author misswhen
 *
 */
public class VideoMeaasge extends BaseMessage {
	private String msgId;
	private String mediaId;
	private String thumbMediaId;
	
	public VideoMeaasge(){
		messageHead = new MessageHead();
		messageHead.setMsgType(FieldContract.MSG_TYPE_VIDEO);
	}

	public VideoMeaasge(MessageHead messageHead){
		this.messageHead = messageHead;
	}
	
	public void read(Document document){
		msgId = getElementContent(document, FieldContract.MSG_ID);
		mediaId = getElementContent(document, FieldContract.MEDIA_ID);
		thumbMediaId = getElementContent(document, FieldContract.THUMBMEDIA_ID);
	}

	public void write(Document document){
		Element root = document.createElement(FieldContract.ROOT);
		messageHead.write(root, document);
		Element videoElement = document.createElement(FieldContract.VIDEO);
		Element mediaIdElement = document.createElement(FieldContract.MEDIA_ID);
		Element thumbMediaIdElement = document.createElement(FieldContract.THUMBMEDIA_ID);
		videoElement.appendChild(mediaIdElement);
		videoElement.appendChild(thumbMediaIdElement);
		root.appendChild(videoElement);
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

	public String getThumbMediaId(){
		return thumbMediaId;
	}
	public void setThumbMediaId(String thumbMediaId){
		this.thumbMediaId = thumbMediaId;
	}
}
