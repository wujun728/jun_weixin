package com.wxmp.core.util;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.io.ClassPathResource;

/**
 * 读取properties文件
 * Created by CatalpaFlat on 2017/8/11.
 */
//@Configuration
public class PropertiesConfig {

    @Bean
    public PropertySourcesPlaceholderConfigurer createPropertySourcesPlaceholderConfigurer() {
        ClassPathResource resource = new ClassPathResource("properties/base.properties");
        PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        propertyPlaceholderConfigurer.setLocation(resource);
        return propertyPlaceholderConfigurer;
    }
}