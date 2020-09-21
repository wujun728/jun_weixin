package com.weixin.fastweixin.api.response;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetSendMessageResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "msg_id")
	private String msgId;

	public String getMsgId() {
		return msgId;
	}

	public void setMsgId(String msgId) {
		this.msgId = msgId;
	}
}
