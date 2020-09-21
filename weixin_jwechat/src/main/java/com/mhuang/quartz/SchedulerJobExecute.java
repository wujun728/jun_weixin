package com.mhuang.quartz;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

/**
 * 任务执行类 
 * 定时任务类 实现该接口
 * @author Administrator
 */
public interface SchedulerJobExecute extends Job {
	 
	@Override
	public void execute(JobExecutionContext context);
	 
 
}
