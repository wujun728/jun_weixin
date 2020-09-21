package com.lmy.booksserver.controller;

import com.lmy.booksserver.vo.TextMessage;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/msg")
public class MessageController {

    @PostMapping(value = "/string",consumes = {MediaType.APPLICATION_XML_VALUE})
    public String getMsg(@RequestBody TextMessage msg){
        System.out.println(msg.toString());

            String message="<xml>\n" +
                    "  <ToUserName><![CDATA[toUser]]></ToUserName>\n" +
                    "  <FromUserName><![CDATA[fromUser]]></FromUserName>\n" +
                    "  <CreateTime>12345678</CreateTime>\n" +
                    "  <MsgType><![CDATA[text]]></MsgType>\n" +
                    "  <Content><![CDATA[你好]]></Content>\n" +
                    "</xml>";
        return msg.toString();
    }
}
