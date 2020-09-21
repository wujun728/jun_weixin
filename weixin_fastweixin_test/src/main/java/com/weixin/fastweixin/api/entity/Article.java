package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 群发图文信息时Article实体
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class Article extends BaseModel {

	private static final long serialVersionUID = 1L;

	public static final class ShowConverPic {
		public static final Integer YES = 1;// 显式封面
		public static final Integer NO = 0;// 不显式封面
	}

	@JSONField(name = "thumb_media_id")
	private String thumbMediaId;
	private String author;
	private String title;
	@JSONField(name = "content_source_url")
	private String contentSourceUrl;
	private String content;
	private String digest;
	@JSONField(name = "show_cover_pic")
	private Integer showConverPic = ShowConverPic.YES;

	public Article() {

	}

	public Article(String thumbMediaId, String author, String title, String contentSourceUrl, String content, String digest, Integer showConverPic) {
		this.thumbMediaId = thumbMediaId;
		this.author = author;
		this.title = title;
		this.contentSourceUrl = contentSourceUrl;
		this.content = content;
		this.digest = digest;
		this.showConverPic = showConverPic;
	}

	public String getThumbMediaId() {
		return thumbMediaId;
	}

	public void setThumbMediaId(String thumbMediaId) {
		this.thumbMediaId = thumbMediaId;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContentSourceUrl() {
		return contentSourceUrl;
	}

	public void setContentSourceUrl(String contentSourceUrl) {
		this.contentSourceUrl = contentSourceUrl;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDigest() {
		return digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

	public Integer getShowConverPic() {
		return showConverPic;
	}

	public void setShowConverPic(Integer showConverPic) {
		this.showConverPic = showConverPic;
	}

}
