package com.weixin.fastweixin.company.api.entity;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.entity.BaseModel;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYDepartment extends BaseModel {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "id")
	private Integer id;
	@JSONField(name = "name")
	private String name;
	@JSONField(name = "parentid")
	private Integer parentId;
	@JSONField(name = "order")
	private Integer order;

	public QYDepartment() {
	}

	public QYDepartment(String name, Integer parentId, Integer order) {
		this.name = name;
		this.parentId = (parentId == null || parentId < 1) ? 1 : parentId;
		this.order = order;
	}

	public QYDepartment(Integer id, String name, Integer parentId, Integer order) {
		this.id = id;
		this.name = name;
		this.parentId = (parentId == null || parentId < 1) ? 1 : parentId;
		this.order = order;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getParentId() {
		return parentId;
	}

	public void setParentId(Integer parentId) {
		this.parentId = parentId;
	}

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	@Override
	public String toString() {
		return "Department{" + "id=" + id + ", name='" + name + '\'' + ", parentId=" + parentId + ", order=" + order + '}';
	}
}
