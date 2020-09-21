package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UserSummary;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUserSummaryResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UserSummary> list;

	public List<UserSummary> getList() {
		return list;
	}

	public void setList(List<UserSummary> list) {
		this.list = list;
	}

}
