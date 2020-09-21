package com.app.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.hystrix.WxSmallProUserMationServiceHystrix;

/**
 * 添加fallback属性（在HelloRemote类添加指定fallback类，在服务熔断的时候返回fallback类中的内容）
 * @author 
 */
@FeignClient(name= "app-producer-wechat", fallback = WxSmallProUserMationServiceHystrix.class)
public interface WxSmallProUserMationService {

    @RequestMapping(value = "/getUserMationByOpenId", method = RequestMethod.GET)
	public String queryUserMationByOpenId(@RequestParam(value = "openId") String openId);

    @RequestMapping(value = "/bindUserMation", method = RequestMethod.POST)
	public String bindUserMation(@RequestParam(value = "openId") String openId, 
			@RequestParam(value = "userCode") String userCode, 
			@RequestParam(value = "password") String password);
    
}
