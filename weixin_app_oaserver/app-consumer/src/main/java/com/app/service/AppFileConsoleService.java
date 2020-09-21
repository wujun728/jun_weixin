package com.app.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.hystrix.AppFileConsoleServiceHystrix;


@FeignClient(name= "app-producer-hasauth", fallback = AppFileConsoleServiceHystrix.class)
public interface AppFileConsoleService {
	
	@RequestMapping(value = "/queryFilesListByFolderId")
	public String queryFilesListByFolderId(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "folderId") String folderId) throws Exception;
	
}
