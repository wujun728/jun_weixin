/**
 * Copyright (c) 2011-2015, Unas 小强哥 (unas@qq.com).
 * <p/>
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.api;

import com.jfinal.weixin.sdk.kit.ParaMap;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 多客服功能<br>
 * 仅支持获取客服聊天记录接口，其他功能可以使用微信官方的多客服客户端软件来完成。
 *
 * 客服接口：http://mp.weixin.qq.com/wiki/1/70a29afed17f56d537c833f89be979c9.html
 */
public class CustomServiceApi {

    private static String getRecordUrl = "https://api.weixin.qq.com/customservice/msgrecord/getrecord?access_token=";

    /**
     * 获取客服聊天记录
     * @param jsonStr json字符串
     * @return {ApiResult}
     */
    public static ApiResult getRecord(String jsonStr) {
        String jsonResult = HttpUtils.post(getRecordUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }

    /**
     * 获取客服聊天记录
     * @param pageindex 查询第几页，从1开始
     * @param pagesize 每页大小，每页最多拉取50条
     * @param starttime 查询开始时间，UNIX时间戳
     * @param endtime 查询结束时间，UNIX时间戳，每次查询不能跨日查询
     * @return ApiResult
     */
    public static ApiResult getRecord(int pageindex, int pagesize, long starttime, long endtime) {
        if (pageindex < 1) { pageindex = 1; }
        if (pagesize < 1 || pagesize > 50) { pagesize = 50; }

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("pageindex", pageindex);
        params.put("pagesize", pagesize);
        params.put("starttime", starttime);
        params.put("endtime", endtime);
        return getRecord(JsonUtils.toJson(params));
    }

    private static String addKfAccountUrl = "https://api.weixin.qq.com/customservice/kfaccount/add?access_token=";

    /**
     * 添加客服帐号
     * @param kf_account 完整客服账号，格式为：账号前缀@公众号微信号
     * @param nickname 客服昵称，最长6个汉字或12个英文字符
     * @param password 客服账号登录密码，格式为密码明文的32位加密MD5值。该密码仅用于在公众平台官网的多客服功能中使用，若不使用多客服功能，则不必设置密码
     * @return ApiResult
     */
    public static ApiResult addKfAccount(String kf_account, String nickname, String password) {
        String accessToken = AccessTokenApi.getAccessTokenStr();

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("kf_account", kf_account);
        params.put("nickname", nickname);
        params.put("password", password);

        String jsonResult = HttpUtils.post(addKfAccountUrl + accessToken, JsonUtils.toJson(params));
        return new ApiResult(jsonResult);
    }

    private static String updateKfAccountUrl = "https://api.weixin.qq.com/customservice/kfaccount/update?access_token=";

    /**
     * 修改客服帐号
     * @param kf_account 完整客服账号，格式为：账号前缀@公众号微信号
     * @param nickname 客服昵称，最长6个汉字或12个英文字符
     * @param password 客服账号登录密码，格式为密码明文的32位加密MD5值。该密码仅用于在公众平台官网的多客服功能中使用，若不使用多客服功能，则不必设置密码
     * @return ApiResult
     */
    public static ApiResult updateKfAccount(String kf_account, String nickname, String password) {
        String accessToken = AccessTokenApi.getAccessTokenStr();

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("kf_account", kf_account);
        params.put("nickname", nickname);
        params.put("password", password);

        String jsonResult = HttpUtils.post(updateKfAccountUrl + accessToken, JsonUtils.toJson(params));
        return new ApiResult(jsonResult);
    }

    private static String delKfAccountUrl = "https://api.weixin.qq.com/customservice/kfaccount/del";

    /**
     * 删除客服帐号
     * @param kf_account 完整客服账号，格式为：账号前缀@公众号微信号
     * @return ApiResult
     */
    public static ApiResult delKfAccount(String kf_account) {
        String accessToken = AccessTokenApi.getAccessTokenStr();

        String jsonResult = HttpUtils.get(delKfAccountUrl, ParaMap
                .create("access_token", accessToken)
                .put("kf_account", kf_account)
                .getData());

        return new ApiResult(jsonResult);
    }

    private static String uploadKfAccountHeadImgUrl = "https://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=";

    /**
     * 设置客服帐号的头像
     * @param kf_account 完整客服账号，格式为：账号前缀@公众号微信号
     * @param headImg 客服人员的头像，头像图片文件必须是jpg格式，推荐使用640*640大小的图片以达到最佳效果
     * @return ApiResult
     */
    public static ApiResult uploadKfAccountHeadImg(String kf_account, File headImg) {
        String accessToken = AccessTokenApi.getAccessTokenStr();
        String url = uploadKfAccountHeadImgUrl + accessToken + "&kf_account=" + kf_account;
        String jsonResult = HttpUtils.upload(url, headImg, null);
        return new ApiResult(jsonResult);
    }

    private static String getKfListUrl = "https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=";

    /**
     * 获取所有客服账号
     * @return ApiResult
     */
    public static ApiResult getKfList() {
        String accessToken = AccessTokenApi.getAccessTokenStr();
        String jsonResult = HttpUtils.get(getKfListUrl + accessToken);
        return new ApiResult(jsonResult);
    }

    private static String getOnlineKFListUrl = "https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?access_token=";

    /**
     * 获取在线客服接待信息
     * @return ApiResult
     */
    public static ApiResult getOnlineKFList() {
        String accessToken = AccessTokenApi.getAccessTokenStr();
        String jsonResult = HttpUtils.get(getOnlineKFListUrl + accessToken);
        return new ApiResult(jsonResult);
    }

    private static String customMessageUrl = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";

    /**
     * 发送客服消息
     * @param message 消息封装
     * @return ApiResult
     */
    private static ApiResult sendMsg(Map<String, Object> message) {
        String accessToken = AccessTokenApi.getAccessTokenStr();
        String jsonResult = HttpUtils.post(customMessageUrl + accessToken, JsonUtils.toJson(message));
        return new ApiResult(jsonResult);
    }

    /**
     * 发送文本客服消息
     * @param openId openId
     * @param text 文本消息
     * @return ApiResult
     */
    public static ApiResult sendText(String openId, String text) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "text");

