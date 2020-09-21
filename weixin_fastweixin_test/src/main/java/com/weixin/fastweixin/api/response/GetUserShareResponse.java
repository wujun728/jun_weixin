package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UserShare;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUserShareResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UserShare> list;

	public List<UserShare> getList() {
		return list;
	}

	public void setList(List<UserShare> list) {
		this.list = list;
	}

}
