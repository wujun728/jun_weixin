package com.mhuang.wechat.common.service;

public abstract class EventService {

	/**
	 * 关注
	 * @return
	 */
	public abstract String subscribe(String openId,String appId); 
	
	/**
	 * 关注带事件
	 */
	public abstract String subscribe(String openId,String appId,String eventKey); 
	
	/**
	 * 取消关注 
	 */
	public abstract String unSubscribe(String openId,String appId);
	
	/**
	 * Click事件 
	 */
	public abstract String click(String openId,String appId,String eventKey);
	
	
	/**
	 * view事件 
	 */
	public abstract String view(String openId,String appId,String eventKey);
	
	/**
	 * 扫码事件
	 */
	public abstract String scan(String openId,String appId,String eventKey);
	
	/**
	 * 文本消息 
	 */
	public abstract String textMsg(String openId,String appId,String msg);

	/**
	 * 图片消息
	 */
	public abstract String imageMsg(String openId,String appId);
}
