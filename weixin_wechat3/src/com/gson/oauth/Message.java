/**
 * 微信公众平台开发模式(JAVA) SDK
 * (c) 2012-2014 ____′↘夏悸 <wmails@126.cn>, MIT Licensed
 * http://www.jeasyuicn.com/wechat
 */
package com.gson.oauth;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.apache.commons.lang.StringUtils;

import com.alibaba.fastjson.JSONObject;
import com.gson.bean.Article;
import com.gson.bean.Articles;
import com.gson.bean.TemplateData;
import com.gson.inf.SendAllMsgTypes;
import com.gson.util.HttpKit;

/**
 * 客服消息接口
 *
 * @author L.cm
 * @date 2013-11-5 下午3:32:30
 * @description 当用户主动发消息给公众号的时候（包括发送信息、点击自定义菜单、订阅事件、扫描二维码事件、支付成功事件、用户维权），微信将会把消息数据推送给开发者，开发者在一段时间内（目前修改为48小时）可以调用客服消息接口，通过POST一个JSON数据包来发送消息给普通用户，在48小时内不限制发送次数。此接口主要用于客服等有人工消息处理环节的功能，方便开发者为用户提供更加优质的服务。
 */
public class Message {

    private static final String MESSAGE_URL = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=";
    private static final String UPLOADNEWS_URL = "https://api.weixin.qq.com/cgi-bin/media/uploadnews?access_token=";
    private static final String MASS_SENDALL_URL = "https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=";
    private static final String MASS_SEND_URL = "https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=";
    private static final String MASS_DELETE_URL = "https://api.weixin.qq.com//cgi-bin/message/mass/delete?access_token=";
    private static final String TEMPLATE_SEND_URL = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=";

    /**
     * 发送客服消息
     *
     * @param accessToken
     * @param message
     * @return
     * @throws Exception
     */
    private String sendMsg(String accessToken, Map<String, Object> message) throws Exception {
        String result = HttpKit.post(MESSAGE_URL.concat(accessToken), JSONObject.toJSONString(message));
        return result;
    }

    /**
     * 发送文本客服消息
     *
     * @param openId
     * @param text
     * @throws Exception
     */
    public String sendText(String accessToken, String openId, String text) throws Exception {
        Map<String, Object> json = new HashMap<String, Object>();
        Map<String, Object> textObj = new HashMap<String, Object>();
        textObj.put("content", text);
        json.put("touser", openId);
        json.put("msgtype", "text");
        json.put("text", textObj);
        String result = sendMsg(accessToken, json);
        return result;
    }

    /**
     * 发送图片消息
     *
     * @param accessToken
     * @param openId
     * @param media_id
     * @return
     * @throws Exception
     */
    public String SendImage(String accessToken, String openId, String media_id) throws Exception {
        Map<String, Object> json = new HashMap<String, Object>();
        Map<String, Object> textObj = new HashMap<String, Object>();
        textObj.put("media_id", media_id);
        json.put("touser", openId);
        json.put("msgtype", "image");
        json.put("image", textObj);
        String result = sendMsg(accessToken, json);
        return result;
    }

    /**
     * 发送语言回复
     *
     * @param accessToken
     * @param openId
     * @param media_id
     * @return
     * @throws Exception
     */
    public String SendVoice(String accessToken, String openId, String media_id) throws Exception {
        Map<String, Object> json = new HashMap<String, Object>();
        Map<String, Object> textObj = new HashMap<String, Object>();
        textObj.put("media_id", media_id);
        json.put("touser", openId);
        json.put("msgtype", "voice");
        json.put("voice", textObj);
        String result = sendMsg(accessToken, json);
        return result;
    }

    /**
     * 发送视频回复
     *
     * @param accessToken
     * @param openId
     * @param media_id
     * @param title
     * @param description
     * @return
     * @throws Exception
     */
    public String SendVideo(String accessToken, String openId, String media_id, String title, String description) throws Exception {
        Map<String, Object> json = new HashMap<String, Object>();
        Map<String, Object> textObj = new HashMap<String, Object>();
        textObj.put("media_id", media_id);
        textObj.put("title", title);
        textObj.put("description", description);

        json.put("touser", openId);
        json.put("msgtype", "video");
        json.put("video", textObj);
        String result = sendMsg(accessToken, json);
        return result;
    }

    /**
     * 发送音乐回复
     *
     * @param accessToken
     * @param openId
     * @param musicurl
     * @param hqmusicurl
     * @param thumb_media_id
     * @param title
     * @param description
     * @return
     * @throws Exception
     */
    public String SendMusic(String accessToken, String openId, String musicurl, String hqmusicurl, String thumb_media_id, String title, String description) throws Exception {
        Map<String, Object> json = new HashMap<String, Object>();
        Map<String, Object> textObj = new HashMap<String, Object>();
        textObj.put("musicurl", musicurl);
        textObj.put("hqmusicurl", hqmusicurl);
        textObj.put("thumb_media_id", thumb_media_id);
        textObj.put("title", title);
        textObj.put("description", description);

        json.put("touser", openId);
        json.put("msgtype", "music");
        json.put("music", textObj);
        String result = sendMsg(accessToken, json);
        return result;
    }

