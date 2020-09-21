package com.pflm.module.qrcode.service;

import com.alibaba.fastjson.JSONObject;
import org.springframework.stereotype.Component;

/**
 * 熔断处理
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018下午 12:36
 */
@Component
public class QrcodeServoceHystric  implements  QrcodeService{
    /**
     * 创建二维码ticket
     *
     * @param access_token
     * @param info
     * @return
     */
    @Override
    public JSONObject create(String access_token, JSONObject info) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }

    /**
     * 长链接转短链接接口
     *
     * @param access_token
     * @param info
     * @return
     */
    @Override
    public JSONObject shorturl(String access_token, JSONObject info) {
        JSONObject re=new JSONObject();
        re.put("code",4001);
        re.put("msg","熔断处理");
        return re;
    }
}
