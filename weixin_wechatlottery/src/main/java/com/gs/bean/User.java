package com.gs.bean;

import java.io.Serializable;
import java.util.Date;

/**
 * Created by Wang Genshen on 2017-06-29.
 */
public class User implements Serializable {

    private static final long serialVersionUID = -8606057805232593670L;

    private int id;
    private String accessToken;
    private String accessToken1;
    private String openId;
    private String unionId;
    private String wechatNickname;
    private String headimg;
    private String wechatNo;
    private String gender;
    private String phone;
    private String hidePhone;
    private int payedFee;
    private Date payedTime;
    private String tradeNo;
    private String tranId;
    private int prized;
    private int prizedStock;
    private int chooseCount;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getAccessToken1() {
        return accessToken1;
    }

    public void setAccessToken1(String accessToken1) {
        this.accessToken1 = accessToken1;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public String getUnionId() {
        return unionId;
    }

    public void setUnionId(String unionId) {
        this.unionId = unionId;
    }

    public String getWechatNickname() {
        return wechatNickname;
    }

    public void setWechatNickname(String wechatNickname) {
        this.wechatNickname = wechatNickname;
    }

    public String getHeadimg() {
        return headimg;
    }

    public void setHeadimg(String headimg) {
        this.headimg = headimg;
    }

    public String getWechatNo() {
        return wechatNo;
    }

    public void setWechatNo(String wechatNo) {
        this.wechatNo = wechatNo;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getHidePhone() {
        return hidePhone;
    }

    public void setHidePhone(String hidePhone) {
        this.hidePhone = hidePhone;
    }

    public int getPayedFee() {
        return payedFee;
    }

    public void setPayedFee(int payedFee) {
        this.payedFee = payedFee;
    }

    public Date getPayedTime() {
        return payedTime;
    }

    public void setPayedTime(Date payedTime) {
        this.payedTime = payedTime;
    }

    public String getTradeNo() {
        return tradeNo;
    }

    public void setTradeNo(String tradeNo) {
        this.tradeNo = tradeNo;
    }

    public String getTranId() {
        return tranId;
    }

    public void setTranId(String tranId) {
        this.tranId = tranId;
    }

    public int getPrized() {
        return prized;
    }

    public void setPrized(int prized) {
        this.prized = prized;
    }

    public int getPrizedStock() {
        return prizedStock;
    }

    public void setPrizedStock(int prizedStock) {
        this.prizedStock = prizedStock;
    }

    public int getChooseCount() {
        return chooseCount;
    }

    public void setChooseCount(int chooseCount) {
        this.chooseCount = chooseCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        User user = (User) o;

        return openId != null ? openId.equals(user.openId) : user.openId == null;
    }

    @Override
    public int hashCode() {
        return openId != null ? openId.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", accessToken='" + accessToken + '\'' +
                ", accessToken1='" + accessToken1 + '\'' +
                ", openId='" + openId + '\'' +
                ", unionId='" + unionId + '\'' +
                ", wechatNickname='" + wechatNickname + '\'' +
                ", wechatNo='" + wechatNo + '\'' +
                ", gender='" + gender + '\'' +
                ", phone='" + phone + '\'' +
                ", payedFee=" + payedFee +
                ", payedTime=" + payedTime +
                ", tradeNo='" + tradeNo + '\'' +
                ", tranId='" + tranId + '\'' +
                ", prized=" + prized +
                '}';
    }
}
