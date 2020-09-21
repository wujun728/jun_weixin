package com.weixinapi.message;

/**
 * 发送消息附加内容
 * @author misswhen
 *
 */
public class MessageData {
	private String title;
	private String url;
	private String picUrl;
	private String description;
	
	public MessageData(){ }

	public MessageData(String title, String url, String picUrl, String description){
		this.title = title;
		this.url = url;
		this.picUrl = picUrl;
		this.description = description;
	}

	public String getTitle(){
		return title;
	}
	public void setTitle(String title){
		this.title = title;
	}
	
	public String getUrl(){
		return url;
	}
	public void setUrl(String url){
		this.url = url;
	}
	
	public String getPicUrl(){
		return picUrl;
	}
	public void setPicUrl(String picUrl){
		this.picUrl = picUrl;
	}

	public String getDescription(){
		return description;
	}
	public void setDescription(String description){
		this.description = description;
	}
}
