package com.weixinapi.handler;

import com.weixinapi.message.ImageMessage;
import com.weixinapi.message.LinkMessage;
import com.weixinapi.message.LocationMessage;
import com.weixinapi.message.TextMessage;
import com.weixinapi.message.VideoMeaasge;
import com.weixinapi.message.VoiceMessage;

public interface IMessageListener {
	public abstract void onTextMessage(TextMessage textMessage);

	public abstract void onImageMessage(ImageMessage imageMessage);

	public abstract void onLinkMessage(LinkMessage linkMessage);

	public abstract void onLocationMessage(LocationMessage LocationMessage);

	public abstract void onVoiceMessage(VoiceMessage VoiceMessage);
	
	public abstract void onVideoMeaasge(VideoMeaasge videoMeaasge);

	public abstract void onErrorMsg(int i);
}
