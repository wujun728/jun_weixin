package com.jfinal.weixin.sdk.api;

import com.jfinal.kit.Kv;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 会员卡接口
 * @author L.cm
 *
 */
public class MemberCardApi {
    private static String activateUrl = "https://api.weixin.qq.com/card/membercard/activate?access_token=";
    
    /**
     * 接口激活
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult activate(String jsonStr) {
        String jsonResult = HttpUtils.post(activateUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
    
    private static String setActivateUserFormUrl = "https://api.weixin.qq.com/card/membercard/activateuserform/set?access_token=";
    
    /**
     * 普通一键激活-设置开卡字段接口
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult setActivateUserForm(String jsonStr) {
        String jsonResult = HttpUtils.post(setActivateUserFormUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
    
    private static String getUserInfoUrl = "https://api.weixin.qq.com/card/membercard/userinfo/get?access_token=";
    
    /**
     * 拉取会员信息接口
     * @param cardId 卡券ID代表一类卡券。
     * @param code 卡券code。
     * @return {ApiResult}
     */
    public static ApiResult getUserInfo(String cardId, String code) {
        Kv data = Kv.by("card_id", cardId).set("code", code);
        String jsonResult = HttpUtils.post(getUserInfoUrl + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String getActivateTempInfoUrl = "https://api.weixin.qq.com/card/membercard/activatetempinfo/get?access_token=";
    
    /**
     * 跳转型一键激活-设置开卡字段接口-获取用户提交资料
     * @param activaTeicket 用户填写信息的参数
     * @return {ApiResult}
     */
    public static ApiResult getActivateTempInfo(String activaTeicket) {
        Kv data = Kv.by("activate_ticket", activaTeicket);
        String jsonResult = HttpUtils.post(getActivateTempInfoUrl + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String updateUserUrl = "https://api.weixin.qq.com/card/membercard/updateuser?access_token=";
    
    /**
     * 更新会员信息
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult updateUser(String jsonStr) {
        String jsonResult = HttpUtils.post(updateUserUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
}
