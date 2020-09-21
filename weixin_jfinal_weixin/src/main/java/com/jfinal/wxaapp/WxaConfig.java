/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp;

import java.io.Serializable;

/**
 * 微信小程序配置
 * @author L.cm
 *
 */
public class WxaConfig implements Serializable {
    private static final long serialVersionUID = 8274925821039698118L;
    
    private String appId = null;
    private String appSecret = null;
    private String token = null;
    private String encodingAesKey = null;
    private boolean messageEncrypt = false;    // 消息加密与否
    
    public String getAppId() {
        return appId;
    }
    public void setAppId(String appId) {
        this.appId = appId;
    }
    public String getAppSecret() {
        return appSecret;
    }
    public void setAppSecret(String appSecret) {
        this.appSecret = appSecret;
    }
    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }
    public String getEncodingAesKey() {
        return encodingAesKey;
    }
    public void setEncodingAesKey(String encodingAesKey) {
        this.encodingAesKey = encodingAesKey;
    }
    public boolean isMessageEncrypt() {
        return messageEncrypt;
    }
    public void setMessageEncrypt(boolean messageEncrypt) {
        this.messageEncrypt = messageEncrypt;
    }
}
