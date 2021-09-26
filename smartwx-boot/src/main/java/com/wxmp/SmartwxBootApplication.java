package com.wxmp;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@MapperScan("com.**.mapper")
@EnableCaching
public class SmartwxBootApplication {
    public static void main(String[] args) {
        SpringApplication.run(SmartwxBootApplication.class, args);
    }
}
