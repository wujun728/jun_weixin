package com.pflm.module.oauth.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

/**
 * 熔断处理
 * @author qinxuewu
 * @version 1.00
 * @time 7/11/2018下午 4:30
 */
@Component
public class OauthServiceHystric implements  OauthService {

    @Override
    public JSONObject accessUserInfoToken(String appid, String secret, String code, String grant_type) {
        JSONObject info=new JSONObject();
        info.put("code",4001);
        info.put("msg","熔断处理");
        return info;
    }

    @Override
    public JSONObject refreshToken(String appid, String grant_type, String refresh_token) {
        JSONObject info=new JSONObject();
        info.put("code",4001);
        info.put("msg","熔断处理");
        return info;
    }

    @Override
    public JSONObject userinfo(String access_token, String openid, String lang) {
        JSONObject info=new JSONObject();
        info.put("code",4001);
        info.put("msg","熔断处理");
        return info;
    }
}
