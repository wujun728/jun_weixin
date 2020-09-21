package com.weixin.fastweixin.handle;

import com.weixin.fastweixin.message.BaseMsg;
import com.weixin.fastweixin.message.req.BaseReqMsg;

/**
 * 微信消息处理器接口
 * 
 * @author 	Lian
 * @date	2016年4月11日
 * @since	1.0	
 */
public interface MessageHandle<M extends BaseReqMsg> {

	/**
	 * 处理微信消息
	 *
	 * @param message	微信消息
	 * @return			回复用户的消息
	 */
	BaseMsg handle(M message);

	/**
	 * 在处理之前, 判断本条消息是否符合处理的条件
	 *
	 * @param message
	 * @return
	 */
	boolean beforeHandle(M message);
}
