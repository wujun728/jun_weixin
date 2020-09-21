package com.pflm.base.entity;

/**
 * @author qinxuewu
 * @version 1.00
 * @time 15/11/2018下午 7:36
 */

import java.io.Serializable;

/**
 * token表
 * @author qinxuewu
 * @version 1.00
 * @time 6/11/2018下午 7:34
 */
public class AccessTokenEntity implements Serializable {

    private Long id;

    /**
     * 基础token
     */
    private String accessToken;
    /**
     * 过期时间 单位秒
     */
    private int expiresIn;
    private String createTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    /***
     * 类型
     */
    private int type;
    private String expiryTime;
    private String updateTime;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public int getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(int expiresIn) {
        this.expiresIn = expiresIn;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(String expiryTime) {
        this.expiryTime = expiryTime;
    }

    public String getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(String updateTime) {
        this.updateTime = updateTime;
    }
}
