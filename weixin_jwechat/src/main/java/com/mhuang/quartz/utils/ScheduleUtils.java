package com.mhuang.quartz.utils;

import org.quartz.CronScheduleBuilder;
import org.quartz.CronTrigger;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.TriggerBuilder;
import org.quartz.TriggerKey;

import com.mhuang.quartz.model.SchedulerJob;

/**
 * 对quartz基本操作封装
 * @author Administrator
 *
 */
public class ScheduleUtils {
	
	/**
     * 获取触发器key
     * 
     * @param jobName
     * @param jobGroup
     * @return
     */
    public static TriggerKey getTriggerKey(String jobName, String jobGroup) {
        return TriggerKey.triggerKey(jobName, jobGroup);
    }

    
    /**
     * 获取表达式触发器
     *
     * @param scheduler the scheduler
     * @param jobName the job name
     * @param jobGroup the job group
     * @return cron trigger
     * @throws SchedulerException 
     */
    public static CronTrigger getCronTrigger(Scheduler scheduler, String jobName, String jobGroup) throws SchedulerException {
    	TriggerKey triggerKey = TriggerKey.triggerKey(jobName, jobGroup);
        return (CronTrigger) scheduler.getTrigger(triggerKey);
    }
    

    /**
     * 创建任务
     *
     * @param scheduler the scheduler
     * @param scheduleJob the schedule job
     * @throws SchedulerException 
     */
    public static void createScheduleJob(Scheduler scheduler, SchedulerJob crowdJob) throws SchedulerException {
        createScheduleJob(scheduler, crowdJob.getSchName(), crowdJob.getSchGroup(),
        		crowdJob.getSchCronExpression(),  crowdJob,crowdJob.getSchClassname());
    }
    
    
    /**
     * 创建定时任务
     * @param scheduler
     * @param jobName
     * @param jobGroup
     * @param cronExpression
     * @param param
     * @param sch_classname
     * @throws SchedulerException
     */
    @SuppressWarnings("unchecked")
	public static void createScheduleJob(Scheduler scheduler, String jobName, String jobGroup,
                                         String cronExpression, Object param,String sch_classname) throws SchedulerException {
    	Class<?> class1 = null;
//    	Class<?> class2 = null;
    	try {
			class1 = Class.forName(sch_classname);
//			class2 = Class.forName(sch_classnamesync);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
        //同步或异步
//        Class<? extends Job> jobClass = isSync ? (Class<? extends Job>) class2 : (Class<? extends Job>) class1;
        Class<? extends Job> jobClass =(Class<? extends Job>) class1;

        //构建job信息
        JobDetail jobDetail = JobBuilder.newJob(jobClass).withIdentity(jobName, jobGroup).build();

        //放入参数，运行时的方法可以获取
        jobDetail.getJobDataMap().put("jobParam", param);

        //表达式调度构建器
        CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(cronExpression);

        //按新的cronExpression表达式构建一个新的trigger
        CronTrigger trigger = TriggerBuilder.newTrigger().withIdentity(jobName, jobGroup)
            .withSchedule(scheduleBuilder).build();

        scheduler.scheduleJob(jobDetail, trigger);
 
    }
    
    /**
     * 获取jobKey
     *
     * @param jobName the job name
     * @param jobGroup the job group
     * @return the job key
     */
    public static JobKey getJobKey(String jobName, String jobGroup) {
        return JobKey.jobKey(jobName, jobGroup);
    }

    /**
     * 更新定时任务
     *
     * @param scheduler the scheduler
     * @param scheduleJob the schedule job
     * @throws SchedulerException 
     */
    public static void updateScheduleJob(Scheduler scheduler, SchedulerJob crowdJob) throws SchedulerException {
        updateScheduleJob(scheduler, crowdJob.getSchName(), crowdJob.getSchGroup(),
        		crowdJob.getSchCronExpression(),  crowdJob);
    }
    
    /**
     * 更新定时任务
     *
     * @param scheduler the scheduler
     * @param jobName the job name
     * @param jobGroup the job group
     * @param cronExpression the cron expression
     * @param isSync the is sync
     * @param param the param
     * @throws SchedulerException 
     */
    public static void updateScheduleJob(Scheduler scheduler, String jobName, String jobGroup,
                                         String cronExpression, Object param) throws SchedulerException {
    	TriggerKey triggerKey = ScheduleUtils.getTriggerKey(jobName, jobGroup);

        //表达式调度构建器
        CronScheduleBuilder scheduleBuilder = CronScheduleBuilder.cronSchedule(cronExpression);

        CronTrigger trigger = (CronTrigger) scheduler.getTrigger(triggerKey);

        //按新的cronExpression表达式重新构建trigger
        trigger = trigger.getTriggerBuilder().withIdentity(triggerKey).withSchedule(scheduleBuilder)
            .build();

        //按新的trigger重新设置job执行
        scheduler.rescheduleJob(triggerKey, trigger);
    }

    /**
     * 删除定时任务
     *
     * @param scheduler
     * @param jobName
     * @param jobGroup
     * @throws SchedulerException 
     */
    public static void deleteScheduleJob(Scheduler scheduler, String jobName, String jobGroup) throws SchedulerException {
    	scheduler.deleteJob(getJobKey(jobName, jobGroup));
    }
    
}
