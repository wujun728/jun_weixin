package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.AppSysUserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "登录类")
public class AppSysUserController {

	@Autowired
	private AppSysUserService appSysUserService;

	/**
	 * 
	     * @Title: login
	     * @Description: 手机端用户登录
	     * @return String 返回类型
	     * 
	 */
	@PostMapping ("/post/AppSysUserController/queryUserMationToLogin")
	@ApiOperation(value = "/post/AppSysUserController/queryUserMationToLogin", notes = "登录")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "name", value = "用户名", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "password", value = "密码", dataType = "String", required = true, paramType = "query") })
	public String login(String name, String password) {
		return appSysUserService.login(name, password); 
	}
	
}