package com.zzkun.controller;

import com.github.sd4324530.fastweixin.handle.EventHandle;
import com.github.sd4324530.fastweixin.handle.MessageHandle;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import com.github.sd4324530.fastweixin.servlet.WeixinControllerSupport;
import com.zzkun.handle.MenuEventHandle;
import com.zzkun.handle.TextMsgHandle;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/6/17.
 */
@RestController
@RequestMapping("/weixin")
public class WeixinController extends WeixinControllerSupport {

    private static final Logger log = LoggerFactory.getLogger(WeixinController.class);

    @Override
    protected String getToken() {
        return "geekun";
    }

    @Override
    protected String getAppId() {
        return "wx4ce93fb099819969";
    }

    @Override
    protected List<MessageHandle> initMessageHandles() {
        List<MessageHandle> handles = new ArrayList<>();
        handles.add(new TextMsgHandle());
        return handles;
    }
    @Override
    protected List<EventHandle> initEventHandles() {
        List<EventHandle> handles = new ArrayList<>();
        handles.add(new MenuEventHandle());
        return handles;
    }


}