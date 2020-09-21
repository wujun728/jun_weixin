package com.lmy.booksserver.controller;

import com.lmy.booksserver.pojo.User;
import com.lmy.booksserver.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/users")
    public List<User> getAllUsers(){
        System.out.println("1 aaa 12312312312aa f13212 ");
        return userService.getAllUsers();
    }
}
