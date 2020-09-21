package com.qiton.model;

import java.io.Serializable;
import java.util.Date;

import com.baomidou.mybatisplus.annotations.IdType;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;

/**
 *
 * 
 *
 */
public class Invite implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "invi_id", type = IdType.AUTO)
	private Long inviId;

	/** 发起邀请用户 */
	@TableField(value = "invi_username")
	private String inviUsername;

	/** 受邀请人id */
	@TableField(value = "invi_acceptuserId")
	private Long inviAcceptuserid;

	/** 接受邀请用户 */
	@TableField(value = "invi_acceptuser")
	private String inviAcceptuser;

	/** 接受人电话 */
	@TableField(value = "invi_acceptmobile")
	private String inviAcceptmobile;

	/** 接受人注册时间 */
	@TableField(value = "invi_registtime")
	private Date inviRegisttime;

	/** 邀请人用户状态 */
	@TableField(value = "invi_userstate")
	private String inviUserstate;

	/** 邀请金币 */
	@TableField(value = "invi_gold")
	private Integer inviGold;

	/** 邀请积分 */
	@TableField(value = "invi_mark")
	private Integer inviMark;


	public Long getInviId() {
		return this.inviId;
	}

	public void setInviId(Long inviId) {
		this.inviId = inviId;
	}

	public String getInviUsername() {
		return this.inviUsername;
	}

	public void setInviUsername(String inviUsername) {
		this.inviUsername = inviUsername;
	}

	public Long getInviAcceptuserid() {
		return this.inviAcceptuserid;
	}

	public void setInviAcceptuserid(Long inviAcceptuserid) {
		this.inviAcceptuserid = inviAcceptuserid;
	}

	public String getInviAcceptuser() {
		return this.inviAcceptuser;
	}

	public void setInviAcceptuser(String inviAcceptuser) {
		this.inviAcceptuser = inviAcceptuser;
	}

	public String getInviAcceptmobile() {
		return this.inviAcceptmobile;
	}

	public void setInviAcceptmobile(String inviAcceptmobile) {
		this.inviAcceptmobile = inviAcceptmobile;
	}

	public Date getInviRegisttime() {
		return this.inviRegisttime;
	}

	public void setInviRegisttime(Date inviRegisttime) {
		this.inviRegisttime = inviRegisttime;
	}

	public String getInviUserstate() {
		return this.inviUserstate;
	}

	public void setInviUserstate(String inviUserstate) {
		this.inviUserstate = inviUserstate;
	}

	public Integer getInviGold() {
		return this.inviGold;
	}

	public void setInviGold(Integer inviGold) {
		this.inviGold = inviGold;
	}

	public Integer getInviMark() {
		return this.inviMark;
	}

	public void setInviMark(Integer inviMark) {
		this.inviMark = inviMark;
	}

}
