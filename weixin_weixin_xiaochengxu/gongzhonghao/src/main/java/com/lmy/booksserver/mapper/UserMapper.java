package com.lmy.booksserver.mapper;

import com.lmy.booksserver.pojo.User;

import java.util.List;

public interface UserMapper {
    List<User> getAllUsers();
    int saveUser(User user);
}
