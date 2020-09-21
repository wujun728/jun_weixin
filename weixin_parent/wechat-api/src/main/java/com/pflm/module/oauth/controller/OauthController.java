package com.pflm.module.oauth.controller;
import com.alibaba.fastjson.JSONObject;
import com.pflm.annotation.ApiSysyLog;
import com.pflm.module.BaseController;
import com.pflm.module.oauth.service.OauthService;
import com.pflm.utils.R;
import com.pflm.utils.WeixinUtil;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
/**
 * 微信网页授权
 * @author qinxuewu
 * @version 1.00
 * @time 7/11/2018下午 4:22
 */
@Controller
@RequestMapping("/api/sns")
public class OauthController extends BaseController {
    public  final Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    public OauthService oauthService;

    /**
     * 网页授权获取用户code
     * @param redirectUri  请求方的回调地址
     * @param scope     网页授权类型
     * @return
     */
    @RequestMapping("/oauth2/authorize")
    public ModelAndView authorize(String redirectUri,String scope){
        ModelAndView view=new ModelAndView();
        try {
            String oauth2Url= WeixinUtil.AUTHORIZE.replaceAll("APPID",appid).replaceAll("REDIRECT_URI",redirectUri).replaceAll("scope",scope);
            view.setViewName("redircet:/"+oauth2Url);
        }catch (Exception e){
            logger.error("微信网页授权异常：(),{}",redirectUri,e);
        }
        return  view;
    }

    /**
     * 通过code获取用户网页授权access_token openid
     * @param code
     * @return
     */
    @ApiSysyLog("通过code获取用户openid")
    @RequestMapping("/oauth2/getUserOpenid")
    public R getUserOpenid(String code){
        try {
            if(StringUtils.isEmpty(code)){
                return R.error("code不能为空");
            }
            JSONObject info=oauthService.accessUserInfoToken(appid,appsecret,code,"authorization_code");
            return  R.ok().put("data",info);
        }catch (Exception e){
            logger.error("微信网页授权异常：(),{}",code,e);
            return R.error("服务繁忙，请联系管理员");
        }
    }

    /**
     * 获取用户的基本信息
     * @param openid
     * @param accessToken
     * @return
     */
    @ApiSysyLog("获取用户的基本信息")
    @RequestMapping("/oauth2/getUserInfo")
    public R getUserInfo(String openid,String accessToken){
        try {
            if(StringUtils.isEmpty(openid)||StringUtils.isEmpty(accessToken)){
                return R.error("openid,accessToken不能为空");
            }
            JSONObject info=oauthService.userinfo(accessToken,openid,"zh_CN ");
            return  R.ok().put("data",info);
        }catch (Exception e){
            logger.error("获取用户信息异常：(),{}",openid,e);
            return R.error("服务繁忙，请联系管理员");
        }
    }


}
