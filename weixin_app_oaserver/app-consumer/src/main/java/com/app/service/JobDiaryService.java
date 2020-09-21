package com.app.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.hystrix.JobDiaryServiceHystrix;

/**
 * 添加fallback属性（在HelloRemote类添加指定fallback类，在服务熔断的时候返回fallback类中的内容）
 * @author 
 */
@FeignClient(name= "app-producer-hasauth", fallback = JobDiaryServiceHystrix.class)
public interface JobDiaryService {

    @RequestMapping(value = "/JobDiary", method = RequestMethod.GET)
    public String queryJobDiaryDayReceived(@RequestParam(value = "userToken") String userToken, 
    		@RequestParam(value = "limit") int limit, 
    		@RequestParam(value = "page") int page, 
    		@RequestParam(value = "diaryType") int diaryType);
 
}
