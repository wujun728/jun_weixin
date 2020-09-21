package com.javen.entity;

public class PayAttach {
	//商户订单号
	private String orderId;
	//课程编号
	private int courseId;
	//购买的课时数量
	private int couresCount;
	
	
	
	public PayAttach(String orderId, int courseId, int couresCount) {
		this.orderId = orderId;
		this.courseId = courseId;
		this.couresCount = couresCount;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public int getCourseId() {
		return courseId;
	}
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	public int getCouresCount() {
		return couresCount;
	}
	public void setCouresCount(int couresCount) {
		this.couresCount = couresCount;
	}
	
	
}
