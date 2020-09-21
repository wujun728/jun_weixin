package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class InterfaceSummaryHour extends InterfaceSummary {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "ref_hour")
	private Integer refHour;

	public Integer getRefHour() {
		return refHour;
	}

	public void setRefHour(Integer refHour) {
		this.refHour = refHour;
	}

}
