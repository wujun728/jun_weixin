package com.pflm.module.media.service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "media",url = "${wx.api.url}",fallback = MediaServiceHystric.class)
public interface MediaService {


    /**
     * 新增永久图文素材
     * @param access_token 基础token
     * @param info
     * @return
     */
    @RequestMapping(value = "/cgi-bin/material/add_news", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject addNews(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);

    /**
     * 获取永久素材
     * @param access_token 基础token
     * @param info
     * @return
     */
    @RequestMapping(value = "/cgi-bin/material/get_material", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject getMaterial(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);


    /**
     * 删除永久素材
     * @param access_token 基础token
     * @param info
     * @return
     */
    @RequestMapping(value = "/cgi-bin/material/del_material", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject delMaterial(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);



    /**
     * 修改永久图文素材
     * @param access_token 基础token
     * @param info
     * @return
     */
    @RequestMapping(value = "/cgi-bin/material/update_news", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject updateNews(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);



    /**
     * 获取素材总数
     * @param access_token 基础token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/material/get_materialcount", method = RequestMethod.GET)
    public JSONObject getMaterialcount(@RequestParam("access_token") String access_token);



    /**
     * 获取素材列表
     * @param access_token 基础token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/material/batchget_material", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject batchgetMaterial(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);




}
