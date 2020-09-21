package com.pflm.modules;
import com.alibaba.csp.sentinel.annotation.SentinelResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;


/**
 * @author qinxuewu
 * @version 1.00
 * @time 9/11/2018下午 4:21
 */
@RestController
@RequestMapping("/config")
@RefreshScope
public class ConfigController {
    @Autowired
    ConfigService configService;

    @Value("${user.name}")
    String userName;

    @Value("${user.age}")
    int age;

    @Value("${useLocalCache:false}")
    private boolean useLocalCache;

    @RequestMapping("/get")
    public boolean get() {
        return useLocalCache;
    }

    @RequestMapping("/getuser")
    public String getuser() {
        return userName+","+age;
    }


    /**
     * 如果需要对某个特定的方法进行限流或降级，可以通过 @SentinelResource 注解来完成限流的埋点
     * @return
     */
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    @SentinelResource("resource")
    public String hello() {
        return configService.hello(new Date().getTime());
    }



    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test1() {
        return "Hello test";
    }


}
