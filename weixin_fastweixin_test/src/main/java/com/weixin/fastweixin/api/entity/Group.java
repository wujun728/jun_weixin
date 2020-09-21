package com.weixin.fastweixin.api.entity;

/**
 * 分组信息
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class Group extends BaseModel {

	private static final long serialVersionUID = 1L;

	private Integer id;
	private String name;
	private Integer count;

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

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}
}
