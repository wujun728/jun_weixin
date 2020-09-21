/**
 * Copyright (c) 2011-2017, Javen Zhou (javendev@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.javen.weixin.api;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.AccessTokenApi;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.utils.Charsets;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;
/**
 * 微信一次性订阅消息
 * @author Javen
 * 2017年8月6日
 */
public class SubscribeMsgApi {
	private static String subscribe = "https://api.weixin.qq.com/cgi-bin/message/template/subscribe?access_token=";
    private static String authorize_uri = "https://mp.weixin.qq.com/mp/subscribemsg?action=get_confirm";
    /***
     * 获取授权URL
     * @param scene
     * @param template_id
     * @param redirectUri
     * @param reserved
     * @return
     * @throws UnsupportedEncodingException
     */
    public static String getAuthorizeURL(String scene, String template_id,String redirectUri, String reserved) throws UnsupportedEncodingException {
    	StringBuffer sbf = new StringBuffer();
    	sbf.append(authorize_uri).append("&appid=").append(ApiConfigKit.getAppId())
    	.append("&scene=").append(scene)
    	.append("&template_id=").append(template_id)
    	.append("&redirect_uri=").append(URLEncoder.encode(redirectUri, Charsets.UTF_8.name()).replace("+", "%20"));
    	if (StrKit.notBlank(reserved)) {
    		sbf.append("&reserved=").append(reserved);
    	}
    	sbf.append("#wechat_redirect");
     
        return sbf.toString();
    }
    
	/**
	 * 发送一次性订阅消息
	 * 
	 * @param jsonStr
	 *            json字符串
	 * @return ApiResult 发送json数据示例: { "touser" : "OPENID", "template_id" :
	 *         "TEMPLATE_ID", "url" : "URL", "scene" : "SCENE", "title" :
	 *         "TITLE", "data" : { "content" : { "value" : "VALUE", "color" :
	 *         "COLOR" } } }
	 * 
	 */
	public static ApiResult subscribe(String jsonStr) {
		String jsonResult = HttpUtils.post(subscribe + AccessTokenApi.getAccessTokenStr(), jsonStr);
		return new ApiResult(jsonResult);
	}
	
	public static ApiResult subscribe(SubscribeInfo subscribeInfo) {
		return new ApiResult(JsonKit.toJson(subscribeInfo));
	}
	
	public static ApiResult subscribe(String openId, String templateId, String url, int scene, String title,
			String value, String color) {
		SubscribeInfo subscribeInfo = new SubscribeInfo.Builder()
				.setTouser(openId).setTemplate_id(templateId).setUrl(url)
				.setScene(String.valueOf(scene)).setTitle(title)
				.setData(new Data.Builder()
						.setContent(new Content.Builder()
								.setColor(color).setValue(value)
								.create())
						.create())
				.create();
		System.out.println(JsonUtils.toJson(subscribeInfo));				
		return subscribe(JsonUtils.toJson(subscribeInfo));
	}
}

class SubscribeInfo {
	private String touser;
	private String template_id;
	private String url;
	private String scene;
	private String title;
	private Data data;
	
	public static class Builder{
		private String touser;
		private String template_id;
		private String url;
		private String scene;
		private String title;
		private Data data;
		
		public Builder setTouser(String touser) {
			this.touser = touser;
			return this;
		}
		public Builder setTemplate_id(String template_id) {
			this.template_id = template_id;
			return this;
		}
		public Builder setUrl(String url) {
			this.url = url;
			return this;
		}
		public Builder setScene(String scene) {
			this.scene = scene;
			return this;
		}
		public Builder setTitle(String title) {
			this.title = title;
			return this;
		}
		public Builder setData(Data data) {
			this.data = data;
			return this;
		}
		public SubscribeInfo create(){    
            return new SubscribeInfo(this);    
        }
	}
	

	private SubscribeInfo(Builder builder) {
		if (StrKit.isBlank(builder.touser)) {
			throw new IllegalStateException("touser is null");
		}
		if (StrKit.isBlank(builder.template_id)) {
			throw new IllegalStateException("template_id is null");
		}
		if (StrKit.isBlank(builder.url)) {
			throw new IllegalStateException("url is null");
		}
		if (StrKit.isBlank(builder.scene)) {
			throw new IllegalStateException("scene is null");
		}
		if (StrKit.isBlank(builder.title)) {
			throw new IllegalStateException("title is null");
		}
		if (!StrKit.notNull(builder.data)) {
			throw new IllegalStateException("data is null");
		}
		
		this.touser = builder.touser;
		this.template_id = builder.template_id;
		this.url = builder.url;
		this.scene = builder.scene;
		this.title = builder.title;
		this.data = builder.data;
	}

	public String getTouser() {
		return touser;
	}

	public String getTemplate_id() {
		return template_id;
	}

	public String getUrl() {
		return url;
	}

	public String getScene() {
		return scene;
	}

	public String getTitle() {
		return title;
	}

	public Data getData() {
		return data;
	}
}

class Data {
	private Content content;

	public static class Builder {
		private Content content;

		public Builder setContent(Content content) {
			this.content = content;
			return this;
		}
		public Data create(){    
	       return new Data(this);    
	    }    
	}

	private Data(Builder builder) {
		if (!StrKit.notNull(builder.content)) {
			throw new IllegalStateException("content is null");
		}
		this.content = builder.content;
	}

	public Content getContent() {
		return content;
	}


}

class Content {
	private String value;
	private String color;

	public static class  Builder{
		private String value;
		private String color;
		
		public Builder setValue(String value) {
			this.value = value;
			return this;
		}
		public Builder setColor(String color) {
			this.color = color;
			return this;
		}
		
		public Content create(){
			return new Content(this);
		}
		
	}

	private Content(Builder builder) {
		if (StrKit.isBlank(builder.value)) {
			throw new IllegalStateException("value is null");
		}
		if (StrKit.isBlank(builder.color)) {
			throw new IllegalStateException("color is null");
		}
		this.value = builder.value;
		this.color = builder.color;
	}

	public String getValue() {
		return value;
	}

	public String getColor() {
		return color;
	}
}
