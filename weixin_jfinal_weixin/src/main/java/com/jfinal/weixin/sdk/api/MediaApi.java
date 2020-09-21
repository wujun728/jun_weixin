package com.jfinal.weixin.sdk.api;

import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 素材管理
 * @author l.cm
 * 文档：http://mp.weixin.qq.com/wiki/5/963fc70b80dc75483a271298a76a8d59.html
 */
public class MediaApi {

    /**
     * 上传的临时多媒体文件有格式
     * 分别有图片（image）、语音（voice）、视频（video）和缩略图（thumb）
     */
    public static enum MediaType {
        IMAGE, VOICE, VIDEO, THUMB;

        // 转化成小写形式
        public String get() {
            return this.name().toLowerCase();
        }
    }

    // 新增临时素材
    private static String upload_url = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=";

    /**
     * 上传临时素材
     * @param mediaType 上传的临时多媒体文件有格式
     * @param file 需要上传的文件
     * @return ApiResult
     */
    public static ApiResult uploadMedia(MediaType mediaType, File file) {
        String url = upload_url + AccessTokenApi.getAccessTokenStr() + "&type=" + mediaType.get();
        String jsonStr = HttpUtils.upload(url, file, null);
        return new ApiResult(jsonStr);
    }
    // 文档中是需要用https，实际采用https会报错
    private static String uploadVideoUrl = "http://file.api.weixin.qq.com/cgi-bin/media/uploadvideo?access_token=";

