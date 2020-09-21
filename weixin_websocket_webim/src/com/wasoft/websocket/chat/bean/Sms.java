package com.wasoft.websocket.chat.bean;

public class Sms {

	private long userid;
	private String phone;
	private String msg;
	public Sms(){}
	public Sms(long userid, String phone, String msg) {
		super();
		this.userid = userid;
		this.phone = phone;
		this.msg = msg;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public long getUserid() {
		return userid;
	}
	public void setUserid(long userid) {
		this.userid = userid;
	}

}
