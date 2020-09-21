package com.weixin.fastweixin.api.entity;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class BaseDataCube extends BaseModel {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "ref_date", format = "yyyy-MM-dd")
	private Date refDate;

	public Date getRefDate() {
		return refDate;
	}

	public void setRefDate(Date refDate) {
		this.refDate = refDate;
	}

}
