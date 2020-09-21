package com.jfinal.weixin.sdk.api;

import java.util.List;

import com.jfinal.kit.Kv;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 核销卡券接口
 * @author L.cm
 *
 */
public class CardCodeApi {
    // https://mp.weixin.qq.com/wiki?action=doc&id=mp1451025239&t=0.5997588644623877#1.1
    private static String getCodeUrl = "https://api.weixin.qq.com/card/code/get?access_token=";
    
    /**
     * 查询Code接口
     * 
     * @param code 单张卡券的唯一标准。
     * @param cardId 卡券ID代表一类卡券。自定义code卡券必填。
     * @param checkConsume 是否校验code核销状态，填入true和false时的code异常状态返回数据不同。
     * @return {ApiResult}
     */
    public static ApiResult get(String code, String cardId, boolean checkConsume) {
        Kv data = Kv.by("code", code);
        if (StrKit.notBlank(cardId)) {
            data.set("card_id", cardId);
        }
        data.set("check_consume", checkConsume);
        String jsonResult = HttpUtils.post(getCodeUrl + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String consumeCode = "https://api.weixin.qq.com/card/code/consume?access_token=";
    
    /**
     * 核销Code接口
     * @param code 需核销的Code码。
     * @return {ApiResult}
     */
    public static ApiResult consume(String code) {
        return consume(code, null);
    }
    
    /**
     * 核销Code接口
     * @param code 需核销的Code码。
     * @param cardId card_id卡券ID。创建卡券时use_custom_code填写true时必填。非自定义Code不必填写。
     * @return {ApiResult}
     */
    public static ApiResult consume(String code, String cardId) {
        Kv data = Kv.by("code", code);
        if (StrKit.notBlank(cardId)) {
            data.set("card_id", cardId);
        }
        String jsonResult = HttpUtils.post(consumeCode + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    /**
     * 线上核销Code接口
     * @param code 需核销的Code码。
     * @param openid 是 string(20) 当前卡券使用者的openid，通常通过网页授权登录或自定义url跳转参数获得。
     * @return {ApiResult}
     */
    public static ApiResult consumeOnline(String code, String openid) {
        Kv data = Kv.by("code", code).set("openid", openid);
        String jsonResult = HttpUtils.post(consumeCode + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String decryptCode = "https://api.weixin.qq.com/card/code/decrypt?access_token=";
    
    /**
     * Code解码接口
     * @param encryptCode 经过加密的Code码。
     * @return {ApiResult}
     */
    public static ApiResult decrypt(String encryptCode) {
        Kv data = Kv.by("encrypt_code", encryptCode);
        String jsonResult = HttpUtils.post(decryptCode + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String setDeposit = "http://api.weixin.qq.com/card/code/deposit?access_token=";
    
    /**
     * 导入code接口，文档有歧义 ？？buffer 是 文件的数据流
     * 
     * @param cardId 需要进行导入code的卡券ID。
     * @param codeList 需要进行导入code的卡券ID。
     * @return {ApiResult}
     */
    public static ApiResult setDeposit(String cardId, List<String> codeList) {
        Kv data = Kv.by("card_id", cardId).set("code", codeList);
        String jsonResult = HttpUtils.post(setDeposit + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String getDepositCount = "http://api.weixin.qq.com/card/code/getdepositcount?access_token=";
    
    /**
     * 查询导入code数目接口
     * @param cardId 需要进行导入code的卡券ID。
     * @return {ApiResult}
     */
    public static ApiResult getDepositCount(String cardId) {
        Kv data = Kv.by("card_id", cardId);
        String jsonResult = HttpUtils.post(getDepositCount + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String checkCode = "http://api.weixin.qq.com/card/code/checkcode?access_token=";
    
    /**
     * 核查code接口
     * 
     * @param cardId 需要进行导入code的卡券ID。
     * @param codeList 已经微信卡券后台的自定义code，上限为100个。
     * @return {ApiResult}
     */
    public static ApiResult checkCode(String cardId, List<String> codeList) {
        Kv data = Kv.by("card_id", cardId).set("code", codeList);
        String jsonResult = HttpUtils.post(checkCode + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String update = "https://api.weixin.qq.com/card/code/update?access_token=";
    
    /**
     * 更改Code接口
     * @param code 需变更的Code码。
     * @param newCode 变更后的有效Code码。
     * @return {ApiResult}
     */
    public static ApiResult update(String code, String newCode) {
        return update(null, code, newCode);
    }
    
    /**
     * 更改Code接口
     * @param cardId 卡券ID。自定义Code码卡券为必填。
     * @param code 需变更的Code码。
     * @param newCode 变更后的有效Code码。
     * @return {ApiResult}
     */
    public static ApiResult update(String cardId, String code, String newCode) {
        Kv data = Kv.by("code", code).set("new_code", newCode);
        if (StrKit.notBlank(cardId)) {
            data.set("card_id", cardId);
        }
        String jsonResult = HttpUtils.post(update + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
    private static String mark = "https://api.weixin.qq.com/card/code/mark?access_token=";
    
    /**
     * 朋友的券-Mark(占用)Code接口
     * 
     * @param code 是 卡券的code码。
     * @param cardId 需要进行导入code的卡券ID。
     * @param openid 是 用券用户的openid。
     * @param isMark 是    是否要mark（占用）这个code，填写true或者false，表示占用或解除占用。
     * @return {ApiResult}
     */
    public static ApiResult markCode(String code, String cardId, String openid, boolean isMark) {
        Kv data = Kv.by("code", code).set("card_id", cardId).set("openid", openid).set("is_mark", isMark);
        String jsonResult = HttpUtils.post(mark + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
    
}
