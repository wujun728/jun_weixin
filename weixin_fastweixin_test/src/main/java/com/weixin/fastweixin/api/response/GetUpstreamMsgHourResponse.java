package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UpstreamMsgHour;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUpstreamMsgHourResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UpstreamMsgHour> list;

	public List<UpstreamMsgHour> getList() {
		return list;
	}

	public void setList(List<UpstreamMsgHour> list) {
		this.list = list;
	}
}
