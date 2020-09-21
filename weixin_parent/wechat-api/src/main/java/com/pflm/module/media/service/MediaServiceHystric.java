package com.pflm.module.media.service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;

/**
 * 熔断处理
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018下午 3:51
 */

@Component
public class MediaServiceHystric implements MediaService   {
    /**
     * 新增永久图文素材
     *
     * @param access_token 基础token
     * @param info
     * @return
     */
    @Override
    public JSONObject addNews(String access_token, JSONObject info) {
        JSONObject infos=new JSONObject();
        infos.put("code",4001);
        infos.put("msg","熔断处理");
        return infos;
    }

    /**
     * 获取永久素材
     *
     * @param access_token 基础token
     * @param info
     * @return
     */
    @Override
    public JSONObject getMaterial(String access_token, JSONObject info) {
        return null;
    }

    /**
     * 删除永久素材
     *
     * @param access_token 基础token
     * @param info
     * @return
     */
    @Override
    public JSONObject delMaterial(String access_token, JSONObject info) {
        return null;
    }

    /**
     * 修改永久图文素材
     *
     * @param access_token 基础token
     * @param info
     * @return
     */
    @Override
    public JSONObject updateNews(String access_token, JSONObject info) {
        return null;
    }

    /**
     * 获取素材总数
     *
     * @param access_token 基础token
     * @return
     */
    @Override
    public JSONObject getMaterialcount(String access_token) {
        return null;
    }

    /**
     * 获取素材列表
     *
     * @param access_token 基础token
     * @param info
     * @return
     */
    @Override
    public JSONObject batchgetMaterial(String access_token, JSONObject info) {
        return null;
    }


}
