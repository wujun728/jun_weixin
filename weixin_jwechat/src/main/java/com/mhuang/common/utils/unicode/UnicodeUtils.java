package com.mhuang.common.utils.unicode;

import java.io.UnsupportedEncodingException;

public class UnicodeUtils {

	/**
	 * 字符串转换unicode
	 */
	public static String string2Unicode(String string) {
		  try {
		      StringBuffer out = new StringBuffer("");
		      byte[] bytes = string.getBytes("unicode");
		      for (int i = 2; i < bytes.length - 1; i += 2) {
		        out.append("\\u");
		        String str = Integer.toHexString(bytes[i + 1] & 0xff);
		        for (int j = str.length(); j < 2; j++) {
		          out.append("0");
		        }
		        String str1 = Integer.toHexString(bytes[i] & 0xff);

		        out.append(str);
		        out.append(str1);
		        out.append("");
		      }
		      return out.toString().toUpperCase();
		    }catch (UnsupportedEncodingException e) {
		      e.printStackTrace();
		      return null;
		    }
	}
	public static void main(String[] args){
		System.out.println(string2Unicode("你好"));
		System.out.println(unicode2String("\\u4f60\\u597d"));
	}
	/**
	 * unicode 转字符串
	 */
	public static String unicode2String(String unicode) {
		    int n = unicode.length() / 6;  
		    StringBuilder sb = new StringBuilder(n);  
		    for (int i = 0, j = 2; i < n; i++, j += 6) {  
		        String code = unicode.substring(j, j + 4);  
		        char ch = (char) Integer.parseInt(code, 16);  
		        sb.append(ch);  
		    }  
		    return sb.toString();  
	}
}
