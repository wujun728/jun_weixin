package com.weixinapi.handler;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import com.weixinapi.message.ImageMessage;
import com.weixinapi.message.LinkMessage;
import com.weixinapi.message.LocationMessage;
import com.weixinapi.message.TextMessage;
import com.weixinapi.message.VideoMeaasge;
import com.weixinapi.message.VoiceMessage;

public class DefaultHandler extends BaseHandler {
	private List<IMessageListener> iMessageListeners=new ArrayList<IMessageListener>();

	public static DefaultHandler newInstance(){
		return new DefaultHandler();
	}

	public void addIMessageListener(IMessageListener iMessageListener){
		iMessageListeners.add(iMessageListener);
	}

	public void removeOnHandleMessageListener(IMessageListener iMessageListener){
		iMessageListeners.remove(iMessageListener);
	}

	public void onTextMessage(TextMessage msg){
		IMessageListener currentListener;
		for (Iterator<IMessageListener> iterator = iMessageListeners.iterator(); iterator.hasNext(); currentListener.onTextMessage(msg))
			currentListener = iterator.next();
	}

	public void onImageMessage(ImageMessage msg){
		IMessageListener currentListener;
		for (Iterator<IMessageListener> iterator = iMessageListeners.iterator(); iterator.hasNext(); currentListener.onImageMessage(msg))
			currentListener = iterator.next();
	}

	public void onLinkMessage(LinkMessage msg){
		IMessageListener currentListener;
		for (Iterator<IMessageListener> iterator = iMessageListeners.iterator(); iterator.hasNext(); currentListener.onLinkMessage(msg))
			currentListener = iterator.next();
	}

	public void onLocationMessage(LocationMessage msg){
		IMessageListener currentListener;
		for (Iterator<IMessageListener> iterator = iMessageListeners.iterator(); iterator.hasNext(); currentListener.onLocationMessage(msg))
			currentListener = iterator.next();
	}
	
	public void onVoiceMessage(VoiceMessage msg){
		IMessageListener currentListener;
		for (Iterator<IMessageListener> iterator = iMessageListeners.iterator(); iterator.hasNext(); currentListener.onVoiceMessage(msg))
			currentListener = iterator.next();
	}

	public void onVideoMeaasge(VideoMeaasge msg){
		IMessageListener currentListener;
		for (Iterator<IMessageListener> iterator = iMessageListeners.iterator(); iterator.hasNext(); currentListener.onVideoMeaasge(msg))
			currentListener = iterator.next();
	}

	public void onErrorMsg(int errorCode){
		IMessageListener currentListener;
		for (Iterator<IMessageListener> iterator = iMessageListeners.iterator(); iterator.hasNext(); currentListener.onErrorMsg(errorCode))
			currentListener = iterator.next();
	}
}
