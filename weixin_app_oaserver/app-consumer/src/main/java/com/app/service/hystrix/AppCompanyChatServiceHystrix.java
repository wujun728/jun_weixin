package com.app.service.hystrix;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.AppCompanyChatService;

@Component
public class AppCompanyChatServiceHystrix implements AppCompanyChatService{
	
	@Override
	public String querycompanyDepartment(@RequestParam("userToken") String userToken) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
}
