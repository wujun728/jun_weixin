package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.AppFileConsoleService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

@RestController
@Api(value = "/fileconsole", tags = "文件管理")
public class AppFileConsoleController {
	
	@Autowired
	private AppFileConsoleService appFileConsoleService;

	/**
	 * 
	     * @Title: queryFilesListByFolderId
	     * @Description: 获取这个目录下的所有文件+目录
	     * @return String 返回类型
	     * @throws Exception 
	     * 
	 */
	@GetMapping("/queryFilesListByFolderId")
	@ApiOperation(value = "获取指定目录下的所有文件+目录", notes = "获取指定目录下的所有文件+目录", produces = "application/json")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"),
		@ApiImplicitParam(name = "folderId", value = "目录id", dataType = "String", required = true, paramType = "query")
	})
	public String queryFilesListByFolderId(String userToken, String folderId) throws Exception {
		return appFileConsoleService.queryFilesListByFolderId(userToken, folderId); 
	}
	
}
