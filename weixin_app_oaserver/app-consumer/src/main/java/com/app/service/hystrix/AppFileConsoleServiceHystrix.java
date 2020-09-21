package com.app.service.hystrix;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.AppFileConsoleService;

@Component
public class AppFileConsoleServiceHystrix implements AppFileConsoleService{

	@Override
	public String queryFilesListByFolderId(@RequestParam(value = "userToken")String userToken, @RequestParam(value = "folderId")String folderId) throws Exception {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
}
