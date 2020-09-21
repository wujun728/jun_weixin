package com.pflm.module.template.controller;
import com.alibaba.fastjson.JSONObject;
import com.pflm.annotation.ApiSysyLog;
import com.pflm.module.template.service.TemplateService;
import com.pflm.utils.R;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * 模板消息接口
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018上午 10:59
 */
@Controller
@RequestMapping("/api/template")
public class TemplateController {

    //通过ticket换取二维码
    public static final String showqrcode="https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=TICKET";

    @Autowired
    TemplateService templateService;

    /**
     * 设置所属行业
     * @param accessToken
     * @param info
     * @return
     */
    @ApiSysyLog("设置所属行业")
    @RequestMapping("/apiSetIndustry")
    public R apiSetIndustry(String accessToken, @RequestBody JSONObject info){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        JSONObject data=templateService.apiSetIndustry(accessToken,info);
        return R.ok().put("data",data);
    }

    /**
     * 获取设置的行业信息
     * @param accessToken
     * @return
     */
    @ApiSysyLog("获取设置的行业信息")
    @RequestMapping("/getIndustry")
    public R getIndustry(String accessToken){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        JSONObject data=templateService.getIndustry(accessToken);
        return R.ok().put("data",data);
    }

    /**
     * 获得模板ID
     * @param accessToken
     * @param templateId
     * @return
     */
    @ApiSysyLog("获得模板ID")
    @RequestMapping("/apiAddTemplate")
    public R apiAddTemplate(String accessToken, String templateId){
        if(StringUtils.isEmpty(accessToken)||StringUtils.isEmpty(templateId)){
            return R.error("accessToken || templateId不能为空");
        }
        JSONObject info=new JSONObject();
        info.put("template_id_short",templateId);
        JSONObject data=templateService.apiAddTemplate(accessToken,info);
        return R.ok().put("data",data);
    }

    /**
     * 获取模板列表
     * @param accessToken
     * @return
     */
    @ApiSysyLog("获取模板列表")
    @RequestMapping("/getAllTemplate")
    public R getAllTemplate(String accessToken){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        JSONObject data=templateService.getAllTemplate(accessToken);
        return R.ok().put("data",data);
    }


    /**
     * 删除模板
     * @param accessToken
     * @return
     */
    @ApiSysyLog("删除模板")
    @RequestMapping("/delTemplate")
    public R delTemplate(String accessToken,String templateId){
        if(StringUtils.isEmpty(accessToken)||StringUtils.isEmpty(templateId)){
            return R.error("accessToken || templateId不能为空");
        }
        JSONObject info=new JSONObject();
        info.put("template_id",templateId);
        JSONObject data=templateService.delTemplate(accessToken,info);
        return R.ok().put("data",data);
    }

    /**
     * 发送模板消息
     * @param accessToken
     * @return
     */
    @ApiSysyLog("发送模板模板")
    @RequestMapping("/send")
    public R send(String accessToken,@RequestBody JSONObject info){
        if(StringUtils.isEmpty(accessToken)){
            return R.error("accessToken不能为空");
        }
        if(info==null){
            return R.error("模板消息内容不能为空 不能为空");
        }
        JSONObject data=templateService.delTemplate(accessToken,info);
        return R.ok().put("data",data);
    }


}
