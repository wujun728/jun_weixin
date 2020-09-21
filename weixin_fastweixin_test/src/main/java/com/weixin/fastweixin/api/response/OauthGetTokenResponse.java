package com.weixin.fastweixin.api.response;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * Oauth授权获取token接口响应对象
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class OauthGetTokenResponse extends GetTokenResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "refresh_token")
	private String refreshToken;

	private String openid;

	private String scope;

	private String unionid;

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}

	public String getUnionid() {
		return unionid;
	}

	public void setUnionid(String unionid) {
		this.unionid = unionid;
	}

}
