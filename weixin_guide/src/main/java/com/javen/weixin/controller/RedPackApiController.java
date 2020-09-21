package com.javen.weixin.controller;

import com.javen.utils.ReadPackUtils;
import com.jfinal.core.Controller;
import com.jfinal.kit.PropKit;

/**
 * 微信红包demo
 * @author Javen
 * 2016年5月28日
 */
public class RedPackApiController extends Controller {
	private static String sendName = "Javen205";
	//微信证书路径
	private static String certPath = "/Users/Javen/Downloads/cert/apiclient_cert.p12";
	//商户相关资料
	String wxappid = PropKit.get("appId");
	// 微信支付分配的商户号
	String partner = PropKit.get("mch_id");
	//API密钥
	String paternerKey = PropKit.get("paternerKey");

	/**
	 * 发送普通红包
	 */
	public void sendredpack() {
		
		boolean isSend = ReadPackUtils.sendredpack(getRequest(), "100", "1", "感谢您参加猜灯谜活动，祝您元宵节快乐！",
				"猜灯谜抢红包活动", "猜越多得越多，快来抢！", "o_pncsidC-pRRfCP4zj98h6slREw",
				partner, wxappid, sendName, paternerKey, certPath);
		
		renderJson(isSend);
	}
	/**
	 * 发送裂变红包
	 */
	public void sendGroupRedPack() {
		
		boolean isSend = ReadPackUtils.sendGroupRedPack(partner, wxappid, "天虹百货", "o_pncsidC-pRRfCP4zj98h6slREw", 
				"100", "10", "感谢您参加猜灯谜活动，祝您元宵节快乐！", "猜灯谜抢红包活动",
				"猜越多得越多，快来抢", paternerKey, certPath);
		
		
		renderJson(isSend);
	}
	

	public void query() {
		String query = ReadPackUtils.query("10000098201411111234567890", partner, wxappid, paternerKey, certPath);
		renderJson(query);
	}

}