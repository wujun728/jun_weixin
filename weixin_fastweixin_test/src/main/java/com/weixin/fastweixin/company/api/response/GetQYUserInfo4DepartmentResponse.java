package com.weixin.fastweixin.company.api.response;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;
import com.weixin.fastweixin.company.api.entity.QYUser;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetQYUserInfo4DepartmentResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "userlist")
	public List<QYUser> userList;

	public List<QYUser> getUserList() {
		return userList;
	}

	public void setUserList(List<QYUser> userList) {
		this.userList = userList;
	}
}
