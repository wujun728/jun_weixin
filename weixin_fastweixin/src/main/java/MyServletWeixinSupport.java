import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import com.github.sd4324530.fastweixin.servlet.WeixinSupport;

//用户自行实现的微信消息收发处理器
public class MyServletWeixinSupport extends WeixinSupport {
    private static final Logger log = LoggerFactory.getLogger(MyServletWeixinSupport.class);
    @Override
    protected String getToken() {
        return "myToken";
    }
    @Override
    protected BaseMsg handleTextMsg(TextReqMsg msg) {
        String content = msg.getContent();
        log.info("用户发送到服务器的内容:{}", content);
        return new TextMsg("服务器回复用户消息!");
    }
}