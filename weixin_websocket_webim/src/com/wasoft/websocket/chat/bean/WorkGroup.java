package com.wasoft.websocket.chat.bean;

public class WorkGroup {
	private long id;
	private String f_name;
	private String f_note;
	private long f_createUser;
	
	public WorkGroup(){}
	
	public WorkGroup(long id, long f_createUser, String f_name, String f_note){
		this.id = id;		
		this.f_createUser = f_createUser;
		this.f_name = f_name;
		this.f_note = f_note;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getF_name() {
		return f_name;
	}
	public void setF_name(String f_name) {
		this.f_name = f_name;
	}
	public String getF_note() {
		return f_note;
	}
	public void setF_note(String f_note) {
		this.f_note = f_note;
	}
	public long getF_createUser() {
		return f_createUser;
	}
	public void setF_createUser(long f_createUser) {
		this.f_createUser = f_createUser;
	}
}
