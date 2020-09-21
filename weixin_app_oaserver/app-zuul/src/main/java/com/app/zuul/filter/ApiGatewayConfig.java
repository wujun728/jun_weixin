package com.app.zuul.filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class ApiGatewayConfig {
	
	/**
	 * 注册过滤器
	 * @return
	 */
	@Bean
    public AccessFilter accessFilter(){
        return new AccessFilter();
    }
	
}
