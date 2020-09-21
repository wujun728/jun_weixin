package com.weixin.fastweixin.message;

import com.weixin.fastweixin.message.util.MessageBuilder;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class VideoMsg extends BaseMsg {
	private static final long serialVersionUID = 1L;

	private String mediaId;
	private String title;
	private String description;

	public VideoMsg(String mediaId) {
		this.mediaId = mediaId;
	}

	public VideoMsg(String mediaId, String title, String description) {
		this.mediaId = mediaId;
		this.title = title;
		this.description = description;
	}

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

	@Override
	public String toXml() {
		MessageBuilder mb = new MessageBuilder(super.toXml());
		mb.addData("MsgType", RespType.VIDEO);
		mb.append("<Video>\n");
		mb.addData("MediaId", mediaId);
		mb.addData("Title", title);
		mb.addData("Description", description);
		mb.append("</Video>\n");
		mb.surroundWith("xml");
		return mb.toString();
	}
}
