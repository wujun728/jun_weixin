package com.wasoft.websocket.chat.bean;

import java.util.Date;

public class Msg extends Message {
	private Date dt;

	
	public Msg(Message m) {
		super(m.getFrom(), m.getTo(), m.getJoin(), m.getOut(), m.getType(), m.getTitle(), m.getContent());
		this.dt = new Date();
	}

	public Date getDt() {
		return dt;
	}

	public void setDt(Date dt) {
		this.dt = dt;
	}
}
