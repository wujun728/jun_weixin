package com.gs.service;

import com.gs.bean.User;

import java.util.List;

/**
 * Created by Wang Genshen on 2017-07-04.
 */
public interface UserService extends BaseService<Integer, User> {
    public List<User> queryAllPrized();

    public List<User> queryAllPrizedStock();

    public void updatePhone(String openid, String phone);

    public void batchUpdate(List<User> users);

    public void batchUpdateStock(List<User> users);

    public int getPrized(String openid);

    public int getPrizedStock(String openid);

    public List<User> queryAllPayed();

    public boolean isPayed(String openid);
}
