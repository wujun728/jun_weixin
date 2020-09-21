package com.mhuang.quartz.model;

import java.io.Serializable;
import java.util.Date;

/**
 * 定时任务基本信息
 * @author Administrator
 *
 */
public class SchedulerJob implements Serializable{

 	private static final long serialVersionUID = 7713901003069514542L;
 	/** 
 	 * 定时任务id
 	 *  */
	private Long schJob;
	/** 
 	 * 任务id
 	 *  */
	private Long shcTask;

	/** 任务名称 */
	private String schName;
  
	/** 任务分组 */
	private String schGroup;

	/** 任务状态 */
	private String schStatus;

	/** 任务运行时间表达式 */
	private String schCronExpression;
 

	/** 任务描述 */
	private String schDescription;

	/** 创建时间 */
	private Date schCreate;
	/**
	 * 执行的任务类 非同步 绝对路径
	 */
	private String schClassname;
	public Long getSchJob() {
		return schJob;
	}
	public void setSchJob(Long schJob) {
		this.schJob = schJob;
	}
	public Long getShcTask() {
		return shcTask;
	}
	public void setShcTask(Long shcTask) {
		this.shcTask = shcTask;
	}
	public String getSchName() {
		return schName;
	}
	public void setSchName(String schName) {
		this.schName = schName;
	}
	public String getSchGroup() {
		return schGroup;
	}
	public void setSchGroup(String schGroup) {
		this.schGroup = schGroup;
	}
	public String getSchStatus() {
		return schStatus;
	}
	public void setSchStatus(String schStatus) {
		this.schStatus = schStatus;
	}
	public String getSchCronExpression() {
		return schCronExpression;
	}
	public void setSchCronExpression(String schCronExpression) {
		this.schCronExpression = schCronExpression;
	}
	public String getSchDescription() {
		return schDescription;
	}
	public void setSchDescription(String schDescription) {
		this.schDescription = schDescription;
	}
	public Date getSchCreate() {
		return schCreate;
	}
	public void setSchCreate(Date schCreate) {
		this.schCreate = schCreate;
	}
	public String getSchClassname() {
		return schClassname;
	}
	public void setSchClassname(String schClassname) {
		this.schClassname = schClassname;
	}
	
	 
	 
	 
	 
	
}
