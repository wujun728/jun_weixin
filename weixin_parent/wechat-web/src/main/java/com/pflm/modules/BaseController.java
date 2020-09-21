package com.pflm.modules;
import com.alibaba.fastjson.JSONObject;
import com.pflm.api.WeChatApi;

//import com.pflm.api.WeChatApi;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author qinxuewu
 * @version 1.00
 * @time 31/10/2018下午 3:07
 */

@RestController
@RequestMapping("/api/base")
public class BaseController {
    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Value("${server.port}")
    public String port;
    @Value("${spring.application.name}")
    public String name;
    @Autowired
    WeChatApi weChatApi;

    @RequestMapping("/findInfo")
    public Map<String,Object> getUserinfo(){
        Map<String,Object> map=new HashMap<>();
        JSONObject info=weChatApi.getToken();
        map.put("code",0);
        map.put("msg",info);
        map.put("port",port);
        map.put("name",name);
        return  map;
    }


}
