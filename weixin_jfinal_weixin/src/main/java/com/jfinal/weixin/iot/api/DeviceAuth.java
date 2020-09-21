package com.jfinal.weixin.iot.api;

import java.io.Serializable;

import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 设备授权属性
 */
public class DeviceAuth implements Serializable {
	private static final long serialVersionUID = -3535838682817586669L;
	/**
	 * 设备的deviceid
	 */
	private String id;
	/**
	 * 设备的mac地址（48bit）格式采用16进制串的方式（长度为12字节），不需要0X前缀，如： 1234567890AB
	 */
	private String mac;
	/**
	 * android classic bluetooth – 1 ios classic bluetooth – 2 ble – 3 wifi -- 4
	 * 一个设备可以支持多种连接类型，用符号"|"做分割， 客户端优先选择靠前的连接方式（优先级按|关系的排序依次降低）
	 */
	@JsonProperty("connect_protocol")
	@JSONField(name = "connect_protocol")
	private String connectProtocol;
	/**
	 * auth及通信的加密key，第三方需要将key烧制在设备上（128bit）， 格式采用16进制串的方式（长度为32字节），不需要0X前缀，如：
	 * 1234567890ABCDEF1234567890ABCDEF
	 */
	@JsonProperty("auth_key")
	@JSONField(name = "auth_key")
	private String authKey;

	/**
	 * 断开策略，目前支持： 1：退出公众号页面时即断开连接 2：退出公众号之后保持连接不断开
	 * 3：退出公众号之后一直保持连接（设备主动断开连接后，微信尝试重连）
	 */
	@JsonProperty("close_strategy")
	@JSONField(name = "close_strategy")
	private String closeStrategy;

	/**
	 * 连接策略，32位整型，按bit位置位，目前仅第1bit和第3bit位有效（bit置0为无效，1为有效；第2bit已被废弃），且bit位可以按或置位
	 * （如1|4=5），各bit置位含义说明如下：<br>
	 * 1：（第1bit置位）在公众号对话页面，不停的尝试连接设备<br>
	 * 4：（第3bit置位）处于非公众号页面（如主界面等），微信自动连接。当用户切换微信到前台时，可能尝试去连接设备，连上后一定时间会断开<br>
	 * 8：（第4bit置位），进入微信后即刻开始连接。只要微信进程在运行就不会主动断开
	 */
	@JsonProperty("conn_strategy")
	@JSONField(name = "conn_strategy")
	private String connStrategy;
	/**
	 * auth加密方法，目前支持两种取值： 0：不加密 1：AES加密（CBC模式，PKCS7填充方式）
	 */
	@JsonProperty("crypt_method")
	@JSONField(name = "crypt_method")
	private String cryptMethod = "0";
	
	@JsonProperty("auth_ver")
	@JSONField(name = "auth_ver")
	private String authVer;// 0：不加密的version 1：version 1

	/**
	 * 表示mac地址在厂商广播manufature data里含有mac地址的偏移，取值如下： -1：在尾部、 -2：表示不包含mac地址
	 * 其他：非法偏移
	 */
	@JsonProperty("manu_mac_pos")
	@JSONField(name = "manu_mac_pos")
	private String manuMacPos;
	/**
	 * 表示mac地址在厂商serial number里含有mac地址的偏移，取值如下： -1：表示在尾部 -2：表示不包含mac地址 其他：非法偏移
	 */
	@JsonProperty("ser_mac_pos")
	@JSONField(name = "ser_mac_pos")
	private String serMacPos;

	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getMac() {
		return mac;
	}
	public void setMac(String mac) {
		this.mac = mac;
	}
	public String getConnectProtocol() {
		return connectProtocol;
	}
	public void setConnectProtocol(String connectProtocol) {
		this.connectProtocol = connectProtocol;
	}
	public String getAuthKey() {
		return authKey;
	}
	public void setAuthKey(String authKey) {
		this.authKey = authKey;
	}
	public String getCloseStrategy() {
		return closeStrategy;
	}
	public void setCloseStrategy(String closeStrategy) {
		this.closeStrategy = closeStrategy;
	}
	public String getConnStrategy() {
		return connStrategy;
	}
	public void setConnStrategy(String connStrategy) {
		this.connStrategy = connStrategy;
	}
	public String getCryptMethod() {
		return cryptMethod;
	}
	public void setCryptMethod(String cryptMethod) {
		this.cryptMethod = cryptMethod;
	}
	public String getAuthVer() {
		return authVer;
	}
	public void setAuthVer(String authVer) {
		this.authVer = authVer;
	}
	public String getManuMacPos() {
		return manuMacPos;
	}
	public void setManuMacPos(String manuMacPos) {
		this.manuMacPos = manuMacPos;
	}
	public String getSerMacPos() {
		return serMacPos;
	}
	public void setSerMacPos(String serMacPos) {
		this.serMacPos = serMacPos;
	}

}
