package com.wasoft.websocket.chat;

import java.nio.CharBuffer;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.Session;

import com.wasoft.websocket.chat.bean.UserInfo;
import com.wasoft.websocket.util.Tool;

public class ChatSession implements IChatMessageIn{
	private Session session = null;
	
	public ChatSession(Session s){
		this.session = s;
	}
	
	@OnClose
    public void onClose() {
       
    }
	
    @OnMessage
    public void onMessage(String message) {       
        
    }
    
    @OnError
    public void onError(Throwable t) throws Throwable {
    	Tool.err("Chat Error: " + t.toString());
    }
    
	
	public void destroy(){}
	
	public IChatContainer getCwss(){return null;}
	
	public UserInfo getUi(){return null;}
	
	public void writeTextMessage(CharBuffer buffer)throws Exception{}
	
	public void forceClose(){}
	
	public void send(String msg){
		//this.session.getBasicRemote().sendText(msg);
	}
}
