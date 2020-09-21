package com.wasoft.websocket.chat;

import java.nio.CharBuffer;

import com.wasoft.websocket.chat.bean.UserInfo;

/**
 * 消息入口 
 *
 */
public interface IChatMessageIn {

	public void destroy();
	
	public IChatContainer getCwss();
	
	public UserInfo getUi();
	
	public void writeTextMessage(CharBuffer buffer)throws Exception;
	
	public void forceClose();
	
	public void send(String msg);
}
