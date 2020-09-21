package com.zzkun.service;

import com.zzkun.dao.UserDao;
import com.zzkun.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2016/6/17.
 */
@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    private void preGetInfo(String appid) {
        if(!userDao.hasUserInfo(appid)) {
            UserInfo info = new UserInfo();
            info.setAppid(appid);
            info.setRedValue(0.0);
            userDao.addUserInfo(info);
        }
    }

    public UserInfo getUserInfo(String appid) {
        preGetInfo(appid);
        return userDao.getUserInfoByUserAppid(appid);
    }

    public void modifyUserRedBagValue(String appid, double det) {
        preGetInfo(appid);
        userDao.modifyUserRedBagValue(appid, det);
    }

    public boolean canCostRedBagValue(String appid, double det) {
        if(det > 0) return false;
        if(getUserInfo(appid).getRedValue() + det < 0)
            return false;
        return true;
    }
}
