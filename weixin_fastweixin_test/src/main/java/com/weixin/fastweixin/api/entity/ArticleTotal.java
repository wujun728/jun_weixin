package com.weixin.fastweixin.api.entity;

import java.util.List;

/**
 * 文群发总数据
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class ArticleTotal extends BaseDataCube {

	private static final long serialVersionUID = 1L;

	private String 						msgid;
	private String 						title;
	private List<ArticleTotalDetail> 	details;

	public String getMsgid() {
		return msgid;
	}

	public void setMsgid(String msgid) {
		this.msgid = msgid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<ArticleTotalDetail> getDetails() {
		return details;
	}

	public void setDetails(List<ArticleTotalDetail> details) {
		this.details = details;
	}
}
