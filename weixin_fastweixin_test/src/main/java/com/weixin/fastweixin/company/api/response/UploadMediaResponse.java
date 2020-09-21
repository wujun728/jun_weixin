package com.weixin.fastweixin.company.api.response;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class UploadMediaResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "type")
	private String type;
	@JSONField(name = "media_id")
	private String mediaId;
	@JSONField(name = "created_at")
	private String createTime;

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

	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
}
