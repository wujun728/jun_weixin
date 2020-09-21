package com.wasoft.websocket.mail;

import com.wasoft.websocket.Constants;

public class MailManager {

	public static void sendMail(String from, String to, String subject, String body){
		sendMail sMail = new sendMail();
		sMail.setNeedAuth(Config.auth);
		sMail.setNamePass(Config.user, Config.pass);
		sMail.setFrom(from);
		sMail.setTo(to);
		sMail.setSubject(subject);
		sMail.setBody(body);		
		//sMail.setCopyTo("luojun76@google.com");
		sMail.sendout();
	}
	public static void main(String[] args) {
		sendMail("admin@atwasoft.net", "luojun@atwasoft.net", "邮件测试", "不用回复");
	}
}

class Config {
	public static String hostname = Constants.mail_server;
	public static String sys_user = Constants.mail_sys_user;
	public static boolean auth = Constants.mail_auth;
	public static String user = Constants.mail_user;
	public static String pass = Constants.mail_pass;
}