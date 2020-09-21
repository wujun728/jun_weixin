package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UserRead;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUserReadResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UserRead> list;

	public List<UserRead> getList() {
		return list;
	}

	public void setList(List<UserRead> list) {
		this.list = list;
	}
}
