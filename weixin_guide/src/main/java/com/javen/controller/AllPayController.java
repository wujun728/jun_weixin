package com.javen.controller;

import com.jfinal.core.Controller;
import com.jfinal.log.Log;

public class AllPayController extends Controller {
	protected final Log log = Log.getLog(getClass());
	
	public void index(){
		String userAgent = getRequest().getHeader("User-Agent");
		log.info(userAgent);
		int payWay = 0;
		String agent = userAgent.toLowerCase();
		if (agent.indexOf("micromessenger")>0) {
			//用户使用微信访问页面
			payWay = 1;
			System.out.println("微信...");
			
		}else if(agent.indexOf("alipayclient")>0){
			//用户使用支付宝访问页面
			payWay = 2;
			System.out.println("支付宝...");
		}
		
		renderText(payWay+" userAgent:"+userAgent);
	}
}
