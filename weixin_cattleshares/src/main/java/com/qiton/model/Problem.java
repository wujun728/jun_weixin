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
public class Problem implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "pro_id", type = IdType.AUTO)
	private Long proId;

	/** 询问老师id */
	@TableField(value = "pro_techid")
	private Long proTechid;

	/** 咨询问题内参 */
	@TableField(value = "pro_userquestion")
	private String proUserquestion;

	/** 老师昵称 */
	@TableField(value = "pro_technick")
	private String proTechnick;

	/** 回复内容 */
	@TableField(value = "pro_answer")
	private String proAnswer;

	/** 创建时间 */
	@TableField(value = "pro_createtime")
	private Date proCreatetime;


	public Long getProId() {
		return this.proId;
	}

	public void setProId(Long proId) {
		this.proId = proId;
	}

	public Long getProTechid() {
		return this.proTechid;
	}

	public void setProTechid(Long proTechid) {
		this.proTechid = proTechid;
	}

	public String getProUserquestion() {
		return this.proUserquestion;
	}

	public void setProUserquestion(String proUserquestion) {
		this.proUserquestion = proUserquestion;
	}

	public String getProTechnick() {
		return this.proTechnick;
	}

	public void setProTechnick(String proTechnick) {
		this.proTechnick = proTechnick;
	}

	public String getProAnswer() {
		return this.proAnswer;
	}

	public void setProAnswer(String proAnswer) {
		this.proAnswer = proAnswer;
	}

	public Date getProCreatetime() {
		return this.proCreatetime;
	}

	public void setProCreatetime(Date proCreatetime) {
		this.proCreatetime = proCreatetime;
	}

}
