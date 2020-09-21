package com.weixin.fastweixin.company.message;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYVideoMsg extends QYBaseMsg {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "video")
	private Video video;

	public Video getVideo() {
		return video;
	}

	public void setVideo(Video video) {
		this.video = video;
	}

	public class Video {
		@JSONField(name = "media_id")
		private String mediaId;
		@JSONField(name = "title")
		private String title;
		@JSONField(name = "description")
		private String description;

		public String getMediaId() {
			return mediaId;
		}

		public void setMediaId(String mediaId) {
			this.mediaId = mediaId;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}
	}
}
