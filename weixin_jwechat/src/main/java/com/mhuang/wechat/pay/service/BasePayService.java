package com.mhuang.wechat.pay.service;

import com.mhuang.wechat.pay.model.JSApiInfo;
import com.mhuang.wechat.pay.model.PayParameter;
/**
 * 微信JS支付基本接口
 * @author Administrator
 */
public interface BasePayService {
	/**
	 * 微信JS支付 
	 * @param payInfo 支付参数
	 * @return 微信JS支付参数
	 */
	JSApiInfo pay(PayParameter payInfo);
	
}
