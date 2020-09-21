package com.mhuang.wechat.common.model.message.child;

import java.io.Serializable;

import com.alibaba.fastjson.annotation.JSONField;
import com.mhuang.wechat.common.consts.WechatConsts;

import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * 
 * @Description 响应音乐消息
 * @author mHuang
 * @date 2015年6月5日 下午1:53:05 
 * @version V1.0.0
 */
@Data
@EqualsAndHashCode(callSuper=true)
public class Music extends BaseChildMessage implements Serializable{

	private static final long serialVersionUID = 1L;

	@JSONField(name=WechatConsts.MUSICURL)
	private String musicUrl;
	
	@JSONField(name=WechatConsts.HQMUSICURL)
	private String hQMusicUrl;
	
	@JSONField(name=WechatConsts.THUMB_MEDIA_URL)
	private String thumbMediaId;

	public static Music setMusicMessage(String title,String descption,String musicUrl,String hQMusicUrl,String thumbMediaId){
		Music music = new Music();
		music.setTitle(title);
		music.setDescption(descption);
		music.setMusicUrl(hQMusicUrl);
		music.setHQMusicUrl(hQMusicUrl);
		music.setThumbMediaId(thumbMediaId);
		return music;
	}
}
