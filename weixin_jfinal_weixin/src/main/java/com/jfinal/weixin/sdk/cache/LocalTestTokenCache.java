package com.jfinal.weixin.sdk.cache;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.jfinal.core.JFinal;
import com.jfinal.kit.HttpKit;

/**
 * 本地测试和线上同时使用同一个或者一批公众号测试时使用
 * @author L.cm
 *
 */
public class LocalTestTokenCache implements IAccessTokenCache {
    private Map<String, String> map = new ConcurrentHashMap<String, String>();
    
    /**
     * 线上AccessToken请求地址
     * 需要开发一个获取AccessToken字符串的地址
     */
    private final String onLineTokenUrl;
    
    public LocalTestTokenCache(String onLineTokenUrl) {
        this.onLineTokenUrl = onLineTokenUrl;
    }
    
    @Override
    public String get(String key) {
        String url = onLineTokenUrl + "?key=" + enCodeUrl(key);
        return HttpKit.get(url);
    }
    
    @Override
    public void set(String key, String jsonValue) {
        map.put(key, jsonValue);
    }

    @Override
    public void remove(String key) {
        map.remove(key);
    }
    
    private static String enCodeUrl(String key) {
        try {
            return URLEncoder.encode(key, JFinal.me().getConstants().getEncoding());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return key;
    }
}
