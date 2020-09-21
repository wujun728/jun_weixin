/**
 * Copyright (c) 2011-2017, fuyong (859050943@qq.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.api;

import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 黑名单管理api
 * 接口有问题
 * @author fuyong
 */
public class BlackUserApi {
    private static String getBlackList = "https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token=";
    private static String batchBlackList = "https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token=";
    private static String batchUnblackList = "https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token=";

    /**
     * 获取公众号的黑名单列表
     * @param beginOpenid 当 begin_openid 为空时，默认从开头拉取。
     * @return ApiResult
     */
    public static ApiResult getBlackList(String beginOpenid) {
        String url = getBlackList + AccessTokenApi.getAccessTokenStr();

        Map<String, String> mapData = new HashMap<String, String>();
        if(StrKit.notBlank(beginOpenid)) {
            mapData.put("begin_openid", beginOpenid);
        }
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(mapData));

        return new ApiResult(jsonResult);
    }

    /**
     * 获取公众号的黑名单列表
     * @return ApiResult
     */
    public static ApiResult getBlackList() {
        return getBlackList(null);
    }

    /**
     * 批量拉黑用户
     * @param jsonStr json字符串
     * @return ApiResult
     */
    public static ApiResult batchBlackUsers(String jsonStr) {
        String jsonResult = HttpUtils.post(batchBlackList + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    /**
     * 批量拉黑用户
     * @param openIdList 需要拉黑的用户openid列表
     * @return ApiResult
     */
    public static ApiResult batchBlackUsers(List<String> openIdList) throws IllegalArgumentException {
        if(openIdList == null) {
            throw new IllegalArgumentException();
        }

        Map<String, List<String>> userListMap = new HashMap<String, List<String>>();
        List<String> userList = new ArrayList<String>();
        if(openIdList != null && openIdList.size() > 0) {
            for(String openId : openIdList) {
                userList.add(openId);
            }
        }
        userListMap.put("opened_list", userList);

        return batchBlackUsers(JsonUtils.toJson(userListMap));
    }

    /**
     * 批量取消拉黑用户
     * @param jsonStr json字符串
     * @return ApiResult
     */
    public static ApiResult batchUnblackUsers(String jsonStr) {
        String jsonResult = HttpUtils.post(batchUnblackList + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    /**
     * 批量取消拉黑用户
     * @param openIdList 需要取消拉黑的用户openid列表
     * @return ApiResult
     */
    public static ApiResult batchUnblackUsers(List<String> openIdList) throws IllegalArgumentException {
        if(openIdList == null) {
            throw new IllegalArgumentException();
        }

        Map<String, List<String>> userListMap = new HashMap<String, List<String>>();
        List<String> userList = new ArrayList<String>();
        if(openIdList != null && openIdList.size() > 0) {
            for(String openId : openIdList) {
                userList.add(openId);
            }
        }
        userListMap.put("opened_list", userList);

        return batchUnblackUsers(JsonUtils.toJson(userListMap));
    }
}
