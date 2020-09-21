package com.weixin.fastweixin.api.entity;

import java.util.Map;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 模版消息
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class TemplateMsg extends BaseModel {

	private static final long serialVersionUID = 1L;

	private String touser;
	@JSONField(name = "template_id")
	private String templateId;
	private String url;
	private String topcolor;

	private Map<String, TemplateParam> data;

	public String getTouser() {
		return touser;
	}

	public void setTouser(String touser) {
		this.touser = touser;
	}

	public String getTemplateId() {
		return templateId;
	}

	public void setTemplateId(String templateId) {
		this.templateId = templateId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getTopcolor() {
		return topcolor;
	}

	public void setTopcolor(String topcolor) {
		this.topcolor = topcolor;
	}

	public Map<String, TemplateParam> getData() {
		return data;
	}

	public void setData(Map<String, TemplateParam> data) {
		this.data = data;
	}

}
