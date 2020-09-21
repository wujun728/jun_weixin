package com.mhuang.wechat.pay.service.impl;

import java.util.Map;
import java.util.SortedMap;
import java.util.TreeMap;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.mhuang.wechat.common.config.WeConfig;
import com.mhuang.wechat.common.config.WechatUrl;
import com.mhuang.wechat.common.utils.CommonUtil;
import com.mhuang.wechat.common.utils.MessageUtils;
import com.mhuang.wechat.common.utils.PayCommonUtil;
import com.mhuang.wechat.common.utils.WechatJSTicketUtils;
import com.mhuang.wechat.pay.model.JSApiInfo;
import com.mhuang.wechat.pay.model.PayParameter;
import com.mhuang.wechat.pay.service.BasePayService;
import com.mhuang.wechat.pay.utils.PayUtils;

/**
 * 微信基础js支付实现类
 * @author Administrator
 */
@Service("basePayService")
public class BasePayServiceImpl implements BasePayService{
	/**
	 * 微信JS支付 
	 * @param request
	 * @param payInfo 支付参数
	 * @return 订单流水号
	 */
	@Override
	public JSApiInfo pay(PayParameter payInfo) {
  	    Map<String, String> signMap = WechatJSTicketUtils.sign(payInfo.getJsapiTicket(),payInfo.getJsapiUrl());
        signMap.put("appid", WeConfig.APPID);
        
        SortedMap<Object,Object> parameters = new TreeMap<Object,Object>();
        parameters.put("appid", WeConfig.APPID);
        parameters.put("mch_id", WeConfig.MCH_ID);
        parameters.put("nonce_str", PayCommonUtil.CreateNoncestr());
        parameters.put("body", payInfo.getTitle());
        parameters.put("out_trade_no",UUID.randomUUID().toString().replaceAll("-", ""));
        parameters.put("total_fee", payInfo.getTotalFee());
        parameters.put("spbill_create_ip",payInfo.getRequestIP());
        parameters.put("notify_url", payInfo.getNotifyUrl());
        parameters.put("trade_type", "JSAPI");
        parameters.put("openid", payInfo.getOpenId());
        String sign = PayCommonUtil.createSign("UTF-8", parameters);
        parameters.put("sign", sign);
        MessageUtils<Map> utils = new MessageUtils<Map>();
        String requestXML = utils.fromObjectToXml(parameters);
        String result =CommonUtil.httpsRequest(WechatUrl.UNIFIED_ORDER_URL, "POST", requestXML);
        Map<String, String> map =  PayUtils.parseXml(result);
		SortedMap<Object,Object> params = new TreeMap<Object,Object>();
        params.put("appId", WeConfig.APPID);
        params.put("timeStamp", PayCommonUtil.createTimetmp());
        params.put("nonceStr", PayCommonUtil.CreateNoncestr());
        params.put("package", "prepay_id="+map.get("prepay_id"));
        params.put("signType", WechatUrl.SIGN_TYPE);
        String paySign =  PayCommonUtil.createSign("UTF-8", params);
        params.put("packageValue", "prepay_id="+map.get("prepay_id"));    //这里用packageValue是预防package是关键字在js获取值出错
        params.put("paySign", paySign);                                                          //paySign的生成规则和Sign的生成规则一致
        String userAgent = payInfo.getUserAgent();
        char agent = userAgent.charAt(userAgent.indexOf("MicroMessenger")+15);
        params.put("agent", new String(new char[]{agent}));//微信版本号，用于前面提到的判断用户手机微信的版本是否是5.0以上版本。
        JSApiInfo apiInfo=new JSApiInfo();
        apiInfo.setSignMessage(signMap);
        apiInfo.setPayMessage(params);
        apiInfo.setOutTradeNo(parameters.get("out_trade_no").toString());
        return apiInfo;
	}

}
