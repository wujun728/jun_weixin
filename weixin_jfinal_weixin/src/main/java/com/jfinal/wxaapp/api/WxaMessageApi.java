/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.api;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 客服接口-发消息
 * @author L.cm
 *
 */
public class WxaMessageApi {
    private static String customMessageUrl = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";

    /**
     * 发送客服消息
     * @param message 消息封装
     * @return ApiResult
     */
    private ApiResult sendMsg(Map<String, Object> message) {
        String accessToken = WxaAccessTokenApi.getAccessTokenStr();
        String jsonResult = HttpUtils.post(customMessageUrl + accessToken, JsonUtils.toJson(message));
        return new ApiResult(jsonResult);
    }
    
    /**
     * 发送文本客服消息
     * @param openId openId
     * @param text 文本消息
     * @return ApiResult
     */
    public ApiResult sendText(String openId, String text) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "text");

        Map<String, Object> textObj = new HashMap<String, Object>();
        textObj.put("content", text);

        json.put("text", textObj);
        return sendMsg(json);
    }

    /**
     * 发送图片消息
     * @param openId openId
     * @param mediaId 图片媒体id
     * @return ApiResult
     */
    public ApiResult sendImage(String openId, String mediaId) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "image");

        Map<String, Object> image = new HashMap<String, Object>();
        image.put("media_id", mediaId);

        json.put("image", image);
        return sendMsg(json);
    }
}
