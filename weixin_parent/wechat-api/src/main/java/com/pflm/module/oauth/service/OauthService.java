package com.pflm.module.oauth.service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 微信授权处理
 */
@FeignClient(name="oauth", url = "${wx.api.url}",fallback=OauthServiceHystric.class)
public interface OauthService {


    /**
     * 通过code换取网页授权access_token
     * @param appid
     * @param secret
     * @param code
     * @param grant_type 填写为authorization_code
     * @return
     */
    @RequestMapping(value = "/sns/oauth2/access_token", method = RequestMethod.GET)
    public JSONObject accessUserInfoToken(@RequestParam("appid") String appid, @RequestParam("secret") String secret,
                                          @RequestParam("code") String code,@RequestParam("grant_type") String grant_type);


    /**
     * 刷新access_token（如果需要）
     * @param appid
     * @param grant_type     填写为refresh_token
     * @param refresh_token  填写通过access_token获取到的refresh_token参数
     * @return
     */
    @RequestMapping(value = "/sns/oauth2/refresh_token", method = RequestMethod.GET)
    public JSONObject refreshToken(@RequestParam("appid") String appid,@RequestParam("grant_type") String grant_type,@RequestParam("refresh_token") String refresh_token);

    /**
     * 拉取用户信息(需网页授权作用域为snsapi_userinfo为 snsapi_userinfo)
     * @param access_token  网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
     * @param openid    用户的唯一标识
     * @param lang     返回国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语
     * @return
     */
    @RequestMapping(value = "/sns/userinfo", method = RequestMethod.GET)
    public JSONObject userinfo(@RequestParam("access_token") String access_token,@RequestParam("openid") String openid,@RequestParam("lang") String lang);



}
