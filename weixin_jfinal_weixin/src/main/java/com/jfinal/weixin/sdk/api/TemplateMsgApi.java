/**
 * Copyright (c) 2011-2014, James Zhan 詹波 (jfinal@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.weixin.sdk.api;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.kit.HttpKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 模板消息 API
 * 文档地址：http://mp.weixin.qq.com/wiki/17/304c1885ea66dbedf7dc170d84999a9d.html
 */
public class TemplateMsgApi {
    private static String sendApiUrl = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=";
    
    /**
     * 发送模板消息
     * @param jsonStr json字符串
     * @return {ApiResult}
     */
    public static ApiResult send(String jsonStr) {
        String jsonResult = HttpUtils.post(sendApiUrl + AccessTokenApi.getAccessTokenStr(), jsonStr);
        return new ApiResult(jsonResult);
    }
    
    private static String setIndustryUrl = "https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=";
    
    /**
     * 设置所属行业
     * @param industry_id1 公众号模板消息所属行业编号
     * @param industry_id2 公众号模板消息所属行业编号
     * @return {ApiResult}
     */
    public static ApiResult setIndustry(String industry_id1, String industry_id2) {
        String url = setIndustryUrl + AccessTokenApi.getAccessTokenStr();
        
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("industry_id1", industry_id1);
        params.put("industry_id2", industry_id2);
        
        String jsonResult = HttpUtils.post(url, JsonUtils.toJson(params));
        return new ApiResult(jsonResult);
    }
    
    private static String getIndustryUrl = "https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=";
    
    /**
     * 获取设置的行业信息
     * @return {ApiResult}
     */
    public static ApiResult getIndustry() {
        return new ApiResult(HttpKit.get(getIndustryUrl + AccessTokenApi.getAccessTokenStr()));
    }
   
    private static String getTemplateIdUrl = "https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=";
    
    /**
     * 获得模板ID
     * @param templateIdShort 模板库中模板的编号，有“TM**”和“OPENTMTM**”等形式
     * @return {ApiResult}
     */
    public static ApiResult getTemplateId(String templateIdShort) {
        String url = getTemplateIdUrl + AccessTokenApi.getAccessTokenStr();
        
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("template_id_short", templateIdShort);
        
        String json = HttpKit.post(url, JsonUtils.toJson(params));
        return new ApiResult(json);
    }
    
    private static String getAllTemplateUrl = "https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=";
    
    /**
     * 获取模板列表
     * @return {ApiResult}
     */
    public static ApiResult getAllTemplate() {
        return new ApiResult(HttpKit.get(getAllTemplateUrl + AccessTokenApi.getAccessTokenStr()));
    }
    
    private static String delTemplateUrl = "https://api.weixin.qq.com/cgi-bin/template/del_private_template?access_token=";
    
    /**
     * 删除模板
     * @param templateId 公众帐号下模板消息ID
     * @return {ApiResult}
     */
    public static ApiResult delTemplateById(String templateId) {
        String url = delTemplateUrl + AccessTokenApi.getAccessTokenStr();
        
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("template_id", templateId);
        
        String json = HttpKit.post(url, JsonUtils.toJson(params));
        return new ApiResult(json);
    }

}


