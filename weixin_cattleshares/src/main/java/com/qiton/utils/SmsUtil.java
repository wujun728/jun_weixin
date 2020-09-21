package com.qiton.utils;

import java.util.Collections;
import java.util.Map;

import org.apache.commons.collections.map.HashedMap;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.DocumentHelper;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * 
 * 短信网关
 * 
 * @author tr0j4n
 * @since v0.3.5
 * @created 2013-11-2 下午1:44:04
 */
public class SmsUtil {

	private static final Logger log = LoggerFactory.getLogger(SmsUtil.class);
	// 发送参数
	private static Map<String, String> paramTemplate = new HashedMap();

	static {
		//paramTemplate.put("Uid", "wwnice");
		//paramTemplate.put("Key", "b76054eaae8df79e8938");
		paramTemplate.put("action", "send");
		paramTemplate.put("userid", "14770");
		paramTemplate.put("account", "WQ4001");
		paramTemplate.put("password", "WQ4001");
		// 只读
		paramTemplate = Collections.unmodifiableMap(paramTemplate);
	}
	/**
	 * 
	 * TODO 发送短信
	 *
	 * @param phoneNumber  电话号码
	 * @param messageContent 短信内容
	 * @return
	 * @since  v2.0
	 * @author fufei
	 * @created 2015年1月26日 下午4:46:15
	 */
	public static boolean send(String phoneNumber, String messageContent) {
		Map<String, String> params = new HashedMap();
		params.putAll(paramTemplate);
		params.put("mobile", phoneNumber);
		params.put("content", messageContent);
		String queryParamData = "";
		for (String key : params.keySet()) {
			queryParamData = queryParamData + key + "=" + params.get(key) + "&";
		}

		String retText = "";
		try {
			String postUrl = "http://www.duanxin10086.com/sms.aspx";
			retText = WebUtils._doPost(postUrl, "application/x-www-form-urlencoded", queryParamData.getBytes(Constant.UTF_8), 5000, 2000);
			return parse(retText);
//			if (Integer.parseInt(retText) <= 0) {
//				log.error("短信发送失败，返回:{}", retText);
//				return false;
//			}
		} catch (Exception e) {
			log.error("短信发送出现错误，返回:" + retText + "  错误信息:" + e.getMessage(), e);
			return false;
		}
		//return true;
	}
	/**
	 * 解析返回的XML结果
	 * @param content 返回的XML
	 * @return
	 */
	public static boolean parse(String retText){
		Document doc = null;

        try {
            // 读取并解析XML文档

            // SAXReader就是一个管道，用一个流的方式，把xml文件读出来

            // SAXReader reader = new SAXReader(); //User.hbm.xml表示你要解析的xml文档

            // Document document = reader.read(new File("User.hbm.xml"));

            // 下面的是通过解析xml字符串的
        	

				doc = DocumentHelper.parseText(retText);
				String status = doc.getRootElement().elementText("returnstatus");
				if(status.equals("Success")){
					return true;
				}
			} catch (DocumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} // 将字符串转为XML
		return false;
	}
	
	public static void main(String[] args) {
		 send("18159801187", "11rfwerf");
	}

}
