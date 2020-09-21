package com.weixin.fastweixin.api.entity;

import com.weixin.fastweixin.util.JSONUtil;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public abstract class BaseModel implements Model {

	private static final long serialVersionUID = 1L;

	@Override
	public String toJsonString() {
		return JSONUtil.toJson(this);
	}
}
