package com.mhuang.wechat.pay.model;
 

import java.io.Serializable;
import java.util.Map;
import java.util.SortedMap;

import lombok.Data;

/**
 * 微信JS支付参数
 * @author Administrator
 *
 */
@Data
public class JSApiInfo implements Serializable{
	
	private static final long serialVersionUID = 1L;
	/**
	 * 微信签名信息
	 */
	private Map<String, String> signMessage;
	/**
	 * 微信支付信息
	 */
	private SortedMap<Object,Object> payMessage;
	/**
	 * 支付流水号
	 */
	private String outTradeNo;
	
}

