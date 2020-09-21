package com.app.service.hystrix;

import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.AppMyNoteService;

@Component
public class AppMyNoteServiceHystrix implements AppMyNoteService{
	
	@Override
	public String queryNoteAllFile(@RequestParam("userToken") String userToken) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String queryNoteContent(@RequestParam("userToken") String userToken, @RequestParam("id") String id) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String queryNewNote(@RequestParam("userToken") String userToken) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String addNoteFile(@RequestParam("userToken") String userToken, @RequestParam("id") String id, @RequestParam("name") String name) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String addNoteContent(@RequestParam("userToken") String userToken, @RequestParam("pid") String pid, @RequestParam("name") String name, @RequestParam(value = "type") String type, @RequestParam("desc") String desc, @RequestParam("content") String content) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String editNoteFileName(@RequestParam("userToken") String userToken, @RequestParam("id") String id, @RequestParam("name") String name, @RequestParam("type") String type) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String editNoteContent(@RequestParam("userToken") String userToken, @RequestParam("id") String id, @RequestParam("name") String name, @RequestParam("desc") String desc, @RequestParam("content") String content) {
		throw new RuntimeException("请求失败，服务无法访问");
	}

	@Override
	public String deleteFileFolderById(@RequestParam("userToken") String userToken, @RequestParam("userToken") String id, @RequestParam("userToken") String type) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String queryMoveToFile(@RequestParam("userToken") String userToken, @RequestParam("userToken") String id, @RequestParam(value = "type") String type) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
	@Override
	public String editNoteToMoveById(@RequestParam("userToken") String userToken, @RequestParam(value = "moveid") String moveid, @RequestParam(value = "toid") String toid, @RequestParam(value = "type") String type) {
		throw new RuntimeException("请求失败，服务无法访问");
	}
	
}
