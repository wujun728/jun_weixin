package com.gs.dao;

import com.gs.common.bean.Pager;

import java.util.List;

/**
 * Created by Wang Genshen on 2017-07-04.
 */
public interface BaseDAO<PK, T> {

    public void add(T t);
    public void update(T t);
    public void valid(PK pk, String status);
    public T queryById(PK pk);
    public T queryByPhone(String phone);
    public T queryByOpenId(String openId);
    public List<T> queryAll();
    public List<T> queryByPager(Pager<T> pager);

}
