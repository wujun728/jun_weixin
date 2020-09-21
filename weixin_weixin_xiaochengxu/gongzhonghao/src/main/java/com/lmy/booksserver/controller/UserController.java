package com.lmy.booksserver.controller;

import com.lmy.booksserver.pojo.AppInfo;
import com.lmy.booksserver.pojo.User;
import com.lmy.booksserver.service.AccessService;
import com.lmy.booksserver.service.AppInfoService;
import com.lmy.booksserver.service.UserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    AppInfoService appInfoService;

    @Autowired
    AccessService accessService;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        System.out.println("1 aaa 12312312312aa f13212 ");
        return userService.getAllUsers();
    }

    @GetMapping("/hello")
    public String testHello(){
        String result=restTemplate.getForObject("http://localhost:8081/hello/hi/backend",String.class);
//        return "22_vwhL75Zbhsu9dDu-bCeBX1zckgf_7KdbxXryb8Q" +
//                "HSxiL9LgE9YdPM_B4eDY-b6sMtDKozI7eGiwJtSY34" +
//                "frDN0PhxHsiSCWgmKrPnuXKIaz5aT_neBTZ_VASYvMKKNjACAXXA";
        return result;
    }
    @GetMapping("/token")
    public String getAccessToken(@RequestParam String signature,
                                 @RequestParam String timestamp,
                                 @RequestParam String nonce,
                                 @RequestParam String echostr){
        System.out.println("signature:"+signature);
        System.out.println("timestamp:"+timestamp);
        System.out.println("nonce:"+nonce);
        System.out.println("echostr:"+echostr);

        AppInfo appInfo=appInfoService.getAppInfoById(1);
        String token="sven1234";
        String[] params={token,timestamp,nonce};
        Arrays.sort(params);
        String combineStr=params[0]+params[1]+params[2];
        String encodeStr=DigestUtils.sha1Hex(combineStr);
        System.out.println("encodeStr:"+encodeStr);
        System.out.println("signature:"+signature);
        if(encodeStr.equalsIgnoreCase(signature)){
            return echostr;
        }else{
            return "";
        }
    }
}
