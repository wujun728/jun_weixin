package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.InterfaceSummaryHour;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetInterfaceSummaryHourResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<InterfaceSummaryHour> list;

	public List<InterfaceSummaryHour> getList() {
		return list;
	}

	public void setList(List<InterfaceSummaryHour> list) {
		this.list = list;
	}

}
