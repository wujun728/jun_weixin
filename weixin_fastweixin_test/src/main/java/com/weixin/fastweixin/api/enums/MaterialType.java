package com.weixin.fastweixin.api.enums;

/**
 * 素材类型
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public enum MaterialType {
	/**
	 * 图片
	 */
	IMAGE("image"),

	/**
	 * 语音
	 */
	VOICE("voice"),

	/**
	 * 视频
	 */
	VIDEO("video"),

	/**
	 * 图文消息
	 */
	NEWS("news");

	String value;

	MaterialType(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return this.value;
	}
}
