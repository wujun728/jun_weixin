package com.app.service.hystrix;

import org.springframework.stereotype.Component;

import com.app.service.WxSmallProUserMationService;

@Component
public class WxSmallProUserMationServiceHystrix implements WxSmallProUserMationService{
	
	@Override
	public String queryUserMationByOpenId(String openId) {
		throw new RuntimeException("请求失败，服务无法访问");
	}

	@Override
	public String bindUserMation(String openId, String userCode, String password) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
}
