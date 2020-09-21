package com.app.service.hystrix;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.AppSysUserService;

@Component
public class AppSysUserServiceHystrix implements AppSysUserService {

	@Override
	public String login(@RequestParam(value = "name") String name, @RequestParam(value = "name") String password) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
}
