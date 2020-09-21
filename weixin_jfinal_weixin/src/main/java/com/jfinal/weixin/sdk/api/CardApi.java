package com.jfinal.weixin.sdk.api;

import java.util.List;

import com.jfinal.kit.Kv;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 卡券相关接口
 * Created by L.cm on 2016/6/16.
 */
public class CardApi {
    private static String cardCreateUrl = "https://api.weixin.qq.com/card/create?access_token=";

    /**
     * 创建会员卡接口
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult create(String jsonStr) {
        String jsonResult = HttpUtils.post(cardCreateUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    private static String createQrcodeCard = "https://api.weixin.qq.com/card/qrcode/create?access_token=";

    /**
     * 创建二维码接口
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult createQrcode(String jsonStr) {
        String jsonResult = HttpUtils.post(createQrcodeCard + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    private static String createLandingPageCard = "https://api.weixin.qq.com/card/landingpage/create?access_token=";

    /**
     * 创建货架接口
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult createLandingPage(String jsonStr) {
        String jsonResult = HttpUtils.post(createLandingPageCard + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    private static String gethtmlMpnews = "https://api.weixin.qq.com/card/mpnews/gethtml?access_token=";

    /**
     * 图文消息群发卡券
     * @param cardId 必填 否 卡券ID。
     * @return {ApiResult}
     */
    public static ApiResult gethtmlMpnews(String cardId) {
        Kv data = Kv.create();
        if (StrKit.notBlank(cardId)) {
            data.set("card_id", cardId);
        }
        String jsonResult = HttpUtils.post(gethtmlMpnews + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String setTestWhiteList = "https://api.weixin.qq.com/card/testwhitelist/set?access_token=";

    /**
     * 设置测试白名单
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult setTestWhiteList(String jsonStr) {
        String jsonResult = HttpUtils.post(setTestWhiteList + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    private static String setPaycell = "https://api.weixin.qq.com/card/testwhitelist/set?access_token=";

    /**
     * 设置买单接口
     * @param cardId 卡券ID
     * @param isOpen 是否开启买单功能，填true/false
     * @return {ApiResult}
     */
    public static ApiResult setPaycell(String cardId, boolean isOpen) {
        Kv data = Kv.by("card_id", cardId).set("is_open", isOpen);
        String jsonResult = HttpUtils.post(setPaycell + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String setSelfconsumecell = "https://api.weixin.qq.com/card/selfconsumecell/set?access_token=";

    /**
     * 设置自助核销接口
     * @param cardId 卡券ID
     * @param isOpen 是否开启买单功能，填true/false
     * @return {ApiResult}
     */
    public static ApiResult setSelfconsumecell(String cardId, boolean isOpen){
        return setSelfconsumecell(cardId, isOpen, false, false);
    }

    /**
     * 设置自助核销接口
     * @param cardId 卡券ID
     * @param isOpen 是否开启买单功能，填true/false
     * @param needVerifyCod 用户核销时是否需要输入验证码，填true/false，默认为false
     * @param needRemarkAmount 用户核销时是否需要备注核销金额，填true/false，默认为false
     * @return {ApiResult}
     */
    public static ApiResult setSelfconsumecell(String cardId, boolean isOpen, boolean needVerifyCod, boolean needRemarkAmount) {
        Kv data = Kv.by("card_id", cardId).set("is_open", isOpen).set("need_verify_cod", needVerifyCod)
                .set("need_remark_amount", needRemarkAmount);
        String jsonResult = HttpUtils.post(setSelfconsumecell + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getUserCardList = "https://api.weixin.qq.com/card/user/getcardlist?access_token=";

    /**
     * 获取用户已领取卡券接口
     *
     * @param openid 是 string(64) 需要查询的用户openid
     * @return {ApiResult}
     */
    public static ApiResult getUserCardList(String openid) {
        return getUserCardList(openid, null);
    }

    /**
     * 获取用户已领取卡券接口
     *
     * @param openid 是 string(64) 需要查询的用户openid
     * @param cardId 否    string(32) 卡券ID。不填写时默认查询当前appid下的卡券。
     * @return {ApiResult}
     */
    public static ApiResult getUserCardList(String openid, String cardId) {
        Kv data = Kv.by("openid", openid);
        if (StrKit.notBlank(cardId)) {
            data.set("card_id", cardId);
        }
        String jsonResult = HttpUtils.post(getUserCardList + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getCard = "https://api.weixin.qq.com/card/get?access_token=";

    /**
     * 查看卡券详情
     * @param cardId 卡券ID
     * @return {ApiResult}
     */
    public static ApiResult get(String cardId) {
        Kv data = Kv.by("card_id", cardId);
        String jsonResult = HttpUtils.post(getCard + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getBatch = "https://api.weixin.qq.com/card/batchget?access_token=";

    /**
     * 批量查询卡券列表
     * @param offset 查询卡列表的起始偏移量，从0开始，即offset: 5是指从从列表里的第六个开始读取。
     * @param count    需要查询的卡片的数量（数量最大50）。
     * @return {ApiResult}
     */
    public static ApiResult getBatch(int offset, int count) {
        return getBatch(offset, count, null);
    }

    /**
     * 批量查询卡券列表
     * @param offset 查询卡列表的起始偏移量，从0开始，即offset: 5是指从从列表里的第六个开始读取。
     * @param count    需要查询的卡片的数量（数量最大50）。
     * @param statusList 支持开发者拉出指定状态的卡券列表“CARD_STATUS_NOT_VERIFY”,待审核；“CARD_STATUS_VERIFY_FAIL”,审核失败；“CARD_STATUS_VERIFY_OK”，通过审核；“CARD_STATUS_DELETE”，卡券被商户删除；“CARD_STATUS_DISPATCH”在公众平台投放过的卡券；
     * @return {ApiResult}
     */
    public static ApiResult getBatch(int offset, int count, List<String> statusList) {
        Kv data = Kv.by("offset", offset).set("count", count);
        if (statusList != null && !statusList.isEmpty()) {
            data.set("status_list", statusList);
        }
        String jsonResult = HttpUtils.post(getBatch + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String update = "https://api.weixin.qq.com/card/update?access_token=";

    /**
     * 更改卡券信息接口
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult update(String jsonStr) {
        String jsonResult = HttpUtils.post(update + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    private static String modifystock = "https://api.weixin.qq.com/card/modifystock?access_token=";

    /**
     * 修改库存接口
     * @param cardId 卡券ID
     * @param stockValue 增减的库存数量 负数为减，正数为增加,0不增不减。
     * @return {ApiResult}
     */
    public static ApiResult modifystock(String cardId, int stockValue) {
        Kv data = Kv.by("card_id", cardId);
        if (stockValue >= 0) {
            data.set("increase_stock_value", stockValue);
        } else {
            data.set("reduce_stock_value", stockValue);
        }
        String jsonResult = HttpUtils.post(modifystock + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String delete = "https://api.weixin.qq.com/card/delete?access_token=";

    /**
     * 删除卡券接口
     * @param cardId 卡券ID
     * @return {ApiResult}
     */
    public static ApiResult delete(String cardId) {
        Kv data = Kv.by("card_id", cardId);
        String jsonResult = HttpUtils.post(delete + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String unavailable = "https://api.weixin.qq.com/card/code/unavailable?access_token=";

    /**
     * 设置卡券失效接口,自定义卡券的请求
     * @param code 设置失效的Code码。
     * @param reason 用户发生退款    失效理由
     * @return {ApiResult}
     */
    public static ApiResult unavailableByCode(String code, String reason) {
        Kv data = Kv.by("code", code).set("reason", reason);
        String jsonResult = HttpUtils.post(unavailable + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    /**
     * 设置卡券失效接口,自定义code卡券的请求。
     * @param cardId 卡券ID
     * @param reason 用户发生退款    失效理由
     * @return {ApiResult}
     */
    public static ApiResult unavailableByCard(String cardId, String reason) {
        Kv data = Kv.by("card_id", cardId).set("reason", reason);
        String jsonResult = HttpUtils.post(unavailable + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
}
