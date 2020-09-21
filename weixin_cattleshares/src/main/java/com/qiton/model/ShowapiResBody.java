/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.model
 *
 *    Filename:    ShowapiResBody.java
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
 *    Create at:   2016年10月31日 下午12:17:51
 *
 *    Revision:
 *
 *    2016年10月31日 下午12:17:51
 *        - first revision
 *
 *****************************************************************/
package com.qiton.model;

/**
 * @ClassName ShowapiResBody
 * @Description TODO(这里用一句话描述这个类的作用)
 * @author 抽离
 * @Date 2016年10月31日 下午12:17:51
 * @version 1.0.0
 */
public class ShowapiResBody {
	
	private StockMarket stockMarket;
	
	private KPic kPic;

	/**
	 * @return the stockMarket
	 */
	public StockMarket getStockMarket() {
		return stockMarket;
	}

	/**
	 * @param stockMarket the stockMarket to set
	 */
	public void setStockMarket(StockMarket stockMarket) {
		this.stockMarket = stockMarket;
	}

	/**
	 * @return the kPic
	 */
	public KPic getkPic() {
		return kPic;
	}

	/**
	 * @param kPic the kPic to set
	 */
	public void setkPic(KPic kPic) {
		this.kPic = kPic;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "ShowapiResBody [stockMarket=" + stockMarket + ", kPic=" + kPic + "]";
	}
		
	
	

	
		
}
