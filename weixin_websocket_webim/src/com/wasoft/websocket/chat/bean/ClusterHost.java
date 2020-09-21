package com.wasoft.websocket.chat.bean;

import java.net.Socket;

public class ClusterHost {
	private String ip;
	private int port;
	private boolean isLocal;
	private Socket socket;

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public Socket getSocket() {
		return socket;
	}

	public void setSocket(Socket socket) {
		this.socket = socket;
	}

	public ClusterHost(String ip, int port) {
		super();
		this.ip = ip;
		this.port = port;
	}

	public boolean isLocal() {
		return isLocal;
	}

	public void setLocal(boolean isLocal) {
		this.isLocal = isLocal;
	}
	
}
