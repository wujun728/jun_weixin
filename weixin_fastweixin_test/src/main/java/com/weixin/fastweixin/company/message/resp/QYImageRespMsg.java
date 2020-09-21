package com.weixin.fastweixin.company.message.resp;

import com.weixin.fastweixin.message.RespType;
import com.weixin.fastweixin.message.util.MessageBuilder;

/**
 * 微信企业号被动响应图片消息
 * @attention: 这个好像没用到
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYImageRespMsg extends QYBaseRespMsg {

	private static final long serialVersionUID = 1L;

	private String mediaId;

	public QYImageRespMsg() {
	}

	public QYImageRespMsg(String mediaId) {
		this.mediaId = mediaId;
	}

	public String getMediaId() {
		return mediaId;
	}

	public void setMediaId(String mediaId) {
		this.mediaId = mediaId;
	}

	@Override
	public String toXml() {
		MessageBuilder mb = new MessageBuilder(super.toXml());
		mb.addData("MsgType", RespType.IMAGE);
		mb.append("<Image>\n");
		mb.addData("MediaId", mediaId);
		mb.append("</Image>\n");
		mb.surroundWith("xml");
		return mb.toString();
	}
}
