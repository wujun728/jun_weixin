package com.app.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.service.AppMyNoteService;

@RestController
@Api(value = "笔记类")
public class AppMyNoteController {

	@Autowired
	private AppMyNoteService appMyNoteService;

	/**
	 * 
	     * @Title: queryNoteAllFile
	     * @Description: 获取笔记目录
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/queryNoteAllFile")
	@ApiOperation(value = "/post/AppMyNoteController/queryNoteAllFile", notes = "获取笔记目录")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query") })
	public String queryNoteAllFile(String userToken) {
		return appMyNoteService.queryNoteAllFile(userToken); 
	}
	
	/**
	 * 
	     * @Title: queryNoteContent
	     * @Description: 获取笔记详情
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/queryNoteContent")
	@ApiOperation(value = "/post/AppMyNoteController/queryNoteContent", notes = "获取笔记详情")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "id", value = "笔记id", dataType = "String", required = true, paramType = "query") })
	public String queryNoteContent(String userToken, String id) {
		return appMyNoteService.queryNoteContent(userToken, id); 
	}
	
	/**
	 * 
	     * @Title: queryNewNote
	     * @Description: 获取最新笔记
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/queryNewNote")
	@ApiOperation(value = "/post/AppMyNoteController/queryNewNote", notes = "获取最新笔记")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query") })
	public String queryNewNote(String userToken) {
		return appMyNoteService.queryNewNote(userToken); 
	}
	
	/**
	 * 
	     * @Title: addNoteFile
	     * @Description: 新增文件夹
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/addNoteFile")
	@ApiOperation(value = "/post/AppMyNoteController/addNoteFile", notes = "新增文件夹")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "id", value = "文件父id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "name", value = "文件名", dataType = "String", required = true, paramType = "query") })
	public String addNoteFile(String userToken, String id, String name) {
		return appMyNoteService.addNoteFile(userToken, id, name); 
	}
	
	/**
	 * 
	     * @Title: addNoteContent
	     * @Description: 新增笔记
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/addNoteContent")
	@ApiOperation(value = "/post/AppMyNoteController/addNoteContent", notes = "新增笔记")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "pid", value = "父id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "name", value = "名称", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "type", value = "笔记类型", dataType = "String", required = true, paramType = "query"),
		@ApiImplicitParam(name = "desc", value = "描述", dataType = "String", required = false, paramType = "query"), 
		@ApiImplicitParam(name = "content", value = "内容", dataType = "String", required = false, paramType = "query") })
	public String addNoteContent(String userToken, String pid, String name, String type, String desc, String content) {
		return appMyNoteService.addNoteContent(userToken, pid, name, type, desc, content); 
	}
	
	/**
	 * 
	     * @Title: editNoteFileName
	     * @Description: 编辑文件/笔记的名称
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/editNoteFileName")
	@ApiOperation(value = "/post/AppMyNoteController/editNoteFileName", notes = "编辑名称")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "id", value = "id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "name", value = "名称", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "type", value = "类型", dataType = "String", required = true, paramType = "query") })
	public String editNoteFileName(String userToken, String id, String name, String type) {
		return appMyNoteService.editNoteFileName(userToken, id, name, type); 
	}
	
	/**
	 * 
	     * @Title: editNoteContent
	     * @Description: 编辑笔记
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/editNoteContent")
	@ApiOperation(value = "/post/AppMyNoteController/editNoteContent", notes = "编辑笔记")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "id", value = "id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "name", value = "名称", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "desc", value = "描述", dataType = "String", required = false, paramType = "query"), 
		@ApiImplicitParam(name = "content", value = "内容", dataType = "String", required = false, paramType = "query") })
	public String editNoteContent(String userToken, String id, String name, String desc, String content) {
		return appMyNoteService.editNoteContent(userToken, id, name, desc, content); 
	}
	
	/**
	 * 
	     * @Title: deleteFileFolderById
	     * @Description: 删除文件夹以及文件夹下的所有文件
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/deleteFileFolderById")
	@ApiOperation(value = "/post/AppMyNoteController/deleteFileFolderById", notes = "删除文件夹以及文件夹下的所有文件")
	@ApiImplicitParams({ 
		@ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "id", value = "id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "type", value = "类型", dataType = "String", required = true, paramType = "query") })
	public String deleteFileFolderById(String userToken, String id, String type) {
		return appMyNoteService.deleteFileFolderById(userToken, id, type); 
	}
	
	/**
	 * 
	     * @Title: queryMoveToFile
	     * @Description: 获取文件/笔记移动时的选择树
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/queryMoveToFile")
	@ApiOperation(value = "/post/AppMyNoteController/queryMoveToFile", notes = "获取文件/笔记移动时的选择树")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "id", value = "id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "type", value = "类型", dataType = "String", required = true, paramType = "query")  })
	public String queryMoveToFile(String userToken, String id, String type) {
		return appMyNoteService.queryMoveToFile(userToken, id, type); 
	}
	
	/**
	 * 
	     * @Title: editNoteToMoveById
	     * @Description: 保存文件/笔记移动后的信息
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/post/AppMyNoteController/editNoteToMoveById")
	@ApiOperation(value = "/post/AppMyNoteController/editNoteToMoveById", notes = "保存文件/笔记移动后的信息")
	@ApiImplicitParams({ @ApiImplicitParam(name = "userToken", value = "用户token", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "moveid", value = "选择移动的id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "toid", value = "移动到的id", dataType = "String", required = true, paramType = "query"), 
		@ApiImplicitParam(name = "type", value = "类型", dataType = "String", required = true, paramType = "query")  })
	public String editNoteToMoveById(String userToken, String moveid, String toid, String type) {
		return appMyNoteService.editNoteToMoveById(userToken, moveid, toid, type); 
	}
	
}