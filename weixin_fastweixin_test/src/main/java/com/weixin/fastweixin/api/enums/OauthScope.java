package com.weixin.fastweixin.api.enums;

/**
 * Oauth授权作用域枚举
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public enum OauthScope {

	/**
	 * 仅仅获取用户openid
	 */
	SNSAPI_BASE("snsapi_base"),

	/**
	 * 获取用户完整信息
	 */
	SNSAPI_USERINFO("snsapi_userinfo");

	String value;

	OauthScope(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return this.value;
	}
}
