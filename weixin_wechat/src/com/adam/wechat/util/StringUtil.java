package com.adam.wechat.util;

public class StringUtil {
	public static Boolean isBlank(String content){
		if (content != null && !"".equalsIgnoreCase(content)) {
			return true;
		}else {
			return false;
		}
		
		
		
		
	}
}
