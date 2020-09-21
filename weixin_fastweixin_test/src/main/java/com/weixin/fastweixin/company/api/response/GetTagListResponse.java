package com.weixin.fastweixin.company.api.response;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;
import com.weixin.fastweixin.company.api.entity.QYTag;

/**
 * Response -- 获取标签列表
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetTagListResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "taglist")
	private List<QYTag> tags;

	public List<QYTag> getTags() {
		return tags;
	}

	public void setTags(List<QYTag> tags) {
		this.tags = tags;
	}
}
