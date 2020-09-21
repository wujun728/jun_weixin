package com.mhuang.wechat.common.model.message.child;

import java.io.Serializable;

import com.alibaba.fastjson.annotation.JSONField;
import com.mhuang.wechat.common.consts.WechatConsts;
import com.thoughtworks.xstream.annotations.XStreamAlias;

import lombok.Data;
import lombok.EqualsAndHashCode;


/**
 * 
 * @Description 图文
 * @author mHuang
 * @date 2015年6月4日 下午5:03:47 
 * @version V1.0.0
 */
@Data
@EqualsAndHashCode(callSuper=true)
@XStreamAlias(WechatConsts.ITEM)
public class Article extends BaseChildMessage implements Serializable{
	 
	private static final long serialVersionUID = 1L;

	@JSONField(name=WechatConsts.PICURL) 
	private String picUrl;
	
	private String url;

	public static Article getArticle(String title,String descption,String picUrl,String url){
		Article article = new Article();
		article.setTitle(title);
		article.setDescption(descption);
		article.setPicUrl(picUrl);
		article.setUrl(url);
		return article;
	}
}
