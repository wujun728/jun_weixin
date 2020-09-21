package com.jfinal.weixin.demo;

import java.util.HashMap;
import java.util.Map;

import com.jfinal.core.Controller;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.kit.IpKit;
import com.jfinal.weixin.sdk.kit.PaymentKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;

/**
 * @author osc就看看
 * 企业付款demo
 */
public class WeixinTransfersController extends Controller {
    // 商户相关资料
    private static String appid = "";
    // 微信支付分配的商户号
    private static String partner = "";
    // API密钥
    private static String paternerKey = "";
    private static String transfer_url = "https://api.mch.weixin.qq.com/mmpaymkttransfers/promotion/transfers";

    public void index() throws Exception {
        Map<String, String> params = new HashMap<String, String>();
        // （apiclient_cert.p12）证书存放路径
        String cerPath = "";
        // 收款用户在wxappid下的openid
        String openid = "";
        // 订单号
        String orderNo = "";
        // 真实姓名（可选）
        String reUserName = "";
        // 金额 单位：分
        params.put("amount", "100");
        // 是否验证姓名
        // NO_CHECK：不校验真实姓名
        // FORCE_CHECK：强校验真实姓名（未实名认证的用户会校验失败，无法转账）
        // OPTION_CHECK：针对已实名认证的用户才校验真实姓名（未实名认证用户不校验，可以转账成功）
        params.put("check_name", "NO_CHECK");
        // 描述
        params.put("desc", "企业付款");
        params.put("mch_appid", appid);
        params.put("mchid", partner);
        // 随机字符串
        params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
        params.put("openid", openid);
        params.put("partner_trade_no", orderNo);
        // 收款用户真实姓名。
        // 如果check_name设置为FORCE_CHECK或OPTION_CHECK，则必填用户真实姓名
        params.put("re_user_name", reUserName);
        String ip = IpKit.getRealIp(getRequest());
        if (StrKit.isBlank(ip)) {
            ip = "127.0.0.1";
        }
        params.put("spbill_create_ip", ip);
        String sign = PaymentKit.createSign(params, paternerKey);
        params.put("sign", sign);
        String xml = PaymentKit.toXml(params);
        System.out.println(xml);
        String xmlResult = HttpUtils.postSSL(transfer_url, xml, cerPath, partner);
        Map<String, String> resultXML = PaymentKit.xmlToMap(xmlResult.toString());
        String return_code = resultXML.get("return_code");
        String return_msg = resultXML.get("return_msg");
        if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
            renderText(return_msg);
            return;
        }
        String result_code = resultXML.get("result_code");
        if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
            renderText(return_msg);
            return;
        }

    }
}
