package com.github.sd4324530.fastweixin.api.config;

/**
 * 用户自定义获取accessToken接口.
 *
 * @author Baishui2004
 */
public interface CustomAccessTokenGetter {

    /**
     * 获取token.
     */
    String getAccessToken();

}
