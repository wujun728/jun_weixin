package com.lmy.booksserver.service;

import com.lmy.booksserver.config.AccessTokenBean;
import com.lmy.booksserver.mapper.UserMapper;
import com.lmy.booksserver.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    AccessTokenBean accessTokenBean;

    @Value("${url.userinfo}")
    String userinfoUrl;

    public List<User> getAllUsers(){
        return userMapper.getAllUsers();
    }

    public String getUserInfo(String fromUser){
        Map<String,String> map=new HashMap<String,String>();
        map.put("openid",fromUser);
        map.put("access_token",accessTokenBean.getAccessToken());
        map.put("lang","zh_CN");
        String str=restTemplate.getForObject(userinfoUrl,String.class,map);
        System.out.println(str);
        return str;
    }
}
