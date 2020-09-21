package com.javen.controller;

import java.io.UnsupportedEncodingException;

import com.javen.weixin.api.SubscribeMsgApi;
import com.jfinal.kit.PropKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.jfinal.ApiController;

public class SubscribeMsgController extends ApiController{
	
	
	public void index(){
		try {
			String authorizeURL = SubscribeMsgApi.getAuthorizeURL("123"
					, PropKit.get("templateId")
					, PropKit.get("domain")+"/subscribemsg/callBack", null);
			System.out.println(authorizeURL);
			redirect(authorizeURL);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
	
	public void send(){
		// oKovkw5pRgaz8QhM5oocT3mfKYiA
		ApiResult subscribe = SubscribeMsgApi.subscribe("oKovkw4Dz528QOnbikCfoOtgpXS8",
				PropKit.get("templateId"), "http://www.qq.com",
				123, "一次性订阅消息测试", "测试一次性订阅消息 -By Javen", "#111111");
		
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
