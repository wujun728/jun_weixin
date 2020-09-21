package com.weixin.fastweixin.util;

import java.util.Map;
import java.util.TreeMap;

import com.weixin.fastweixin.message.aes.SHA1;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class JsApiUtil {
	/**
	 * 计算 wx.config() 中需要使用的签名。每个页面都需要进行计算
	 *
	 * @param jsApiTicket 微信 js-sdk提供的ticket
	 * @param nonceStr    随机字符串
	 * @param timestame   时间戳
	 * @param url         当前网页的URL，不包含#及其后面部分
	 * @return 合法的签名
	 * @throws Exception 获取签名异常
	 */
	public static String sign(String jsApiTicket, String nonceStr, long timestame, String url) throws Exception {
		Map<String, String> paramMap = new TreeMap<String, String>();
		paramMap.put("jsapi_ticket", jsApiTicket);
		paramMap.put("noncestr", nonceStr);
		paramMap.put("timestamp", Long.toString(timestame));
		paramMap.put("url", url);

		StringBuilder sb = new StringBuilder();
		for (Map.Entry<String, String> entry : paramMap.entrySet()) {
			sb.append("&").append(entry.toString());
		}
		return SHA1.getSHA1HexString(sb.substring(1));
	}
}
