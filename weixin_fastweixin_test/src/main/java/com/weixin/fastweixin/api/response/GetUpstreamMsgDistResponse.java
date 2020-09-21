package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UpstreamMsgDist;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUpstreamMsgDistResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UpstreamMsgDist> list;

	public List<UpstreamMsgDist> getList() {
		return list;
	}

	public void setList(List<UpstreamMsgDist> list) {
		this.list = list;
	}

}
