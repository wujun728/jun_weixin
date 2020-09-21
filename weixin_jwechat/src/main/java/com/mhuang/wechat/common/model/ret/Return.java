package com.mhuang.wechat.common.model.ret;

import java.io.Serializable;

import com.alibaba.fastjson.annotation.JSONField;
import com.mhuang.wechat.common.consts.WechatConsts;
import com.thoughtworks.xstream.annotations.XStreamAlias;

import lombok.Data;

@Data
public class Return implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@JSONField(name=WechatConsts.RETURN_CODE)
	@XStreamAlias(WechatConsts.RETURN_CODE)
	private String returnCode;
	
	@JSONField(name=WechatConsts.RETURN_MSG)
	@XStreamAlias(WechatConsts.RETURN_CODE)
	private String returnMsg;
	
	public Return(){
		
	}
	public Return(String returnCode,String returnMsg){
		this.returnCode = returnCode;
		this.returnMsg = returnMsg;
	}
}
