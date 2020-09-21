package com.pflm.module.qrcode.controller;
import com.alibaba.fastjson.JSONObject;
import com.pflm.annotation.ApiSysyLog;
import com.pflm.module.qrcode.service.QrcodeService;
import com.pflm.utils.R;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 二维码
 * @author qinxuewu
 * @version 1.00
 * @time 14/11/2018下午 12:36
 */
@RestController
@RequestMapping("/api/qrcode")
public class QrcodeController {


    @Autowired
    QrcodeService qrcodeService;



    /**
     * 创建临时二维码
     * @param accessToken
     * @param seconds       二维码有效时间，以秒为单位。 最大不超过2592000（即30天），
     * @param scenestr      场景值ID（字符串形式的ID），字符串类型，长度限制为1到64
     * @return
     */
    @ApiSysyLog("创建临时二维码")
    @RequestMapping("/createTemporaryQrcode")
    public R createTemporaryQrcode(String accessToken,String seconds,String scenestr){
        if(StringUtils.isEmpty(accessToken)||StringUtils.isEmpty(scenestr)||StringUtils.isEmpty(seconds)){
            return R.error("accessToken||scenestr不能为空");
        }
        JSONObject info=new JSONObject();
        info.put("expire_seconds",seconds);
        info.put("action_name","QR_STR_SCENE");
        JSONObject scene=new JSONObject();
        scene.put("scene_str",scenestr);
        info.put("action_info",scene);
        JSONObject data=qrcodeService.create(accessToken,info);
        return R.ok().put("data",data);
    }


    /**
     * 创建永久二维码
     * @param accessToken
     * @param scenestr      场景值ID（字符串形式的ID），字符串类型，长度限制为1到64
     * @return
     */
    @ApiSysyLog("创建永久二维码")
    @RequestMapping("/createPermanentQrcode")
    public R createPermanentQrcode(String accessToken,String scenestr){
        if(StringUtils.isEmpty(accessToken)||StringUtils.isEmpty(scenestr)){
            return R.error("accessToken||scenestr不能为空");
        }
        JSONObject info=new JSONObject();
        info.put("action_name","QR_LIMIT_STR_SCENE");
        JSONObject scene=new JSONObject();
        scene.put("scene_str",scenestr);
        info.put("action_info",scene);
        JSONObject data=qrcodeService.create(accessToken,info);
        return R.ok().put("data",data);
    }


    /**
     * 长链接转短链接
     * @param accessToken
     * @param url     	需要转换的长链接，支持http://、https://、weixin://wxpay 格式的url
     * @return
     */
    @ApiSysyLog("长链接转短链接")
    @RequestMapping("/shorturl")
    public R shorturl(String accessToken,String url){
        if(StringUtils.isEmpty(accessToken)||StringUtils.isEmpty(url)){
            return R.error("accessToken||url");
        }
        JSONObject info=new JSONObject();
        info.put("action","long2short");
        info.put("long_url",url);
        JSONObject data=qrcodeService.shorturl(accessToken,info);
        return R.ok().put("data",data);
    }

}
