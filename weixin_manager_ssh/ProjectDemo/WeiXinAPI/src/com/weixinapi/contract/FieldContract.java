package com.weixinapi.contract;

import java.text.SimpleDateFormat;

public class FieldContract {
	public static final String MSG_TYPE_TEXT = "text";
	public static final String MSG_TYPE_IMAGE = "image";
	public static final String MSG_TYPE_MUSIC = "music";
	public static final String MSG_TYPE_LOCATION = "location";
	public static final String MSG_TYPE_LINK = "link";
	//public static final String MSG_TYPE_IMAGE_TEXT = "news";
	//public static final String MSG_TYPE_EVENT = "event";
	public static final String MSG_TYPE_VOICE = "voice";
	public static final String MSG_TYPE_VIDEO = "video";
	
	public static final String ROOT = "xml";
	public static final String TO_USER_NAME = "ToUserName";
	public static final String FROM_USER_NAME = "FromUserName";
	public static final String CREATE_TIME = "CreateTime";
	public static final String MSG_TYPE = "MsgType";
	public static final String MSG_ID = "MsgId";
	public static final String CONTENT = "Content";
	public static final String FUNC_FLAG = "FuncFlag";
	public static final String PIC_URL = "PicUrl";
	public static final String TITLE = "Title";
	public static final String DESCRITION = "Description";
	public static final String URL = "Url";
	public static final String MUSIC_URL = "MusicUrl";
	public static final String HQ_MUSIC_URL = "HQMusicUrl";
	public static final String MUSIC = "Music";
	public static final String EVENT = "Event";
	public static final String EVENT_KEY = "EventKey";
	public static final String TICKET = "Ticket";
	public static final String LATITUDE = "Latitude";
	public static final String LONGITUDE = "Longitude";
	public static final String PRECISION = "Precision";
	public static final String LOCATION_X = "Location_X";
	public static final String LOCATION_Y = "Location_Y";
	public static final String SCALE = "Scale";
	public static final String LABEL = "Label";
	public static final String ARTICLE_COUNT = "ArticleCount";
	public static final String ARTICLES = "Articles";
	public static final String ITEM = "item";
	public static final String MEDIA_ID = "MediaId";
	public static final String FORMAT = "Format";
	public static final String RECOGNITION = "Recognition";
	public static final String THUMBMEDIA_ID = "ThumbMediaId";
	public static final String IMAGE = "Image";
	public static final String VOICE = "Voice";
	public static final String VIDEO = "Video";
	
	public static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyyMMdd");
	//GET 获取ACCESS_TOKEN
	public static final String ACCESS_TOKEN_URL="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s";
	//POST 创建自定义菜单
	public static final String MENU_CREATE_URL="https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s";
	//GET 查询已创建的自定义菜单
	public static final String MENU_GET_URL="https://api.weixin.qq.com/cgi-bin/menu/get?access_token=%s";
	//GET 删除自定义菜单
	public static final String MENU_DELETE_URL="https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s";
	
}
