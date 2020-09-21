package com.wasoft.jmx;

public interface ConstWrapMBean {

	public boolean getIsLog();
	
	public void setIsLog(boolean b);
	
	public boolean getIsSaveLogin();
	
	public void setIsSaveLogin(boolean b);
	
	public boolean getIsWebService();
	
	public void setIsWebService(boolean b);
	
	public int getWS_PORT();
	
	public String getSms_url();
	
	public void setSms_url(String s);	
	
	public String getSms_user();
	
	public void setSms_user(String s);
	
	public String getSms_pass();
	
	public void setSms_pass(String s);
	
	public String getMail_server();
	
	public void setMail_server(String s);
	
	public boolean getMail_auth();
	
	public void setMail_auth(boolean b);
	
	public String getMail_user();
	
	public void setMail_user(String s);
	
	public String getMail_pass();
	
	public void setMail_pass(String s);
	
	public String getMail_sys_user();
	
	public void setMail_sys_user(String s);
	
	public boolean getIsHttpProxy();
	
	public void setIsHttpProxy(boolean b);
	
	public int getProxyPort();
	
	public void setProxyPort(int i);
}
