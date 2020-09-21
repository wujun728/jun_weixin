package com.weixin.fastweixin.message.req;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class SendPicsInfoEvent extends BaseEvent {
	private String eventKey;
	private Integer count;
	@SuppressWarnings("rawtypes")
	private List<Map> picList;

	@SuppressWarnings("rawtypes")
	public SendPicsInfoEvent(String eventKey, Integer count, List<Map> picList) {
		super();
		this.eventKey = eventKey;
		this.count = count;
		this.picList = picList;
	}

	public String getEventKey() {
		return eventKey;
	}

	public void setEventKey(String eventKey) {
		this.eventKey = eventKey;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	@SuppressWarnings("rawtypes")
	public List<Map> getPicList() {
		return picList;
	}

	@SuppressWarnings("rawtypes")
	public void setPicList(List<Map> picList) {
		this.picList = picList;
	}

	@Override
	public String toString() {
		return "SendPicsInfoEvent{" + "eventKey='" + eventKey + '\'' + ", count=" + count + ", picList=" + picList + '}';
	}

}
