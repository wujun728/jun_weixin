package com.weixin.fastweixin.company.api.response;

import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * Response -- 创建新标签
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class CreateTagResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private Integer tagid;

	public Integer getTagid() {
		return tagid;
	}

	public void setTagid(Integer tagid) {
		this.tagid = tagid;
	}

}
