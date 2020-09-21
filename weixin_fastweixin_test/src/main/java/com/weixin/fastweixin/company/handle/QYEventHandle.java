package com.weixin.fastweixin.company.handle;

import com.weixin.fastweixin.company.message.req.QYBaseEvent;
import com.weixin.fastweixin.company.message.resp.QYBaseRespMsg;

/**
 * 微信企业号事件处理器接口
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public interface QYEventHandle<E extends QYBaseEvent> {

	/**
	 * 处理微信事件
	 *
	 * @param event 微信事件
	 * @return 回复用户的消息
	 */
	QYBaseRespMsg handle(E event);

	/**
	 * 在处理之前，判断本事件是否符合处理的条件
	 *
	 * @param event 事件
	 * @return 是否需要处理
	 */
	boolean beforeHandle(E event);
}
