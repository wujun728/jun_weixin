package com.lmy.booksserver.service;

import com.lmy.booksserver.mapper.AppInfoMapper;
import com.lmy.booksserver.pojo.AppInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppInfoService {

    @Autowired
    AppInfoMapper appInfoMapper;

    public AppInfo getAppInfoById(int id){
        return appInfoMapper.getAppInfoById(id);
    }
}
