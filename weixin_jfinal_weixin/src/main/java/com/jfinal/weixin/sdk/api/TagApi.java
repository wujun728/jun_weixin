package com.jfinal.weixin.sdk.api;

import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

import java.util.HashMap;
import java.util.List;

/**
 * 用户标签接口
 */
public class TagApi {

    private static String CREATE_URL = "https://api.weixin.qq.com/cgi-bin/tags/create?access_token=";

    /**
     * @param name 标签名（30个字符以内）
     * @return {ApiResult}
     */
    public static ApiResult create(String name) {
        String url = CREATE_URL + AccessTokenApi.getAccessTokenStr();
        HashMap<String, Object> data = new HashMap<String, Object>();
        HashMap<String, Object> tags = new HashMap<String, Object>();
        tags.put("name", name);

        data.put("tag", tags);
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String GET_URL = "https://api.weixin.qq.com/cgi-bin/tags/get?access_token=";

    /**
     *  获取公众号已创建的标签
     * @return {ApiResult}
     */
    public static ApiResult get() {
        String url = GET_URL + AccessTokenApi.getAccessTokenStr();
        return new ApiResult(HttpUtils.get(url));
    }

    private static String UPDATE_URL = "https://api.weixin.qq.com/cgi-bin/tags/update?access_token=";

    /**
     * 编辑标签
     * @param id 标签id
     * @param name 标签名
     * @return {ApiResult}
     */
    public static ApiResult update(int id, String name) {
        String url = UPDATE_URL + AccessTokenApi.getAccessTokenStr();
        HashMap<String, Object> data = new HashMap<String, Object>();
        HashMap<String, Object> tags = new HashMap<String, Object>();
        tags.put("id", id);
        tags.put("name", name);

        data.put("tag", tags);
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String DELETE_URL = "https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=";

    /**
     * 删除标签
     * @param id 标签id
     * @return {ApiResult}
     */
    public static ApiResult delete(int id) {
        String url = DELETE_URL + AccessTokenApi.getAccessTokenStr();
        HashMap<String, Object> data = new HashMap<String, Object>();
        HashMap<String, Object> tags = new HashMap<String, Object>();
        tags.put("id", id);

        data.put("tag", tags);
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String GET_USER_URL = "https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=";

    /**
     * 根据标签获取标签下粉丝列表
     * @param tagId 标签id
     * @return {ApiResult}
     */
    public static ApiResult getUser(int tagId) {
        return getUser(tagId, null);
    }

    /**
     * 根据标签获取标签下粉丝列表
     * @param tagId 标签id
     * @param nextOpenId 第一个拉取的OPENID，不填默认从头开始拉取
     * @return {ApiResult}
     */
    public static ApiResult getUser(int tagId, String nextOpenId) {
        String url = GET_USER_URL + AccessTokenApi.getAccessTokenStr();
        HashMap<String, Object> data = new HashMap<String, Object>();
        data.put("tagid", tagId);
        if (StrKit.notBlank(nextOpenId)) {
            data.put("next_openid", nextOpenId);
        }
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String BATCH_TAGGING_URL = "https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=";

    /**
     * 批量为用户打标签
     * @param tagId 标签id
     * @param openIdList openid列表
     * @return {ApiResult}
     */
    public static ApiResult batchAddTag(int tagId, List<String> openIdList) {
        String url = BATCH_TAGGING_URL + AccessTokenApi.getAccessTokenStr();
        HashMap<String, Object> data = new HashMap<String, Object>();
        data.put("tagid", tagId);
        data.put("openid_list", openIdList);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String BATCH_UNTAGGING_URL = "https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=";

    /**
     * 批量为用户取消标签
     * @param tagId 标签id
     * @param openIdList openid列表
     * @return {ApiResult}
     */
    public static ApiResult batchDelTag(int tagId, List<String> openIdList) {
        String url = BATCH_UNTAGGING_URL + AccessTokenApi.getAccessTokenStr();
        HashMap<String, Object> data = new HashMap<String, Object>();
        data.put("tagid", tagId);
        data.put("openid_list", openIdList);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

    private static String GET_ID_LIST_URL = "https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=";

    /**
     * 获取用户身上的标签列表
     * @param openId openid
     * @return {ApiResult}
     */
    public static ApiResult getUser(String openId) {
        String url = GET_ID_LIST_URL + AccessTokenApi.getAccessTokenStr();
        HashMap<String, Object> data = new HashMap<String, Object>();
        data.put("openid", openId);

        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(data));
        return new ApiResult(jsonResult);
    }

}
