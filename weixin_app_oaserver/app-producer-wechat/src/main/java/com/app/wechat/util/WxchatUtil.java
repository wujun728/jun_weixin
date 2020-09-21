package com.app.wechat.util;

public class WxchatUtil {
	
	//微信用户在redis中的存储key
	private static final String WECHAT_USER_OPENID = "wechat_user_openid_";
	public static String getWechatUserOpenIdMation(String openId){
		return WECHAT_USER_OPENID + openId;
	}
	
	
}
