package com.app.quartz.config;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import com.app.common.util.ToolUtil;
import com.app.dao.SysQuartzDao;
import com.app.entity.SysQuartz;

@Component
public class TaskRunner implements ApplicationRunner, Ordered {

    @Autowired
    private SysQuartzDao sysQuartzDao;

    @Autowired
    private QuartzService quartzService;
    
    @Value("${quartz.ip}")  
    private String quartzIp;
	
	@Value("${quartz.port}")  
    private String quartzPort;

	@Override
	public void run(ApplicationArguments applicationArguments) throws Exception {
		System.out.println("定时任务程序启动");
		Map<String, Object> map = new HashMap<>();
		map.put("quartzIp", quartzIp);
		map.put("quartzPort", quartzPort);
		List<SysQuartz> sysQuartzList = sysQuartzDao.selectAll(map);
		for (SysQuartz qz : sysQuartzList) {
			System.out.println("重启任务:" + qz);
			// 检查日期，如果超了，就重置为当前日期+2分钟
			if (!quartzService.checkCron(qz.getCron())) {
				Date date = ToolUtil.getAfDate(new Date(), 2, "m");
				qz.setCron(ToolUtil.getTime(date, "s") + " "
						+ ToolUtil.getTime(date, "m") + " "
						+ ToolUtil.getTime(date, "H") + " "
						+ ToolUtil.getTime(date, "d") + " "
						+ ToolUtil.getTime(date, "M") + " ? "
						+ ToolUtil.getTime(date, "y"));
				System.out.println("重置任务时间:" + qz);
			}
			quartzService.startJob(qz);
		}
	}
	
    @Override
    public int getOrder() {
        return 0;
    }
}