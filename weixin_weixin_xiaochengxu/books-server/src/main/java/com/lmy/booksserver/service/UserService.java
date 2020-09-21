package com.lmy.booksserver.service;

import com.lmy.booksserver.mapper.UserMapper;
import com.lmy.booksserver.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    UserMapper userMapper;

    public List<User> getAllUsers(){
        return userMapper.getAllUsers();
    }
}
