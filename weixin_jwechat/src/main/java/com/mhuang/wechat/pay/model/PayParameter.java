package com.mhuang.wechat.pay.model;

import java.io.Serializable;

import lombok.Data;

/**
 * 微信JS支付接口 调用参数信息
 * @author Administrator
 */
@Data
public class PayParameter implements Serializable{

	private static final long serialVersionUID = 1L;
	/**
	 * 支付金额  单位分 必传
	 */
	private String totalFee;
	/**
	 * 支付标题 必传
	 */
	private String title;
	/**
	 * 微信id 必传
	 */
	private String openId;
	/**
	 * 支付产品id 必传
	 */
	private String productId;
	/**
	 * 回调函数地址 必传
	 * 可以自定义 但要自己实现回调函数方法
	 */
	private String notifyUrl;	 
	
	/**
	 * 微信JS接口的临时票据
	 */
	private String jsapiTicket;
	/**
	 * 微信 JS SDK权限验证签名 URL
	 */
	private String jsapiUrl;
	/**
	 * 请求ip地址 必传
	 */
	private String requestIP;
	/**
	 * 用户代理
	 */
	private String userAgent;
}
