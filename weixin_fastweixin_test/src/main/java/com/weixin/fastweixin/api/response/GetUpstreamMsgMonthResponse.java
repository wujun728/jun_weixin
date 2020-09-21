package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UpstreamMsgMonth;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUpstreamMsgMonthResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UpstreamMsgMonth> list;

	public List<UpstreamMsgMonth> getList() {
		return list;
	}

	public void setList(List<UpstreamMsgMonth> list) {
		this.list = list;
	}

}
