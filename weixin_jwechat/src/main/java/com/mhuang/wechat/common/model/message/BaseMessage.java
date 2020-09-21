package com.mhuang.wechat.common.model.message;

import java.io.Serializable;

import com.alibaba.fastjson.annotation.JSONField;
import com.mhuang.wechat.common.consts.WechatConsts;

import lombok.Data;

/**
 * 
 * @Description 基础消息配置
 * @author mHuang
 * @date 2015年6月4日 下午4:44:27 
 * @version V1.0.0
 */
@Data
public abstract class BaseMessage implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@JSONField(name=WechatConsts.TOUSER)
	private String toUserName;
	
	@JSONField(serialize = false)
	private String fromUserName;
	
	@JSONField(serialize = false)
	private Long createTime;
	
	@JSONField(name = WechatConsts.MSGTYPE)
	private String msgType = WechatConsts.NULL_STR;

	public BaseMessage(){
		
	}
	
	public BaseMessage(String tuser){
		setToUserName(tuser);
	}
	
	public BaseMessage(String toUserName,String fromUserName){
		setToUserName(toUserName);
		setFromUserName(fromUserName);
		setCreateTime(System.currentTimeMillis());
	}
	
}
