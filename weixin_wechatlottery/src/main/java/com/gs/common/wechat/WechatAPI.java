package com.gs.common.wechat;

import com.gs.common.WebUtil;

/**
 * Created by Wang Genshen on 2017-07-04.
 */
public class WechatAPI {

    public static final String APP_ID = "wxbb5d044b94663978";
    public static final String APP_KEY = "f122d6c1b0dd2cf5baabf2fb1ed80e01";
    public static final String MCH_ID = "1483257182";
    public static final String API_KEY = "uktftujnabx9vba6glx5qq28dcodej36";
    public static final String MD5 = "MD5";
    public static final String TRADE_JSAPI = "JSAPI";
    public static final String TRADE_NATIVE = "NATIVE";

    public static final String REDIRECT_URL = "http://www.sjygxddqc.com/WechatLottery/login";

    public static final String ACCESS_LOGIN_URL = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + APP_ID + "&redirect_uri=" + WebUtil.encodeUrl(REDIRECT_URL) + "&response_type=code&scope=snsapi_userinfo&state=access#wechat_redirect";
    public static final String GET_ACCESS_TOKEN_URL = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=" + APP_ID + "&secret=" + APP_KEY + "&code={CODE}&grant_type=authorization_code";
    public static final String GET_USER_INFO = "https://api.weixin.qq.com/sns/userinfo?access_token={ACCESS_TOKEN}&openid={OPENID}&lang=zh_CN";

    public static final String ORDER_URL = "https://api.mch.weixin.qq.com/pay/unifiedorder";

    public static final String NOTIFY_URL = "http://www.sjygxddqc.com/WechatLottery/pay/result";

    public static final String NOTIFY_RESULT = "<xml>" +
            "  <return_code><![CDATA[SUCCESS]]></return_code>" +
            "  <return_msg><![CDATA[OK]]></return_msg>" +
            "</xml>";
}
