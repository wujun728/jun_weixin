package com.zxk175.weixin.controller;

import com.github.sd4324530.fastweixin.api.config.ApiConfig;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import com.github.sd4324530.fastweixin.servlet.WeixinControllerSupport;
import com.zxk175.weixin.process.TuLingProcess;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by zxk175 on 2017/3/30.
 */
@Controller
@RequestMapping("/weixin")
public class WeiXinController extends WeixinControllerSupport {
    private static final String TOKEN = "zxk175";
    private static final String APP_ID = "000";
    private static final String APP_SECRET = "000";

    // 设置 TOKEN，用于绑定微信服务器
    protected String getToken() {
        return TOKEN;
    }

    // 重写父类方法，处理对应的微信消息
    @Override
    protected BaseMsg handleTextMsg(TextReqMsg msg) {
        // content 是用户输入的信息
        String content = msg.getContent();
        TuLingProcess tuLingProcess = new TuLingProcess();
        String result = tuLingProcess.getTuLingResult(content);
        return new TextMsg(result);
    }

    // 获取 getAccessToken : http://localhost:8080/weixin/token
    @ResponseBody
    @GetMapping("/token")
    public String getAccessToken() {
        if ("000".equals(APP_ID)) {
            return "无效AppID！";
        }

        if ("000".equals(APP_SECRET)) {
            return "无效APP_SECRET！";
        }
        ApiConfig config = new ApiConfig(APP_ID, APP_SECRET);
        return config.getAccessToken();
    }

    // 获取 getTuLingResult : http://localhost:8080/weixin/tuling/你好
    @ResponseBody
    @GetMapping("/tuling/{content}")
    public String getTuLingResult(@PathVariable String content) {
        TuLingProcess tuLingProcess = new TuLingProcess();
        String result = tuLingProcess.getTuLingResult(content);
        return result;
    }
}
