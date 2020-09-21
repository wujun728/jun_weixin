package com.qiton.model;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.IdType;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 *
 * 
 *
 */
public class User implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "user_id", type = IdType.AUTO)
	private Long userId;

	/**  */
	@TableField(value = "user_name")
	private String userName;

	/**  */
	private String password;

	/** 0:普通用户，1:会员用户，2:合作用户 */
	private Integer grade;

	/**  */
	@TableField(value = "register_time")
	private Date registerTime;

	/**  */
	@TableField(value = "end_vip_time")
	private Date endVipTime;

	/** 0:未开通，1:已开通，2:已过期 */
	@TableField(value = "vip_status")
	private Integer vipStatus;

	/**  */
	private String phone;

	/**  */
	private Integer gold;

	/**  */
	private Integer mark;
	@TableField(exist = false)
	private String validateCode;
	

	/** 0:财付通，1：支付宝 2：银行 */
	@TableField(value = "account_type")
	private Integer accountType;

	/** 体现账户 */
	@TableField(value = "reflect_account")
	private String reflectAccount;


	public Long getUserId() {
		return this.userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getGrade() {
		return this.grade;
	}

	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	public Date getRegisterTime() {
		return this.registerTime;
	}

	public void setRegisterTime(Date registerTime) {
		this.registerTime = registerTime;
	}
	@JsonFormat(pattern="yyyy-MM-dd",timezone = "GMT+8")
	public Date getEndVipTime() {
		return this.endVipTime;
	}

	public void setEndVipTime(Date endVipTime) {
		this.endVipTime = endVipTime;
	}

	public Integer getVipStatus() {
		return this.vipStatus;
	}

	public void setVipStatus(Integer vipStatus) {
		this.vipStatus = vipStatus;
	}

	public String getPhone() {
		return this.phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Integer getGold() {
		return this.gold;
	}

	public void setGold(Integer gold) {
		this.gold = gold;
	}

	public Integer getMark() {
		return this.mark;
	}

	public void setMark(Integer mark) {
		this.mark = mark;
	}

	public Integer getAccountType() {
		return this.accountType;
	}

	public void setAccountType(Integer accountType) {
		this.accountType = accountType;
	}

	public String getReflectAccount() {
		return this.reflectAccount;
	}

	public void setReflectAccount(String reflectAccount) {
		this.reflectAccount = reflectAccount;
	}

	

	public String getValidateCode() {
		return validateCode;
	}

	public void setValidateCode(String validateCode) {
		this.validateCode = validateCode;
	}

	public User() {
		super();
	}

	

	public User(String userName, String password, Integer grade, Date registerTime, Date endVipTime, Integer vipStatus,
			String phone, Integer gold, Integer mark) {
		super();
		this.userName = userName;
		this.password = password;
		this.grade = grade;
		this.registerTime = registerTime;
		this.endVipTime = endVipTime;
		this.vipStatus = vipStatus;
		this.phone = phone;
		this.gold = gold;
		this.mark = mark;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", userName=" + userName + ", password=" + password + ", grade=" + grade
				+ ", registerTime=" + registerTime + ", endVipTime=" + endVipTime + ", vipStatus=" + vipStatus
				+ ", phone=" + phone + ", gold=" + gold + ", mark=" + mark + ", accountType=" + accountType
				+ ", reflectAccount=" + reflectAccount + "]";
	}

	
	
	
}
