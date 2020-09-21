package com.jfinal.weixin.sdk.api;

import com.jfinal.kit.Kv;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 付费券点
 * @author L.cm
 */
public class CardPayApi {
    private static String activateUrl = "https://api.weixin.qq.com/card/pay/activate?access_token=";

    /**
     * 开通券点账户接口
     * @return {ApiResult}
     */
    public static ApiResult activate() {
        String jsonResult = HttpUtils.get(activateUrl + AccessTokenApi.getAccessTokenStr());
        return new ApiResult(jsonResult);
    }

    private static String getPayPriceUrl = "https://api.weixin.qq.com/card/pay/getpayprice?access_token=";

    /**
     * 对优惠券批价
     * @param cardId 是 string(32) 需要来配置库存的card_id
     * @param quantity 是 int 本次需要兑换的库存数目
     * @return {ApiResult}
     */
    public static ApiResult getPayPrice(String cardId, int quantity) {
        Kv data = Kv.by("card_id", cardId).set("quantity", quantity);
        String jsonResult = HttpUtils.post(getPayPriceUrl + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getCoinsInfoUrl = "https://api.weixin.qq.com/card/pay/getcoinsinfo?access_token=";

    /**
     * 查询券点余额接口
     * @return {ApiResult}
     */
    public static ApiResult getCoinsInfo() {
        String jsonResult = HttpUtils.get(getCoinsInfoUrl + AccessTokenApi.getAccessTokenStr());
        return new ApiResult(jsonResult);
    }

    private static String confirmUrl = "https://api.weixin.qq.com/card/pay/confirm?access_token=";

    /**
     * 确认兑换库存接口
     * @param cardId 是 string(32) 需要来配置库存的card_id
     * @param quantity 是 int 本次需要兑换的库存数目
     * @param orderId 是 string 仅可以使用批价得到的订单号，保证批价有效性
     * @return {ApiResult}
     */
    public static ApiResult confirm(String cardId, int quantity, String orderId) {
        Kv data = Kv.by("card_id", cardId).set("quantity", quantity).set("order_id", orderId);
        String jsonResult = HttpUtils.post(confirmUrl + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String rechargeUrl = "https://api.weixin.qq.com/card/pay/recharge?access_token=";

    /**
     * 充值券点接口
     * @param coinCount 是 int 需要充值的券点数目，1点=1元
     * @return {ApiResult}
     */
    public static ApiResult recharge(int coinCount) {
        Kv data = Kv.by("coin_count", coinCount);
        String jsonResult = HttpUtils.post(rechargeUrl + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getOrderUrl = "https://api.weixin.qq.com/card/pay/getorder?access_token=";

    /**
     * 查询订单详情接口
     * @param orderId 是 int 充值券点接口中获得的订单号，作为一次交易的唯一凭证，由于类型不是100%确定改为Stirng
     * @return {ApiResult}
     */
    public static ApiResult getOrder(String orderId) {
        Kv data = Kv.by("order_id", orderId);
        String jsonResult = HttpUtils.post(getOrderUrl + AccessTokenApi.getAccessTokenStr(), JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getOrderListUrl = "https://api.weixin.qq.com/card/pay/getorderlist?access_token=";

    /**
     * 查询券点流水详情接口
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult getOrderList(String jsonStr) {
        String jsonResult = HttpUtils.post(getOrderListUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
}
