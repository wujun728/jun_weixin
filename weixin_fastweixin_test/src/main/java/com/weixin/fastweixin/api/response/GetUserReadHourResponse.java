package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UserReadHour;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUserReadHourResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UserReadHour> list;

	public List<UserReadHour> getList() {
		return list;
	}

	public void setList(List<UserReadHour> list) {
		this.list = list;
	}

}
