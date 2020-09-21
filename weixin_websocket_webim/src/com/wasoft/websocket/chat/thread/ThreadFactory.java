package com.wasoft.websocket.chat.thread;

import com.google.gson.Gson;
import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.chat.bean.SmsStatus;
import com.wasoft.websocket.util.Tool;

public class ThreadFactory{	
	public static void init(){
		Tool.log("start ThreadFactory");		
	}
	
	//保存消息
	public static void saveMessage(Message m){
		saveMsg(m);
		/*
    	try{
        	Message _m = m.clone();
        	Tool.log("save message to db: " + new Gson().toJson(_m)); 
        	new Thread(new SaveMessage(_m)).start();
    	}
    	catch(Exception e){
    		Tool.err(e.getMessage());
    	}
    	*/
    }
    
	public static void saveMsg(Message m){
		try{new Thread(new SaveMsg(m)).start();}catch(Exception e){Tool.err(e.getMessage());}
	}
	
	public static void saveSms(SmsStatus ss){
       	Tool.log("save sms to db: " + new Gson().toJson(ss)); 
    	try{new Thread(new SaveSms(ss)).start();}catch(Exception e){Tool.err(e.getMessage());}
    }
    
	public static void saveDuration(long userid, long duration, long lt, long dt){           	
    	try{new Thread(new SaveDuration(userid, duration, lt, dt)).start();}catch(Exception e){Tool.err(e.getMessage());}
    }
	
	public static void sendMail(long userid, String subject, String body){
		try{new Thread(new SendMail(userid, subject, body)).start();}catch(Exception e){Tool.err(e.getMessage());}
	}
}
