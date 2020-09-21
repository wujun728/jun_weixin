package com.app.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.JobDiaryService;

@RestController
@Api(value = "/job", tags = "日志管理")
public class JobDiaryController {

	@Autowired
	private JobDiaryService jobDiaryService;

	/**
	 * 
	     * @Title: queryJobDiaryDayReceived
	     * @Description: 查看所有收到的日报
	     * @return String 返回类型
	     * 
	 */
	@GetMapping("/jobDiary")
	@ApiOperation(value = "查看所有收到的日报", notes = "查看所有收到的日报", produces = "application/json")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"),
		@ApiImplicitParam(name = "limit", value = "分页参数,每页多少条数据", dataType = "Integer", required = true, paramType = "query"),
		@ApiImplicitParam(name = "page", value = "分页参数,第几页", dataType = "Integer", required = true, paramType = "query"),
		@ApiImplicitParam(name = "diaryType", value = "报表类型", dataType = "Integer", required = false, paramType = "query")})
	public String queryJobDiaryDayReceived(String userToken, int limit, int page, int diaryType) {
		return jobDiaryService.queryJobDiaryDayReceived(userToken, limit, page, diaryType); 
	}
	
}