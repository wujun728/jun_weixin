import javax.servlet.annotation.WebServlet;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.github.sd4324530.fastweixin.message.BaseMsg;
import com.github.sd4324530.fastweixin.message.TextMsg;
import com.github.sd4324530.fastweixin.message.req.TextReqMsg;
import com.github.sd4324530.fastweixin.servlet.WeixinServletSupport;
import com.github.sd4324530.fastweixin.servlet.WeixinSupport;



@WebServlet("/weixin")
public class WeixinServlet extends WeixinServletSupport {
        @Override
        protected WeixinSupport getWeixinSupport() {
                return new MyServletWeixinSupport();
        }
}
