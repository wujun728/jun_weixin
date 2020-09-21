/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.jfinal;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.ext.interceptor.NotAction;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;
import com.jfinal.weixin.sdk.kit.MsgEncryptKit;
import com.jfinal.wxaapp.WxaConfigKit;
import com.jfinal.wxaapp.msg.IMsgParser;
import com.jfinal.wxaapp.msg.bean.WxaImageMsg;
import com.jfinal.wxaapp.msg.bean.WxaMsg;
import com.jfinal.wxaapp.msg.bean.WxaTextMsg;
import com.jfinal.wxaapp.msg.bean.WxaUserEnterSessionMsg;

/**
 * 小程序消息控制器
 * @author L.cm
 *
 */
public abstract class WxaMsgController extends Controller {
    private static final Log log = Log.getLog(WxaMsgController.class);
    private String wxaMsgXml = null;       // 本次请求 xml数据
    private WxaMsg wxaMsg = null;          // 本次请求 xml 解析后的 wxaMsg 对象

    @Before(WxaMsgInterceptor.class)
    public void index() {
        // 开发模式输出微信服务发送过来的  xml、json 消息
        if (WxaConfigKit.isDevMode()) {
            System.out.println("接收消息:");
            System.out.println(getWxaMsgXml());
        }
        WxaMsg wxaMsg = getWxaMsg();
        
        if (wxaMsg instanceof WxaTextMsg) {
            processTextMsg((WxaTextMsg) wxaMsg);
        } else if (wxaMsg instanceof WxaImageMsg) {
            processImageMsg((WxaImageMsg) wxaMsg);
        } else if (wxaMsg instanceof WxaUserEnterSessionMsg) {
            processUserEnterSessionMsg((WxaUserEnterSessionMsg) wxaMsg);
        } else {
            log.error("未能识别的小程序消息类型。 消息内容为：\n" + getWxaMsgXml());
        }
        
        // 直接回复success（推荐方式）
        renderText("success");
    }
    
    @Before(NotAction.class)
    public String getWxaMsgXml() {
        if (wxaMsgXml == null) {
            wxaMsgXml = HttpKit.readData(getRequest());
            // 是否需要解密消息
            if (WxaConfigKit.getWxaConfig().isMessageEncrypt()) {
                wxaMsgXml = MsgEncryptKit.decrypt(wxaMsgXml, getPara("timestamp"), getPara("nonce"), getPara("msg_signature"));
            }
        }
        if (StrKit.isBlank(wxaMsgXml)) {
            throw new RuntimeException("请不要在浏览器中请求该连接,调试请查看WIKI:http://git.oschina.net/jfinal/jfinal-weixin/wikis/JFinal-weixin-demo%E5%92%8C%E8%B0%83%E8%AF%95");
        }
        return wxaMsgXml;
    }
    
    @Before(NotAction.class)
    public WxaMsg getWxaMsg() {
        if (wxaMsg == null) {
            IMsgParser msgParser = WxaConfigKit.getMsgParser();
            wxaMsg = msgParser.parser(wxaMsgXml);
        }
        return wxaMsg;
    }
    
    /**
     * 处理接收到的文本消息
     * @param textMsg 处理接收到的文本消息
     */
    protected abstract void processTextMsg(WxaTextMsg textMsg);
    
    /**
     * 处理接收到的图片消息
     * @param imageMsg 处理接收到的图片消息
     */
    protected abstract void processImageMsg(WxaImageMsg imageMsg);
    
    /**
     * 处理接收到的进入会话事件
     * @param userEnterSessionMsg 处理接收到的进入会话事件
     */
    protected abstract void processUserEnterSessionMsg(WxaUserEnterSessionMsg userEnterSessionMsg);

}
