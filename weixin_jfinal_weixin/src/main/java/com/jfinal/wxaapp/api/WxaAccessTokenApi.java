/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.api;

import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.jfinal.weixin.sdk.cache.IAccessTokenCache;
import com.jfinal.weixin.sdk.kit.ParaMap;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.RetryUtils;
import com.jfinal.wxaapp.WxaConfig;
import com.jfinal.wxaapp.WxaConfigKit;

import java.util.Map;
import java.util.concurrent.Callable;

/**
 * 小程序access_token
 * @author L.cm
 *
 */
public class WxaAccessTokenApi {
    // "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";
    private static String url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";

    private static final String cachePrefix = "wxa:";

    /**
     * 从缓存中获取 access token，如果未取到或者 access token 不可用则先更新再获取
     * @return WxaAccessToken accessToken
     */
    public static WxaAccessToken getAccessToken() {
        WxaConfig wc = WxaConfigKit.getWxaConfig();
        WxaAccessToken result = getAvailableAccessToken(wc);
        if (result != null) {
            return result;
        }

        return refreshAccessTokenIfNecessary(wc);
    }

    private static WxaAccessToken getAvailableAccessToken(WxaConfig wc) {
        // 利用 appId 与 accessToken 建立关联，支持多账户
        IAccessTokenCache accessTokenCache = ApiConfigKit.getAccessTokenCache();
        String accessTokenJson = accessTokenCache.get(cachePrefix + wc.getAppId());
        if (StrKit.notBlank(accessTokenJson)) {
            WxaAccessToken result = new WxaAccessToken(accessTokenJson);
            if (result != null && result.isAvailable()) {
                return result;
            }
        }
        return null;
    }

    /**
     * 直接获取 accessToken 字符串，方便使用
     * @return String accessToken
     */
    public static String getAccessTokenStr() {
        return getAccessToken().getAccessToken();
    }

    /**
     * synchronized 配合再次获取 token 并检测可用性，防止多线程重复刷新 token 值
     */
    private static synchronized WxaAccessToken refreshAccessTokenIfNecessary(WxaConfig wc) {
        WxaAccessToken result = getAvailableAccessToken(wc);
        if (result != null) {
            return result;
        }
        return refreshAccessToken(wc);
    }

    /**
     * 无条件强制更新 access token 值，不再对 cache 中的 token 进行判断
     * @return WxaAccessToken
     */
    public static WxaAccessToken refreshAccessToken() {
        return refreshAccessToken(WxaConfigKit.getWxaConfig());
    }

    /**
     * 无条件强制更新 access token 值，不再对 cache 中的 token 进行判断
     * @param wc WxaConfig
     * @return WxaAccessToken
     */
    public static WxaAccessToken refreshAccessToken(WxaConfig wc) {
        String appId = wc.getAppId();
        String appSecret = wc.getAppSecret();
        final Map<String, String> queryParas = ParaMap.create("appid", appId).put("secret", appSecret).getData();

        // 最多三次请求
        WxaAccessToken result = RetryUtils.retryOnException(3, new Callable<WxaAccessToken>() {

            @Override
            public WxaAccessToken call() throws Exception {
                String json = HttpUtils.get(url, queryParas);
                return new WxaAccessToken(json);
            }
        });

        // 三次请求如果仍然返回了不可用的 access token 仍然 put 进去，便于上层通过 WxaAccessToken 中的属性判断底层的情况
        if (null != result) {
            // 利用 appId 与 accessToken 建立关联，支持多账户
            IAccessTokenCache accessTokenCache = ApiConfigKit.getAccessTokenCache();
            accessTokenCache.set(cachePrefix + wc.getAppId(), result.getCacheJson());
        }
        return result;
    }

}
