package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UserShareHour;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUserShareHourResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UserShareHour> list;

	public List<UserShareHour> getList() {
		return list;
	}

	public void setList(List<UserShareHour> list) {
		this.list = list;
	}
}
