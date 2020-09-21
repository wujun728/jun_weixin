package com.zzkun.handle;

import com.github.sd4324530.fastweixin.handle.MessageHandle;
import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.logging.Logger;

/**
 * Created by Administrator on 2016/6/17.
 */
public class TextMsgHandle implements MessageHandle<TextReqMsg> {

    @Override
    public BaseMsg handle(TextReqMsg msg) {
        System.out.println("收到微信文字请求：" + msg);
        String content = msg.getContent();
        return new TextMsg("你好" + msg.getFromUserName() + ", 收到：" + content);
    }

    @Override
    public boolean beforeHandle(TextReqMsg msg) {
        return true;
    }
}
