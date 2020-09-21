/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.msg;

import com.jfinal.wxaapp.msg.bean.WxaImageMsg;
import com.jfinal.wxaapp.msg.bean.WxaMsg;
import com.jfinal.wxaapp.msg.bean.WxaTextMsg;
import com.jfinal.wxaapp.msg.bean.WxaUserEnterSessionMsg;

/**
 * 用户model转为msg对象
 * @author L.cm
 *
 */
class MsgModelParser {

	private static enum MsgType {
		text, image, event
	}
	
	protected WxaMsg parserMsg(MsgModel msgModel) {
		String msgTypeStr = msgModel.getMsgType().toLowerCase();
		MsgType msgType = MsgType.valueOf(msgTypeStr);
		if (MsgType.text == msgType) {
			return new WxaTextMsg(msgModel);
		}
		if (MsgType.image == msgType) {
			return new WxaImageMsg(msgModel);
		}
		if (MsgType.event == msgType) {
			if ("user_enter_tempsession".equalsIgnoreCase(msgModel.getEvent())) {
				return new WxaUserEnterSessionMsg(msgModel);
			}
		}
		throw new RuntimeException("JFinal-weixin 暂不支持该类型的小程序消息！");
	}

}
