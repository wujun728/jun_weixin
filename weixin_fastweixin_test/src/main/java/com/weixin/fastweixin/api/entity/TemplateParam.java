package com.weixin.fastweixin.api.entity;

/**
 * 模版参数
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class TemplateParam extends BaseModel {

	private static final long serialVersionUID = 1L;

	/**
	 * 值
	 */
	private String value;
	/**
	 * 颜色
	 */
	private String color;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

}
