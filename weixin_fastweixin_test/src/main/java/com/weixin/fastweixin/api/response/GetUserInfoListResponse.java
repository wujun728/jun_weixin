package com.weixin.fastweixin.api.response;

import java.util.List;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUserInfoListResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<GetUserInfoResponse> user_info_list;

	public List<GetUserInfoResponse> getUser_info_list() {
		return user_info_list;
	}

	public void setUser_info_list(List<GetUserInfoResponse> user_info_list) {
		this.user_info_list = user_info_list;
	}

}
