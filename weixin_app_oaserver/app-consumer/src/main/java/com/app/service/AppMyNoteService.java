package com.app.service;

import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.app.service.hystrix.AppMyNoteServiceHystrix;

/**
 * 添加fallback属性（在HelloRemote类添加指定fallback类，在服务熔断的时候返回fallback类中的内容）
 * @author 
 */
@FeignClient(name= "app-producer-hastoken", fallback = AppMyNoteServiceHystrix.class)
public interface AppMyNoteService {

    @RequestMapping(value = "/post/AppMyNoteController/queryNoteAllFile")
    public String queryNoteAllFile(@RequestParam(value = "userToken") String userToken);
    
    @RequestMapping(value = "/post/AppMyNoteController/queryNoteContent")
    public String queryNoteContent(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "id") String id);
    
    @RequestMapping(value = "/post/AppMyNoteController/queryNewNote")
    public String queryNewNote(@RequestParam(value = "userToken") String userToken);
    
    @RequestMapping(value = "/post/AppMyNoteController/addNoteFile")
    public String addNoteFile(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "id") String id, @RequestParam(value = "name") String name);
   
    @RequestMapping(value = "/post/AppMyNoteController/addNoteContent")
    public String addNoteContent(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "pid") String pid, @RequestParam(value = "name") String name, @RequestParam(value = "type") String type, @RequestParam(value = "desc") String desc, @RequestParam(value = "content") String content);

    @RequestMapping(value = "/post/AppMyNoteController/editNoteFileName")
    public String editNoteFileName(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "id") String id, @RequestParam(value = "name") String name, @RequestParam(value = "type") String type);

    @RequestMapping(value = "/post/AppMyNoteController/editNoteContent")
    public String editNoteContent(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "id") String id, @RequestParam(value = "name") String name, @RequestParam(value = "desc") String desc, @RequestParam(value = "content") String content);
   
    @RequestMapping(value = "/post/AppMyNoteController/deleteFileFolderById")
    public String deleteFileFolderById(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "id") String id, @RequestParam(value = "type") String type);

    @RequestMapping(value = "/post/AppMyNoteController/queryMoveToFile")
    public String queryMoveToFile(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "id") String id, @RequestParam(value = "type") String type);

    @RequestMapping(value = "/post/AppMyNoteController/editNoteToMoveById")
    public String editNoteToMoveById(@RequestParam(value = "userToken") String userToken, @RequestParam(value = "moveid") String moveid, @RequestParam(value = "toid") String toid, @RequestParam(value = "type") String type);

}
