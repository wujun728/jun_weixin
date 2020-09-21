package com.weixin.fastweixin.api.response;

import java.util.List;

import com.weixin.fastweixin.api.entity.ArticleTotal;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetArticleTotalResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private List<ArticleTotal> list;

	public List<ArticleTotal> getList() {
		return list;
	}

	public void setList(List<ArticleTotal> list) {
		this.list = list;
	}
}
