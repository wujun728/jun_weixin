package com.javen.weixin.service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.kit.HashKit;
import com.jfinal.kit.PropKit;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;

/**
 * @author Javen
 * 百度翻译
 */
public class BaiduTranslate {
	public static String Regex = "[\\+ ~!@#%^-_=]?";
	static String transArray[][]={{"zh","en"},{"zh","jp"},{"zh","kor"},{"zh","ru"},{"zh","yue"},{"en","zh"},{"jp","zh"}};
	private static  String BaiduTranslates(String q,String from,String to) {
		if (StrKit.isBlank(from) || StrKit.isBlank(to)) {
			from="auto";
			to="auto";
		}
		int salt=new Random().nextInt(100000);
		
		String query=urlEncodeUTF8(q);
		String appid = PropKit.get("bt_appId");
		String appkey = PropKit.get("bt_appKey");
		System.out.println(q+ " "+query);
		String sign=HashKit.md5(appid+q+salt+appkey);
		System.out.println(sign);
		String url = "http://api.fanyi.baidu.com/api/trans/vip/translate?appid="
				+ appid
				+ "&q="+ query
				+ "&from="+from
				+"&to="+to
				+"&salt="+salt
				+"&sign="+sign;
		

		return HttpUtils.get(url);
	}

	public static String Translates(String content) {
		String result = null;
		try {
			
			String keyWord = content.replaceAll("^翻译" + Regex, "");
			if(keyWord.equals("")){
				result=getGuide();
			}else {
				String[] kwArr = keyWord.split("@");
			     
			    int flage =Integer.parseInt(kwArr[0]);//翻译的语言
			    String q = kwArr[1];
				
				String translateJsonStr = BaiduTranslates(q,transArray[flage-1][0],transArray[flage-1][1]);
				System.out.println("resutl 》》"+translateJsonStr);
				if (translateJsonStr != null) {

					JSONObject jsonObject = JSON.parseObject(translateJsonStr);
					System.out.println(jsonObject.toString());
					String error_code=jsonObject.getString("error_code");
					if (StrKit.isBlank(error_code)) {
						JSONArray translateResultJsonArray=jsonObject.getJSONArray("trans_result");

						String fromLanguage = null;
						String toLanguage = null;

						if (jsonObject.get("from").toString().equals("zh")) {
							fromLanguage = "\ue513汉";
						} else if (jsonObject.get("from").toString().equals("en")) {
							fromLanguage = "\ue50c英";
						} else if (jsonObject.get("from").toString().equals("jp")) {
							fromLanguage = "\ue50b日";
						}

						if (jsonObject.get("to").toString().equals("zh")) {
							toLanguage = "\ue513汉";
						} else if (jsonObject.get("to").toString().equals("en")) {
							toLanguage = "\ue50c英";
						} else if (jsonObject.get("to").toString().equals("jp")) {
							toLanguage = "\ue50b日";
						}else if (jsonObject.get("to").toString().equals("kor")) {
							toLanguage = "\ue514韩";
						}else if (jsonObject.get("to").toString().equals("ru")) {
							toLanguage = "\ue512俄罗斯语";
						}else if (jsonObject.get("to").toString().equals("yue")) {
							toLanguage = "粤语";
						}

						result = "\ue132翻译成功！\n"
								+ fromLanguage
								+ "译"
								+ toLanguage
								+ " : \n"
								+ translateResultJsonArray.getJSONObject(0).get("src")
										.toString()
								+ "\n"
								+ translateResultJsonArray.getJSONObject(0).get("dst")
										.toString();
					}else {
						result="翻译出现异常。";
					}
				} else {
					result = "无法翻译您所输入的内容！\n"+ getGuide();
				}
			}
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			result= "\ue252 翻译出错,请注意格式 \n\n"+getGuide();
		}
		return result;
	}
	
		/**
	    * UTF-8编码
	    *
	    * @param source
	    * @return
	    */
	  private static String urlEncodeUTF8(String source) {
	    String result = source;
	    try {
	      result = java.net.URLEncoder.encode(source, "UTF-8");
	    } catch (UnsupportedEncodingException e) {
	      e.printStackTrace();
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
	public static void main(String[] args) {
		System.out.println(Translates("翻译2@我爱你"));
	}

}
