package com.javen.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.javen.utils.StringUtils;
import com.jfinal.kit.HashKit;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.PropKit;
import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;

/**
 * 百度翻译
 * @author Javen
 * 2016年5月9日
 */
public class BaiduTranslate {
	static Log log=Log.getLog(BaiduTranslate.class);
	private static final Map<String, String> map=new HashMap<String, String>();
	static{
		map.put("中文", "zh");
		map.put("英语", "en");
		map.put("粤语", "yue");
		map.put("wyw", "wyw");
		map.put("日语", "jp");
		map.put("韩语", "kor");
		map.put("法语", "fra");
		map.put("西班牙语", "spa");
		map.put("阿拉伯语", "ara");
		map.put("俄语", "ru");
		map.put("葡萄牙语", "pt");
		map.put("德语", "de");
		map.put("意大利语", "it");
		map.put("希腊语", "el");
		map.put("荷兰语", "nl");
		map.put("波兰语", "pl");
		map.put("保加利亚语", "bul");
		map.put("爱沙尼亚语", "est");
		map.put("丹麦语", "dan");
		map.put("芬兰语", "fin");
		map.put("捷克语", "cs");
		map.put("罗马尼亚语", "rom");
		map.put("斯洛文尼亚语", "slo");
		map.put("瑞典语", "swe");
		map.put("匈牙利语", "hu");
		map.put("繁体中文", "cht");
		
	}
	
	private static  String baiduTranslates(String q,String from,String to) {
		log.debug("from:"+from+"  to:"+to+"  q:"+q);
		String res=null;
		try {
			if (StrKit.isBlank(from) || StrKit.isBlank(to)) {
				from="auto";
				to="auto";
			}
			int salt=new Random().nextInt(100000);
			
			String query=StringUtils.encode(q);
			String appid = PropKit.get("bt_appId");
			String appkey = PropKit.get("bt_appKey");
			String sign=HashKit.md5(appid+q+salt+appkey);
			String url = "http://api.fanyi.baidu.com/api/trans/vip/translate?appid="
					+ appid
					+ "&q="+ query
					+ "&from="+from
					+"&to="+to
					+"&salt="+salt
					+"&sign="+sign;
			
			res = HttpKit.get(url);
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		
		return res;
	}
	
	
	private static String getLanguage(String china){
		if (map!=null) {
			String s = map.get(china);
			if (StrKit.notBlank(s)) {
				return s;
			}
		}
		return "auto";
		
	}
	/**
	 * 
	 * @param from 翻译源语言
	 * @param to 译文语言
	 * @param q 原文
	 * @return
	 */
	public static String webTranslates(String from,String to,String q){
		String result=null;
		String translateJsonStr = baiduTranslates(q, getLanguage(from), getLanguage(to));
		if (translateJsonStr != null) {

			JSONObject jsonObject = JSON.parseObject(translateJsonStr);
			System.out.println(jsonObject.toString());
			String error_code=jsonObject.getString("error_code");
			if (StrKit.isBlank(error_code)) {
				JSONArray translateResultJsonArray=jsonObject.getJSONArray("trans_result");
				result=translateResultJsonArray.getJSONObject(0).get("dst").toString();
				
			}else {
				result="翻译出现异常。";
			}
		} else {
			result = "无法翻译您所输入的内容！\n";
		}
		
		return result;
		
	}
	  
	public static String getGuide(){
		StringBuffer buffer = new StringBuffer();
        buffer.append("\ue320 翻译操作指南").append("\n\n");  
        buffer.append("1、\ue513中->\ue50c英").append("\n");  
        buffer.append("2、\ue513中->\ue50b日").append("\n");  
        buffer.append("3、\ue513中->\ue514韩").append("\n");  
        buffer.append("4、\ue513中->\ue512俄罗斯语").append("\n");  
        buffer.append("5、\ue513中->\ue513粤语").append("\n");
        buffer.append("6、\ue50c英->\ue513中").append("\n");
        buffer.append("7、\ue50b日->\ue513中").append("\n");
        buffer.append("回复：翻译+序号@内容").append("\n\n");  
        buffer.append("案例：翻译3@我爱你").append("\n");  
       // buffer.append("自动翻译：翻译@我爱你").append("\n");  
        buffer.append("表示：中文\ue513翻译为韩语\ue514").append("\n\n");  
        buffer.append("回复“?”显示主菜单");  
        return buffer.toString();  
		
	}
}
