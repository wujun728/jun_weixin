package com.weixin.fastweixin.company.api.response;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;
import com.weixin.fastweixin.company.api.entity.QYAgent;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetQYAgentListResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "agentlist")
	public List<QYAgent> agentList;

	public List<QYAgent> getAgentList() {
		return agentList;
	}

	public void setAgentList(List<QYAgent> agentList) {
		this.agentList = agentList;
	}

}
