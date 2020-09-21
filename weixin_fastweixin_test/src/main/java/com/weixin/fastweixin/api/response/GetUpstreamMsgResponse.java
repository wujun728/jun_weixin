package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.UpstreamMsg;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetUpstreamMsgResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<UpstreamMsg> list;

	public List<UpstreamMsg> getList() {
		return list;
	}

	public void setList(List<UpstreamMsg> list) {
		this.list = list;
	}

}
