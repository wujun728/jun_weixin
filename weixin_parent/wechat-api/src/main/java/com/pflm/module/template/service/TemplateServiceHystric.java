package com.pflm.module.template.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;

/**
 * 熔断处理类
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018上午 11:00
 */
@Component
public class TemplateServiceHystric  implements  TemplateService{


    /**
     * 设置所属行业
     * @param access_token
     * @param info
     * @return
     */
    @Override
    public JSONObject apiSetIndustry(String access_token, JSONObject info) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }

    /**
     * 获取设置的行业信息
     * @param access_token
     * @return
     */
    @Override
    public JSONObject getIndustry(String access_token) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }

    /**
     * 获得模板ID
     * @param access_token
     * @param info
     * @return
     */
    @Override
    public JSONObject apiAddTemplate(String access_token, JSONObject info) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }

    /**
     * 获取模板列表
     * @param access_token
     * @return
     */
    @Override
    public JSONObject getAllTemplate(String access_token) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }

    /**
     * 获取模板列表
     *
     * @param access_token
     * @param info
     * @return
     */
    @Override
    public JSONObject delTemplate(String access_token, JSONObject info) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }

    /**
     * 发送模板消息
     *
     * @param access_token
     * @param info
     * @return
     */
    @Override
    public JSONObject send(String access_token, JSONObject info) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }
}
