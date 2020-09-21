package com.wasoft.websocket.chat.bean;

public class SmsStatus{
	private long from;
	private long to;
	private String number;
	private String note;	
	private String status;
	
	public SmsStatus(long from, long to, String number, String note, String status){
		this.from = from;
		this.to = to;
		this.number = number;
		this.note = note;
		this.status = status;
	}

	public SmsStatus(){}
	
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

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getNote() {
		return note;
	}

	public void setNote(String note) {
		this.note = note;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
}
