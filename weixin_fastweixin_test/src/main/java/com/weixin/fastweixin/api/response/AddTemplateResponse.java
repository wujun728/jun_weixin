package com.weixin.fastweixin.api.response;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 添加模版响应
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class AddTemplateResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	/**
	 * 模版id
	 */
	@JSONField(name = "template_id")
	private String templateId;

	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

}
