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
@TableName("gold_record")
public class GoldRecord implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "grid_id", type = IdType.AUTO)
	private Long gridId;

	/** 账户id */
	@TableField(value = "grd_userid")
	private Long grdUserid;

	/** 账户名称 */
	@TableField(value = "grd_username")
	private String grdUsername;

	/** 收益类型：0.邀请，1：充值 2.支出 */
	@TableField(value = "grd_profittype")
	private Integer grdProfittype;

	/** 时间 */
	@TableField(value = "grd_time")
	private Date grdTime;

	/** 收入 */
	@TableField(value = "grd_income")
	private Double grdIncome;

	/** 支出 */
	@TableField(value = "grd_pay")
	private Double grdPay;

	/** 余钱 */
	@TableField(value = "grd_spare")
	private Double grdSpare;

	/** 备注 */
	@TableField(value = "grd_remark")
	private String grdRemark;

	
	
	
	

	public GoldRecord() {
		super();
	}

	public GoldRecord(Long grdUserid, String grdUsername, Integer grdProfittype, Date grdTime, Double grdSpare, String grdRemark) {
		super();
		this.grdUserid = grdUserid;
		this.grdUsername = grdUsername;
		this.grdProfittype = grdProfittype;
		this.grdTime = grdTime;
		this.grdSpare = grdSpare;
		this.grdRemark = grdRemark;
	}





	@Override
	public String toString() {
		return "GoldRecord [gridId=" + gridId + ", grdUserid=" + grdUserid + ", grdUsername=" + grdUsername
				+ ", grdProfittype=" + grdProfittype + ", grdTime=" + grdTime + ", grdIncome=" + grdIncome + ", grdPay="
				+ grdPay + ", grdSpare=" + grdSpare + ", grdRemark=" + grdRemark + "]";
	}

	public Long getGridId() {
		return this.gridId;
	}

	public void setGridId(Long gridId) {
		this.gridId = gridId;
	}

	public Long getGrdUserid() {
		return this.grdUserid;
	}

	public void setGrdUserid(Long grdUserid) {
		this.grdUserid = grdUserid;
	}

	public String getGrdUsername() {
		return this.grdUsername;
	}

	public void setGrdUsername(String grdUsername) {
		this.grdUsername = grdUsername;
	}

	public Integer getGrdProfittype() {
		return this.grdProfittype;
	}

	public void setGrdProfittype(Integer grdProfittype) {
		this.grdProfittype = grdProfittype;
	}

	public Date getGrdTime() {
		return this.grdTime;
	}

	public void setGrdTime(Date grdTime) {
		this.grdTime = grdTime;
	}

	public Double getGrdIncome() {
		return this.grdIncome;
	}

	public void setGrdIncome(Double grdIncome) {
		this.grdIncome = grdIncome;
	}

	public Double getGrdPay() {
		return this.grdPay;
	}

	public void setGrdPay(Double grdPay) {
		this.grdPay = grdPay;
	}

	public Double getGrdSpare() {
		return this.grdSpare;
	}

	public void setGrdSpare(Double grdSpare) {
		this.grdSpare = grdSpare;
	}

	public String getGrdRemark() {
		return this.grdRemark;
	}

	public void setGrdRemark(String grdRemark) {
		this.grdRemark = grdRemark;
	}

}
