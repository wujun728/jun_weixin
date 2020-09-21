package com.wasoft.websocket.ws;

import javax.jws.WebMethod;
import javax.jws.WebResult;
import com.wasoft.websocket.util.Tool;

public class BaseService {
	
	/**
	 * 返回基础服务的版本号
	 */
	@WebMethod
	@WebResult(partName = "version")
	public String getVer() {
		Tool.log("返回版本号");
		return "wasoft BaseWebService ver 1.0"; 
	}

	/**
	 * 返回服务器时间
	 * @return
	 */
	@WebMethod	
	public String getCurrentTime(){
		Tool.log("返回系统时间");
		return Tool.getDateTime();
	}
	
}
