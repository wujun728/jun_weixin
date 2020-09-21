package com.javen.utils;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.kit.HttpKit;
import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.log.Log;

/**
 * @author Javen
 * 2016年4月3日
 */
public class SMSUtils {
	static Log log = Log.getLog(SMSUtils.class);
	/* 短信配置资源 */
	private static final Prop prop = PropKit.use("sms.properties");
	private final static String SMS_URL="";
	/* 短信配置详情 */
	private static final String SMS_NAME 					= prop.get("name");
	private static final String SMS_PWD 					= prop.get("pwd");
	private static final String SMS_CONTENT_REGISTER_CODE 	= prop.get("content_register_code");
	private static final String SMS_CONTENT_FORGET_CODE 	= prop.get("content_forget_code");
	private static final String CONTENT_REGISTER_NOTIFY 	= prop.get("content_register_notify");
	private static final String CONTENT_ORDER_NOTIFY 	    = prop.get("content_order_notify");
	private static final String SMS_TYPE 					= prop.get("type");
	
	public enum SendSMSType {
		REGISTER,FORGET,ORDER_NOTIFY,REGISTER_NOTIFY
	}
	/**
	 * 发送短信验证码
	 * @param mobile
	 * @param code
	 * @param sendSMSType
	 * @return
	 */
	public static int SMSCode(String mobile,String code,String nickName,String courseName,String uesrMobile,String courseCount,SendSMSType sendSMSType){
		String type = sendSMSType.name().toLowerCase();
		String content="";
		int res_code = -9;
		try {
			Map<String, String> queryParas=new HashMap<String, String>();
			queryParas.put("name", SMS_NAME);
			queryParas.put("pwd", SMS_PWD);
			if (type.equals("register")) {
				content=StringUtils.replace(SMS_CONTENT_REGISTER_CODE,"@", code);
			}else if (type.equals("forget")) {
				content=StringUtils.replace(SMS_CONTENT_FORGET_CODE,"@", code);
			}else if (type.equals("order_notify")) {
				content=StringUtils.replace(CONTENT_ORDER_NOTIFY, "@", nickName,courseName,courseCount);
			}else if (type.equals("register_notify")) {
				content=StringUtils.replace(CONTENT_REGISTER_NOTIFY, "@", nickName,uesrMobile);
			}
			queryParas.put("content", content);
			queryParas.put("mobile", mobile);
			queryParas.put("type", SMS_TYPE);
			String result = HttpKit.post(SMS_URL, queryParas, "");
			log.error("发送短信返回结果："+result);
			res_code = Integer.parseInt(result.split(",")[0]);
		} catch (Exception e) {
			res_code=-10;
			log.error("send sms to "+mobile+" error:"+e.getMessage());
		}
		return res_code;
	}
}
