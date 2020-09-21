/**
 * Copyright (c) 2011-2017, Javen Zhou (javendev@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.jfinal.weixin.sdk.api;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.AccessTokenApi;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.utils.Charsets;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 
 * @author Javen
 * https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1500374289_66bvB
 */
public class SubscribeMsgApi {
	private static String subscribe = "https://api.weixin.qq.com/cgi-bin/message/template/subscribe?access_token=";
    private static String authorize_uri = "https://mp.weixin.qq.com/mp/subscribemsg?action=get_confirm";
    
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
	 * @return ApiResult 发送json数据示例: 
{
	"touser" : "OPENID",
	"template_id" :
	"TEMPLATE_ID",
	"url" : "URL",
	"scene" : "SCENE",
	"title" :
	"TITLE",
	"data" : {
		"content" : {
			"value" : "VALUE",
			"color" :
			"COLOR"
		}
	}
}
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
		SubscribeInfo subscribeInfo = SubscribeInfo.Builder().setTouser(openId).setTemplate_id(templateId).setUrl(url)
				.setScene(String.valueOf(scene)).setTitle(title)
				.setData(Data.Builder().setContent(Content.Builder().setValue(value).setColor(color).build()).build());
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

	public static SubscribeInfo Builder() {
		return new SubscribeInfo();
	}

	public SubscribeInfo build() {
		if (StrKit.isBlank(touser)) {
			throw new IllegalStateException("touser is null");
		}
		if (StrKit.isBlank(template_id)) {
			throw new IllegalStateException("template_id is null");
		}
		if (StrKit.isBlank(url)) {
			throw new IllegalStateException("url is null");
		}
		if (StrKit.isBlank(scene)) {
			throw new IllegalStateException("scene is null");
		}
		if (StrKit.isBlank(title)) {
			throw new IllegalStateException("title is null");
		}
		if (!StrKit.notNull(data)) {
			throw new IllegalStateException("data is null");
		}
		return new SubscribeInfo(touser, template_id, url, scene, title, data);
	}

	private SubscribeInfo() {

	}

	private SubscribeInfo(String touser, String template_id, String url, String scene, String title, Data data) {
		this.touser = touser;
		this.template_id = template_id;
		this.url = url;
		this.scene = scene;
		this.title = title;
		this.data = data;
	}

	public String getTouser() {
		return touser;
	}

	public SubscribeInfo setTouser(String touser) {
		this.touser = touser;
		return this;
	}

	public String getTemplate_id() {
		return template_id;
	}

	public SubscribeInfo setTemplate_id(String template_id) {
		this.template_id = template_id;
		return this;
	}

	public String getUrl() {
		return url;
	}

	public SubscribeInfo setUrl(String url) {
		this.url = url;
		return this;
	}

	public String getScene() {
		return scene;
	}

	public SubscribeInfo setScene(String scene) {
		this.scene = scene;
		return this;
	}

	public String getTitle() {
		return title;
	}

	public SubscribeInfo setTitle(String title) {
		this.title = title;
		return this;
	}

	public Data getData() {
		return data;
	}

	public SubscribeInfo setData(Data data) {
		this.data = data;
		return this;
	}

}

class Data {
	private Content content;

	public static Data Builder() {
		return new Data();
	}

	public Data build() {
		if (!StrKit.notNull(content)) {
			throw new IllegalStateException("content is null");
		}
		return new Data(content);
	}

	private Data() {
	}

	private Data(Content content) {
		this.content = content;
	}

	public Content getContent() {
		return content;
	}

	public Data setContent(Content content) {
		this.content = content;
		return this;
	}

}

class Content {
	private String value;
	private String color;

	public static Content Builder() {
		return new Content();
	}

	public Content build() {
		if (StrKit.isBlank(value)) {
			throw new IllegalStateException("value is null");
		}
		if (StrKit.isBlank(color)) {
			throw new IllegalStateException("color is null");
		}
		return new Content(value, color);
	}

	private Content() {
	}

	private Content(String value, String color) {
		this.value = value;
		this.color = color;
	}

	public String getValue() {
		return value;
	}

	public Content setValue(String value) {
		this.value = value;
		return this;
	}

	public String getColor() {
		return color;
	}

	public Content setColor(String color) {
		this.color = color;
		return this;
	}

}
