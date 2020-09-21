package com.weixin.fastweixin.company.message.req;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYVideoReqMsg extends QYBaseReqMsg {

	private String mediaId;
	private String thumbMediaId;

	public QYVideoReqMsg(String mediaId, String thumbMediaId) {
		super();
		this.mediaId = mediaId;
		this.thumbMediaId = thumbMediaId;
		setMsgType(QYReqType.VIDEO);
	}

	public String getMediaId() {
		return mediaId;
	}

	public void setMediaId(String mediaId) {
		this.mediaId = mediaId;
	}

	public String getThumbMediaId() {
		return thumbMediaId;
	}

	public void setThumbMediaId(String thumbMediaId) {
		this.thumbMediaId = thumbMediaId;
	}

	@Override
	public String toString() {
		return "QYVideoReqMsg [mediaId=" + mediaId + ", thumbMediaId=" + thumbMediaId + ", toUserName=" + toUserName + ", fromUserName="
				+ fromUserName + ", createTime=" + createTime + ", msgType=" + msgType + ", msgId=" + msgId + ", agentId=" + agentId + "]";
	}
}
