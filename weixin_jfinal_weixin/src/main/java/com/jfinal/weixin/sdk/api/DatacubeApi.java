package com.jfinal.weixin.sdk.api;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.kit.Kv;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 数据统计接口
 * @author L.cm
 * 文档地址：http://mp.weixin.qq.com/wiki/3/ecfed6e1a0a03b5f35e5efac98e864b7.html
 */
public class DatacubeApi {

    private static String getUserSummaryUrl = "https://api.weixin.qq.com/datacube/getusersummary?access_token=";

    private static String getUserCumulateUrl = "https://api.weixin.qq.com/datacube/getusercumulate?access_token=";

    /**
     * 获取统计信息
     * @param url url链接
     * @param begin_date 获取数据的起始日期，begin_date和end_date的差值需小于“最大时间跨度”（比如最大时间跨度为1时，begin_date和end_date的差值只能为0，才能小于1），否则会报错
     * @param end_date 获取数据的结束日期，end_date允许设置的最大值为昨日
     * @return ApiResult
     */
    private static ApiResult getData(String url, String begin_date, String end_date) {
        Map<String, String> mapData = new HashMap<String, String>();
        mapData.put("begin_date", begin_date);
        mapData.put("end_date", end_date);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(mapData));
        return new ApiResult(jsonResult);
    }

    /**
     * 用户分析数据接口，最大时间跨度：7天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUserSummary(String begin_date, String end_date) {
        String url = getUserSummaryUrl + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    /**
     * 用户分析数据接口，最大时间跨度：7天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUserCumulate(String begin_date, String end_date) {
        String url = getUserCumulateUrl + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getArticleSummaryUrl = "https://api.weixin.qq.com/datacube/getarticlesummary?access_token=";

    /**
     * 获取图文群发每日数据，最大跨度1天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getArticleSummary(String begin_date, String end_date) {
        String url = getArticleSummaryUrl + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getArticlEtotalURL = "https://api.weixin.qq.com/datacube/getarticletotal?access_token=";

    /**
     * 获取图文群发总数据，最大跨度1天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getArticlEtotal(String begin_date, String end_date) {
        String url = getArticlEtotalURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUserReadURL = "https://api.weixin.qq.com/datacube/getuserread?access_token=";

    /**
     * 获取图文统计数据，最大跨度3天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUserRead(String begin_date, String end_date) {
        String url = getUserReadURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUserReadHourURL = "https://api.weixin.qq.com/datacube/getuserreadhour?access_token=";

    /**
     * 获取图文统计分时数据，最大跨度1天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUserReadHour(String begin_date, String end_date) {
        String url = getUserReadHourURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUserShareURL = "https://api.weixin.qq.com/datacube/getusershare?access_token=";

    /**
     * 获取图文分享转发数据，最大跨度7天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUserShare(String begin_date, String end_date) {
        String url = getUserShareURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUserShareHourURL = "https://api.weixin.qq.com/datacube/getusersharehour?access_token=";

    /**
     * 获取图文分享转发分时数据，最大跨度1天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUserShareHour(String begin_date, String end_date) {
        String url = getUserShareHourURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUpStreamMsgURL = "https://api.weixin.qq.com/datacube/getupstreammsg?access_token=";

    /**
     * 获取消息发送概况数据，最大跨度7天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUpStreamMsg(String begin_date, String end_date) {
        String url = getUpStreamMsgURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }


    private static String getUpStreamMsgHourURL = "https://api.weixin.qq.com/datacube/getupstreammsghour?access_token=";

    /**
     * 获取消息分送分时数据，最大跨度1天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUpStreamMsgHour(String begin_date, String end_date) {
        String url = getUpStreamMsgHourURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUpStreamMsgWeekMsgURL = "https://api.weixin.qq.com/datacube/getupstreammsgweek?access_token=";

    /**
     * 获取消息发送周数据，最大跨度30天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUpStreamMsgWeekMsg(String begin_date, String end_date) {
        String url = getUpStreamMsgWeekMsgURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUpStreamMsgMonthURL = "https://api.weixin.qq.com/datacube/getupstreammsgmonth?access_token=";

    /**
     * 获取消息发送月数据，最大跨度30天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUpStreamMsgMonth(String begin_date, String end_date) {
        String url = getUpStreamMsgMonthURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUpStreamMsgDistURL = "https://api.weixin.qq.com/datacube/getupstreammsgdist?access_token=";

    /**
     * 获取消息发送分布数据，最大跨度15天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUpStreamMsgDist(String begin_date, String end_date) {
        String url = getUpStreamMsgDistURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUpStreamMsgDistWeekURL = "https://api.weixin.qq.com/datacube/getupstreammsgdistweek?access_token=";

    /**
     * 获取消息发送分布周数据，最大跨度30天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUpStreamMsgDistWeek(String begin_date, String end_date) {
        String url = getUpStreamMsgDistWeekURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getUpStreamMsgDistMonthURL = "https://api.weixin.qq.com/datacube/getupstreammsgdistmonth?access_token=";

    /**
     * 获取消息发送分布月数据，最大跨度30天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getUpStreamMsgDistMonth(String begin_date, String end_date) {
        String url = getUpStreamMsgDistMonthURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getInterFaceSummaryURL = "https://api.weixin.qq.com/datacube/getinterfacesummary?access_token=";

    /**
     * 获取接口分析数据，最大跨度30天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getInterFaceSummary(String begin_date, String end_date) {
        String url = getInterFaceSummaryURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getInterFaceSummaryHourURL = "https://api.weixin.qq.com/datacube/getinterfacesummaryhour?access_token=";

    /**
     * 获取接口分析分时数据，最大跨度1天
     * @param begin_date 获取数据的起始日期
     * @param end_date 获取数据的结束日期
     * @return ApiResult
     */
    public static ApiResult getInterFaceSummaryHour(String begin_date, String end_date) {
        String url = getInterFaceSummaryHourURL + AccessTokenApi.getAccessTokenStr();
        return getData(url, begin_date, end_date);
    }

    private static String getCardBizuinInfo = "https://api.weixin.qq.com/datacube/getcardbizuininfo?access_token=";

    /**
     * 拉取卡券概况数据接口
     * @param beginDate 获取数据的起始日期
     * @param endDate 获取数据的结束日期
     * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
     * @return ApiResult
     */
    public static ApiResult getCardBizuinInfo(String beginDate, String endDate, int condSource) {
        String url = getCardBizuinInfo + AccessTokenApi.getAccessTokenStr();
        Kv data = Kv.by("begin_date", beginDate).set("end_date", endDate)
                .set("cond_source", condSource);
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getCardInfo = "https://api.weixin.qq.com/datacube/getcardcardinfo?access_token=";

    /**
     * 获取免费券数据接口
     * @param beginDate 获取数据的起始日期
     * @param endDate 获取数据的结束日期
     * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
     * @return ApiResult
     */
    public static ApiResult getCardInfo(String beginDate, String endDate, int condSource) {
        return getCardInfo(beginDate, endDate, condSource, null);
    }

    /**
     * 获取免费券数据接口
     * @param beginDate 获取数据的起始日期
     * @param endDate 获取数据的结束日期
     * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
     * @param cardId 卡券ID。填写后，指定拉出该卡券的相关数据。
     * @return ApiResult
     */
    public static ApiResult getCardInfo(String beginDate, String endDate, int condSource, String cardId) {
        String url = getCardInfo + AccessTokenApi.getAccessTokenStr();
        Kv data = Kv.by("begin_date", beginDate).set("end_date", endDate)
                .set("cond_source", condSource);
        if (StrKit.notBlank(cardId)) {
            data.set("card_id", cardId);
        }
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getMemberCardInfo = "https://api.weixin.qq.com/datacube/getcardmembercardinfo?access_token=";

    /**
     * 拉取会员卡概况数据接口
     * @param beginDate 获取数据的起始日期
     * @param endDate 获取数据的结束日期
     * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
     * @return ApiResult
     */
    public static ApiResult getMemberCardInfo(String beginDate, String endDate, int condSource) {
        String url = getMemberCardInfo + AccessTokenApi.getAccessTokenStr();
        Kv data = Kv.by("begin_date", beginDate).set("end_date", endDate)
                .set("cond_source", condSource);
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String getMemberCardDetail = "https://api.weixin.qq.com/datacube/getcardmembercarddetail?access_token=";

    /**
     * 拉取单张会员卡数据接口
     * @param beginDate 获取数据的起始日期
     * @param endDate 获取数据的结束日期
     * @param cardId "card_id":"xxxxxxxxxxxxxxxx" 卡券id
     * @return ApiResult
     */
    public static ApiResult getMemberCardDetail(String beginDate, String endDate, String cardId) {
        String url = getMemberCardDetail + AccessTokenApi.getAccessTokenStr();
        Kv data = Kv.by("begin_date", beginDate).set("end_date", endDate)
                .set("card_id", cardId);
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }
}
