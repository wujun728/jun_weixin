package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UpstreamMsgDistMonth;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUpstreamMsgDistMonthResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UpstreamMsgDistMonth> list;

	public List<UpstreamMsgDistMonth> getList() {
		return list;
	}

	public void setList(List<UpstreamMsgDistMonth> list) {
		this.list = list;
	}

}
