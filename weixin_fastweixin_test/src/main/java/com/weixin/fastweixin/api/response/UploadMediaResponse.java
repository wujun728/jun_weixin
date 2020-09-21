package com.weixin.fastweixin.api.response;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class UploadMediaResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private String type;
	@JSONField(name = "media_id")
	private String mediaId;
	@JSONField(name = "created_at")
	private Date createdAt;

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMediaId() {
		return mediaId;
	}

	public void setMediaId(String mediaId) {
		this.mediaId = mediaId;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

}
