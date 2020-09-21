package com.weixin.fastweixin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.weixin.fastweixin.api.config.ConfigChangeNotice;
import com.weixin.fastweixin.handle.AbstractApiConfigChangeHandle;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class TestConfigChangeHandle extends AbstractApiConfigChangeHandle {

	private static final Logger LOG = LoggerFactory.getLogger(TestConfigChangeHandle.class);

	@Override
	public void configChange(ConfigChangeNotice notice) {
		LOG.debug("收到通知.....");
		LOG.debug(notice.toJsonString());
	}
}
