package com.mhuang.quartz.service;

import java.util.List;

import com.mhuang.quartz.model.SchedulerJob;

/**
 * 定时任务基本操作接口
 * @author Administrator
 *
 */
public interface SchedulerJobService {

	/**
	 * 初始化
	 */
	public void init(List<SchedulerJob> crowdJobs);

	/**
	 * 添加任务
	 */
	public void addTask(SchedulerJob schedulerJob);
	/**
	 * 删除任务
	 */
	public void deleteTask(SchedulerJob schedulerJob);
	/**
	 *更新任务 执行时间
	 */
	public void updateTaskEndTime(SchedulerJob schedulerJob);
}
