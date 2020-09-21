package com.jfinal.weixin.demo;

import com.jfinal.core.Controller;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.StrKit;
import com.jfinal.weixin.sdk.api.PaymentApi;
import com.jfinal.weixin.sdk.api.PaymentApi.TradeType;
import com.jfinal.weixin.sdk.kit.IpKit;
import com.jfinal.weixin.sdk.kit.PaymentKit;
import com.jfinal.weixin.sdk.utils.HttpUtils;
import com.jfinal.weixin.sdk.utils.JsonUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * 感谢 *半杯* 童鞋联调支付API
 * @author L.cm
 */
public class WeixinPayController extends Controller {
    //商户相关资料
    private static String appid = "";
    private static String partner = "";
    private static String paternerKey = "";
    private static String notify_url = "http://www.xxx.com/pay/pay_notify";

    /**
     * 公众号支付js-sdk
     */
    public void index() {
        // openId，采用 网页授权获取 access_token API：SnsAccessTokenApi获取
        String openId = "";

        // 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1

        Map<String, String> params = new HashMap<String, String>();
        params.put("appid", appid);
        params.put("mch_id", partner);
        params.put("body", "JFinal2.0极速开发");
        params.put("out_trade_no", "977773682111");
        params.put("total_fee", "1");

        String ip = IpKit.getRealIp(getRequest());
        if (StrKit.isBlank(ip)) {
            ip = "127.0.0.1";
        }

        params.put("spbill_create_ip", ip);
        params.put("trade_type", TradeType.JSAPI.name());
        params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
        params.put("notify_url", notify_url);
        params.put("openid", openId);

        String sign = PaymentKit.createSign(params, paternerKey);
        params.put("sign", sign);
        String xmlResult = PaymentApi.pushOrder(params);

        System.out.println(xmlResult);
        Map<String, String> result = PaymentKit.xmlToMap(xmlResult);

        String return_code = result.get("return_code");
        String return_msg = result.get("return_msg");
        if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
            renderText(return_msg);
            return;
        }
        String result_code = result.get("result_code");
        if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
            renderText(return_msg);
            return;
        }
        // 以下字段在return_code 和result_code都为SUCCESS的时候有返回
        String prepay_id = result.get("prepay_id");

        Map<String, String> packageParams = new HashMap<String, String>();
        packageParams.put("appId", appid);
        packageParams.put("timeStamp", System.currentTimeMillis() / 1000 + "");
        packageParams.put("nonceStr", System.currentTimeMillis() + "");
        packageParams.put("package", "prepay_id=" + prepay_id);
        packageParams.put("signType", "MD5");
        String packageSign = PaymentKit.createSign(packageParams, paternerKey);
        packageParams.put("paySign", packageSign);

        String jsonStr = JsonUtils.toJson(packageParams);
        setAttr("json", jsonStr);
        System.out.println(jsonStr);
        render("/jsp/pay.jsp");
    }

    /**
     * 支付成功通知
     */
    public void pay_notify() {
        // 支付结果通用通知文档: https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
        String xmlMsg = HttpKit.readData(getRequest());
        System.out.println("支付通知="+xmlMsg);
        Map<String, String> params = PaymentKit.xmlToMap(xmlMsg);

        String result_code  = params.get("result_code");
        // 总金额
        String totalFee     = params.get("total_fee");
        // 商户订单号
        String orderId      = params.get("out_trade_no");
        // 微信支付订单号
        String transId      = params.get("transaction_id");
        // 支付完成时间，格式为yyyyMMddHHmmss
        String timeEnd      = params.get("time_end");

        // 注意重复通知的情况，同一订单号可能收到多次通知，请注意一定先判断订单状态
        // 避免已经成功、关闭、退款的订单被再次更新

        if(PaymentKit.verifyNotify(params, paternerKey)){
            if (("SUCCESS").equals(result_code)) {
                //更新订单信息
                System.out.println("更新订单信息");

                Map<String, String> xml = new HashMap<String, String>();
                xml.put("return_code", "SUCCESS");
                xml.put("return_msg", "OK");
                renderText(PaymentKit.toXml(xml));
                return;
            }
        }
        renderText("");
    }
    /**
     *
     * @author Javen
     * 2016年5月14日
     * PC扫码支付获取二维码（模式一）
     */
    public String getCodeUrl(String productId){
        String url="weixin://wxpay/bizpayurl?sign=%s&appid=%s&mch_id=%s&product_id=%s&time_stamp=%s&nonce_str=%s";

        String timeStamp=Long.toString(System.currentTimeMillis() / 1000);
        String nonceStr=Long.toString(System.currentTimeMillis());
        Map<String, String> packageParams = new HashMap<String, String>();
        packageParams.put("appid", appid);
        packageParams.put("mch_id", partner);
        packageParams.put("product_id", productId);
        packageParams.put("time_stamp", timeStamp);
        packageParams.put("nonce_str", nonceStr);
        String packageSign = PaymentKit.createSign(packageParams, paternerKey);

        return String.format(url, packageSign, appid, partner, productId, timeStamp, nonceStr);
    }

    public void test(){
        String product_id = "001";
        renderText(getCodeUrl(product_id));
    }

    /**
     * @author Javen
     * 2016年5月14日
     * PC扫码支付回调（模式一）
     */
    public void wxpay(){
        String result = HttpKit.readData(getRequest());
        System.out.println("回调结果="+result);
        /**
         * 获取返回的信息内容中各个参数的值
         */
        Map<String, String> map = PaymentKit.xmlToMap(result);
        for (String key : map.keySet()) {
            System.out.println("key= "+ key + " and value= " + map.get(key));
        }

        String appid=map.get("appid");
        String openid = map.get("openid");
        String mch_id = map.get("mch_id");
        String is_subscribe = map.get("is_subscribe");
        String nonce_str = map.get("nonce_str");
        String product_id = map.get("product_id");
        String sign = map.get("sign");
        Map<String, String> packageParams = new HashMap<String, String>();
        packageParams.put("appid", appid);
        packageParams.put("openid", openid);
        packageParams.put("mch_id",mch_id);
        packageParams.put("is_subscribe",is_subscribe);
        packageParams.put("nonce_str",nonce_str);
        packageParams.put("product_id", product_id);

        String packageSign = PaymentKit.createSign(packageParams, paternerKey);
        if (sign.equals(packageSign)) {
            // 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1

            Map<String, String> params = new HashMap<String, String>();
            params.put("appid", appid);
            params.put("mch_id", mch_id);
            params.put("body", "测试扫码支付");
            String out_trade_no=Long.toString(System.currentTimeMillis());
            params.put("out_trade_no", out_trade_no);
            int price=((int)(Float.valueOf(10)*100));
            params.put("total_fee", price+"");
            params.put("attach", out_trade_no);

            String ip = IpKit.getRealIp(getRequest());
            if (StrKit.isBlank(ip)) {
                ip = "127.0.0.1";
            }

            params.put("spbill_create_ip", ip);
            params.put("trade_type", TradeType.NATIVE.name());
            params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
            params.put("notify_url", notify_url);
            params.put("openid", openid);

            String paysign = PaymentKit.createSign(params, paternerKey);
            params.put("sign", paysign);

            String xmlResult = PaymentApi.pushOrder(params);

            System.out.println("prepay_xml>>>"+xmlResult);
            Map<String, String> payResult = PaymentKit.xmlToMap(xmlResult);

            String return_code = payResult.get("return_code");
            String return_msg = payResult.get("return_msg");

            if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
                System.out.println("return_code>>>"+return_msg);
                return;
            }
            if (StrKit.isBlank(return_msg) || !"OK".equals(return_msg)) {
                System.out.println("return_msg>>>>"+return_msg);
                return;
            }
            // 以下字段在return_code 和result_code都为SUCCESS的时候有返回
            String prepay_id = payResult.get("prepay_id");

            Map<String, String> prepayParams = new HashMap<String, String>();
            prepayParams.put("return_code", "SUCCESS");
            prepayParams.put("appId", appid);
            prepayParams.put("mch_id", mch_id);
            prepayParams.put("nonceStr", System.currentTimeMillis() + "");
            prepayParams.put("prepay_id", prepay_id);
            prepayParams.put("result_code", "SUCCESS");
            String prepaySign = PaymentKit.createSign(prepayParams, paternerKey);
            prepayParams.put("sign", prepaySign);
            String xml = PaymentKit.toXml(prepayParams);

            System.out.println(xml);

            renderText(xml);
        }
    }
    
    
    /**
	 * 刷卡支付
	 * 文档：https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=5_1
	 */
	public void micropay(){
		String url="https://api.mch.weixin.qq.com/pay/micropay";
		
		String total_fee="1";
		String auth_code = getPara("auth_code");//测试时直接手动输入刷卡页面上的18位数字
		
		Map<String, String> params = new HashMap<String, String>();
		params.put("appid", appid);
		params.put("mch_id", partner);
		params.put("device_info", "javen205");//终端设备号
		params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
		params.put("body", "刷卡支付测试");
//		params.put("detail", "json字符串");//非必须
		params.put("attach", "javen205");//附加参数非必须
		String out_trade_no=System.currentTimeMillis()+"";
		params.put("out_trade_no", out_trade_no);
		params.put("total_fee", total_fee);
		
		String ip = IpKit.getRealIp(getRequest());
		if (StrKit.isBlank(ip)) {
			ip = "127.0.0.1";
		}
		
		params.put("spbill_create_ip", ip);
		params.put("auth_code", auth_code);
		
		String sign = PaymentKit.createSign(params, paternerKey);
		params.put("sign", sign);
		
		String xmlResult = HttpUtils.post(url, PaymentKit.toXml(params));
		//同步返回结果
		System.out.println("xmlResult:"+xmlResult);
		
		Map<String, String> result = PaymentKit.xmlToMap(xmlResult);
		String return_code = result.get("return_code");
		if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
			//通讯失败 
			String err_code = result.get("err_code");
			//用户支付中，需要输入密码
			if (err_code.equals("USERPAYING")) {
				//等待5秒后调用【查询订单API】https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_2
				
			}
			renderText("通讯失败>>"+xmlResult);
			return;
		}
		
		String result_code = result.get("result_code");
		if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
			//支付失败
			renderText("支付失败>>"+xmlResult);
			return;
		}
		
		//支付成功 返回参会入库 业务逻辑处理
		
		renderText(xmlResult);
	}

    /**
     * PC支付模式二，PC支付不需要openid
     */
    public void pcModeTwo() {
        // 统一下单文档地址：https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
        Map<String, String> params = new HashMap<String, String>();
        params.put("appid", appid);
        params.put("mch_id", partner);
        params.put("body", "JFinal2.2极速开发");

        // 商品ID trade_type=NATIVE，此参数必传。此id为二维码中包含的商品ID，商户自行定义。
        params.put("product_id", "1");
        // 商户订单号 商户系统内部的订单号,32个字符内、可包含字母, 其他说明见商户订单号
        params.put("out_trade_no", "97777368222");
        params.put("total_fee", "1");

        String ip = IpKit.getRealIp(getRequest());
        if (StrKit.isBlank(ip)) {
            ip = "127.0.0.1";
        }

        params.put("spbill_create_ip", ip);
        params.put("trade_type", TradeType.NATIVE.name());
        params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
        params.put("notify_url", notify_url);

        String sign = PaymentKit.createSign(params, paternerKey);
        params.put("sign", sign);
        String xmlResult = PaymentApi.pushOrder(params);

        System.out.println(xmlResult);
        Map<String, String> result = PaymentKit.xmlToMap(xmlResult);

        String return_code = result.get("return_code");
        String return_msg = result.get("return_msg");
        if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
            renderText(return_msg);
            return;
        }
        String result_code = result.get("result_code");
        if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
            renderText(return_msg);
            return;
        }
        // 以下字段在return_code 和result_code都为SUCCESS的时候有返回
        String prepay_id = result.get("prepay_id");
        // trade_type为NATIVE是有返回，可将该参数值生成二维码展示出来进行扫码支付
        String code_url = result.get("code_url");

        setAttr("code_url", code_url);
        render("/jsp/pc_pay.jsp");
    }

    /**
     * wap支付第一版本
     */
    public void wap1() {
        Map<String, String> params = new HashMap<String, String>();
        params.put("appid", appid);
        params.put("mch_id", partner);
        params.put("body", "JFinal2.0极速开发");
        params.put("out_trade_no", "977773682111");
        params.put("total_fee", "1");

        String ip = IpKit.getRealIp(getRequest());
        if (StrKit.isBlank(ip)) {
            ip = "127.0.0.1";
        }

        params.put("spbill_create_ip", ip);
        params.put("trade_type", TradeType.WAP.name());
        params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
        params.put("notify_url", notify_url);

        String sign = PaymentKit.createSign(params, paternerKey);
        params.put("sign", sign);
        String xmlResult = PaymentApi.pushOrder(params);

        System.out.println(xmlResult);
        Map<String, String> result = PaymentKit.xmlToMap(xmlResult);

        String return_code = result.get("return_code");
        String return_msg = result.get("return_msg");
        if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
            renderText(return_msg);
            return;
        }
        String result_code = result.get("result_code");
        if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
            renderText(return_msg);
            return;
        }
        // 以下字段在return_code 和result_code都为SUCCESS的时候有返回
        String prepayId = result.get("prepay_id");
        String url = PaymentApi.getDeepLink(appid, prepayId, paternerKey);

        // 微信那边的开发建议用a标签打开该链接
        setAttr("url", url);
    }

    /**
     * wap支付第二版
     */
    public void wap2() {
        Map<String, String> params = new HashMap<String, String>();
        params.put("appid", appid);
        params.put("mch_id", partner);
        params.put("body", "JFinal2.0极速开发");
        params.put("out_trade_no", "977773682111");
        params.put("total_fee", "1");

        String ip = IpKit.getRealIp(getRequest());
        if (StrKit.isBlank(ip)) {
            ip = "127.0.0.1";
        }

        params.put("spbill_create_ip", ip);
        params.put("trade_type", TradeType.MWEB.name());
        params.put("nonce_str", System.currentTimeMillis() / 1000 + "");
        params.put("notify_url", notify_url);

        String sign = PaymentKit.createSign(params, paternerKey);
        params.put("sign", sign);
        String xmlResult = PaymentApi.pushOrder(params);

        System.out.println(xmlResult);
        Map<String, String> result = PaymentKit.xmlToMap(xmlResult);

        String return_code = result.get("return_code");
        String return_msg = result.get("return_msg");
        if (StrKit.isBlank(return_code) || !"SUCCESS".equals(return_code)) {
            renderText(return_msg);
            return;
        }
        String result_code = result.get("result_code");
        if (StrKit.isBlank(result_code) || !"SUCCESS".equals(result_code)) {
            renderText(return_msg);
            return;
        }
        // 以下字段在return_code 和result_code都为SUCCESS的时候有返回
        String url = result.get("mweb_url");

        // 微信那边的开发建议用a标签打开该链接
        setAttr("url", url);
    }
}
