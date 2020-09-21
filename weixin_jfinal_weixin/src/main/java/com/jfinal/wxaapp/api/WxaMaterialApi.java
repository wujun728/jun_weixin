/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.api;

import java.io.File;

import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.MediaFile;
import com.jfinal.weixin.sdk.utils.HttpUtils;

/**
 * 小程序材料接口
 * @author L.cm
 *
 */
public class WxaMaterialApi {
    private static String getUrl = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=";
    
    /**
     * 获取临时素材
     * @param mediaId 素材Id
     * @return MediaFile
     */
    public MediaFile getMedia(String mediaId) {
        String url = getUrl + WxaAccessTokenApi.getAccessTokenStr() + "&media_id=" + mediaId;
        return HttpUtils.download(url);
    }
    
    // 新增临时素材
    private static String uploadUrl = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=";
    
    /**
     * 上传临时素材
     * @param file 需要上传的文件
     * @param type image
     * @return ApiResult
     */
    public ApiResult uploadMedia(File file, String type) {
        String url = uploadUrl + WxaAccessTokenApi.getAccessTokenStr() + "&type=" + type;
        String jsonStr = HttpUtils.upload(url, file, null);
        return new ApiResult(jsonStr);
    }
}
