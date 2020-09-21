package com.pflm.module.core.controller;
import com.pflm.entity.message.resp.TextMessageResp;
import com.pflm.utils.MessageUtil;
import com.pflm.utils.SignUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.Map;

/**
 *  与微信服务核心请求处理
 * @author qinxuewu
 * @version 1.00
 * @time 7/11/2018下午 3:13
 */
@Controller
@RequestMapping("/core")
public class CoreController{
    public  final Logger logger = LoggerFactory.getLogger(getClass());

    public static final Logger log = LoggerFactory.getLogger(CoreController.class);
    /**
     * 与微信握手请求校验
     * @param request
     * @param response
     */
    @RequestMapping(value = "/index" , method=RequestMethod.GET)
    public void doGet(HttpServletRequest request, HttpServletResponse response){
        logger.debug("****************get**********************");
        // 微信加密签名
        String signature = request.getParameter("signature");
        // 时间戳
        String timestamp = request.getParameter("timestamp");
        // 随机数
        String nonce = request.getParameter("nonce");
        // 随机字符串
        String echostr = request.getParameter("echostr");
        PrintWriter out=null;
        try {
             out = response.getWriter();
            // 通过检验signature对请求进行校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败
            boolean falg=SignUtil.checkSignature(signature, timestamp, nonce);
            if (falg) {
                out.print(echostr);
            }
        }catch (Exception e){
                logger.error("与微信握手请求校验异常：{}",e);
        }finally {
            out.close();
        }
        out = null;
    }

    /**
     * 处理微信服务器发来的消息
     * @param request
     * @param response
     */
    @RequestMapping(value = "/index" , method=RequestMethod.POST)
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
        // 将请求、响应的编码均设置为UTF-8（防止中文乱码）
        request.setCharacterEncoding("UTf-8");
        response.setCharacterEncoding("UTF-8");
        logger.debug("****************post**********************");
        PrintWriter out=null;
        try {
                // 调用核心业务类接收消息、处理消息
                String respMessage =processRequest(request);
                // 响应消息
                out = response.getWriter();
                out.print(respMessage);
                out.close();
        }catch (Exception e){
            logger.error("处理微信服务器发来的消息异常：{}",e);
        }finally {
                out.close();
        }
    }

    /**
     * 微信消息处理方法
     * @param request
     * @return
     */
    public static String processRequest(HttpServletRequest request){
        String respMessage = null;
        try {
            // 默认返回的文本消息内容
            String respContent = "";
            // xml请求解析
            Map<String, String> requestMap = MessageUtil.parseXml(request);

                // 发送方帐号（open_id）
                String fromUserName = requestMap.get("FromUserName");
                // 公众帐号
                String toUserName = requestMap.get("ToUserName");
                // 消息类型
                String msgType = requestMap.get("MsgType");

                // 回复文本消息
                TextMessageResp textMessage = new TextMessageResp();
                textMessage.setToUserName(fromUserName);
                textMessage.setFromUserName(toUserName);
                textMessage.setCreateTime(new Date().getTime());
                textMessage.setMsgType(MessageUtil.RESP_MESSAGE_TYPE_TEXT);
                textMessage.setFuncFlag(0);

                // 文本消息
                if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_TEXT)) {
                    respContent = "您发送的是文本消息！";
                }
                // 图片消息
                else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_IMAGE)) {
                    respContent = "您发送的是图片消息！";
                } else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_LOCATION)) {
                    respContent = "您发送的是地理位置消息！";
                    //TODO 上报地理位置事件

                    //地理位置纬度
                    String latitude=requestMap.get("Latitude");
                    //地理位置经度
                    String longitude=requestMap.get("Longitude");
                    //地理位置精度
                    String precision=requestMap.get("Precision");
                }
                // 链接消息
                else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_LINK)) {
                    respContent = "您发送的是链接消息！";
                }
                // 音频消息
                else if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_VOICE)) {
                    respContent = "您发送的是音频消息！";
                }
                // 事件推送
                if (msgType.equals(MessageUtil.REQ_MESSAGE_TYPE_EVENT)) {
                    // 事件类型
                    String eventType = requestMap.get("Event");

                    // 订阅
                    if (eventType.equals(MessageUtil.EVENT_TYPE_SUBSCRIBE)) {
                        respContent = "谢谢关注！";

                        if(requestMap.containsKey("EventKey")){
                            //TODO 用户未关注时 扫码关注推送的事件
                            //事件KEY值，qrscene_为前缀，后面为二维码的参数值
                           String eventKey=requestMap.get("EventKey");
                           //二维码的ticket，可用来换取二维码图片
                           String ticket=requestMap.get("Ticket");
                        }
                    }else if (eventType.equals(MessageUtil.EVENT_TYPE_UNSUBSCRIBE)) {
                        // TODO 取消订阅后用户再收不到公众号发送的消息，因此不需要回复消息
                    }else if (eventType.equals(MessageUtil.EVENT_TYPE_CLICK)) {
                        // TODO 自定义菜单点击

                        //与自定义菜单接口中KEY值对应
                        String eventKey=requestMap.get("EventKey");

                    }else  if(eventType.equals(MessageUtil.EVENT_TYPE_SCAN)){
                        ///TODO  已关注时扫二维码推送  事件KEY值，创建二维码时的二维码scene_id
                        String eventKey=requestMap.get("EventKey");

                    }else if(eventType.equals(MessageUtil.EVENT_TYPE_VIEW)){
                        //TODO  点击菜单跳转链接时的事件推送

                        //设置的跳转URL
                        String eventKey=requestMap.get("EventKey");
                    }


                }
                textMessage.setContent(respContent);
                respMessage = MessageUtil.textMessageToXml(textMessage);
        } catch (Exception e) {
            log.error("微信消息处理方法异常：{}",e);
        }

        return respMessage;
    }
}
