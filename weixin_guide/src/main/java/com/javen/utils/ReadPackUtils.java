package com.javen.utils;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.javen.weixin.api.RedPackApi;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;
import com.jfinal.weixin.sdk.kit.IpKit;
import com.jfinal.weixin.sdk.kit.PaymentKit;

/**
 * 发送红包接口
 * @author Javen
 * 2016年5月28日
 */
public class ReadPackUtils {
	static Log log=Log.getLog(ReadPackUtils.class);
	/**
	 * 发送普通红包
	 * @param request 获取IP
	 * @param total_amount  付款现金(单位分)
	 * @param total_num 红包发放总人数
	 * @param wishing 红包祝福语
	 * @param act_name 活动名称
	 * @param remark 备注
	 * @param reOpenid 用户openid
	 * @param partner 商户号
	 * @param wxappid 公众账号appid
	 * @param sendName 商户名称
	 * @param paternerKey 商户签名key
	 * @param certPath 证书路径
	 * @return
	 */
	public static boolean sendredpack(HttpServletRequest request,String total_amount,String total_num,String wishing,String act_name,String remark,String reOpenid,String partner,String wxappid,String sendName,String paternerKey,String certPath) {
		// 商户订单号
		String mchBillno = System.currentTimeMillis() + "";
		String ip = IpKit.getRealIp(request);

		Map<String, String> params = new HashMap<String, String>();
		// 随机字符串
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		// 商户订单号
		params.put("mch_billno", mchBillno);
		// 商户号
		params.put("mch_id", partner);
		// 公众账号ID
		params.put("wxappid", wxappid);
		// 商户名称
		params.put("send_name", sendName);
		// 用户OPENID
		params.put("re_openid", reOpenid);
		// 付款现金(单位分)
		params.put("total_amount", total_amount);
		// 红包发放总人数
		params.put("total_num", total_num);
		// 红包祝福语
		params.put("wishing", wishing);
		// 终端IP
		params.put("client_ip", ip);
		// 活动名称
		params.put("act_name", act_name	);
		// 备注
		params.put("remark", remark);
		//创建签名
		String sign = PaymentKit.createSign(params, paternerKey);
		params.put("sign", sign);

		String xmlResult = RedPackApi.sendRedPack(params, certPath, partner);
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		log.warn(JsonKit.toJson(result));
		//此字段是通信标识，非交易标识，交易是否成功需要查看result_code来判断
		String return_code = result.get("return_code");
		//业务结果
		String result_code = result.get("result_code");
		
		if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
			return false;
		}
		if (StrKit.notBlank(result_code) && "SUCCESS".equals(result_code)) {
			
			return true;
		}
		return false;
	}
	
	
	/**
	 * 发送裂变红包
	 * @param partner
	 * @param wxappid
	 * @param sendName
	 * @param reOpenid
	 * @param total_amount
	 * @param total_num
	 * @param wishing
	 * @param act_name
	 * @param remark
	 * @param paternerKey
	 * @param certPath
	 * @return
	 */
	public static boolean sendGroupRedPack(String partner, String wxappid, String sendName, String reOpenid, String total_amount, String total_num, String wishing, String act_name, String remark, String paternerKey, String certPath){
		// 商户订单号
		String mchBillno = System.currentTimeMillis() + "";
		
		Map<String, String> params = new HashMap<String, String>();
		// 随机字符串
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		// 商户订单号
		params.put("mch_billno", mchBillno);
		// 商户号
		params.put("mch_id", partner);
		// 公众账号ID
		params.put("wxappid", wxappid);
		// 商户名称
		params.put("send_name", sendName);
		// 用户OPENID
		params.put("re_openid", reOpenid);
		// 付款现金(单位分)
		params.put("total_amount", total_amount);
		// 红包发放总人数
		params.put("total_num", total_num);
		//红包金额设置方式
		params.put("amt_type", "ALL_RAND");
		// 红包祝福语
		params.put("wishing", wishing);
		// 活动名称
		params.put("act_name", act_name	);
		// 备注
		params.put("remark", remark);
		
		//创建签名
		String sign = PaymentKit.createSign(params, paternerKey);
		params.put("sign", sign);
		
		String xmlResult = RedPackApi.sendGroupRedPack(params, certPath, partner);
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		log.warn(JsonKit.toJson(result));
		//此字段是通信标识，非交易标识，交易是否成功需要查看result_code来判断
		String return_code = result.get("return_code");
		//业务结果
		String result_code = result.get("result_code");
		
		if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
			return false;
		}
		if (StrKit.notBlank(result_code) && "SUCCESS".equals(result_code)) {
			
			return true;
		}
		return false;
		
	}
	
	
	
	/**
	 * 根据商户订单号查询红包
	 * @param mch_billno 商户订单号
	 * @param partner 商户号
	 * @param wxappid 公众账号ID
	 * @param paternerKey 商户签名Key
	 * @param certPath 证书路径
	 * @return
	 */
	public static String  query(String mch_billno,String partner,String wxappid,String paternerKey,String certPath) {
		Map<String, String> params = new HashMap<String, String>();
		// 随机字符串
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		// 商户订单号
		params.put("mch_billno", mch_billno);
		// 商户号
		params.put("mch_id", partner);
		// 公众账号ID
		params.put("appid", wxappid);
		params.put("bill_type", "MCHT");
		//创建签名
		String sign = PaymentKit.createSign(params, paternerKey);
		params.put("sign", sign);

		String xmlResult = RedPackApi.getHbInfo(params, certPath, partner);
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		System.out.println(result);
		return JsonKit.toJson(result);
	}
}
