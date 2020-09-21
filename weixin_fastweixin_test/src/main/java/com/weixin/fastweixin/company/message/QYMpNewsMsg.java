package com.weixin.fastweixin.company.message;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYMpNewsMsg extends QYBaseMsg {

	private static final long serialVersionUID = 1L;

	private static final Integer MAX_ARTICLE_COUNT = 10;

	@JSONField(name = "mpnews")
	private Map<String, Object> news;

	public QYMpNewsMsg() {
		news = new HashMap<String, Object>();
	}

	public Map<String, Object> getNews() {
		return news;
	}

	public void setNews(Map<String, Object> news) {
		this.news = news;
	}

	public void setMpArticles(List<QYMpArticle> articles) {
		if (articles.size() > MAX_ARTICLE_COUNT) {
			articles = articles.subList(0, MAX_ARTICLE_COUNT);
		}
		news.put("articles", articles);
	}
}
