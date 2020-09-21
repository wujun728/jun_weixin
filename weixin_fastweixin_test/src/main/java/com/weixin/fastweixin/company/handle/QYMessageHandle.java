package com.weixin.fastweixin.company.handle;

import com.weixin.fastweixin.company.message.req.QYBaseReqMsg;
import com.weixin.fastweixin.company.message.resp.QYBaseRespMsg;

/**
 * 微信企业号消息处理器接口
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public interface QYMessageHandle<M extends QYBaseReqMsg> {
	/**
	 * 处理微信消息
	 *
	 * @param message 微信消息
	 * @return 回复用户的消息
	 */
	QYBaseRespMsg handle(M message);

	/**
	 * 在处理之前，判断本条消息是否符合处理的条件
	 *
	 * @param message 消息
	 * @return 是否需要处理
	 */
	boolean beforeHandle(M message);
}
