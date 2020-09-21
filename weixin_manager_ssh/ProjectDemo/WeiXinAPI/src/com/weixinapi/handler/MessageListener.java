package com.weixinapi.handler;

import com.weixinapi.message.ImageMessage;
import com.weixinapi.message.LinkMessage;
import com.weixinapi.message.LocationMessage;
import com.weixinapi.message.TextMessage;
import com.weixinapi.message.VideoMeaasge;
import com.weixinapi.message.VoiceMessage;

public class MessageListener implements IMessageListener {
	public void onTextMessage(TextMessage textMessage){ }

	public void onImageMessage(ImageMessage imageMessage){ }

	public void onLinkMessage(LinkMessage linkMessage){ }

	public void onLocationMessage(LocationMessage locationMessage){ }

	public void onVoiceMessage(VoiceMessage voiceMessage){ }

	public void onVideoMeaasge(VideoMeaasge videoMeaasge){ }
	
	public void onErrorMsg(int i){ }
}
