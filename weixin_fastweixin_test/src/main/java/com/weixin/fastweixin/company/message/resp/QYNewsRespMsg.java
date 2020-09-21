package com.weixin.fastweixin.company.message.resp;

import java.util.ArrayList;
import java.util.List;

import com.weixin.fastweixin.company.message.QYArticle;
import com.weixin.fastweixin.message.Article;
import com.weixin.fastweixin.message.RespType;
import com.weixin.fastweixin.message.util.MessageBuilder;

/**
 * 微信企业号被动响应事件新闻消息
 * @attention: 这个好像没用到
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYNewsRespMsg extends QYBaseRespMsg {

	private static final long serialVersionUID = 1L;

	private static final int WX_MAX_SIZE = 10;
	private int maxSize = WX_MAX_SIZE;

	private List<QYArticle> articles;

	public QYNewsRespMsg() {
		articles = new ArrayList<QYArticle>(maxSize);
	}

	public QYNewsRespMsg(int maxSize) {
		setMaxSize(maxSize);
		articles = new ArrayList<QYArticle>(maxSize);
	}

	public QYNewsRespMsg(List<QYArticle> articles) {
		this.articles = articles;
	}

	public int getMaxSize() {
		return maxSize;
	}

	public void setMaxSize(int maxSize) {
		if (maxSize < WX_MAX_SIZE && maxSize >= 1) {
			this.maxSize = maxSize;
		}
		if (articles != null && articles.size() > this.maxSize) {
			articles = articles.subList(0, this.maxSize);
		}
	}

	public List<QYArticle> getArticles() {
		return articles;
	}

	public void setArticles(List<QYArticle> articles) {
		if (articles.size() > this.maxSize) {
			this.articles = articles.subList(0, this.maxSize);
		} else {
			this.articles = articles;
		}
	}

	public void add(String title) {
		add(title, null, null, null);
	}

	public void add(String title, String url) {
		add(title, null, null, url);
	}

	public void add(String title, String picUrl, String url) {
		add(title, null, picUrl, url);
	}

	public void add(String title, String description, String picUrl, String url) {
		add(new QYArticle(title, description, picUrl, url));
	}

	public void add(QYArticle article) {
		if (this.articles.size() < maxSize) {
			this.articles.add(article);
		}
	}

	@Override
	public String toXml() {
		MessageBuilder mb = new MessageBuilder(super.toXml());
		mb.addData("MsgType", RespType.NEWS);
		mb.addTag("ArticleCount", String.valueOf(articles.size()));
		mb.append("<Articles>\n");
		for (Article article : articles) {
			mb.append(article.toXml());
		}
		mb.append("</Articles>\n");
		mb.surroundWith("xml");
		return mb.toString();
	}
}
