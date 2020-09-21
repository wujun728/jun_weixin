package com.weixin.fastweixin.message.req;

/**
 * 微信请求基类
 * 
 * @author 	Lian
 * @date	2016年4月11日
 * @since	1.0	
 */
public class BaseReq {
	/**
	 * 变量不使用任何访问修饰符, 通常称为'默认访问模式'.
	 * 在该模式下, 只允许在同一个包中进行访问
	 */

	String toUserName;
	String fromUserName;
	long createTime;
	String msgType;

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

}
