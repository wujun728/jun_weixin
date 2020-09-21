package com.weixin.fastweixin.api.response;

import java.security.acl.Group;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class CreateGroupResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private Group group;

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

}
