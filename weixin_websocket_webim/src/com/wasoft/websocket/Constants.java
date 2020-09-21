package com.wasoft.websocket;

import java.io.InputStream;
import java.util.HashMap;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

import com.wasoft.websocket.chat.ChatContainerFactory;
import com.wasoft.websocket.util.Tool;

/*
 * 20121205 实现群聊
 * 20121218 实现个聊
 * 20121219 增加桌面提醒
 * 20121220 增加提示音，实现点对点单播
 * 20121228 进行离线用户判断，并提示离线回复；增加本地存储聊天信息功能
 * 20130107 增加未送达信息保存处理，增加创建工作组功能
 * 20130114 工作组创建、解散、用户增加、删除、对话功能
 * 20130115 增加所有人弹屏信息，工作组人员统计
 * 20130117 非工作组创建者不允许增加用户
 */

public class Constants {
	public static final String Package = "com.wasoft.websocket";
	public static final String paramFile = "im-params.xml";
	public static final long proxyId = 20130115;			//无特殊意义
	
	public static boolean isLog = true;				//是否打印日志
	public static int MAX_MESSAGE_LENGTH = 64;			//用于打印到后台的消息长度
	public static int MIN_DURATION = 10;				//最小时长记入在线，单位秒	
	public static boolean isSaveLogin = false;		//是否存储登录信息
	public static boolean isWebService = true;		//是否启用WS
	public static int WS_PORT = 10035;					//WS服务端口	
	public static String DOWNLOADDIR = "/download/";	//下载目录
	
	public static String sms_url = "http://ip:port/ema/services/SmsOperator";//短信WS地址
	public static String sms_user = "1117";//短信用户
	public static String sms_pass = "202cb962ac59075b964b07152d234b70";//短信密码
	
	public static String mail_server = "";
	public static boolean mail_auth = false;
	public static String mail_user = "admin";
	public static String mail_pass = "admin";
	public static String mail_sys_user = "admin@atwasoft.net";
	
	public static String API_HTML = "";
	
	public static boolean isHttpProxy = false;
	public static int proxyPort = 8000;
	
	public static int JmxHtmlPort = 9092;
	public static String websocket = ChatContainerFactory.WS_IMPL_TC7;
	
	public static boolean isCRM = false;
	public static boolean Started = false;
	
	private static HashMap<String, Integer> TYPE = null;
	private static HashMap<String, String> CMD = null;
	
	private static HashMap<String, Integer> getType(){
		if(TYPE == null){
			TYPE = new HashMap<String, Integer>();
			TYPE.put("TALK", 0);
	        TYPE.put("CMD",  1);
	        TYPE.put("GROUP",2);
		}		
        return TYPE;
	}
	
	private static HashMap<String, String> getCmd(){
		if(CMD == null){
			CMD = new HashMap<String, String>();
			CMD.put("REFRESH_USER_LIST", 	"0");
	        CMD.put("CREATE_WORKGROUP", 	"1");
	        CMD.put("DESTROY_WORKGROUP", 	"2");
	        CMD.put("ADD_WORKGROUP_USER", 	"3");
	        CMD.put("DEL_WORKGROUP_USER", 	"4");
	        CMD.put("REFRESH_GROUP_USER", 	"5");
	        CMD.put("SYSTEM_USER_LOGIN",   	"6");
	        CMD.put("SYSTEM_USER_LOGOUT",   "7");
	        CMD.put("EXIT_WORKGROUP",   	"8");
	        CMD.put("SMS_GET_PHONE",   		"9");
	        CMD.put("SMS_SEND_MSG",   		"10");
	        CMD.put("OPEN_USER_WIN",   		"11");
	        CMD.put("SYSTEM_PUSH",   		"12");
	        CMD.put("SYSTEM_USER_STATUS",  	"13");
		}		
        return CMD;
	}

	public static int getType(String t){
		return getType().get(t);
	}
	public static String getCmd(String c){
		return getCmd().get(c);
	}
	
