package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UpstreamMsgWeek;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUpstreamMsgWeekResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UpstreamMsgWeek> list;

	public List<UpstreamMsgWeek> getList() {
		return list;
	}

	public void setList(List<UpstreamMsgWeek> list) {
		this.list = list;
	}

}
