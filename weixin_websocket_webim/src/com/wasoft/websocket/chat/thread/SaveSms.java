package com.wasoft.websocket.chat.thread;

import com.wasoft.websocket.chat.bean.SmsStatus;
import com.wasoft.websocket.util.DBUtil;

public class SaveSms implements Runnable{
	private SmsStatus ss;
	public SaveSms(SmsStatus ss){
    	this.ss = ss;
    }
    public void run(){
    	DBUtil.saveSms(this.ss);
    }
}
