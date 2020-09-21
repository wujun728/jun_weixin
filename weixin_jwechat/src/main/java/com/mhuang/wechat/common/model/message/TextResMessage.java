package com.mhuang.wechat.common.model.message;

import com.alibaba.fastjson.annotation.JSONField;
import com.mhuang.wechat.common.consts.WechatConsts;
import com.mhuang.wechat.common.model.message.child.Content;

import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * 
 * @Description 文本响应消息
 * @author mHuang
 * @date 2015年6月4日 下午4:41:51 
 * @version V1.0.0
 */
@Data
@EqualsAndHashCode(callSuper=true)
public class TextResMessage extends BaseMessage{

	private static final long serialVersionUID = 1L;
	
	@JSONField(serialize = false)
	private String content;

	@JSONField(name = WechatConsts.TEXT)
	private Content contentes;
	

	public TextResMessage(){
		setMsgType(WechatConsts.TEXT);
	}
	
	
	public TextResMessage(String toUserName,String fromUserName){
		super(toUserName,fromUserName);
		setMsgType(WechatConsts.TEXT);
	}
	
	//////////////////////////////////json///////////////////////////////
	public TextResMessage(String toUser){
		super(toUser);
	}
	
	public void saveJSON(String toUser,String content){
		setToUserName(toUser);
		if(contentes == null)
			contentes = new Content(); 
		contentes.setContent(content);
	}
}