    /**
     * 发送图文回复
     *
     * @param accessToken
     * @param openId
     * @param articles
     * @return
     * @throws Exception
     */
    public String SendNews(String accessToken, String openId, List<Articles> articles) throws Exception {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "news");

        Map<String, Object> news = new HashMap<String, Object>();
        news.put("articles", articles);

        json.put("news", news);
        return sendMsg(accessToken, json);
    }

    /**
     * 发送卡券
     * 
     * @param accessToken
     * @param openId
     * @param card_id
     * @param card_ext 详情及签名规则: http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html#.E9.99.84.E5.BD.954-.E5.8D.A1.E5.88.B8.E6.89.A9.E5.B1.95.E5.AD.97.E6.AE.B5.E5.8F.8A.E7.AD.BE.E5.90.8D.E7.94.9F.E6.88.90.E7.AE.97.E6.B3.95
     * @return
     * @throws Exception
     */
    public String sendCoupon(String accessToken, String openId, String card_id, String card_ext) throws Exception {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("touser", openId);
        json.put("msgtype", "wxcard");

        Map<String, Object> wxcard = new HashMap<String, Object>();
        wxcard.put("card_id", card_id);
        wxcard.put("card_ext", card_ext);

        json.put("wxcard", wxcard);
        return sendMsg(accessToken, json);
    }

    /**
     * 上传图文消息素材
     *
     * @param accessToken
     * @param articles
     * @return
     * @throws KeyManagementException
     * @throws NoSuchAlgorithmException
     * @throws NoSuchProviderException
     * @throws IOException
     */
    public JSONObject uploadnews(String accessToken, List<Article> articles) throws IOException, ExecutionException, InterruptedException {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("articles", articles);
        String result = HttpKit.post(UPLOADNEWS_URL.concat(accessToken), JSONObject.toJSONString(json));
        if (StringUtils.isNotEmpty(result)) {
            return JSONObject.parseObject(result);
        }
        return null;
    }

    /**
     * 群发消息
     * @param accessToken   token
     * @param type          群发消息类型
     * @param content       内容
     * @param title         类型是video是有效
     * @param description   类型是video是有效
     * @param groupId       发送目标对象的群组id
     * @param openids       发送目标对象的openid类表
     * @param toAll         是否发送给全部人
     * @return
     * @throws InterruptedException
     * @throws ExecutionException
     * @throws IOException
     */
    public JSONObject massSendall(String accessToken, SendAllMsgTypes type, String content, String title, String description, String groupId, String[] openids, boolean toAll) throws InterruptedException, ExecutionException, IOException {
        Map<String, Object> json = new HashMap<String, Object>();
        Map<String, Object> filter = new HashMap<String, Object>();
        Map<String, Object> body = new HashMap<String, Object>();

        filter.put("is_to_all", false);
        json.put("msgtype", type.getType());
        if (toAll) {
            filter.put("is_to_all", true);
        } else if (StringUtils.isNotEmpty(groupId)) {
            filter.put("group_id", groupId);
        } else if (openids != null && openids.length > 0) {
            json.put("touser", openids);
        }

        switch (type) {
            case TEXT:
                body.put("content", content);
                json.put("text", body);
                break;
            case IMAGE:
                body.put("media_id", content);
                json.put("image", body);
                break;
            case VOICE:
                body.put("media_id", content);
                json.put("voice", body);
                break;
            case MPVIDEO:
                body.put("media_id", content);
                json.put("mpvideo", body);
                break;
            case MPNEWS:
                body.put("media_id", content);
                json.put("mpnews", body);
                break;
            case VIDEO:
                body.put("media_id", content);
                body.put("title", title);
                body.put("description", description);
                json.put("video", body);
                break;
        }
        String result = HttpKit.post(MASS_SENDALL_URL.concat(accessToken), JSONObject.toJSONString(json));
        if (StringUtils.isNotEmpty(result)) {
            return JSONObject.parseObject(result);
        }
        return null;
    }

    /**
     * 删除群发
     *
     * @param accessToken
     * @param msgid
     * @return
     * @throws KeyManagementException
     * @throws NoSuchAlgorithmException
     * @throws NoSuchProviderException
     * @throws IOException
     */
    public JSONObject massSend(String accessToken, String msgid) throws IOException, ExecutionException, InterruptedException {
        Map<String, Object> json = new HashMap<String, Object>();
        json.put("msgid", msgid);
        String result = HttpKit.post(MASS_DELETE_URL.concat(accessToken), JSONObject.toJSONString(json));
        if (StringUtils.isNotEmpty(result)) {
            return JSONObject.parseObject(result);
        }
        return null;
    }

    /**
     * 发送模板消息
     *
     * @param accessToken
     * @param data
     * @return
     * @throws IOException
     * @throws ExecutionException
     * @throws InterruptedException
     */
    public JSONObject templateSend(String accessToken, TemplateData data) throws IOException, ExecutionException, InterruptedException {
        String result = HttpKit.post(TEMPLATE_SEND_URL.concat(accessToken), JSONObject.toJSONString(data));
        if (StringUtils.isNotEmpty(result)) {
            return JSONObject.parseObject(result);
        }
        return null;
    }
}
