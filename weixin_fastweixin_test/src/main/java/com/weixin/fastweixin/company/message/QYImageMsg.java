package com.weixin.fastweixin.company.message;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYImageMsg extends QYBaseMsg {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "image")
	private Image image;

	public QYImageMsg() {
		this.setMsgType("image");
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public void setMediaId(String mediaId) {
		this.image = new Image(mediaId);
	}

	public class Image {
		@JSONField(name = "media_id")
		private String mediaId;

		public Image(String mediaId) {
			this.mediaId = mediaId;
		}

		public String getMediaId() {
			return mediaId;
		}

		public void setMediaId(String mediaId) {
			this.mediaId = mediaId;
		}
	}
}
