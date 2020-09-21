package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.ArticleSummary;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetArticleSummaryResponse extends BaseResponse {
	private List<ArticleSummary> list;

	public List<ArticleSummary> getList() {
		return list;
	}

	public void setList(List<ArticleSummary> list) {
		this.list = list;
	}
}
