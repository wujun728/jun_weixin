package com.weixin.fastweixin.company.api.response;

import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetQYUserInviteResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private Integer type;

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}
}
