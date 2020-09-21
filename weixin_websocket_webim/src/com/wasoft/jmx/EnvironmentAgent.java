package com.wasoft.jmx;

import javax.management.MBeanServer;
import javax.management.MBeanServerFactory;
import javax.management.ObjectName;

import com.sun.jdmk.comm.HtmlAdaptorServer;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.util.Tool;

public class EnvironmentAgent {

	private static final int port = Constants.JmxHtmlPort;
	private MBeanServer mbs = null;
	
	public EnvironmentAgent(){
		mbs = MBeanServerFactory.createMBeanServer();
		HtmlAdaptorServer adapter = new HtmlAdaptorServer();
		ConstWrap constant = new ConstWrap();
		ObjectName adapterName = null;
		ObjectName constantName = null;
		try {
			constantName = new ObjectName("EnvAgent:name=Environment");
			mbs.registerMBean(constant, constantName);
			adapterName = new ObjectName("EnvAgent:name=htmladapter,port=" + port);
			adapter.setPort(port);
			mbs.registerMBean(adapter, adapterName);
			adapter.start();
			Tool.log("jmx agent start listener port: " + port);
		} 
		catch (Exception e) {
			Tool.err("start jmx error: " + e.getMessage());
		}
	}
	
	public static void main(String args[]) {
		System.out.println("EnvironmentAgent is running");
		new EnvironmentAgent();
	}
}
