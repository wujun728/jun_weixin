package com.weixin.fastweixin.company.message;

import com.weixin.fastweixin.message.Article;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYArticle extends Article {

	private String picurl;

	public QYArticle(String title, String description, String picUrl, String url) {
		super(title, description, null, url);
		this.picurl = picUrl;
	}

	public String getPicurl() {
		return picurl;
	}

	public void setPicurl(String picurl) {
		this.picurl = picurl;
	}
}
