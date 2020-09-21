package com.weixin.fastweixin.api.response;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.entity.CustomAccount;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetCustomAccountsResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "kf_list")
	private List<CustomAccount> customAccountList;

	public List<CustomAccount> getCustomAccountList() {
		return customAccountList;
	}

	public void setCustomAccountList(List<CustomAccount> customAccountList) {
		this.customAccountList = customAccountList;
	}

}
