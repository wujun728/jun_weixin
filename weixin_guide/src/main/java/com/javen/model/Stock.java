package com.javen.model;

import java.util.List;

import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Model;

/**
 * 授权获取到的用户信息
 * @author Javen
 */
public class Stock extends Model<Stock> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(Stock.class);
	
	public static final Stock dao = new Stock();
	/**
	 * stockCount 减一
	 * @param courseId
	 * @return
	 */
	public boolean reduce(String courseId){
		Stock stock = getStockByCourdeId(courseId);
		int stockCount = stock.getInt("stockCount");
		stock.set("stockCount", stockCount-1);
		return stock.update();
	}
	
	/**
	 * 根据courseId 查询 库存
	 * @param courseId
	 * @return
	 */
	public Stock  getStockByCourdeId(String courseId){
		return dao.findFirst("select * from stock where courseId=?",courseId);
	}
	/**
	 * 设置所有的课程的库存量
	 */
	public void setAllStockCount(int count){
		List<Stock> list = dao.find("select * from stock");
		if (null!=list && list.size()>0) {
			for (Stock stock : list) {
				stock.set("stockCount", count);
				stock.update();
			}
		}
	}
	
	
}
