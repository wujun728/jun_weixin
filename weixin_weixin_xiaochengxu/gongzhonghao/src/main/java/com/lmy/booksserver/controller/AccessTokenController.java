package com.lmy.booksserver.controller;

import com.lmy.booksserver.config.AccessTokenBean;
import com.lmy.booksserver.pojo.Access;
import com.lmy.booksserver.pojo.AppInfo;
import com.lmy.booksserver.service.AccessService;
import com.lmy.booksserver.service.AppInfoService;
import com.lmy.booksserver.vo.AccessTokenVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/v1/access")
public class AccessTokenController {

    @Autowired
    RestTemplate restTemplate;

    @Value("${url.access_token}")
    String access_token_url;

    @Autowired
    AppInfoService appInfoService;

    @Autowired
    AccessService accessService;

    @Autowired
    AccessTokenBean accessTokenBean;

    @GetMapping("/token")
    public String getToken(){
        AppInfo appInfo=appInfoService.getAppInfoById(1);
        AccessTokenVO AccessTokenVO=restTemplate.getForObject(access_token_url+"&appid="+
                appInfo.getAppId()+"&secret="+appInfo.getAppKey(),AccessTokenVO.class);
        System.out.println("access_token:"+AccessTokenVO);
        Access access=new Access();
        access.setToken(AccessTokenVO.getAccess_token());
        access.setExpires(AccessTokenVO.getExpires_in());
        accessService.saveAccess(access);
        accessTokenBean.setAccessToken(AccessTokenVO.getAccess_token());
        return AccessTokenVO.toString();
    }
}
