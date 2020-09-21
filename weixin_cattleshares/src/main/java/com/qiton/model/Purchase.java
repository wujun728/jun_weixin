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
public class Purchase implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;
	
	
	/** 0:普通用户，1：会员 */
	@TableField(value = "pur_type")
	private Integer purType;

	/**  */
	@TableId(value = "pur_id", type = IdType.AUTO)
	private Long purId;

	/**  */
	@TableField(value = "pur_stockcode")
	private Long purStockcode;

	/**  */
	@TableField(value = "pur_stockname")
	private String purStockname;

	/**  */
	@TableField(value = "pur_purchasetime")
	private Date purPurchasetime;

	/**  */
	@TableField(value = "pur_stockprice")
	private Double purStockprice;

	/**  */
	@TableField(value = "pur_technick")
	private String purTechnick;

	/**  */
	@TableField(value = "create_time")
	private Date createTime;
	
	@TableField(exist = false)
	private double profit;
	
	


	/**
	 * @return the profit
	 */
	public double getProfit() {
		return profit;
	}

	/**
	 * @param profit the profit to set
	 */
	public void setProfit(double profit) {
		this.profit = profit;
	}

	public Integer getPurType() {
		return this.purType;
	}

	public void setPurType(Integer purType) {
		this.purType = purType;
	}

	public Long getPurId() {
		return this.purId;
	}

	public void setPurId(Long purId) {
		this.purId = purId;
	}

	public Long getPurStockcode() {
		return this.purStockcode;
	}

	public void setPurStockcode(Long purStockcode) {
		this.purStockcode = purStockcode;
	}

	public String getPurStockname() {
		return this.purStockname;
	}

	public void setPurStockname(String purStockname) {
		this.purStockname = purStockname;
	}
	
	@JsonFormat(pattern="HH:mm",timezone = "GMT+8")
	public Date getPurPurchasetime() {
		return this.purPurchasetime;
	}

	public void setPurPurchasetime(Date purPurchasetime) {
		this.purPurchasetime = purPurchasetime;
	}

	public Double getPurStockprice() {
		return this.purStockprice;
	}

	public void setPurStockprice(Double purStockprice) {
		this.purStockprice = purStockprice;
	}

	public String getPurTechnick() {
		return this.purTechnick;
	}

	public void setPurTechnick(String purTechnick) {
		this.purTechnick = purTechnick;
	}

	public Date getCreateTime() {
		return this.createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "Purchase [purType=" + purType + ", purId=" + purId + ", purStockcode=" + purStockcode
				+ ", purStockname=" + purStockname + ", purPurchasetime=" + purPurchasetime + ", purStockprice="
				+ purStockprice + ", purTechnick=" + purTechnick + ", createTime=" + createTime + ", profit=" + profit
				+ "]";
	}

	
	
}
