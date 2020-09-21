package com.pflm.config;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import feign.Logger;



/**
 * Feign配置
 * @author qinxuewu
 * @version 1.00
 * @time 25/10/2018下午 4:24
 */


@Configuration
public class FeignConfig {
    public static final org.slf4j.Logger log = LoggerFactory.getLogger(FeignConfig.class);    
    /**
     * feign日志输出
     * @return
     */
    @Bean
    Logger.Level feignLoggerLevel(){
        return Logger.Level.FULL;
    }


}
