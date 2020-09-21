package com.qiton.model;

/**
 * 
* @ClassName: SelectOptionTime 
* @Description: 条件查询 
* @author 尤
* @String 2016年11月9日 上午9:04:16 
*
 */
public class SelectOptionTime {
	
	private String firstTime;      //查询起始时间
	private String lastTime;//查询结束时间
	
	public SelectOptionTime() {
		super();
	}

	public SelectOptionTime(String firstTime, String lastTime) {
		super();
		this.firstTime = firstTime;
		this.lastTime = lastTime;
	}

	public String getFirstTime() {
		return firstTime;
	}

	public void setFirstTime(String firstTime) {
		this.firstTime = firstTime;
	}

	public String getLastTime() {
		return lastTime;
	}

	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}

	@Override
	public String toString() {
		return "SelectOptionTime [firstTime=" + firstTime + ", lastTime=" + lastTime + "]";
	}
	
	
}
