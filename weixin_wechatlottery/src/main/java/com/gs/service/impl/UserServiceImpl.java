package com.gs.service.impl;

import com.gs.bean.User;
import com.gs.common.bean.Pager;
import com.gs.dao.UserDAO;
import com.gs.dao.impl.UserDAOImpl;
import com.gs.service.UserService;

import java.util.List;

/**
 * Created by Wang Genshen on 2017-07-04.
 */
public class UserServiceImpl implements UserService {

    private UserDAO userDAO;

    public UserServiceImpl() {
        this.userDAO = new UserDAOImpl();
    }

    @Override
    public void add(User user) {
        userDAO.add(user);
    }

    @Override
    public void update(User user) {

    }

    @Override
    public void valid(Integer integer, String status) {

    }

    @Override
    public User queryById(Integer integer) {
        return null;
    }

    @Override
    public User queryByPhone(String phone) {
        return null;
    }

    @Override
    public User queryByOpenId(String openId) {
        return userDAO.queryByOpenId(openId);
    }

    @Override
    public List<User> queryAll() {
        return userDAO.queryAll();
    }

    @Override
    public List<User> queryByPager(Pager<User> pager) {
        return null;
    }

    @Override
    public List<User> queryAllPrized() {
        return userDAO.queryAllPrized();
    }

    @Override
    public List<User> queryAllPrizedStock() {
        return userDAO.queryAllPrizedStock();
    }

    public void updatePhone(String openid, String phone) {
        userDAO.updatePhone(openid, phone);
    }

    public void batchUpdate(List<User> users) {
        userDAO.batchUpdate(users);
    }

    public void batchUpdateStock(List<User> users) {
        userDAO.batchUpdateStock(users);
    }

    public int getPrized(String openid) {
        return userDAO.getPrized(openid);
    }

    public int getPrizedStock(String openid) {
        return userDAO.getPrizedStock(openid);
    }

    public List<User> queryAllPayed() {
        return userDAO.queryAllPayed();
    }

    public boolean isPayed(String openid) {
        return userDAO.isPayed(openid);
    }
}
