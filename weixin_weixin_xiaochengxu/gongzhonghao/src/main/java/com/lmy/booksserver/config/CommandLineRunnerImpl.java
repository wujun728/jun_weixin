package com.lmy.booksserver.config;

import com.lmy.booksserver.service.AppInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class CommandLineRunnerImpl implements CommandLineRunner {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    AppInfoService appInfoService;

    @Value("${url.access_token}")
    String access_token_url;

    @Autowired
    AccessTokenBean accessTokenBean;

    @Value("${access_token}")
    String token;

    @Override
    public void run(String... strings) throws Exception {
        System.out.println("通过实现CommandLineRunner接口，在spring boot项目启动后打印参数");

//        for(String src:strings){
//            System.out.println(src);
//        }
//        AppInfo appInfo=appInfoService.getAppInfoById(1);
//        AccessTokenVO AccessTokenVO=restTemplate.getForObject(access_token_url+"&appid="+
//                appInfo.getAppId()+"&secret="+appInfo.getAppKey(),AccessTokenVO.class);
//        System.out.println("access_token:"+AccessTokenVO);
        accessTokenBean.setAccessToken(token);
        System.out.println("access_token init !!!!!!!!!!!");
    }
}
