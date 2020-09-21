package com.mhuang.common.utils.string;

import org.apache.commons.lang3.StringUtils;

/**
 * 
 * @Package: com.mhuang.common.utils.string
 * @Description String工具类
 * @author huang.miao
 * @date 2016年12月22日 下午3:04:52  
 * @since 1.0.0
 * @group skiper-opensource
 */
public class StringUtil {

	/**
	 * 组装URL参数
	 * @param str
	 * @return
	 */
	public static String packURL(String... str){
		StringBuilder urlStr = new StringBuilder(str[0]);
		for(int i = 1;i<str.length;i++){
			urlStr.append("&").append(str[i]);
		}
		return urlStr.toString();
	}
	// 首字母转大写
	public static String toUpperCaseFirstOne(String s) {
		if(StringUtils.isEmpty(s))
			return s;
		else if (Character.isUpperCase(s.charAt(0)))
			return s;
		else
			return (new StringBuilder())
					.append(Character.toUpperCase(s.charAt(0)))
					.append(s.substring(1)).toString();
	}
}
