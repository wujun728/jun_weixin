package com.weixin.fastweixin.message.req;

/**
 * 微信事件类型
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public final class EventType {
	/** 关注 */
	public static final String SUBSCRIBE 		= "subscribe";
	/** 取消关注 */
	public static final String UNSUBSCRIBE 		= "unsubscribe";
	/** 点击推事件 */
	public static final String CLICK 			= "CLICK";
	/** 跳转URL */
	public static final String VIEW 			= "VIEW";
	/**  */
	public static final String LOCATION 		= "LOCATION";
	/**  */
	public static final String SCAN 			= "SCAN";
	/** 扫码推事件 */
	public static final String SCANCODEPUSH 	= "scancode_push";
	/** 扫码推事件且弹出'消息接收中'提示框 */
	public static final String SCANCODEWAITMSG 	= "scancode_waitmsg";
	/** 弹出系统拍照发图 */
	public static final String PICSYSPHOTO 		= "pic_sysphoto";
	/** 弹出拍照或者相册发图 */
	public static final String PICPHOTOORALBUM 	= "pic_photo_or_album";
	/** 弹出微信相册发图器 */
	public static final String PICWEIXIN 		= "pic_weixin";
	/** 弹出地理位置选择器 */
	public static final String LOCATIONSELECT 	= "location_select";
	/**  */
	public static final String TEMPLATESENDJOBFINISH = "TEMPLATESENDJOBFINISH";
	/**  */
	public static final String MASSSENDJOBFINISH = "MASSSENDJOBFINISH";

	private EventType() {
	}
}
