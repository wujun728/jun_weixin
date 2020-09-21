package com.app.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.AppCompanyChatService;

@RestController
@Api(value = "聊天类")
public class AppCompanyChatController {

	@Autowired
	private AppCompanyChatService appCompanyChatService;

	/**
	 * 
	     * @Title: querycompanyDepartment
	     * @Description: 获取通讯录数据
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppCompanyChatController/querycompanyDepartment")
	@ApiOperation(value = "/post/AppCompanyChatController/querycompanyDepartment", notes = "获取通讯录数据")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query") })
	public String querycompanyDepartment(String userToken) {
		return appCompanyChatService.querycompanyDepartment(userToken); 
	}
	
}