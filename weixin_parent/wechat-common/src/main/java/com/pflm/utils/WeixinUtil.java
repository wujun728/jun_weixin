package com.pflm.utils;
import com.alibaba.fastjson.JSONObject;
import java.util.Map;

/**
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018下午 12:22
 */
public class WeixinUtil {


    /**
     * 模板消息数据组装
     * @param openId
     * @param template_id
     * @param detailUrl
     * @param map
     * @return
     */
    public JSONObject setTemplate(String openId, String template_id, String detailUrl, Map<String, Object> map){
        JSONObject jso = new JSONObject();
        jso.put("touser", openId);
        jso.put("template_id", template_id);
        if (detailUrl != null){
            jso.put("url", detailUrl);
        }
        jso.put("data", map);
        return  jso;
    }




}
