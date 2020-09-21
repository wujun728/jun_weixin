package com.wasoft.websocket.chat.thread;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import com.wasoft.jmx.EnvironmentAgent;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.ChatContainerFactory;
import com.wasoft.websocket.chat.cluster.ClusterManager;
import com.wasoft.websocket.util.HttpProxy;
import com.wasoft.websocket.util.Tool;
import com.wasoft.websocket.ws.StartService;

public class ThreadListener implements ServletContextListener{
	private ServletContext context = null; 

	@Override
	public void contextInitialized(ServletContextEvent event){
		
		Tool.log("ThreadListener init...");
		this.context = event.getServletContext();		
		new Constants().init();
		SaveMsg.init();
		//HttpProxy.startProxy();
		
		//new EnvironmentAgent();//JMX
		//StartService.init();//WebService
		//new ClusterThread().start();
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent event){
		Tool.log("ThreadListener destroyed...");
        this.context = null; 
        ChatContainerFactory.getChatContainer().destroyCmis();
		SaveMsg.dumpMsg();
	}
	
	class ClusterThread extends Thread
	{	
		public void run(){
			try{Thread.sleep(10*1000);}catch(Exception e){e.printStackTrace();}
			ClusterManager.getInstance().send("start");
		}
	}

}
