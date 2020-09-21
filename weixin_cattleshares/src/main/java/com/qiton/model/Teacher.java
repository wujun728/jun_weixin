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
public class Teacher implements Serializable {

	@TableField(exist = false)
	private static final long serialVersionUID = 1L;

	/**  */
	@TableId(value = "tech_id", type = IdType.AUTO)
	private Long techId;

	/** 昵称 */
	@TableField(value = "tech_nick")
	private String techNick;

	/** 头像 */
	@TableField(value = "tech_head")
	private String techHead;

	/** 职称 */
	@TableField(value = "tech_title")
	private String techTitle;

	/** 标签 */
	@TableField(value = "tech_label")
	private String techLabel;

	/** 简介 */
	@TableField(value = "tech_intro")
	private String techIntro;

	/** 所属机构 */
	@TableField(value = "tech_mechanism")
	private String techMechanism;

	/** 从业资格证 */
	@TableField(value = "tch_certificate")
	private String tchCertificate;

	/** 从业年限 */
	@TableField(value = "tech_workage")
	private Integer techWorkage;

	/** 特长 */
	@TableField(value = "tech_specialty")
	private String techSpecialty;


	public Long getTechId() {
		return this.techId;
	}

	public void setTechId(Long techId) {
		this.techId = techId;
	}

	public String getTechNick() {
		return this.techNick;
	}

	public void setTechNick(String techNick) {
		this.techNick = techNick;
	}

	public String getTechHead() {
		return this.techHead;
	}

	public void setTechHead(String techHead) {
		this.techHead = techHead;
	}

	public String getTechTitle() {
		return this.techTitle;
	}

	public void setTechTitle(String techTitle) {
		this.techTitle = techTitle;
	}

	public String getTechLabel() {
		return this.techLabel;
	}

	public void setTechLabel(String techLabel) {
		this.techLabel = techLabel;
	}

	public String getTechIntro() {
		return this.techIntro;
	}

	public void setTechIntro(String techIntro) {
		this.techIntro = techIntro;
	}

	public String getTechMechanism() {
		return this.techMechanism;
	}

	public void setTechMechanism(String techMechanism) {
		this.techMechanism = techMechanism;
	}

	public String getTchCertificate() {
		return this.tchCertificate;
	}

	public void setTchCertificate(String tchCertificate) {
		this.tchCertificate = tchCertificate;
	}

	public Integer getTechWorkage() {
		return this.techWorkage;
	}

	public void setTechWorkage(Integer techWorkage) {
		this.techWorkage = techWorkage;
	}

	public String getTechSpecialty() {
		return this.techSpecialty;
	}

	public void setTechSpecialty(String techSpecialty) {
		this.techSpecialty = techSpecialty;
	}

	public Teacher() {
		super();
	}

	public Teacher(String techNick, String techHead, String techTitle, String techLabel, String techIntro,
			String techMechanism, String tchCertificate, Integer techWorkage, String techSpecialty) {
		super();
		this.techNick = techNick;
		this.techHead = techHead;
		this.techTitle = techTitle;
		this.techLabel = techLabel;
		this.techIntro = techIntro;
		this.techMechanism = techMechanism;
		this.tchCertificate = tchCertificate;
		this.techWorkage = techWorkage;
		this.techSpecialty = techSpecialty;
	}

	@Override
	public String toString() {
		return "Teacher [techId=" + techId + ", techNick=" + techNick + ", techHead=" + techHead + ", techTitle="
				+ techTitle + ", techLabel=" + techLabel + ", techIntro=" + techIntro + ", techMechanism="
				+ techMechanism + ", tchCertificate=" + tchCertificate + ", techWorkage=" + techWorkage
				+ ", techSpecialty=" + techSpecialty + "]";
	}

	
	
	
}
