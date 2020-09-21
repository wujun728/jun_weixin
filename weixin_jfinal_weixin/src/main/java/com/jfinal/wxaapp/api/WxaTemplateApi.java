/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.api;

import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.TemplateMsgApi;
import com.jfinal.weixin.sdk.utils.HttpUtils;

/**
 * 微信小程序模版消息
 * @author L.cm
 *
 */
public class WxaTemplateApi {
    private static String sendApiUrl = "https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=";

    /**
     * 发送模板消息
     * @param jsonStr 模版json
     * @return {ApiResult}
     */
    public ApiResult send(String jsonStr) {
        String jsonResult = HttpUtils.post(sendApiUrl + WxaAccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    /**
     * 发送模板消息
     * @param template 模版对象
     * @return {ApiResult}
     */
    public ApiResult send(WxaTemplate template) {
        return TemplateMsgApi.send(template.build());
    }
    
}
