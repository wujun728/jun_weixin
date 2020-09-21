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
@TableName("mark_recode")
public class MarkRecode implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "mrd_id", type = IdType.AUTO)
	private Long mrdId;

	/** 账号id */
	@TableField(value = "mrd_userid")
	private Long mrdUserid;

	/** 账号昵称 */
	@TableField(value = "mrd_username")
	private String mrdUsername;

	/** 收支类型：0：邀请，1：充值 2:支出 */
	@TableField(value = "mrd_profittype")
	private Integer mrdProfittype;

	/** 时间 */
	@TableField(value = "mrd_time")
	private Date mrdTime;

	/** 收入 */
	@TableField(value = "mrd_income")
	private Double mrdIncome;

	/** 支出 */
	@TableField(value = "mrd_pay")
	private Double mrdPay;

	/** 余钱 */
	@TableField(value = "mrd_share")
	private Double mrdShare;

	/** 备注 */
	@TableField(value = "mrd_remark")
	private String mrdRemark;

	
	public MarkRecode() {
		super();
	}

	
	public MarkRecode(Long mrdUserid, String mrdUsername, Integer mrdProfittype, Date mrdTime, Double mrdShare,
			String mrdRemark) {
		super();
		this.mrdUserid = mrdUserid;
		this.mrdUsername = mrdUsername;
		this.mrdProfittype = mrdProfittype;
		this.mrdTime = mrdTime;
		this.mrdShare = mrdShare;
		this.mrdRemark = mrdRemark;
	}


	@Override
	public String toString() {
		return "MarkRecode [mrdId=" + mrdId + ", mrdUserid=" + mrdUserid + ", mrdUsername=" + mrdUsername
				+ ", mrdProfittype=" + mrdProfittype + ", mrdTime=" + mrdTime + ", mrdIncome=" + mrdIncome + ", mrdPay="
				+ mrdPay + ", mrdShare=" + mrdShare + ", mrdRemark=" + mrdRemark + "]";
	}


	public Long getMrdId() {
		return this.mrdId;
	}

	public void setMrdId(Long mrdId) {
		this.mrdId = mrdId;
	}

	public Long getMrdUserid() {
		return this.mrdUserid;
	}

	public void setMrdUserid(Long mrdUserid) {
		this.mrdUserid = mrdUserid;
	}

	public String getMrdUsername() {
		return this.mrdUsername;
	}

	public void setMrdUsername(String mrdUsername) {
		this.mrdUsername = mrdUsername;
	}

	public Integer getMrdProfittype() {
		return this.mrdProfittype;
	}

	public void setMrdProfittype(Integer mrdProfittype) {
		this.mrdProfittype = mrdProfittype;
	}

	public Date getMrdTime() {
		return this.mrdTime;
	}

	public void setMrdTime(Date mrdTime) {
		this.mrdTime = mrdTime;
	}

	public Double getMrdIncome() {
		return this.mrdIncome;
	}

	public void setMrdIncome(Double mrdIncome) {
		this.mrdIncome = mrdIncome;
	}

	public Double getMrdPay() {
		return this.mrdPay;
	}

	public void setMrdPay(Double mrdPay) {
		this.mrdPay = mrdPay;
	}

	public Double getMrdShare() {
		return this.mrdShare;
	}

	public void setMrdShare(Double mrdShare) {
		this.mrdShare = mrdShare;
	}

	public String getMrdRemark() {
		return this.mrdRemark;
	}

	public void setMrdRemark(String mrdRemark) {
		this.mrdRemark = mrdRemark;
	}

}
