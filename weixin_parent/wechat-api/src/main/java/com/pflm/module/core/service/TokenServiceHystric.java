package com.pflm.module.core.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;

/**
 * 熔断处理
 * @author qinxuewu
 * @version 1.00
 * @time 7/11/2018下午 5:57
 */
@Component
public class TokenServiceHystric implements  TokenService {

    @Override
    public JSONObject token(String appid, String secret, String grant_type) {
        JSONObject info=new JSONObject();
        info.put("code",4001);
        info.put("msg","熔断处理");
        return info;
    }

    @Override
    public JSONObject getticket(String access_token, String type) {
        JSONObject info=new JSONObject();
        info.put("code",4001);
        info.put("msg","熔断处理");
        return info;
    }
}
