package lenve;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static lenve.MsgParseUtil.extFromAndTo;

/**
 * Created by wangsong on 16-7-13.
 */
@Controller
@RequestMapping(value = "wx")
public class WeiXinController {
    public static final String TOKEN = "ws584991843";
    private Map<String, Object> userOper = new HashMap<>();

    @RequestMapping(value = "/wget", method = RequestMethod.GET)
    public void wget(HttpServletRequest req, HttpServletResponse resp) throws IOException {
//		signature	微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
//		timestamp	时间戳
//		nonce	随机数
//		echostr
        String signature = req.getParameter("signature");
        String timestamp = req.getParameter("timestamp");
        String nonce = req.getParameter("nonce");
        String echostr = req.getParameter("echostr");
        String[] arr = {TOKEN, timestamp, nonce};
        Arrays.sort(arr);
        StringBuffer sb = new StringBuffer();
        for (String a : arr) {
            sb.append(a);
        }
        String sha1Msg = SecurityKit.sha1(sb.toString());
        if (signature.equals(sha1Msg)) {
            resp.getWriter().println(echostr);
        }
        System.out.println("貌似验证成功！！！！");
    }

    @RequestMapping(value = "/wget", method = RequestMethod.POST)
    public void wpost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setContentType("text/xml;charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        Map<String, String> map = MsgParseUtil.reqMsg2Map(req);
                        System.out.println(map.get("Content"));
        String fromUserName = map.get("FromUserName");
        String msgType = map.get("MsgType");
        String eventKey = map.get("EventKey");
        if (userOper.containsKey(fromUserName)) {
            Long lastTime = (Long) userOper.get(fromUserName);
            //两次发送时间小于5分钟则正常,否则重新发送支出项名称
            if (System.currentTimeMillis() - lastTime < 1000 * 60 * 5) {
                if ("text".equals(msgType)) {
                    Object isWaitingForMoney = userOper.get("isWaitingForMoney");
                    if (isWaitingForMoney!=null) {
                        if (Boolean.parseBoolean(isWaitingForMoney.toString())) {
                            replayUser(map, resp, "请输入金额：");
                            userOper.put("isWaitingForMoney", false);
                            userOper.put(fromUserName, System.currentTimeMillis());
                            return;
                        }
                    }
                    if (map.get("Content").matches("[\\d]*[.]*[\\d]*")) {
                        //将支出项和钱数保存到数据库，并回复用户说保存成功
                        replayUser(map, resp, "保存成功！");
                        userOper.remove(fromUserName);
                    } else {
                        userOper.put(fromUserName, System.currentTimeMillis());
                        replayUser(map, resp, "请输入合法数字！");
                    }
                } else if ("event".equals(msgType)) {
                    dwClickEvent(resp, map, eventKey);
                    userOper.put(fromUserName, System.currentTimeMillis());
                }
            } else {
                userOper.remove(fromUserName);
                if ("text".equals(msgType)) {
                    //重新发送支出项名称
                    replayUser(map, resp, "请求超时,请重新发送支出项名称!");
                }else{
                    userOper.put(fromUserName, System.currentTimeMillis());
                }
            }
        } else {
            if ("text".equals(msgType)) {
                replayUser(map, resp, "请先选择或输入支出项名称:");
            userOper.put(fromUserName, System.currentTimeMillis());
            } else if ("event".equals(msgType)) {
                dwClickEvent(resp, map, eventKey);
            userOper.put(fromUserName, System.currentTimeMillis());
            }
        }
    }

    private void dwClickEvent(HttpServletResponse resp, Map<String, String> map, String eventKey) throws IOException {
        if ("breakfast".equals(eventKey) || "lunch".equals(eventKey) || "dinner".equals(eventKey)) {
            replayUser(map, resp, "请输入金额:");
        } else if ("customrecode".equals(eventKey)) {
            replayUser(map, resp, "请输入支出项名称(如:房租):");
            userOper.put("isWaitingForMoney", true);
        } else {
            replayUser(map, resp, "功能正在研发中,敬请期待!");
        }
    }

    private void replayUser(Map<String, String> map, HttpServletResponse resp, String content) throws IOException {
        extFromAndTo(map);
        map.put("Content", content);
        map.put("MsgType", "text");
        String s = MsgParseUtil.map2Xml(map);
        resp.getWriter().write(s);
    }
}
