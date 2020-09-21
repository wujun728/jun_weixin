package com.zzkun.dao;

import com.zzkun.model.UserInfo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * Created by Administrator on 2016/6/17.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:springmvc-servlet.xml")
public class UserDaoTest {

    @Autowired
    public UserDao userDao;

    @Test
    public void test() throws Exception {
        UserInfo userInfo = userDao.getUserInfoByUserAppid("ttttnull");
        System.out.println(userInfo);
    }

    @Test
    public void test2() throws Exception {
        System.out.println(userDao.hasUserInfo("abc123"));
        System.out.println(userDao.hasUserInfo("jejefdsaf"));
    }

    @Test
    public void modifyUserRedBagValue() throws Exception {
        userDao.modifyUserRedBagValue("abc123", 123.123);
    }

}