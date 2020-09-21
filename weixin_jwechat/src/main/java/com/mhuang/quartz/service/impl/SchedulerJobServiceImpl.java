package com.mhuang.quartz.service.impl;

import java.util.List;

import org.quartz.CronTrigger;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mhuang.quartz.model.SchedulerJob;
import com.mhuang.quartz.service.SchedulerJobService;
import com.mhuang.quartz.utils.ScheduleUtils;
 

/**
 * 定时任务基本操作实现类
 * @author Administrator
 *
 */
@Service("schedulerJobService")
public class SchedulerJobServiceImpl implements SchedulerJobService {
	
    private Logger logger = LoggerFactory.getLogger(getClass());
	
	@Autowired 
	private Scheduler scheduler;
 
	 
	/**
	 * 初始化任务
	 */
	public void init(List<SchedulerJob> crowdJobs) {
		for (SchedulerJob crowdJob : crowdJobs) {
			 addTask(crowdJob);
		 }
	}
	

	 
	/**
	 * 添加任务
	 */
	@Override
	public void addTask(SchedulerJob crowdJob) {
 
		CronTrigger cronTrigger;
		try {
			cronTrigger = ScheduleUtils.getCronTrigger(scheduler,
					crowdJob.getSchName(), crowdJob.getSchGroup());
			if (cronTrigger!=null) {
				ScheduleUtils.deleteScheduleJob(scheduler, crowdJob.getSchName(), crowdJob.getSchGroup());
			}
				ScheduleUtils.createScheduleJob(scheduler, crowdJob);
		} catch (SchedulerException e) {
			logger.debug("创建任务"+crowdJob.getSchName()+"失败......"+e.getMessage());
			e.printStackTrace();
		}
		 
	}
	/**
	 * 更新任务时间
	 */
	@Override
	public void updateTaskEndTime(SchedulerJob crowdJob) {
		try {
			ScheduleUtils.updateScheduleJob(scheduler, crowdJob);
		} catch (SchedulerException e) {
			logger.debug("更新任务"+crowdJob.getSchName()+"失败......"+e.getMessage());
			e.printStackTrace();
		}
	}
	
 

	@Override
	public void deleteTask(SchedulerJob crowdJob) {
  
        
		try {
			ScheduleUtils.deleteScheduleJob(scheduler, crowdJob.getSchName(), crowdJob.getSchGroup());
		} catch (SchedulerException e) {
			e.printStackTrace();
		}
	}


	

}
