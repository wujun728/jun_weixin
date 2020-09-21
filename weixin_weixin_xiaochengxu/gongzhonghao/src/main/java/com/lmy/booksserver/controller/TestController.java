package com.lmy.booksserver.controller;

import com.lmy.booksserver.mapper.AppInfoMapper;
import com.lmy.booksserver.pojo.Access;
import com.lmy.booksserver.pojo.AppInfo;
import com.lmy.booksserver.service.AccessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    AppInfoMapper appInfoMapper;

    @Autowired
    AccessService accessService;

    @GetMapping("/appInfo")
    public String testAppInfoMapper(){
        AppInfo appInfo=appInfoMapper.getAppInfoById(1);
        System.out.println(appInfo);
        return appInfo.toString();
    }

    @GetMapping("/access")
    public int testSaveAccess(){
        Access access=new Access();
        access.setToken("test");
        access.setExpires(7200);
        int a=accessService.saveAccess(access);
        return a;
    }
    @GetMapping("/accessGet")
    public String testGetAccess(){
        return accessService.getAccessByToken("").toString();
    }
}
