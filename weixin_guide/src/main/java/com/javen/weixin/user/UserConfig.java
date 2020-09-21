package com.javen.weixin.user;
/**
 * @author Javen
 * 2016年5月22日
 */
public class UserConfig {
	private String openid;
	private String lang;
	/**
	 * 国家地区语言版本，zh_CN 简体，zh_TW 繁体，en 英语，默认为zh-CN
	 */
	public enum LangType {
		zh_CN, zh_TW ,en
	}
	
	public String getOpenid() {
		return openid;
	}
	public void setOpenid(String openid) {
		this.openid = openid;
	}
	public String getLang() {
		return lang;
	}
	public void setLang(LangType langType ) {
		this.lang = langType.name();
	}
	
	
	
}
