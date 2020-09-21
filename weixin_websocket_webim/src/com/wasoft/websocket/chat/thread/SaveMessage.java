package com.wasoft.websocket.chat.thread;

import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.util.DBUtil;

public class SaveMessage implements Runnable{
	private Message m;
	public SaveMessage(Message m){
    	this.m = m;
    }
    public void run(){
    	DBUtil.saveMessage(this.m);
    }
}
