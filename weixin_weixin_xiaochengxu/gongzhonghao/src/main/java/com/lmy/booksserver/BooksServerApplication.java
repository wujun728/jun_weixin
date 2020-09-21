package com.lmy.booksserver;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.lmy.booksserver.mapper")
public class BooksServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(BooksServerApplication.class, args);
    }

}
