package com.pflm.utils;
import java.util.HashMap;
import java.util.Map;

/**
 * 微信操作工具类
 * @author qinxuewu
 * @version 1.00
 * @time 6/11/2018下午 7:44
 */
public class WeixinUtil {
    /**
     * 网页授权组装链接 用户同意授权，获取code
     */
    public static  final String AUTHORIZE="https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect";


    /**
     * 模板消息数据格式组装
     * @param allMap
     * @param key    模板id
     * @param value  内容
     * @param color  颜色
     * @return
     */
    public static Map<String, Object> wxMsgMap(Map<String, Object> allMap, String key, String value, String color) {
        Map<String, Object> map = new HashMap<>(16);
        map.put("value", value);
        map.put("color", color);
        allMap.put(key, map);
        return allMap;
    }


}
