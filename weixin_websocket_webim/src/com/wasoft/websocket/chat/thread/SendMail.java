package com.wasoft.websocket.chat.thread;

import com.wasoft.websocket.Constants;
import com.wasoft.websocket.mail.MailManager;
import com.wasoft.websocket.util.DBCache;

public class SendMail implements Runnable{
	private long userid;
	private String subject;
	private String body;
	public SendMail(long userid, String subject, String body){
    	this.userid = userid;
    	this.subject = subject;
    	this.body = body;    	
    }
    public void run(){
    	String from = Constants.mail_sys_user;
    	String to = DBCache.getMail(this.userid);
    	MailManager.sendMail(from, to, this.subject, this.body);
    }
}
