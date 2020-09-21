package com.mhuang.wechat.common.service;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import com.mhuang.wechat.common.consts.WechatConsts;

/**
 * 
 * @Package: com.mhuang.wechat.common.service
 * @Description 微信核心服务（使用请继承）
 * @author huang.miao
 * @date 2016年12月22日 下午3:31:33  
 * @since 1.0.0
 * @group skiper-opensource
 */
public abstract class CoreService extends EventService{

	public static final String WECHAT_SUBSCRIBE = "1";
	public static final String WECHAT_UNSUBSCRIBE = "2";
	
	private static final String VOICE_MSG = "voice";
	private static final String VIDEO_MSG = "video";
	private static final String SHORT_VIDEO_MSG = "shiroVideo";
	private static final String LOCATION_MSG = "location";
	private static final String LINK_MSG = "link";
	
	/**
	 * 微信事件监听统一管理方法
	 * @return
	 */
	public String manager(Map<String,String> wechatParamsMap) throws Exception{
		String msgType = wechatParamsMap.get("MsgType");
		switch(msgType){
			case "event": //事件推送
				return event(wechatParamsMap);
			default: //非事件
				return other(wechatParamsMap);
		}
	}
	private String event(Map<String, String> map){
		String openId = map.get("FromUserName"),
			eventType = map.get("Event"),
			appId = map.get("ToUserName"),
			eventKey  = map.get("EventKey");
		switch (eventType) {
			case "subscribe"://订阅
			    if(StringUtils.isEmpty(eventKey)){
			        return subscribe(openId,appId);
			    }else{
			        return subscribe(openId, appId,eventKey);
			    }
			case "unsubscribe"://取消订阅
				return unSubscribe(openId,appId);
			case "CLICK"://点击菜单拉取消息时的事件推送
				return click(openId,appId,eventKey);
			case "VIEW"://用户点击view页面
				return view(openId,appId,eventKey);
			case "SCAN":
				return scan(openId,appId,eventKey);
		}
		return null;
	}
	
	private String other(Map<String, String> map){
		String msgType = map.get("MsgType"),
			appId = map.get("ToUserName"),
			openId = map.get("FromUserName");
		switch(msgType){
			case WechatConsts.TEXT:
				return textMsg(openId, appId, map.get("Content"));
			case WechatConsts.IMAGE:
				return imageMsg(openId, appId);
			case VOICE_MSG:
			case VIDEO_MSG:
			case SHORT_VIDEO_MSG:
			case LOCATION_MSG:
			case LINK_MSG:
		}
		return null;
	}
}
