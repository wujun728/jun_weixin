package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class Matchrule extends BaseModel {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "group_id")
	private String groupId;

	private String sex;

	private String country;

	private String province;

	private String city;

	@JSONField(name = "client_platform_type")
	private String clientPlatformType;

	public String getGroupId() {
		return groupId;
	}

	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getClientPlatformType() {
		return clientPlatformType;
	}

	public void setClientPlatformType(String clientPlatformType) {
		this.clientPlatformType = clientPlatformType;
	}

}
