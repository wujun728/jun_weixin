package com.javen.alipay;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradeWapPayRequest;
import com.javen.vo.AjaxResult;
import com.jfinal.core.Controller;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.JsonKit;
import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;
public class AliPayController extends Controller {
	private static final Prop prop = PropKit.use("alipay.properties");
	private Log log=Log.getLog(AliPayController.class);
	private AjaxResult result = new AjaxResult();
	private boolean isDebug = true;
	/**
	 * App支付
	 */
	public void appPay(){
		String orderInfo;
		try {
			
			String body="我是测试数据";
			String passback_params="123";
			String subject="1";
			String total_amount="0.01";
			String notify_url="http://javen.ittun.com/alipay/pay_notify";
			
			String appId;
			String rsa_private;
			if (isDebug) {
				appId=prop.get("test_appId").trim();
				rsa_private=prop.get("test_rsa_private").trim();
System.out.println("test。。。。");
			}else {
				appId=prop.get("appId").trim();
				rsa_private=prop.get("rsa_private").trim();
			}
System.out.println("appId:"+appId);			
System.out.println("rsa_private:"+rsa_private);			
			
			BizContent content = new BizContent();
			content.setBody(body);
			content.setOut_trade_no(OrderInfoUtil2_0.getOutTradeNo());;
			
			content.setPassback_params(passback_params);
			
			content.setSubject(subject);
			
			content.setTotal_amount(total_amount);
			content.setProduct_code("QUICK_MSECURITY_PAY");
			
			
			Map<String, String> params = OrderInfoUtil2_0.buildOrderParamMap(appId,notify_url,content);
			String orderParam = OrderInfoUtil2_0.buildOrderParam(params);
			String sign = OrderInfoUtil2_0.getSign(params, rsa_private);
			orderInfo = orderParam + "&" + sign;
			log.info("orderInfo>"+orderInfo);
			result.success(orderInfo);
			renderJson(result);
			
		} catch (Exception e) {
			e.printStackTrace();
			result.addError("system error");
		}
	}
	/**
	 * App支付支付回调通知
	 * https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.TxBJbS&treeId=193&articleId=105301&docType=1#s3
	 */
	public void pay_notify(){
		String queryString = getRequest().getQueryString();
		log.debug("支付宝回调参数："+queryString);
		
		
		String notify_time = getPara("notify_time");
		String notify_type = getPara("notify_type");
		String notify_id = getPara("notify_id");
		String app_id = getPara("app_id");
		String charset = getPara("charset");
		String version = getPara("version");
		String sign_type = getPara("sign_type");
		String sign = getPara("sign");
		String trade_no = getPara("trade_no");
		String out_trade_no = getPara("out_trade_no");
		
		////////////////一下是可选参数//////////////////////////
		
		String buyer_id = getPara("buyer_id");
		String buyer_logon_id  = getPara("buyer_logon_id");
		String trade_status  = getPara("trade_status");
		String total_amount  = getPara("total_amount");
		String receipt_amount  = getPara("receipt_amount");
		
		
		String passback_params = getPara("passback_params");//附加参数
		
		renderText(queryString);
	}
	
	
	////////////////////////WEB 支付/////////////////////////////
	
