package com.javen.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

/**
 * @author Javen
 * 2016年3月20日
 * 订单
 */
public class Order extends Model<Order> {
	private static final long serialVersionUID = 2387542071731521827L;
	public static final Order dao=new Order();
	
	/**
	 * 查询订单
	 * @param attach
	 * @param openId
	 * @return
	 */
	public Order getOrderByAttach(String attach,String openId){
		 return dao.findFirst("select * from orders where openId=? and attach like ? order by time_end desc",openId,"%\"courseId\":"+attach+"%");
	}
	
	public boolean saveOrder(String appid,String out_trade_no, String openId, String mch_id, int cash_fee, int total_fee, String fee_type, String result_code, String err_code, String err_code_des, String is_subscribe, String trade_type, String bank_type, String transaction_id, String attach, String time_end , int couresCount ,int couresId ,String url){
		Order order=new Order();
		order.set("appid", appid);
		order.set("out_trade_no", out_trade_no);
		order.set("openId", openId);
		order.set("mch_id", mch_id);
		order.set("total_fee", total_fee);
		order.set("cash_fee", cash_fee);
		order.set("fee_type", fee_type);
		order.set("result_code", result_code);
		order.set("err_code", err_code);
		order.set("err_code_des", err_code_des);
		order.set("is_subscribe", is_subscribe);
		order.set("trade_type", trade_type);
		order.set("bank_type", bank_type);
		order.set("transaction_id", transaction_id);
//		order.set("coupon_id", coupon_id);
//		order.set("coupon_fee", coupon_fee);
//		order.set("coupon_count", coupon_count);
		order.set("attach", attach);
		order.set("time_end", time_end);
		order.set("couresCount", couresCount);
		order.set("couresId", couresId);
		order.set("url", url);
		return order.save();
	}
	
	/**
	 * 根据订单号查询订单
	 * @param transaction_id
	 * @return
	 */
	public Order getOrderByTransactionId(String transaction_id){
		return dao.findFirst("select * from orders where transaction_id=?",transaction_id);
	}
	/**
	 * 根据OpenId查询订单
	 * @param openId
	 * @return
	 */
	public List<Order> getOrderByOpenId(String openId){
		return dao.find("select * from orders where openId=?",openId);
	}
}
