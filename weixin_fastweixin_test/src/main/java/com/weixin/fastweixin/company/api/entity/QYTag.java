package com.weixin.fastweixin.company.api.entity;

import com.weixin.fastweixin.api.entity.BaseModel;

/**
 * 企业通讯录-标签
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYTag extends BaseModel {

	private static final long serialVersionUID = 1L;

	private String tagname;
	private Integer tagid;

	public QYTag() {
	}

	public QYTag(String tagname) {
		this.tagname = tagname;
	}

	public QYTag(String tagname, Integer tagid) {
		this.tagname = tagname;
		this.tagid = tagid;
	}

	public String getTagname() {
		return tagname;
	}

	public void setTagname(String tagname) {
		this.tagname = tagname;
	}

	public Integer getTagid() {
		return tagid;
	}

	public void setTagid(Integer tagid) {
		this.tagid = tagid;
	}
}
