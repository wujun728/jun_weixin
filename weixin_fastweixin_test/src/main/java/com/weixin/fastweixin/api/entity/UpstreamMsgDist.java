package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class UpstreamMsgDist extends BaseDataCube {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "count_interval")
	private Integer countInterval;
	@JSONField(name = "msg_user")
	private Integer msgUser;

	public Integer getCountInterval() {
		return countInterval;
	}

	public void setCountInterval(Integer countInterval) {
		this.countInterval = countInterval;
	}

	public Integer getMsgUser() {
		return msgUser;
	}

	public void setMsgUser(Integer msgUser) {
		this.msgUser = msgUser;
	}
}
