package com.zxk175.weixin.process;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.net.URLEncoder;

/**
 * 调用图灵机器人api接口，获取智能回复内容
 * Created by zxk175 on 17/2/18.
 */
public class TuLingProcess {
    /**
     * 调用图灵机器人api接口，获取智能回复内容，解析获取自己所需结果
     *
     * @param content
     * @return
     */
    public String getTuLingResult(String content) {
        //此处为图灵api接口，参数key需要自己去注册申请，先以000000代替
        //注册地址：http://www.tuling123.com
        String key = "000000";
        String apiUrl = "http://www.tuling123.com/openapi/api?key=" + key + "&info=";
        String param = "";

        if ("000000".equals(key)) {
            throw new RuntimeException("请修改图灵机器人接口的Key！");
        }

        try {
            //将参数转为url编码
            param = apiUrl + URLEncoder.encode(content, "utf-8");
        } catch (Exception e) {
            e.printStackTrace();
        }

        //发起get请求
        HttpGet request = new HttpGet(param);
        String result = "";
        try {
            HttpResponse response = HttpClients.createDefault().execute(request);
            if (response.getStatusLine().getStatusCode() == 200) {
                result = EntityUtils.toString(response.getEntity());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        //请求失败处理
        if (null == result) {
            return "对不起，你说的话真是太高深了……";
        }

        try {
            JSONObject json = JSONObject.parseObject(result);
            //以code=100000为例，参考图灵机器人api文档
            Integer code = json.getInteger("code");
            if (100000 == code) {
                result = json.getString("text");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}
