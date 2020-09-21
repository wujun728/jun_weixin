package com.lmy.booksserver.controller;

import com.lmy.booksserver.service.UserService;
import com.lmy.booksserver.utils.XmlAndBeanUtil;
import com.lmy.booksserver.vo.TextMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class CommonController {

    @Autowired
    UserService userService;

    @PostMapping("/token")
    public String getMessage(@RequestBody TextMessage msg){
        String result="";
        if(msg.getMsgType().equals("event")&&
                msg.getEvent().equals("subscribe")){
            System.out.println("subscribe:"+msg);
            TextMessage textMessage=new TextMessage();
            textMessage.setFromUserName(""+msg.getToUserName()+"");
            textMessage.setToUserName(msg.getFromUserName());
            textMessage.setContent("nihao");
            textMessage.setMsgType("text");
            textMessage.setCreateTime(System.currentTimeMillis()+"");
            result=XmlAndBeanUtil.beanToXml(textMessage,TextMessage.class);
            String str=userService.getUserInfo(msg.getToUserName());
        }else{
            TextMessage textMessage=new TextMessage();
            textMessage.setFromUserName(""+msg.getToUserName()+"");
            textMessage.setToUserName(msg.getFromUserName());
            textMessage.setContent("nihao");
            textMessage.setMsgType("text");
            textMessage.setCreateTime(System.currentTimeMillis()+"");
            System.out.println(textMessage);

            String temp="<xml>\n" +
                    "  <ToUserName>"+msg.getFromUserName()+"</ToUserName>\n" +
                    "  <FromUserName>"+msg.getToUserName()+"</FromUserName>\n" +
                    "  <CreateTime>12345678</CreateTime>\n" +
                    "  <MsgType>text</MsgType>\n" +
                    "  <Content>你好</Content>\n" +
                    "</xml>";
            String result1=XmlAndBeanUtil.beanToXml(textMessage,TextMessage.class);
            System.out.println("result1:"+result1);
//        return XmlAndBeanUtil.beanToXml(result,TextMessage.class);
            System.out.println("temp"+temp);
        }
        return result;
    }
}
