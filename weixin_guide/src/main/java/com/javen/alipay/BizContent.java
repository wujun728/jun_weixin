package com.javen.alipay;

/**
 * 业务参数封装 
 * @author Javen
 * https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.mViJGu&treeId=193&articleId=105465&docType=1
 */
public class BizContent {
	private String body;//对一笔交易的具体描述信息
	private String subject;//商品的标题
	private String out_trade_no;//商户网站唯一订单号
	
	private String total_amount;//订单总金额，单位为元，精确到小数点后两位
	private String product_code;//固定制QUICK_MSECURITY_PAY
	private String passback_params;//回传参数
	
	public BizContent() {
	}
	
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public String getOut_trade_no() {
		return out_trade_no;
	}
	public void setOut_trade_no(String out_trade_no) {
		this.out_trade_no = out_trade_no;
	}
	public String getTotal_amount() {
		return total_amount;
	}
	public void setTotal_amount(String total_amount) {
		this.total_amount = total_amount;
	}
	public String getProduct_code() {
		return product_code;
	}
	public void setProduct_code(String product_code) {
		this.product_code = product_code;
	}
	public String getPassback_params() {
		return passback_params;
	}
	public void setPassback_params(String passback_params) {
		this.passback_params = passback_params;
	}
}