    /**
     * 视频群发的消息素材上传
     * @param mediaId 用于群发的消息的media_id
     * @param title 消息的标题
     * @param description 消息的描述
     * @return {ApiResult}
     */
    public static ApiResult uploadVideo(String mediaId, String title, String description) {
        String url = uploadVideoUrl + AccessTokenApi.getAccessTokenStr();

        Map<String, String> mapData = new HashMap<String, String>();
        mapData.put("media_id", mediaId);
        mapData.put("title", title);
        mapData.put("description", description);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(mapData));
        return new ApiResult(jsonResult);
    }

    private static String uploadNews = "https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=";

    /**
     * 上传图文消息素材【订阅号与服务号认证后均可用】
     * @param mediaArticles 素材实体
     * @return {ApiResult}
     */
    public static ApiResult uploadNews(List<MediaArticles> mediaArticles) {
        String url = uploadNews + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put("articles", mediaArticles);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(dataMap));
        return new ApiResult(jsonResult);
    }

    private static String get_url = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=";

    /**
     * 获取临时素材
     * @param media_id 素材Id
     * @return MediaFile
     */
    public static MediaFile getMedia(String media_id) {
        String url = get_url + AccessTokenApi.getAccessTokenStr() + "&media_id=" + media_id;
        return HttpUtils.download(url);
    }

    private static String get_jssdk_media = "https://api.weixin.qq.com/cgi-bin/media/get/jssdk?access_token=";

    /**
     * 高清语音素材获取接口
     *
     * 公众号可以使用本接口获取从JSSDK的uploadVoice接口上传的临时语音素材，格式为speex，16K采样率。
     * 该音频比上文的临时素材获取接口（格式为amr，8K采样率）更加清晰，适合用作语音识别等对音质要求较高的业务。
     *
     * @param media_id 素材Id
     * @return MediaFile
     */
    public static MediaFile getJssdkMedia(String media_id) {
        String url = get_jssdk_media + AccessTokenApi.getAccessTokenStr() + "&media_id=" + media_id;
        return HttpUtils.download(url);
    }

    private static String add_news_url = "https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=";

    /**
     * 新增永久图文素材
     * @param mediaArticles 图文列表
     * @return ApiResult
     */
    public static ApiResult addNews(List<MediaArticles> mediaArticles) {
        String url = add_news_url + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put("articles", mediaArticles);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(dataMap));
        return new ApiResult(jsonResult);
    }

    private static String uploadImgUrl = "https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=";

    /**
     * 上传图文消息内的图片获取URL
     * 请注意，本接口所上传的图片不占用公众号的素材库中图片数量的5000个的限制。
     * 图片仅支持jpg/png格式，大小必须在1MB以下。
     * @param imgFile 图片文件
     * @return ApiResult
     */
    public static ApiResult uploadImg(File imgFile) {
        String url = uploadImgUrl + AccessTokenApi.getAccessTokenStr();

        String jsonResult = HttpUtils.upload(url, imgFile, null);
        return new ApiResult(jsonResult);
    }

    private static String addMaterialUrl = "https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=";

    /**
     * 新增其他类型永久素材
     * @param file 文件
     * @param mediaType 素材类型
     * @return ApiResult
     */
    public static ApiResult addMaterial(File file, MediaType mediaType) {
        String url = addMaterialUrl + AccessTokenApi.getAccessTokenStr() + "&type=" + mediaType.get();

        String jsonResult = HttpUtils.upload(url, file, null);
        return new ApiResult(jsonResult);
    }

    /**
     * 新增视频永久素材
     * 素材的格式大小等要求与公众平台官网一致。
     * 具体是，图片大小不超过2M，支持bmp/png/jpeg/jpg/gif格式，语音大小不超过5M，长度不超过60秒，支持mp3/wma/wav/amr格式
     * @param file 文件
     * @param title 文件标题
     * @param introduction 介绍
     * @return ApiResult
     */
    public static ApiResult addMaterial(File file, String title, String introduction) {
        String url = addMaterialUrl + AccessTokenApi.getAccessTokenStr();

        Map<String, String> dataMap = new HashMap<String, String>();
        dataMap.put("title", title);
        dataMap.put("introduction", introduction);

        String jsonResult = HttpUtils.upload(url, file, JsonUtils.toJson(dataMap));
        return new ApiResult(jsonResult);
    }

    // 获取永久素材
    private static String get_material_url = "https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=";

    /**
     * 获取永久素材
     * @param media_id 要获取的素材的media_id
     * @return InputStream 流，考虑到这里可能返回json或file请自行使用IOUtils转换
     */
    public static InputStream getMaterial(String media_id) {
        String url = get_material_url + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put("media_id", media_id);

        return HttpUtils.download(url, JsonUtils.toJson(dataMap));
    }

    // 删除永久素材
    private static String del_material_url = "https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=";

    /**
     * 删除永久素材
     * @param media_id 要获取的素材的media_id
     * @return ApiResult 返回信息
     */
    public static ApiResult delMaterial(String media_id) {
        String url = del_material_url + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put("media_id", media_id);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(dataMap));
        return new ApiResult(jsonResult);
    }

    private static String update_news_url = "https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=";

    /**
     * 修改永久图文素材
     * @param media_id 要修改的图文消息的id
     * @param index 要更新的文章在图文消息中的位置（多图文消息时，此字段才有意义），第一篇为0
     * @param mediaArticles 图文素材
     * @return ApiResult 返回信息
     */
    public static ApiResult updateNews(String media_id, int index, MediaArticles mediaArticles) {
        String url = update_news_url + AccessTokenApi.getAccessTokenStr();

        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put("media_id", media_id);
        dataMap.put("index", index);
        dataMap.put("articles", mediaArticles);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(dataMap));
        return new ApiResult(jsonResult);
    }

    // 获取素材总数
    private static String get_materialcount_url = "https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=";

    /**
     * 获取素材总数
     * @return ApiResult 返回信息
     */
    public static ApiResult getMaterialCount() {
        String url = get_materialcount_url + AccessTokenApi.getAccessTokenStr();
        String jsonResult = HttpUtils.get(url);
        return new ApiResult(jsonResult);
    }

    // 获取素材列表
    private static String batchget_material_url = "https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=";

    /**
     * 获取素材列表
     * @param mediaType 素材的类型，图片（image）、视频（video）、语音 （voice）
     * @param offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
     * @param count 返回素材的数量，取值在1到20之间
     * @return ApiResult 返回信息
     */
    public static ApiResult batchGetMaterial(MediaType mediaType, int offset, int count) {
        return batchGetMaterial(mediaType.get(), offset, count);
    }
    
    /**
     * 获取素材列表
     * @param offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
     * @param count 返回素材的数量，取值在1到20之间
     * @return ApiResult 返回信息
     */
    public static ApiResult batchGetMaterialNews(int offset, int count) {
        return batchGetMaterial("news", offset, count);
    }
    
    /**
     * 获取素材列表
     * @param mediaType 素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）
     * @param offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
     * @param count 返回素材的数量，取值在1到20之间
     * @return ApiResult 返回信息
     */
    public static ApiResult batchGetMaterial(String mediaType, int offset, int count) {
        String url = batchget_material_url + AccessTokenApi.getAccessTokenStr();

        if(offset < 0) offset = 0;
        if(count > 20) count = 20;
        if(count < 1) count = 1;

        Map<String, Object> dataMap = new HashMap<String, Object>();
        dataMap.put("type", mediaType);
        dataMap.put("offset", offset);
        dataMap.put("count", count);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(dataMap));
        return new ApiResult(jsonResult);
    }

}
