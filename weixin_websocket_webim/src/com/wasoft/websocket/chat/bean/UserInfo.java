package com.wasoft.websocket.chat.bean;

import com.mixky.toolkit.DateTool;

public class UserInfo {
	private long from;
	private long to;
	private long join;
	private long userid;
	private String nickname;
	private String title;
	private String picname = "";
	private String zw = "";
	private String mobile = "";
	private String bm = "";
	private String addr = "";
	private int sex = 0;//0:male, 1:female
	private int status = 0;
	private long loginTime;	
	private String lt = DateTool.formatDate(null, DateTool.FORMAT_DATETIME);//loginTime
	
	public UserInfo(){}

	public UserInfo(long from, long to, long join, String title, String picname, String zw, String mobile, String bm, String addr, int sex, int status) {
		super();
		this.from = from;
		this.to = to;
		this.join = join;
		this.title = title;
		this.picname = picname;
		this.zw = zw;
		this.mobile = mobile;
		this.bm = bm;
		this.addr = addr;
		this.sex = sex;
		this.status = status;
		this.lt = DateTool.formatDate(null, DateTool.FORMAT_DATETIME);
	}
	
	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getSex() {
		return sex;
	}

	public void setSex(int sex) {
		this.sex = sex;
	}
	
	public String getLt() {
		return lt;
	}

	public void setLt(String lt) {
		this.lt = lt;
	}

	public String getAddr() {
		return addr;
	}

	public void setAddr(String addr) {
		this.addr = addr;
	}

	public String getBm() {
		return bm;
	}
	public void setBm(String bm) {
		this.bm = bm;
	}
	public String getZw() {
		return zw;
	}
	public void setZw(String zw) {
		this.zw = zw;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public long getFrom() {
		return from;
	}
	public void setFrom(long from) {
		this.from = from;
	}
	public long getTo() {
		return to;
	}
	public void setTo(long to) {
		this.to = to;
	}
	public long getJoin() {
		return join;
	}
	public void setJoin(long join) {
		this.join = join;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getPicname() {
		return picname;
	}
	public void setPicname(String picname) {
		this.picname = picname;
	}
	
	public long getUserid() {
		return userid;
	}
	public String getNickname() {
		return nickname;
	}
	public long getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(long loginTime) {
		this.loginTime = loginTime;
	}

	public void setUserid(long userid) {
		this.userid = userid;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
}
