package com.infrastructure.project.common.extension;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

/**
 * String 工具类
 * @author misswhen
 *
 */
public class StringHelper {

	/**
	 * 将String转换为Integer类型的List
	 * @param str
	 * @param split
	 * @return
	 */
	public final static List<Integer> toIntegerList(String str, String split){
		List<Integer> ret=new ArrayList<Integer>();	
		if(str!=null && !str.isEmpty()){
			String[] strArray=str.split(split);
			
			for(String item : strArray){
				if(!item.isEmpty())
					ret.add(Integer.parseInt(item));
			}
		}
		return ret;	
	}
	
	/**
	 * MD5字符串加密
	 * @param str
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	public final static String md5(String str) throws NoSuchAlgorithmException {
        final char[] hexDigits={'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};       
        byte[] btInput = str.getBytes();
        // 获得MD5摘要算法的 MessageDigest 对象
        MessageDigest md5Inst = MessageDigest.getInstance("MD5");
        // 使用指定的字节更新摘要
        md5Inst.update(btInput);
        // 获得密文
        byte[] bytes = md5Inst.digest();
        
        StringBuffer strResult=new StringBuffer();
        // 把密文转换成十六进制的字符串形式
        for(int i=0;i<bytes.length;i++){
			strResult.append(hexDigits[(bytes[i]>>4)&0x0f]);
			strResult.append(hexDigits[bytes[i]&0x0f]);
        }
        return strResult.toString();
    }
	
	/**
	 * SHA-1字符串加密
	 * @param str
	 * @return
	 * @throws NoSuchAlgorithmException
	 */
	public final static String sha1(String str) throws NoSuchAlgorithmException{
		final char[] hexDigits={'0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'};
		byte[] btInput = str.getBytes();
		// 获得SHA-1摘要算法的 MessageDigest 对象
        MessageDigest sha1Inst = MessageDigest.getInstance("SHA-1");
        // 使用指定的字节更新摘要
        sha1Inst.update(btInput);
        // 获得密文
        byte[] bytes = sha1Inst.digest();
        
        StringBuffer strResult=new StringBuffer();
        // 把密文转换成十六进制的字符串形式
        for(int i=0;i<bytes.length;i++){
			strResult.append(hexDigits[(bytes[i]>>4)&0x0f]);
			strResult.append(hexDigits[bytes[i]&0x0f]);
        }
        return strResult.toString();
	}
	
}
