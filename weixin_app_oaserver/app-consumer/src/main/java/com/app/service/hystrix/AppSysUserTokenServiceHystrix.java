package com.app.service.hystrix;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.AppSysUserTokenService;

@Component
public class AppSysUserTokenServiceHystrix implements AppSysUserTokenService{
	
	@Override
	public String queryMenuBySession(@RequestParam("userToken") String userToken) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String deleteUserMationBySession(@RequestParam("userToken") String userToken) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
}
