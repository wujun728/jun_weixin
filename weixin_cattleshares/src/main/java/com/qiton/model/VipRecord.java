package com.qiton.model;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.IdType;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

/**
 *
 * 
 *
 */
@TableName("vip_record")
public class VipRecord implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/** 账户id */
	@TableId(value = "vrd_userid", type = IdType.AUTO)
	private Long vrdUserid;

	/** 账户昵称 */
	@TableField(value = "vrd_username")
	private String vrdUsername;

	/** 充值时间 */
	@TableField(value = "vrd_rechargetime")
	private Date vrdRechargetime;

	/** 充值金额 */
	@TableField(value = "vrd_rechargeprice")
	private Integer vrdRechargeprice;

	/** 备注 */
	@TableField(value = "vrd_remark")
	private String vrdRemark;


	public Long getVrdUserid() {
		return this.vrdUserid;
	}

	public void setVrdUserid(Long vrdUserid) {
		this.vrdUserid = vrdUserid;
	}

	public String getVrdUsername() {
		return this.vrdUsername;
	}

	public void setVrdUsername(String vrdUsername) {
		this.vrdUsername = vrdUsername;
	}

	public Date getVrdRechargetime() {
		return this.vrdRechargetime;
	}

	public void setVrdRechargetime(Date vrdRechargetime) {
		this.vrdRechargetime = vrdRechargetime;
	}

	public Integer getVrdRechargeprice() {
		return this.vrdRechargeprice;
	}

	public void setVrdRechargeprice(Integer vrdRechargeprice) {
		this.vrdRechargeprice = vrdRechargeprice;
	}

	public String getVrdRemark() {
		return this.vrdRemark;
	}

	public void setVrdRemark(String vrdRemark) {
		this.vrdRemark = vrdRemark;
	}

}
