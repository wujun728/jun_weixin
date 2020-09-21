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
@TableName("reflect_recode")
public class ReflectRecode implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "rrd_id", type = IdType.AUTO)
	private Long rrdId;

	/** 体现用户账号id */
	@TableField(value = "rrd_userid")
	private Long rrdUserid;

	/** 体现用户昵称 */
	@TableField(value = "rrd_username")
	private String rrdUsername;

	/** 体现流水号 */
	@TableField(value = "rrd_serialnum")
	private Long rrdSerialnum;

	/** 体现金额 */
	@TableField(value = "rrd_price")
	private Double rrdPrice;

	/** 申请时间 */
	@TableField(value = "rrd_applytime")
	private Date rrdApplytime;

	/** 状态：0.未处理1，已处理 */
	@TableField(value = "rrd_state")
	private Integer rrdState;

	/** 处理时间 */
	@TableField(value = "rrd_managetime")
	private Date rrdManagetime;


	public Long getRrdId() {
		return this.rrdId;
	}

	public void setRrdId(Long rrdId) {
		this.rrdId = rrdId;
	}

	public Long getRrdUserid() {
		return this.rrdUserid;
	}

	public void setRrdUserid(Long rrdUserid) {
		this.rrdUserid = rrdUserid;
	}

	public String getRrdUsername() {
		return this.rrdUsername;
	}

	public void setRrdUsername(String rrdUsername) {
		this.rrdUsername = rrdUsername;
	}

	public Long getRrdSerialnum() {
		return this.rrdSerialnum;
	}

	public void setRrdSerialnum(Long rrdSerialnum) {
		this.rrdSerialnum = rrdSerialnum;
	}

	public Double getRrdPrice() {
		return this.rrdPrice;
	}

	public void setRrdPrice(Double rrdPrice) {
		this.rrdPrice = rrdPrice;
	}

	public Date getRrdApplytime() {
		return this.rrdApplytime;
	}

	public void setRrdApplytime(Date rrdApplytime) {
		this.rrdApplytime = rrdApplytime;
	}

	public Integer getRrdState() {
		return this.rrdState;
	}

	public void setRrdState(Integer rrdState) {
		this.rrdState = rrdState;
	}

	public Date getRrdManagetime() {
		return this.rrdManagetime;
	}

	public void setRrdManagetime(Date rrdManagetime) {
		this.rrdManagetime = rrdManagetime;
	}

}
