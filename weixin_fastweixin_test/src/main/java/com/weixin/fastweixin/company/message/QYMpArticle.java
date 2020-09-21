package com.weixin.fastweixin.company.message;

import com.weixin.fastweixin.api.entity.Article;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYMpArticle extends Article {

	private static final long serialVersionUID = 1L;

	public QYMpArticle(String thumbMediaId, String author, String title, String contentSourceUrl, String content, String digest,
			Integer showConverPic) {
		super(thumbMediaId, author, title, contentSourceUrl, content, digest, showConverPic);
	}
}
