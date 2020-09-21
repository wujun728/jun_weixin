package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class UpstreamMsg extends BaseDataCube {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "msg_type")
	private Integer msgType;
	@JSONField(name = "msg_user")
	private Integer msgUser;
	@JSONField(name = "msg_count")
	private Integer msgCount;

	public Integer getMsgType() {
		return msgType;
	}

	public void setMsgType(Integer msgType) {
		this.msgType = msgType;
	}

	public Integer getMsgUser() {
		return msgUser;
	}

	public void setMsgUser(Integer msgUser) {
		this.msgUser = msgUser;
	}

	public Integer getMsgCount() {
		return msgCount;
	}

	public void setMsgCount(Integer msgCount) {
		this.msgCount = msgCount;
	}

}
