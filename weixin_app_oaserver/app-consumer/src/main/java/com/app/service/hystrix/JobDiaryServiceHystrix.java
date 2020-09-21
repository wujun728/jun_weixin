package com.app.service.hystrix;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.JobDiaryService;

@Component
public class JobDiaryServiceHystrix implements JobDiaryService{
	
	@Override
	public String queryJobDiaryDayReceived(@RequestParam(value = "userToken") String userToken, 
			@RequestParam(value = "limit") int limit, 
			@RequestParam(value = "page") int page, 
			@RequestParam(value = "diaryType") int diaryType) {
		throw new RuntimeException("请求失败，服务无法访问");
	}

}
