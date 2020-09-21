package com.weixin.fastweixin.message;

/**
 * 提交至微信的图文消息素材
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class MpNewsMsg extends BaseMsg {

	private static final long serialVersionUID = 1L;

	private String mediaId;

	public MpNewsMsg() {
	}

	public MpNewsMsg(String mediaId) {
		this.mediaId = mediaId;
	}

	public String getMediaId() {
		return mediaId;
	}

	public void setMediaId(String mediaId) {
		this.mediaId = mediaId;
	}

}
