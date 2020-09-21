package com.mhuang.quartz.factory;

import org.quartz.spi.TriggerFiredBundle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.scheduling.quartz.AdaptableJobFactory;

/**
 * Quartz与Spring集成 
 * Job自动注入Spring容器托管的对象
 */
public class JobFactory extends AdaptableJobFactory {
	
    @Autowired
    private AutowireCapableBeanFactory capableBeanFactory;
    
    protected Object createJobInstance(TriggerFiredBundle bundle) throws Exception {
        Object jobInstance = super.createJobInstance(bundle);
        capableBeanFactory.autowireBean(jobInstance);
        return jobInstance;
    }
}
