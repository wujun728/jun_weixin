package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UserCumulate;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUserCumulateResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UserCumulate> list;

	public List<UserCumulate> getList() {
		return list;
	}

	public void setList(List<UserCumulate> list) {
		this.list = list;
	}

}
