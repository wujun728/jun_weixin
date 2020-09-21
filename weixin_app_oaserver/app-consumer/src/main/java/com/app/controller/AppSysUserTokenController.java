package com.app.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.AppSysUserTokenService;

@RestController
@Api(value = "用户session")
public class AppSysUserTokenController {

	@Autowired
	private AppSysUserTokenService appSysUserTokenService;

	/**
	 * 
	     * @Title: queryMenuBySession
	     * @Description: 从session中获取用户拥有的菜单信息
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppSysUserTokenController/queryMenuBySession")
	@ApiOperation(value = "/post/AppSysUserTokenController/queryMenuBySession", notes = "从session中获取用户拥有的菜单信息")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query") })
	public String queryMenuBySession(String userToken) {
		return appSysUserTokenService.queryMenuBySession(userToken);
	}
	
	/**
	 * 
	     * @Title: deleteUserMationBySession
	     * @Description: 手机端用户注销登录
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppSysUserTokenController/deleteUserMationBySession")
	@ApiOperation(value = "/post/AppSysUserTokenController/deleteUserMationBySession", notes = "用户注销")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query") })
	public String deleteUserMationBySession(String userToken) {
		return appSysUserTokenService.deleteUserMationBySession(userToken);
	}

}