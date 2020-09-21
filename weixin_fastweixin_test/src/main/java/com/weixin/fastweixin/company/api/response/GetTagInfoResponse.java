package com.weixin.fastweixin.company.api.response;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * Response -- 标签信息
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetTagInfoResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "userlist")
	private List<Map<String, String>> users;
	@JSONField(name = "partylist")
	private List<Integer> partys;

	public List<Map<String, String>> getUsers() {
		return users;
	}

	public void setUsers(List<Map<String, String>> users) {
		this.users = users;
	}

	public List<Integer> getPartys() {
		return partys;
	}

	public void setPartys(List<Integer> partys) {
		this.partys = partys;
	}

}
