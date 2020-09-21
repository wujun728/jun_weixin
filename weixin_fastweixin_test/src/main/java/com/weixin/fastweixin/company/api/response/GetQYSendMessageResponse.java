package com.weixin.fastweixin.company.api.response;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetQYSendMessageResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "invaliduser")
	private String invalidUser;
	@JSONField(name = "invalidParty")
	private String invalidParty;
	@JSONField(name = "invalidtag")
	private String invalidTag;

	public String getInvalidUser() {
		return invalidUser;
	}

	public void setInvalidUser(String invalidUser) {
		this.invalidUser = invalidUser;
	}

	public String getInvalidParty() {
		return invalidParty;
	}

	public void setInvalidParty(String invalidParty) {
		this.invalidParty = invalidParty;
	}

	public String getInvalidTag() {
		return invalidTag;
	}

	public void setInvalidTag(String invalidTag) {
		this.invalidTag = invalidTag;
	}

}
