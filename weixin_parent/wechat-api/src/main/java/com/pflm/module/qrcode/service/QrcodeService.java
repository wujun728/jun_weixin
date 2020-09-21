package com.pflm.module.qrcode.service;
import com.alibaba.fastjson.JSONObject;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * 二维码接口
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018上午 11:00
 */
@FeignClient(name="qrcode", url = "${wx.api.url}",fallback=QrcodeServoceHystric.class)
public interface QrcodeService {


    /**
     * 创建二维码ticket
     * @param access_token
     * @param info
     * @return
     */
    @RequestMapping(value = "/cgi-bin/qrcode/create", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject  create(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);


    /**
     * 长链接转短链接接口
     * @param access_token
     * @param info
     * @return
     */
    @RequestMapping(value = "/cgi-bin/shorturl", method = RequestMethod.POST,consumes = "application/json")
    public JSONObject  shorturl(@RequestParam("access_token") String access_token, @RequestBody JSONObject info);
}
