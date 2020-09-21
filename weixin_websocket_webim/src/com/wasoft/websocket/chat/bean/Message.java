package com.wasoft.websocket.chat.bean;

import com.google.gson.Gson;

public class Message implements Cloneable{
	private long from;
	private long to;
	private long join;
	private long out;
	private int type;	
	private String title;
	private String content;	
	
	@Override
	public Message clone(){
		try{
			return (Message)super.clone();	
		}
		catch(Exception e){
			return new Message(this.from, this.to, this.join, this.out,this.type,this.title,this.content);
		}
	}

	public Message(long from, long to, long join, long out, int type, String title, String content){
		this.from = from;
		this.to = to;
		this.join = join;
		this.out = out;
		this.type = type;
		this.title = title;
		this.content = content;
	}

	public Message(){}
	
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
	public long getOut() {
		return out;
	}
	public void setOut(long out) {
		this.out = out;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	public static void main(String[] agrs){
		String json = "{'content':'0','type':1,'to':0}";
		Message in = new Gson().fromJson(json, Message.class);
		System.out.println(in.getType());
	}
	
}
