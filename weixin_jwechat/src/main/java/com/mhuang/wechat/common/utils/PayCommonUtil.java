package com.mhuang.wechat.common.utils;

import java.util.Iterator;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.SortedMap;

import org.springframework.util.ObjectUtils;

import com.mhuang.common.utils.md5.MD5Util;
import com.mhuang.wechat.common.config.WeConfig;
import com.mhuang.wechat.common.model.ret.Return;


public class PayCommonUtil {
	
	private final static String CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	
	public  static String CreateNoncestr(int length) {
		StringBuilder res = new StringBuilder("");
		for (int i = 0; i < length; i++) {
			Random rd = new Random();
			res.append(CHARS.indexOf(rd.nextInt(CHARS.length() - 1)));
		}
		return res.toString();
	}

	public static String createTimetmp(){
		return Long.toString(System.currentTimeMillis() / 1000);
	}
	public static String CreateNoncestr() {
		StringBuilder res = new StringBuilder("");
		for (int i = 0; i < 16; i++) {
			Random rd = new Random();
			res.append(CHARS.charAt(rd.nextInt(CHARS.length() - 1)));
		}
		return res.toString();
	}
	/**
	 * @author 李欣桦
	 * @date 2014-12-5下午2:29:34
	 * @Description：sign签名
	 * @param characterEncoding 编码格式
	 * @param parameters 请求参数
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static String createSign(String characterEncoding,SortedMap<Object,Object> parameters){
		StringBuffer sb = new StringBuffer();
		Set es = parameters.entrySet();
		Iterator it = es.iterator();
		while(it.hasNext()) {
			Map.Entry entry = (Map.Entry)it.next();
			String k = (String)entry.getKey();
			Object v = entry.getValue();
			if(!ObjectUtils.isEmpty(v)
					&& !"sign".equals(k) && !"key".equals(k)) {
				sb.append(k + "=" + v + "&");
			}
		}
		//TODO WechatConfig.API_KEY 请修改成自己的申请的key
		sb.append("key=").append(WeConfig.API_KEY);
		String sign = MD5Util.MD5Encode(sb.toString(), characterEncoding).toUpperCase();
		return sign;
	}
	public static void main(String[] args) {
		MessageUtils<Return> retMsg = new MessageUtils<Return>();
		System.out.println(retMsg.fromObjectToXml(new Return("1","2"),false));
	}
}
