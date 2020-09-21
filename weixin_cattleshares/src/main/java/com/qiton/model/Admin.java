package com.qiton.model;

import java.io.Serializable;

import com.baomidou.mybatisplus.annotations.IdType;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;

/**
 *
 * 
 *
 */
public class Admin implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "admin_id", type = IdType.AUTO)
	private Long adminId;

	/** 用户名 */
	@TableField(value = "admin_username")
	private String adminUsername;

	/** 密码 */
	@TableField(value = "admin_password")
	private String adminPassword;

	/** 管理员类型：0.客服，1.管理员 */
	@TableField(value = "admin_type")
	private Integer adminType;


	public Long getAdminId() {
		return this.adminId;
	}

	public void setAdminId(Long adminId) {
		this.adminId = adminId;
	}

	public String getAdminUsername() {
		return this.adminUsername;
	}

	public void setAdminUsername(String adminUsername) {
		this.adminUsername = adminUsername;
	}

	public String getAdminPassword() {
		return this.adminPassword;
	}

	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}

	public Integer getAdminType() {
		return this.adminType;
	}

	public void setAdminType(Integer adminType) {
		this.adminType = adminType;
	}

	public Admin() {
		super();
	}

	public Admin(String adminUsername, String adminPassword, Integer adminType) {
		super();
		this.adminUsername = adminUsername;
		this.adminPassword = adminPassword;
		this.adminType = adminType;
	}

	@Override
	public String toString() {
		return "Admin [adminId=" + adminId + ", adminUsername=" + adminUsername + ", adminPassword=" + adminPassword
				+ ", adminType=" + adminType + "]";
	}

	
	
	
}
