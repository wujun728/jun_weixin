package com.mhuang.wechat.common.model.message.child;

import java.io.Serializable;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * 
 * @Description 公共子消息类
 * @author mHuang
 * @date 2015年6月5日 上午10:56:22 
 * @version V1.0.0
 */
@Data
@EqualsAndHashCode(callSuper=true)
public class BaseChildMessage extends BaseOtherMessage implements Serializable{

	private static final long serialVersionUID = 1L;

	private String title;
	
	private String descption;

	public static BaseChildMessage setChildMessage(String mediaId,String title,String descption){
		BaseChildMessage baseChildMessage = new BaseChildMessage();
		baseChildMessage.setMediaId(mediaId);
		baseChildMessage.setTitle(title);
		baseChildMessage.setDescption(descption);
		return baseChildMessage;
	}
}
