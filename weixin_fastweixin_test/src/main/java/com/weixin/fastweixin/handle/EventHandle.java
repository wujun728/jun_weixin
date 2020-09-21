package com.weixin.fastweixin.handle;

import com.weixin.fastweixin.message.BaseMsg;
import com.weixin.fastweixin.message.req.BaseEvent;

/**
 * 微信事件处理接口
 * 
 * @author 	Lian
 * @date	2016年4月11日
 * @since	1.0	
 */
public interface EventHandle<E extends BaseEvent> {

	/**
	 * 处理微信事件
	 *
	 * @param event	微信事件
	 * @return		回复用户的消息
	 */
	BaseMsg handle(E event);

	/**
	 * 在处理之前, 判断事件是否符合处理的条件
	 *
	 * @param event	事件
	 * @return		是否需要处理
	 */
	boolean beforeHandle(E event);
}
