package com.wasoft.websocket.ws;

import javax.xml.ws.Endpoint;

import com.wasoft.websocket.Constants;
import com.wasoft.websocket.util.Tool;

public class StartService {	

	private static final String server = "0.0.0.0";
	private static Endpoint endpointIM;
	
	public static void init(){
		start();
	}
	
	public static void start() {
		if (Constants.isWebService) {
			create_endpoint();
			configure_endpoint();
			publish();
		}
	}

	public static void main(String[] args) {
		init();
	}	

	private static void create_endpoint() {
		//Thread.sleep(10*1000);
		Tool.log("");
		Tool.log("启动WEB数据服务 ...");
		endpointIM = Endpoint.create(new IMService());
	}

	private static void configure_endpoint() {
		endpointIM.setExecutor(new WsThreadPool());
	}

	private static void publish() 
	{
		try {
			String url = "http://" + server + ":" + Constants.WS_PORT;
			url += "/IMService";
			endpointIM.publish(url);
			Tool.log(url + " 发布成功");

			Tool.log("WEB数据服务启动成功，监听端口：[" + Constants.WS_PORT + "]");
		} 
		catch (Exception e) 
		{
			Tool.err("WEB数据服务启动失败：" + e.getMessage());
		}
	}
}
