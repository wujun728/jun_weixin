package com.jfinal.weixin.demo;

import java.io.UnsupportedEncodingException;

import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.SubscribeMsgApi;
import com.jfinal.weixin.sdk.jfinal.ApiController;

public class SubscribeMsgController extends ApiController{
	
	public void index(){
		try {
			String authorizeURL = SubscribeMsgApi.getAuthorizeURL("123"
					, "模板ID"
					, "http://xx/subscribemsg/callBack", "123");
			System.out.println(authorizeURL);
			redirect(authorizeURL);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public void send(){
		ApiResult subscribe = SubscribeMsgApi.subscribe("openId",
				"模板ID", "http://www.qq.com",
				123, "一次性订阅消息测试", "测试一次性订阅消息 -By Javen", "#1111");
		
		renderText(subscribe.getJson());
	}
	
	public void callBack(){
		String openid = getPara("openid");
		String template_id = getPara("template_id");
		String action = getPara("action");
		String scene = getPara("scene");
		
		System.out.println(openid+" "+template_id+" "+action+" "+scene);
		renderText(openid+" "+template_id+" "+action+" "+scene);
	}
}
