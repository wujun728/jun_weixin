package com.weixin.fastweixin.company.api.response;

import java.util.List;

import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * Response -- 增加标签成员
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class AddTagUsersResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private String invalidlist;
	private List<Integer> invalidparty;

	public String getInvalidlist() {
		return invalidlist;
	}

	public void setInvalidlist(String invalidlist) {
		this.invalidlist = invalidlist;
	}

	public List<Integer> getInvalidparty() {
		return invalidparty;
	}

	public void setInvalidparty(List<Integer> invalidparty) {
		this.invalidparty = invalidparty;
	}

}
