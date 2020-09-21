package com.gs.test;

import com.gs.bean.User;
import org.junit.Test;

import java.io.*;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Wang Genshen on 2017-07-07.
 */
public class UserMapTest {
    @Test
    public void testUserMap() {
        Map<Integer, User> users = new HashMap<Integer, User>();
        for (int i = 0; i < 10000; i++) {
            User u = new User();
            u.setId(i + 1);
            u.setPhone("18888888888");
            u.setAccessToken("D04fv6gjuBzVtunTJ_6nrrf5DIo-ulAW8dMR7mk4bRHmXZJL6LNRUPb_Vs5grmykey4VAqLRZ3FAVLXxPxvx4Rr36-c8BdAWPwAENLabzYQ");
            u.setAccessToken1("D04fv6gjuBzVtunTJ_6nrrf5DIo-ulAW8dMR7mk4bRHmXZJL6LNRUPb_Vs5grmykey4VAqLRZ3FAVLXxPxvx4Rr36-c8BdAWPwAENLabzYQ");
            u.setOpenId("olEzovhdSpcC5OrX-DR2mBGoO0Tc");
            u.setGender("男");
            u.setWechatNickname("这是一个很长的微信昵称");
            u.setUnionId("olEzovhdSpcC5OrX-DR2mBGoO0Tc");
            u.setPayedFee(100);
            u.setPayedTime(Calendar.getInstance().getTime());
            u.setPrized(0);
            users.put(new Integer(i + 1), u);
        }
        try {
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(new File("a.txt")));
            oos.writeObject(users);
            oos.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
