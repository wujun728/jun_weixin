package com.mhuang.wechat.pay.utils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

/**
 *微信支付Utils
 * @author Administrator
 */
public class PayUtils {

 
	public static String requestUrl(HttpServletRequest request){
		String queryString = request.getQueryString();
		if(StringUtils.isNotBlank(queryString)){
			return request.getRequestURL().append("?").append(request.getQueryString()).toString();
		}
		return request.getRequestURL().toString();
	}
	
	public static Map<String, String> parseXml(String request){
		Map<String, String> map = new HashMap<String, String>();  
		try{
		    // 读取输入流  
		    Document document = DocumentHelper.parseText(request);  
		    parse(map, document);  
		}catch(Exception e){
			e.printStackTrace();
		}
	    return map;
	}
	private static void parse(Map<String, String> map,Document document){
		 // 得到xml根元素  
	    Element root = document.getRootElement();  
	    
	    // 得到根元素的所有子节点  
	    @SuppressWarnings("unchecked")
		List<Element> elementList = root.elements();  
	   
	    // 遍历所有子节点  
	    for (Element e : elementList)  
	        map.put(e.getName(), e.getText());  
	}
	
}
