package com.weixin.fastweixin.company.message.resp;

import com.weixin.fastweixin.message.RespType;
import com.weixin.fastweixin.message.util.MessageBuilder;

/**
 * 微信企业号被动响应文本消息
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYTextRespMsg extends QYBaseRespMsg {

	private static final long serialVersionUID = 1L;

	private StringBuilder contentBuilder;

	public QYTextRespMsg() {
		contentBuilder = new StringBuilder();
	}

	public QYTextRespMsg(String content) {
		setContentBuilder(content);
	}

	public StringBuilder getContentBuilder() {
		return contentBuilder;
	}

	public void setContentBuilder(String content) {
		this.contentBuilder = new StringBuilder(content);
	}

	public QYTextRespMsg add(String text) {
		contentBuilder.append(text);
		return this;
	}

	public QYTextRespMsg addln() {
		return add("\n");
	}

	public QYTextRespMsg addln(String text) {
		contentBuilder.append(text);
		return addln();
	}

	public QYTextRespMsg addLink(String text, String url) {
		contentBuilder.append("<a href=\"").append(url).append("\">").append(text).append("</a>");
		return this;
	}

	@Override
	public String toXml() {
		MessageBuilder mb = new MessageBuilder(super.toXml());
		mb.addData("Content", contentBuilder.toString().trim());
		mb.addData("MsgType", RespType.TEXT);
		return mb.toString();
	}
}
