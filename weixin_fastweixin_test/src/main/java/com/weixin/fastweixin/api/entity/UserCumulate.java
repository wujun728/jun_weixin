package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 累计用户数据
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class UserCumulate extends BaseDataCube {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "cumulate_user")
	private Integer cumulateUser;

	public Integer getCumulateUser() {
		return cumulateUser;
	}

	public void setCumulateUser(Integer cumulateUser) {
		this.cumulateUser = cumulateUser;
	}

}
