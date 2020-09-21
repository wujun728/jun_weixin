package com.wasoft.websocket.chat.bean;

public class GroupUser {
	long userid;	
	String nickname;
	boolean online;
	int sex;
	int status;	
	
	public GroupUser(){}
	public GroupUser(long userid, String nickname){
		this.userid = userid;
		this.nickname = nickname;
		this.online = false;
		this.status = 0;
		this.sex = 0;
	}
	
	
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public long getUserid() {
		return userid;
	}
	public void setUserid(long userid) {
		this.userid = userid;
	}	
	
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public boolean isOnline() {
		return online;
	}
	public void setOnline(boolean online) {
		this.online = online;
	}
	
}
