package com.weixin.fastweixin.company.api.response;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * Response -- 从Oauth中获取的用户信息
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetOauthUserInfoResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "UserId")
	private String userid;
	@JSONField(name = "OpenId")
	private String openid;
	@JSONField(name = "DeviceId")
	private String deviceid;

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getOpenid() {
		return openid;
	}

	public void setOpenid(String openid) {
		this.openid = openid;
	}

	public String getDeviceid() {
		return deviceid;
	}

	public void setDeviceid(String deviceid) {
		this.deviceid = deviceid;
	}
}
