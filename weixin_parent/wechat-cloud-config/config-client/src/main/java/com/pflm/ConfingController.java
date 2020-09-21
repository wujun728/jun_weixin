package com.pflm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 配置中心客户端
 * @author qinxuewu
 * @version 1.00
 * @time 13/11/2018上午 11:44
 */
@RestController
@RequestMapping("/config")
public class ConfingController {

    @Value("${mongo_host_port}")
    String mongo_host_port;


    @RequestMapping(value = "/index")
    public String index(){
        return mongo_host_port;
    }
}
