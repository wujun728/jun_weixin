package com.lmy.booksserver.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JsController {

    @PostMapping("/js")
    public String getMessage(@RequestBody String message){
        System.out.println(message);
        return "success";
    }
}
