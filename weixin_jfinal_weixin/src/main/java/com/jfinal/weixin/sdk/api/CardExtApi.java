package com.jfinal.weixin.sdk.api;

import com.jfinal.weixin.sdk.utils.HttpUtils;

/**
 * 特殊卡券接口-特殊票券
 * @author L.cm
 *
 */
public class CardExtApi {
    private static String meetingTicketUpdateUserUrl = "https://api.weixin.qq.com/card/meetingticket/updateuser?access_token=";
    
    /**
     * 更新会议门票
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult UpdateMeetingTicketUser(String jsonStr) {
        String jsonResult = HttpUtils.post(meetingTicketUpdateUserUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
    
    private static String movieTicketUpdateUserUrl = "https://api.weixin.qq.com/card/movieticket/updateuser?access_token=";
    
    /**
     * 更新电影票
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult UpdateMovieTicketUser(String jsonStr) {
        String jsonResult = HttpUtils.post(movieTicketUpdateUserUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
    
    private static String checkinBoardingpassUrl = "https://api.weixin.qq.com/card/boardingpass/checkin?access_token=";
    
    /**
     * 更新飞机票信息接口
     * @param jsonStr JSON数据
     * @return {ApiResult}
     */
    public static ApiResult checkinBoardingpass(String jsonStr) {
        String jsonResult = HttpUtils.post(checkinBoardingpassUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
}