	public void init(){
		Tool.log("Constants init ...");
		initParams();
		initAPI();
	}
	private boolean initParams(){
		Tool.log(" ===================================================== ");
		try{
			JAXBContext context = JAXBContext.newInstance(Params.class);			
			InputStream is = null;
		
			try{				
				is = this.getClass().getResourceAsStream("/../" + paramFile);
			}
			catch(Exception e){
				Tool.log("get context paramFile error: " + e.getMessage());
			}
			if(is == null){
				Tool.log("get Resource Stream is null.");
				is = this.getClass().getResourceAsStream("/" + paramFile);
			}
			Unmarshaller um = context.createUnmarshaller();
			Params params = (Params) um.unmarshal(is);
			
			isLog = params.isLog;
			Tool.log("isLog = " + isLog);
			
			MAX_MESSAGE_LENGTH = params.MAX_MESSAGE_LENGTH;
			Tool.log("MAX_MESSAGE_LENGTH = " + MAX_MESSAGE_LENGTH);
			
			MIN_DURATION = params.MIN_DURATION;
			Tool.log("MIN_DURATION = " + MIN_DURATION);
			
			isSaveLogin = params.isSaveLogin;
			Tool.log("isSaveLogin = " + isSaveLogin);
			
			isWebService = params.isWebService;
			Tool.log("isWebService = " + isWebService);
			
			WS_PORT = params.WS_PORT;
			Tool.log("WS_PORT = " + WS_PORT);
			
			sms_url = params.sms_url;
			Tool.log("sms_url = " + sms_url);
			
			sms_user = params.sms_user;
			Tool.log("sms_user = " + sms_user);
			
			sms_pass = params.sms_pass;
			Tool.log("sms_pass = " + sms_pass);
			
			mail_server = params.mail_server;
			Tool.log("mail_server = " + mail_server);
			
			mail_auth = params.mail_auth;
			Tool.log("mail_auth = " + mail_auth);
			
			mail_user = params.mail_user;
			Tool.log("mail_user = " + mail_user);
			
			mail_pass = params.mail_pass;
			Tool.log("mail_pass = " + mail_pass);
			
			mail_sys_user = params.mail_sys_user;
			Tool.log("mail_sys_user = " + mail_sys_user);
			
			isHttpProxy = params.isHttpProxy;
			Tool.log("isHttpProxy = " + isHttpProxy);
			
			proxyPort = params.proxyPort;
			Tool.log("proxyPort = " + proxyPort);
			
			websocket = params.websocket != null ? params.websocket : ChatContainerFactory.WS_IMPL_TC7;
			Tool.log("websocket = " + websocket);
			
			isCRM = params.isCRM;
			Tool.log("isCRM = " + isCRM);
			return true;
		}
		catch(Exception e)
		{
			Tool.err("JAXB error: " + e.getMessage());			
			return false;
		}
		finally{
			Tool.log(" ===================================================== ");
		}
	}
	
	private void initAPI(){
		try{
			Tool.log("init APIHTML...");
			InputStream is = this.getClass().getResourceAsStream("/api.html");
			API_HTML = Tool.InputStream2String(is);
			//Tool.log(API_HTML);
		}
		catch(Exception e){
			Tool.err("init APIHTML error: " + e.getMessage());
		}
	}	
}

@XmlRootElement
class Params{
	@XmlElement
	boolean isLog;
	@XmlElement
	int MAX_MESSAGE_LENGTH;
	@XmlElement
	int MIN_DURATION;
	@XmlElement
	boolean isSaveLogin;
	@XmlElement
	boolean isWebService;
	@XmlElement
	int WS_PORT;
	@XmlElement
	String DOWNLOADDIR;
	@XmlElement
	String sms_url;
	@XmlElement
	String sms_user;
	@XmlElement
	String sms_pass;
	@XmlElement
	String mail_server;
	@XmlElement
	boolean mail_auth;
	@XmlElement
	String mail_user;
	@XmlElement
	String mail_pass;
	@XmlElement
	String mail_sys_user;
	@XmlElement
	boolean isHttpProxy;
	@XmlElement
	int proxyPort;
	@XmlElement
	String websocket;
	@XmlElement
	boolean isCRM;
}
