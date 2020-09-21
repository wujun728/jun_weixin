package com.weixin.fastweixin.company.api.handle;

import java.util.Observable;

import com.weixin.fastweixin.company.api.config.QYConfigChangeNotice;
import com.weixin.fastweixin.handle.ApiConfigChangeHandle;
import com.weixin.fastweixin.util.BeanUtil;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public abstract class AbstractQYApiConfigChangeHandle implements ApiConfigChangeHandle {

	public void update(Observable o, Object arg) {
		if (BeanUtil.nonNull(arg) && arg instanceof QYConfigChangeNotice) {
			configChange((QYConfigChangeNotice) arg);
		}
	}

	/**
	 * 子类实现，当配置变化时触发该方法
	 * @param notice 消息
	 */
	public abstract void configChange(QYConfigChangeNotice notice);
}
