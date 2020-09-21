package com.weixin.fastweixin.company.message.resp;

import java.io.Serializable;

import com.weixin.fastweixin.message.util.MessageBuilder;

/**
 * 微信企业号被动响应消息基类
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYBaseRespMsg implements Serializable {

	private static final long serialVersionUID = 1L;

	private String toUserName;
	private String fromUserName;
	private int createTime;
	private String msgType;

	public QYBaseRespMsg() {
	}

	public String getToUserName() {
		return toUserName;
	}

	public void setToUserName(String toUserName) {
		this.toUserName = toUserName;
	}

	public String getFromUserName() {
		return fromUserName;
	}

	public void setFromUserName(String fromUserName) {
		this.fromUserName = fromUserName;
	}

	public int getCreateTime() {
		return createTime;
	}

	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}

	public String getMsgType() {
		return msgType;
	}

	public void setMsgType(String msgType) {
		this.msgType = msgType;
	}

	public String toXml() {
		// 159 = 106 + 28(ToUserName) + 15(FromUserName) + 10(CreateTime)
		MessageBuilder builder = new MessageBuilder(159);
		builder.addData("ToUserName", getToUserName());
		builder.addData("FromUserName", getFromUserName());
		builder.addData("CreateTime", String.valueOf(System.currentTimeMillis() / 1000));
		return builder.toString();
	}

	@Override
	public String toString() {
		return toXml();
	}

}
