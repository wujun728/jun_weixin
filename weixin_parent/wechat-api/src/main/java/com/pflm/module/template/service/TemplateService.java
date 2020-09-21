package com.pflm.module.template.service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018上午 11:00
 */
@FeignClient(name="template", url = "${wx.api.url}",fallback=TemplateServiceHystric.class)
public interface TemplateService {


    /**
     * 设置所属行业
     * @param access_token
     * @param  info
     *  POST数据示例如下：
     *       {
     *           "industry_id1":"1",
     *           "industry_id2":"4"
     *        }
     * @return
     */
    @RequestMapping(value = "/cgi-bin/template/api_set_industry", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject apiSetIndustry(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);


    /**
     * 获取设置的行业信息
     * @param access_token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/template/get_industry", method = RequestMethod.GET)
    public JSONObject getIndustry(@RequestParam("access_token") String access_token);



    /**
     * 获得模板ID
     * @param access_token
     * POST数据示例如下：
     *          {
     *             "template_id_short":"TM00015"
     *          }
     * @return
     */
    @RequestMapping(value = "/cgi-bin/template/api_add_template", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject apiAddTemplate(@RequestParam("access_token") String access_token,@RequestBody JSONObject info);


    /**
     * 获取模板列表
     * @param access_token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/template/get_all_private_template", method = RequestMethod.GET)
    public JSONObject getAllTemplate(@RequestParam("access_token") String access_token);


    /**
     * 删除模板
     * @param access_token
     * POST数据说明如下：
     *  {
     *      "template_id" : "Dyvp3-Ff0cnail_CDSzk1fIc6-9lOkxsQE7exTJbwUE"
     *  }
     * @return
     */
    @RequestMapping(value = "/cgi-bin/template/del_private_template", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject delTemplate(@RequestParam("access_token") String access_token,@RequestBody JSONObject info);


    /**
     * 发送模板消息
     * @param access_token
     * @return
     */
    @RequestMapping(value = "/cgi-bin/message/template/send", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject send(@RequestParam("access_token") String access_token,@RequestBody JSONObject info);

}
