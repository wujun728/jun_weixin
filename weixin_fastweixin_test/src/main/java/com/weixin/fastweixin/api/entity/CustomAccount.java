package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class CustomAccount extends BaseModel {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "kf_account")
	private String accountName;

	@JSONField(name = "kf_nick")
	private String nickName;

	private String password;

	@JSONField(name = "kf_id")
	private String id;

	@JSONField(name = "kf_headimg")
	private String headImg;

	public String getAccountName() {
		return accountName;
	}

	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getHeadImg() {
		return headImg;
	}

	public void setHeadImg(String headImg) {
		this.headImg = headImg;
	}

}
