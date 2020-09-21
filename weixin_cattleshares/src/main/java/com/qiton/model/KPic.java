/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.model
 *
 *    Filename:    KPic.java
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
 *    Create at:   2016年10月31日 下午4:34:14
 *
 *    Revision:
 *
 *    2016年10月31日 下午4:34:14
 *        - first revision
 *
 *****************************************************************/
package com.qiton.model;

/**
 * @ClassName KPic
 * @Description TODO(这里用一句话描述这个类的作用)
 * @author 抽离
 * @Date 2016年10月31日 下午4:34:14
 * @version 1.0.0
 */
public class KPic {
	private String remark;
	
	private String monthurl;
	
	private String minurl;
	
	private String weekurl;
	
	private String dayurl;

	/**
	 * @return the remark
	 */
	public String getRemark() {
		return remark;
	}

	/**
	 * @param remark the remark to set
	 */
	public void setRemark(String remark) {
		this.remark = remark;
	}

	/**
	 * @return the monthurl
	 */
	public String getMonthurl() {
		return monthurl;
	}

	/**
	 * @param monthurl the monthurl to set
	 */
	public void setMonthurl(String monthurl) {
		this.monthurl = monthurl;
	}

	/**
	 * @return the minurl
	 */
	public String getMinurl() {
		return minurl;
	}

	/**
	 * @param minurl the minurl to set
	 */
	public void setMinurl(String minurl) {
		this.minurl = minurl;
	}

	/**
	 * @return the weekurl
	 */
	public String getWeekurl() {
		return weekurl;
	}

	/**
	 * @param weekurl the weekurl to set
	 */
	public void setWeekurl(String weekurl) {
		this.weekurl = weekurl;
	}

	/**
	 * @return the dayurl
	 */
	public String getDayurl() {
		return dayurl;
	}

	/**
	 * @param dayurl the dayurl to set
	 */
	public void setDayurl(String dayurl) {
		this.dayurl = dayurl;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		return "KPic [remark=" + remark + ", monthurl=" + monthurl + ", minurl=" + minurl + ", weekurl=" + weekurl
				+ ", dayurl=" + dayurl + "]";
	}
	
	
}