	private static final Prop webProp = PropKit.use("alipay_web.properties");
	static AlipayClient alipayClient;
	static String charset = "UTF-8";
	static String privateKey=null;
	static String alipayPulicKey=null;
	static{
		String serverUrl = webProp.get("serverUrl");
		String appId = webProp.get("appId");
		privateKey = webProp.get("privateKey");
		String format = "json";
		
		alipayPulicKey= webProp.get("alipayPulicKey");
		alipayClient = new DefaultAlipayClient(serverUrl, appId, privateKey, format, charset, alipayPulicKey);
	}
	/**
	 * Wap支付
	 */
	public void wapPay(){
		String body="我是测试数据";
		String subject="Javen 测试";
		String total_amount="0.01";
		String passback_params="1";
		
		BizContent content = new BizContent();
		content.setBody(body);
		content.setOut_trade_no(OrderInfoUtil2_0.getOutTradeNo());;
		content.setPassback_params(passback_params);
		content.setSubject(subject);
		content.setTotal_amount(total_amount);
		content.setProduct_code("QUICK_WAP_PAY");
		
		
		try {
			AlipayTradeWapPayRequest alipayRequest = new AlipayTradeWapPayRequest();//创建API对应的request
			alipayRequest.setReturnUrl("http://javen.tunnel.qydev.com/alipay/return_url");
			alipayRequest.setNotifyUrl("http://javen.tunnel.qydev.com/alipay/notify_url");//在公共参数中设置回跳和通知地址
			//参数参考 https://doc.open.alipay.com/doc2/detail.htm?treeId=203&articleId=105463&docType=1#s0
			System.out.println(JsonKit.toJson(content));
			alipayRequest.setBizContent(JsonKit.toJson(content));//填充业务参数
			    String form = alipayClient.pageExecute(alipayRequest).getBody(); //调用SDK生成表单
			    HttpServletResponse httpResponse = getResponse();
			    httpResponse.setContentType("text/html;charset=" + charset);
			    httpResponse.getWriter().write(form);//直接将完整的表单html输出到页面
			    httpResponse.getWriter().flush();
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		renderNull();
	}
	
	public void return_url(){
		//total_amount=0.01&timestamp=2016-12-02+18%3A11%3A42&sign=vPhxaI5bf7uSab9HuqQ4fvjLOggzpnnLK9svOdZCZ9N1mge4qm63R4k%2FowlTHbwyGCNG0%2F4PthfYbjFx22%2B2WpBNvccxajw%2Btba1Aab6EKPOAW8BoLLFFwgExtLB9ydhWL5kpP8YSLolO%2F9pkGBy5TNldz7HxdB2j6vISrD8qCs%3D&trade_no=2016120221001004200200187882&sign_type=RSA&auth_app_id=2016102000727659&charset=UTF-8&seller_id=2088102180432465&method=alipay.trade.wap.pay.return&app_id=2016102000727659&out_trade_no=120218111214806&version=1.0
		String params = getRequest().getQueryString();
		System.out.println("return_url回调参数："+params);
		renderText("return_url回调参数："+params);
		
	}
	public void notify_url(){
		String params =HttpKit.readData(getRequest());
		try {
			Map<String, String> paramsMap = getParameterMap(params);//将异步通知中收到的所有参数都存放到map中
			for(Map.Entry<String, String> entry:paramsMap.entrySet()){    
			     System.out.println(entry.getKey()+"--->"+entry.getValue());    
			}   
			System.out.println("alipayPulicKey>"+alipayPulicKey);
			boolean signVerified = AlipaySignature.rsaCheckV1(paramsMap, alipayPulicKey, charset); //调用SDK验证签名
			if(signVerified){
				// TODO 验签成功后，按照支付结果异步通知中的描述，对支付结果中的业务内容进行二次校验，校验成功后在response中返回success并继续商户自身业务处理，校验失败返回failure
				renderText("success");
			}else{
				// TODO 验签失败则记录异常日志，并在response中返回failure.
				renderText("failure");
			}
		} catch (AlipayApiException e) {
			e.printStackTrace();
		}
		renderText("failure");
	}
	
	/** 
	 * 从request中获得参数Map，并返回可读的Map 
	 *  
	 * @param request 
	 * @return 
	 */  
	private   Map<String,String> getParameterMap(String params) { 
		 // 返回值Map 
		Map<String,String> returnMap =null;
		if (!StrKit.isBlank(params)) {
			returnMap = new HashMap<String,String>();  
			String[] KeyValues = params.split("&");
			for (int i = 0; i < KeyValues.length; i++) {
				String[] keyValue = KeyValues[i].split("=");
				returnMap.put(keyValue[0], keyValue[1]);
			}
		}
		
	    return returnMap;  
	} 

}
