package com.wasoft.jmx;

import com.wasoft.websocket.Constants;

public class ConstWrap implements ConstWrapMBean{

	@Override
	public boolean getIsLog() {
		return Constants.isLog;
	}

	@Override
	public void setIsLog(boolean b) {
		Constants.isLog = b;
	}

	@Override
	public boolean getIsSaveLogin() {
		return Constants.isSaveLogin;
	}

	@Override
	public void setIsSaveLogin(boolean b) {
		 Constants.isSaveLogin = b;
	}

	@Override
	public boolean getIsWebService() {
		return Constants.isWebService;
	}

	@Override
	public void setIsWebService(boolean b) {
		Constants.isWebService = b;
	}

	@Override
	public int getWS_PORT() {
		return Constants.WS_PORT;
	}

	@Override
	public String getSms_url() {
		return Constants.sms_url;
	}

	@Override
	public void setSms_url(String s) {
		Constants.sms_url = s;
	}

	@Override
	public String getSms_user() {
		return Constants.sms_user;
	}

	@Override
	public void setSms_user(String s) {
		Constants.sms_user = s;
	}

	@Override
	public String getSms_pass() {
		return Constants.sms_pass;
	}

	@Override
	public void setSms_pass(String s) {
		Constants.sms_pass = s;
	}

	@Override
	public String getMail_server() {
		return Constants.mail_server;
	}

	@Override
	public void setMail_server(String s) {
		Constants.mail_server = s;
	}

	@Override
	public boolean getMail_auth() {
		return Constants.mail_auth;
	}

	@Override
	public void setMail_auth(boolean b) {
		Constants.mail_auth = b;
	}

	@Override
	public String getMail_user() {
		return Constants.mail_user;
	}

	@Override
	public void setMail_user(String s) {
		Constants.mail_user = s;
	}

	@Override
	public String getMail_pass() {
		return Constants.mail_pass;
	}

	@Override
	public void setMail_pass(String s) {
		Constants.mail_pass = s;
	}

	@Override
	public String getMail_sys_user() {
		return Constants.mail_sys_user;
	}

	@Override
	public void setMail_sys_user(String s) {
		Constants.mail_sys_user = s;
	}

	@Override
	public boolean getIsHttpProxy() {
		return Constants.isHttpProxy;
	}

	@Override
	public void setIsHttpProxy(boolean b) {
		Constants.isHttpProxy = b;
	}

	@Override
	public int getProxyPort() {
		return Constants.proxyPort;
	}

	@Override
	public void setProxyPort(int i) {
		Constants.proxyPort = i;
	}


}
