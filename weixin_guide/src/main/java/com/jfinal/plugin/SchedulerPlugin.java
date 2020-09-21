package com.jfinal.plugin;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ScheduledThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.jfinal.kit.StrKit;
import com.jfinal.log.Log;
import com.jfinal.plugin.IPlugin;

import it.sauronsoftware.cron4j.Scheduler;

/**
 * @ClassName: SchedulerPlugin
 * @Description: 简单任务调度插件，整合了cron4j和ScheduledThreadPoolExecutor
 */
public class SchedulerPlugin implements IPlugin {

	private static Log LOG = Log.getLog("SchedulerPlugin");

	/**
	 * cron调度器
	 */
	private final Scheduler cronScheduler = new Scheduler();

	/**
	 * ScheduledThreadPoolExecutor调度器
	 */
	private final ScheduledThreadPoolExecutor taskScheduler;

	/**
	 * 调度任务配置文件
	 */
	private final String jobConfigFile;

	/**
	 * <p>
	 * Title: SchedulerPlugin
	 * </p>
	 * <p>
	 * Description: 构造函数(线程池依据系统核心数自动设定)
	 * </p>
	 * 
	 * @since V1.0.0
	 */
	public SchedulerPlugin() {
		this(getBestPoolSize(), null);
	}

	/**
	 * <p>
	 * Title: SchedulerPlugin
	 * </p>
	 * <p>
	 * Description: 构造函数(指定调度线程池大小)
	 * </p>
	 * 
	 * @param scheduledThreadPoolSize
	 *            调度线程池大小
	 * @since V1.3.0
	 */
	public SchedulerPlugin(int scheduledThreadPoolSize) {
		this(scheduledThreadPoolSize, null);
	}

	/**
	 * <p>
	 * Title: SchedulerPlugin
	 * </p>
	 * <p>
	 * Description: 构造函数(指定调度任务配置文件，线程池依据系统核心数自动设定)
	 * </p>
	 * 
	 * @param jobConfigFile
	 *            调度任务配置文件
	 * @since V1.0.0
	 */
	public SchedulerPlugin(String jobConfigFile) {
		this(getBestPoolSize(), jobConfigFile);
	}

	/**
	 * <p>
	 * Title: SchedulerPlugin
	 * </p>
	 * <p>
	 * Description: 构造函数(指定调度线程池大小和调度任务配置文件)
	 * </p>
	 * 
	 * @param scheduledThreadPoolSize
	 *            调度线程池大小
	 * @param jobConfigFile
	 *            调度任务配置文件
	 * @since V1.3.0
	 */
	public SchedulerPlugin(int scheduledThreadPoolSize, String jobConfigFile) {
		this.jobConfigFile = jobConfigFile;
		this.taskScheduler = new ScheduledThreadPoolExecutor(scheduledThreadPoolSize);
	}

	/**
	 * @Title: cronSchedule
	 * @Description: 添加基于Linux下的crontab表达式的调度任务(Runnable)
	 * @param task
	 *            定期执行的任务(Runnable)
	 * @param cronExpression
	 *            cron调度表达式
	 * @since V1.0.0
	 */
	public void cronSchedule(Runnable task, String cronExpression) {
		this.cronScheduler.schedule(cronExpression, task);
	}

	/**
	 * @Title: fixedRateSchedule
	 * @Description: 立即启动，并以固定的频率来运行任务。后续任务的启动时间不受前次任务延时影响（并行）。
	 * @param task
	 *            定期执行的任务
	 * @param periodSeconds
	 *            每次执行任务的间隔时间(单位秒)
	 * @return
	 * @since V1.0.0
	 */
	public ScheduledFuture<?> fixedRateSchedule(Runnable task, int periodSeconds) {
		return taskScheduler.scheduleAtFixedRate(task, 0, periodSeconds, TimeUnit.SECONDS);
	}

	/**
	 * @Title: fixedDelaySchedule
	 * @Description: 立即启动，两次任务间保持固定的时间间隔(任务串行执行，前一个结束之后间隔固定时间后一个才会启动)
	 * @param task
	 *            定期执行的任务
	 * @param periodSeconds
	 *            每次执行任务的间隔时间(单位秒)
	 * @return
	 * @since V1.0.0
	 */
	public ScheduledFuture<?> fixedDelaySchedule(Runnable task, int periodSeconds) {
		return taskScheduler.scheduleWithFixedDelay(task, 0, periodSeconds, TimeUnit.SECONDS);
	}

	@Override
	public boolean start() {
		if (this.jobConfigFile != null) {
			// 任务配置文件非空,从配置文件汇总加载任务
			loadJobsFromConfigFile();
		}
		this.cronScheduler.setDaemon(true);
		this.cronScheduler.start();
		LOG.info("SchedulerPlugin is started");
		return true;
	}

	@Override
	public boolean stop() {
		this.cronScheduler.stop();
		this.taskScheduler.shutdown();
		LOG.info("SchedulerPlugin is stopped");
		return true;
	}

