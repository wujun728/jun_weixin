/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.model
 *
 *    Filename:    StockMarket.java
 *
 *    Description: TODO(用一句话描述该文件做什么)
 *
 *    Copyright:   Copyright (c) 2001-2014
 *
 *    Company:     fzqblog
 *
 *    @author:     抽离
 *
 *    @version:    1.0.0
 *
 *    Create at:   2016年10月31日 下午12:12:24
 *
 *    Revision:
 *
 *    2016年10月31日 下午12:12:24
 *        - first revision
 *
 *****************************************************************/
package com.qiton.model;

/**
 * @ClassName StockMarket
 * @Description TODO(这里用一句话描述这个类的作用)
 * @author 抽离
 * @Date 2016年10月31日 下午12:12:24
 * @version 1.0.0
 */
public class StockMarket {
	private double nowPrice;
	
	private String name;
	
	private String code;

	/**
	 * @return the nowPrice
	 */
	public double getNowPrice() {
		return nowPrice;
	}

	/**
	 * @param nowPrice the nowPrice to set
	 */
	public void setNowPrice(double nowPrice) {
		this.nowPrice = nowPrice;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "StockMarket [nowPrice=" + nowPrice + ", name=" + name + ", code=" + code + "]";
	}

	

	
	
}
