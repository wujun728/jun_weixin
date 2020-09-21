package com.weixin.fastweixin.message;

import java.io.Serializable;

import com.weixin.fastweixin.message.util.MessageBuilder;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月11日
 * @since	1.0	
 */
public class BaseMsg implements Serializable {

	private static final long serialVersionUID = 3986681941851684519L;

	private String toUserName;
	private String fromUserName;
	private long createTime;
	private String msgType;

	public BaseMsg() {
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

	public long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(long createTime) {
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
		builder.addTag("CreateTime", String.valueOf(System.currentTimeMillis()).substring(0, 10));
		return builder.toString();
	}

	@Override
	public String toString() {
		return toXml();
	}

}
