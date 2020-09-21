package com.app.mq.consumer;

import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.stereotype.Component;
import net.sf.json.JSONObject;

/**
 * 
 * @ClassName: Consumer
 * @Description: 消费者
 * @author 卫志强
 * @date 2019年3月3日
 *
 */
@Component
public class Consumer {
	
	@Value("${IMAGES_PATH}")
	private String tPath;
	
	/**
	 * type: 1.功能
	 * @param data
	 * @throws Exception 
	 */
	@SuppressWarnings("unchecked")
	@JmsListener(destination = "${queue}")
	// activeMq监听监听接收消息队列
	public void receive(String data) throws Exception {// 这个data就是从消息队列获得到的参数
		Map<String, Object> map = JSONObject.fromObject(data);
		String type = map.get("type").toString();
		
	}
	
}
