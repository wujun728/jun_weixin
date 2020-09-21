package com.lmy.booksserver.service;

import com.lmy.booksserver.mapper.AccessMapper;
import com.lmy.booksserver.pojo.Access;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccessService {

    @Autowired
    AccessMapper accessMapper;

    public Access getAccessByToken(String token){
        return accessMapper.getAccessByToken(token);
    }
    public int saveAccess(Access access){
        return accessMapper.addAccess(access);
    }
}
