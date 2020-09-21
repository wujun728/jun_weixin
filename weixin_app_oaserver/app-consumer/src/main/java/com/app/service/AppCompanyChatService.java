package com.app.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.hystrix.AppCompanyChatServiceHystrix;

/**
 * 添加fallback属性（在HelloRemote类添加指定fallback类，在服务熔断的时候返回fallback类中的内容）
 * @author 
 */
@FeignClient(name= "app-producer-hastoken", fallback = AppCompanyChatServiceHystrix.class)
public interface AppCompanyChatService {

    @RequestMapping(value = "/post/AppCompanyChatController/querycompanyDepartment")
    public String querycompanyDepartment(@RequestParam(value = "userToken") String userToken);

}