        Map<String, Object> textObj = new HashMap<String, Object>();
        textObj.put("content", text);

        json.put("text", textObj);
        return sendMsg(json);
    }

    /**
     * 发送图片消息
     * @param openId openId
     * @param media_id 图片媒体id
     * @return ApiResult
     */
    public static ApiResult sendImage(String openId, String media_id) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "image");

        Map<String, Object> image = new HashMap<String, Object>();
        image.put("media_id", media_id);

        json.put("image", image);
        return sendMsg(json);
    }

    /**
     * 发送语言回复
     * @param openId openId
     * @param media_id 媒体id
     * @return ApiResult
     */
    public static ApiResult sendVoice(String openId, String media_id) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "voice");

        Map<String, Object> voice = new HashMap<String, Object>();
        voice.put("media_id", media_id);

        json.put("voice", voice);
        return sendMsg(json);
    }

    /**
     * 发送视频回复
     * @param openId openId
     * @param media_id 媒体id
     * @param title 视频标题
     * @param description 视频描述
     * @return {ApiResult}
     */
    public static ApiResult sendVideo(String openId, String media_id, String title, String description) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "video");

        Map<String, Object> video = new HashMap<String, Object>();
        video.put("media_id", media_id);
        video.put("title", title);
        video.put("description", description);

        json.put("video", video);
        return sendMsg(json);
    }

    /**
     * 发送音乐回复
     * @param openId openId
     * @param musicurl 音乐地址
     * @param hqmusicurl 音乐高清地址
     * @param thumb_media_id 音乐媒体id
     * @param title 音乐标题
     * @param description 音乐描述
     * @return {ApiResult}
     */
    public static ApiResult sendMusic(String openId, String musicurl, String hqmusicurl, String thumb_media_id, String title, String description) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "music");

        Map<String, Object> music = new HashMap<String, Object>();
        music.put("musicurl", musicurl);
        music.put("hqmusicurl", hqmusicurl);
        music.put("thumb_media_id", thumb_media_id);
        music.put("title", title);
        music.put("description", description);

        json.put("music", music);
        return sendMsg(json);
    }

    /**
     * 发送图文回复，图文消息条数限制在8条以内
     * @param openId openId
     * @param articles 图文信息封装
     * @return {ApiResult}
     */
    public static ApiResult sendNews(String openId, List<Articles> articles) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "news");

        Map<String, Object> news = new HashMap<String, Object>();
        news.put("articles", articles);

        json.put("news", news);
        return sendMsg(json);
    }

    /**
     * 客户消息图文封装和 `News` 又略微区别，无法公用
     */
    public static class Articles {
        private String title;
        private String description;
        private String url;
        private String picurl;

        public String getTitle() {
            return title;
        }
        public void setTitle(String title) {
            this.title = title;
        }
        public String getDescription() {
            return description;
        }
        public void setDescription(String description) {
            this.description = description;
        }
        public String getUrl() {
            return url;
        }
        public void setUrl(String url) {
            this.url = url;
        }
        public String getPicurl() {
            return picurl;
        }
        public void setPicurl(String picurl) {
            this.picurl = picurl;
        }
    }

    /**
     * 发送图文消息（点击跳转到图文消息页面），图文消息条数限制在8条以内
     * @param openId 普通用户openid
     * @param mediaId 素材id
     * @return ApiResult
     */
    public static ApiResult sendMpNews(String openId, String mediaId) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "mpnews");

        Map<String, Object> news = new HashMap<String, Object>();
        news.put("media_id", mediaId);

        json.put("mpnews", news);
        return sendMsg(json);
    }

    /**
     * 发送卡券
     * @param openId 普通用户openid
     * @param card_id 卡券id
     * @param card_ext 详情及签名规则: http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.99.84.E5.BD.954-.E5.8D.A1.E5.88.B8.E6.89.A9.E5.B1.95.E5.AD.97.E6.AE.B5.E5.8F.8A.E7.AD.BE.E5.90.8D.E7.94.9F.E6.88.90.E7.AE.97.E6.B3.95
     * @return ApiResult
     */
    public static ApiResult sendCoupon(String openId, String card_id, String card_ext) {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "wxcard");

        Map<String, Object> wxcard = new HashMap<String, Object>();
        wxcard.put("card_id", card_id);
        wxcard.put("card_ext", card_ext);

        json.put("wxcard", wxcard);
        return sendMsg(json);
    }

    private static String inviteWorkerUrl = "https://api.weixin.qq.com/customservice/kfaccount/inviteworker?access_token=";

    /**
     * 邀请绑定客服帐号
     *
     * 新添加的客服帐号是不能直接使用的，只有客服人员用微信号绑定了客服账号后，方可登录Web客服进行操作。
     * 此接口发起一个绑定邀请到客服人员微信号，客服人员需要在微信客户端上用该微信号确认后帐号才可用。
     * 尚未绑定微信号的帐号可以进行绑定邀请操作，邀请未失效时不能对该帐号进行再次绑定微信号邀请。
     *
     * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param invite_wx 接收绑定邀请的客服微信号
     * @return ApiResult
     */
    public static ApiResult inviteWorker(String kf_account, String invite_wx) {
        String accessToken = AccessTokenApi.getAccessTokenStr();

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("kf_account", kf_account);
        params.put("invite_wx", invite_wx);

        String jsonResult = HttpUtils.post(inviteWorkerUrl + accessToken, JsonUtils.toJson(params));
        return new ApiResult(jsonResult);
    }

    //会话控制-----------------------------------------------------------------------------------
    private static String createSession = "https://api.weixin.qq.com/customservice/kfsession/create?access_token=";

    /**
     * 创建会话
     *
     * 此接口在客服和用户之间创建一个会话，如果该客服和用户会话已存在，则直接返回0。指定的客服帐号必须已经绑定微信号且在线。
     *
     * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param openid 粉丝的openid
     * @return ApiResult
     */
    public static ApiResult createSession(String kf_account, String openid) {
        String url = createSession + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("kf_account", kf_account);
        params.put("openid", openid);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(params));
        return new ApiResult(jsonResult);
    }

    private static String closeSession = "https://api.weixin.qq.com/customservice/kfsession/close?access_token=";

    /**
     * 关闭会话
     *
     * 此接口在客服和用户之间创建一个会话，如果该客服和用户会话已存在，则直接返回0。指定的客服帐号必须已经绑定微信号且在线。
     *
     * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @param openid 粉丝的openid
     * @return ApiResult
     */
    public static ApiResult closeSession(String kf_account, String openid) {
        String url = closeSession + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("kf_account", kf_account);
        params.put("openid", openid);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(params));
        return new ApiResult(jsonResult);
    }


    private static String getSession = "https://api.weixin.qq.com/customservice/kfsession/getsession";
    /**
     * 获取客户会话状态
     * 此接口获取一个客户的会话，如果不存在，则kf_account为空
     * @param openid 粉丝的openid
     * @return ApiResult
     *
     * 不存在会话:
     * {"createtime":0,"kf_account":""}
     *
     * 存在一个会话:
      {
         "createtime" : 123456789,      //会话接入的时间
         "kf_account" : "test1@test"      //正在接待的客服，为空表示没有人在接待
      }
     */
    public static ApiResult getSession(String openid) {
        String accessToken = AccessTokenApi.getAccessTokenStr();

        String jsonResult = HttpUtils.get(getSession, ParaMap
                .create("access_token", accessToken)
                .put("openid", openid)
                .getData());

        return new ApiResult(jsonResult);
    }


    private static String getSessionList = "https://api.weixin.qq.com/customservice/kfsession/getsessionlist";
    /**
     * 获取客服会话列表
     * 此接口获取一个客户的会话，如果不存在，则kf_account为空
     * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
     * @return ApiResult
     *
     * 不存在会话:
     * {"sessionlist":[]}
     *
     * 存在一个会话:
      {
         "sessionlist" : [
            {
               "createtime" : 123456789,      //会话接入的时间
               "openid" : "OPENID"         //粉丝openid
            },
            {
               "createtime" : 123456789,
               "openid" : "OPENID"
            }
         ]
      }
     */
    public static ApiResult getSessionList(String kf_account) {
        String accessToken = AccessTokenApi.getAccessTokenStr();

        String jsonResult = HttpUtils.get(getSessionList, ParaMap
                .create("access_token", accessToken)
                .put("kf_account", kf_account)
                .getData());

        return new ApiResult(jsonResult);
    }


    private static String getWaitCase = "https://api.weixin.qq.com/customservice/kfsession/getwaitcase";
    /**
     * 获取未接入会话列表
     * 此接口获取一个客户的会话，如果不存在，则kf_account为空
     * @return ApiResult
     *
     * 不存在会话:
     * {"count":0,"waitcaselist":[]}
     *
     * 存在一个会话:
      {
         "count" : 1,                                 //未接入会话数量
         "waitcaselist" : [                           //未接入会话列表，最多返回100条数据，按照来访顺序
            {
               "latest_time" : 1488784362,               //粉丝的最后一条消息的时间
               "openid" : "oC8JsuC61cKB_XMuh_Eb3Yk2yWsQ"      //粉丝的openid
            }
         ]
      }
     */
    public static ApiResult getWaitCase() {
        String accessToken = AccessTokenApi.getAccessTokenStr();

        String jsonResult = HttpUtils.get(getWaitCase, ParaMap
                .create("access_token", accessToken)
                .getData());

        return new ApiResult(jsonResult);
    }


    //获取聊天记录-------------------------------------------------------------------------------------------
    //获取聊记录
    private static String getMsgList = "https://api.weixin.qq.com/customservice/msgrecord/getmsglist?access_token=";

    /**
     * 获取聊天记录
     *
     * 此接口返回的聊天记录中，对于图片、语音、视频，分别展示成文本格式的[image]、[voice]、[video]。
     * 对于较可能包含重要信息的图片消息，后续将提供图片拉取URL，近期将上线。
     *
     * @param starttime 起始时间，unix时间戳
     * @param endtime 结束时间，unix时间戳，每次查询时段不能超过24小时
     * @param msgid 消息id顺序从小到大，从1开始
     * @param number 每次获取条数，最多10000条
     *
     * @return ApiResult
     *
      {
         "msgid" : 21957537,            //下次请求的msgid
         "number" : 24,               //请求到的信息的总条数
         "recordlist" : [               //消息列表
            {
               "openid" : "oC8JsuPnZTqSLImnbHfJBQYRgniI",      //粉丝openid
               "opercode" : 2002,                        //操作码, (2002: 客服发送信息, 2003: 客服接收消息)
               "text" : "https://mp.weixin.qq.com",   //聊天记录
               "time" : 1488783439,                     //操作时间，unix时间戳
               "worker" : "kf2001@ideal2002"               //完整客服帐号，格式为：帐号前缀@公众号微信号
            }
         ]
      }
     */
    public static ApiResult getMsgList(int starttime, int endtime, int msgid, int number) {
        String url = getMsgList + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> params = new HashMap<String, Object>();
        params.put("starttime", starttime);
        params.put("endtime", endtime);
        params.put("msgid", msgid);
        params.put("number", number);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(params));
        return new ApiResult(jsonResult);
    }
}