	/**
	 * @Title: loadJobsFromConfigFile
	 * @Description: 从配置文件汇总加载任务
	 * @since V1.0.0
	 */
	private void loadJobsFromConfigFile() {
		// 获取job配置文件
		Prop jobProp = PropKit.use(this.jobConfigFile);
		// 获得所有任务名
		Set<String> jobNames = this.getJobNamesFromProp(jobProp);
		// 逐个加载任务
		for (String jobName : jobNames) {
			loadJob(jobProp, jobName);
		}
	}

	/**
	 * @Title: loadJob
	 * @Description: 加载一个任务
	 * @param jobProp
	 *            job配置
	 * @param jobName
	 *            job名
	 * @since V1.0.0
	 */
	private void loadJob(Prop jobProp, String jobName) {
		// 任务开关，默认开启
		Boolean enable = jobProp.getBoolean(jobName + ".enable", Boolean.TRUE);
		// 任务被禁用，直接返回
		if (!enable) {
			return;
		}
		// 创建要执行的任务
		Runnable task = createTask(jobName, jobProp.get(jobName + ".class"));
		// 任务类型
		String taskType = jobProp.get(jobName + ".type");
		if (StrKit.isBlank(taskType)) {
			throw new RuntimeException("Please set " + jobName + ".type");
		}
		// 任务表达式
		String expr = jobProp.get(jobName + ".expr");
		if (StrKit.isBlank(expr)) {
			throw new RuntimeException("Please set " + jobName + ".expr");
		}
		// 依据任务类型，开始调度任务
		scheduleJobByType(jobName, taskType, expr, task);
		LOG.info("--------load job: " + jobName + " successfully--------");
		LOG.info("class: " + jobProp.get(jobName + ".class"));
		LOG.info("type : " + taskType);
		LOG.info("expr : " + expr);
		LOG.info("----------------");
	}

	/**
	 * @Title: scheduleJobByType
	 * @Description: 依据任务类型，开始调度任务
	 * @param jobName
	 *            任务名
	 * @param taskType
	 *            任务类型
	 * @param expr
	 *            调度表达式
	 * @param task
	 *            执行的任务
	 * @since V1.0.0
	 */
	private void scheduleJobByType(String jobName, String taskType, String expr, Runnable task) {
		if ("cron".equals(taskType)) {
			this.cronSchedule(task, expr);
		} else if ("fixedRate".equals(taskType)) {
			int periodSeconds = 0;
			try {
				periodSeconds = Integer.parseInt(expr);
			} catch (NumberFormatException e) {
				throw new RuntimeException(jobName + ".expr must be a number");
			}
			this.fixedRateSchedule(task, periodSeconds);
		} else if ("fixedDelay".equals(taskType)) {
			int periodSeconds = 0;
			try {
				periodSeconds = Integer.parseInt(expr);
			} catch (NumberFormatException e) {
				throw new RuntimeException(jobName + ".expr must be a number");
			}
			this.fixedDelaySchedule(task, periodSeconds);
		} else {
			throw new RuntimeException("Please set " + jobName + ".type to cron/fixedRate/fixedDelay");
		}
	}

	/**
	 * @Title: createTask
	 * @Description: 创建任务
	 * @param jobName
	 *            任务名
	 * @param taskClassName
	 *            任务类名
	 * @return Runnable对象
	 * @since V1.0.0
	 */
	private Runnable createTask(String jobName, String taskClassName) {
		if (taskClassName == null) {
			throw new RuntimeException("Please set " + jobName + ".className");
		}

		Object temp = null;
		try {
			temp = Class.forName(taskClassName).newInstance();
		} catch (Exception e) {
			throw new RuntimeException("Can not create instance of class: " + taskClassName, e);
		}

		Runnable task = null;
		if (temp instanceof Runnable) {
			task = (Runnable) temp;
		} else {
			throw new RuntimeException("Can not create instance of class: " + taskClassName
					+ ". this class must implements Runnable interface");
		}
		return task;
	}

	/**
	 * @Title: getJobNamesFromProp
	 * @Description: 获得所有任务名
	 * @param jobProp
	 *            job配置
	 * @return 任务名集合
	 * @since V1.0.0
	 */
	private Set<String> getJobNamesFromProp(Prop jobProp) {
		Map<String, Boolean> jobNames = new HashMap<String, Boolean>();
		for (Object item : jobProp.getProperties().keySet()) {
			String fullKeyName = item.toString();
			// 获得job名
			String jobName = fullKeyName.substring(0, fullKeyName.indexOf("."));
			jobNames.put(jobName, Boolean.TRUE);
		}
		return jobNames.keySet();
	}

	/**
	 * @Title: getBestPoolSize
	 * @Description: 获得调度线程池大小
	 * @return
	 * @since V1.0.0
	 */
	private static int getBestPoolSize() {
		try {
			final int cores = Runtime.getRuntime().availableProcessors();
			// 每个核有8个调度线程
			return cores * 8;
		} catch (Throwable e) {
			return 8;
		}
	}
}
