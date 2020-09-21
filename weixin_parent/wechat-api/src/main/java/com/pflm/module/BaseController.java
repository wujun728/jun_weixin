package com.pflm.module;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

/**
 * 测试
 * @author qinxuewu
 * @version 1.00
 * @time 31/10/2018下午 1:46
 */
@RestController
@RequestMapping("/api/base")
public class BaseController {
    public  final Logger logger = LoggerFactory.getLogger(getClass());
    @Value("${wx.appid}")
    public String appid;
    @Value("${wx.appsecret}")
    public String appsecret;


    @Value("${server.port}")
    public String port;
    @Value("${spring.application.name}")
    public String name;

    @RequestMapping("/getInfo")
    public Map<String,Object> getInfo(){
        Map<String,Object> map=new HashMap<>();
        map.put("status",0);
        map.put("port",port);
        map.put("name",name);
        return map;
    }


    @RequestMapping("/findInfo")
    public Map<String,Object> findInfo(){
        Map<String,Object> map=new HashMap<>();
        map.put("port",port);
        map.put("name",name);
        map.put("msg","result  findInfo");
        return map;
    }


}
