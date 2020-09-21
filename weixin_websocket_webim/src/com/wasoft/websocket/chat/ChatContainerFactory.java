package com.wasoft.websocket.chat;

import com.wasoft.websocket.Constants;
import com.wasoft.websocket.util.Tool;

public class ChatContainerFactory {
	
	private static IChatContainer ChatContainer = null;
	public static String WS_IMPL_TC7 = "tc7";
	public static String WS_IMPL_JSR356 = "jsr356";
	
	public static void init(){
		if (WS_IMPL_TC7.equals(Constants.websocket)) {
			Tool.log("get Tomcat7 websocket engine.");
			ChatContainer = ChatWebSocketServlet.getInstance();
		} 
		else if (WS_IMPL_JSR356.equals(Constants.websocket)) {
			Tool.log("get jsr356 websocket engine.");
			ChatContainer = ChatAnnotation.getInstance();
		} 
		else {
			Tool.err("init ChatContainer failed!");
		}		
	}
	
	public static IChatContainer getChatContainer(){
		if (ChatContainer == null){
			init();
		}
		return ChatContainer;
	}
}
