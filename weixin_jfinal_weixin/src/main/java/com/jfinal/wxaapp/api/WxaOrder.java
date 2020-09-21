/**
 * Copyright (c) 2011-2014, L.cm 卢春梦 (qq596392912@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */

package com.jfinal.wxaapp.api;

import java.io.Serializable;

import com.jfinal.weixin.sdk.utils.JsonUtils;

/**
 * 微信小程序订单
 * @author L.cm
 *
 */
public class WxaOrder implements Serializable {
	private static final long serialVersionUID = -4161270488845866220L;
	
	private String appId;
	private String mchId;
	private String body;
	// 商户订单号
	private String outTradeNo;
	// 单位分
	private String totalFee;
	private String spbillCreateIp;
	private String notifyUrl;
	private String openId;
	private String attach;
	// 前面加密key
	private String signKey;
	
	// 订单生成时间，格式为yyyyMMddHHmmss
	private String timeStart;
	// 订单失效时间，格式为yyyyMMddHHmmss。注意：最短失效时间间隔必须大于5分钟
	private String timeExpire;
	// 商品标记，代金券或立减优惠功能的参数，
	private String goodsTag;
	
	public WxaOrder(String appId, String mchId, String signKey) {
		super();
		this.appId = appId;
		this.mchId = mchId;
		this.signKey = signKey;
	}
	
	public String getAppId() {
		return appId;
	}
	public void setAppId(String appId) {
		this.appId = appId;
	}
	public String getMchId() {
		return mchId;
	}
	public void setMchId(String mchId) {
		this.mchId = mchId;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getOutTradeNo() {
		return outTradeNo;
	}
	public void setOutTradeNo(String outTradeNo) {
		this.outTradeNo = outTradeNo;
	}
	public String getTotalFee() {
		return totalFee;
	}
	public void setTotalFee(String totalFee) {
		this.totalFee = totalFee;
	}
	public String getSpbillCreateIp() {
		return spbillCreateIp;
	}
	public void setSpbillCreateIp(String spbillCreateIp) {
		this.spbillCreateIp = spbillCreateIp;
	}
	public String getNotifyUrl() {
		return notifyUrl;
	}
	public void setNotifyUrl(String notifyUrl) {
		this.notifyUrl = notifyUrl;
	}
	public String getOpenId() {
		return openId;
	}
	public void setOpenId(String openId) {
		this.openId = openId;
	}
	public String getAttach() {
		return attach;
	}
	public void setAttach(String attach) {
		this.attach = attach;
	}
	public String getSignKey() {
		return signKey;
	}
	public void setSignKey(String signKey) {
		this.signKey = signKey;
	}
	public String getTimeStart() {
		return timeStart;
	}
	public void setTimeStart(String timeStart) {
		this.timeStart = timeStart;
	}
	public String getTimeExpire() {
		return timeExpire;
	}
	public void setTimeExpire(String timeExpire) {
		this.timeExpire = timeExpire;
	}
	public String getGoodsTag() {
		return goodsTag;
	}
	public void setGoodsTag(String goodsTag) {
		this.goodsTag = goodsTag;
	}

	@Override
	public String toString() {
		return JsonUtils.toJson(this);
	}
}
