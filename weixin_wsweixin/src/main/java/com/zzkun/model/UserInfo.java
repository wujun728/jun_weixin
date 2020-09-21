package com.zzkun.model;

import java.io.Serializable;

/**
 * Created by Administrator on 2016/6/17.
 */

public class UserInfo implements Serializable {

    private String appid;
    private String username;
    private String phone;
    private String address;
    private double redValue;

    public UserInfo() {
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getRedValue() {
        return redValue;
    }

    public void setRedValue(double redValue) {
        this.redValue = redValue;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "appid='" + appid + '\'' +
                ", username='" + username + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", redValue=" + redValue +
                '}';
    }
}
