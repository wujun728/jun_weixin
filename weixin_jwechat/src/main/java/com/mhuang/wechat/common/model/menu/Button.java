package com.mhuang.wechat.common.model.menu;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.util.CollectionUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;
import com.mhuang.wechat.common.consts.WechatConsts;

import lombok.Data;


/**
 * 
 * @Description 一级button
 * @author mHuang
 * @date 2015年6月8日 下午2:26:28 
 * @version V1.0.0
 */ 
@Data
public class Button implements Serializable{

	private static final long serialVersionUID = 1L;

	private String name;
	
	private String type;
	
	private String key;
	
	private String url;
	
	@JSONField(name = WechatConsts.MEDIA_ID)
	private String mediaId;
	
	@JSONField(name= WechatConsts.SUB_BUTTON)
	private List<Button> subButton;

	public Button(){
		
	}
	
	public static Button subButton(String subName,String type,String name,String key){
		Button button = new Button();
		button.setName(name);
		if(CollectionUtils.isEmpty(button.getSubButton())){
			button.setSubButton(new LinkedList<Button>());
		}
		button.getSubButton().add(Button.add(type, subName, key));
		return button;
	}
	
	public void addSubButton(String type,String name,String key){
		if(CollectionUtils.isEmpty(getSubButton())){
			setSubButton(new LinkedList<Button>());
		}
		getSubButton().add(Button.add(type, name, key));
	}
	
	public Button(String type,String name,String key){
		if(StringUtils.equals(WechatConsts.VIEW, type)){
			setUrl(key);
		}else if(StringUtils.equals(WechatConsts.VIEW_LIMITED, type) || StringUtils.equals(WechatConsts.MEDIA_ID, type)){
			setMediaId(key);
		}else{
			setKey(key);
		}
		setType(type);
		setName(name);
	}
	
	public static Button add(String type,String name,String key){
		return new Button(type,name,key);
	}

	public static void main(String[] args){
		System.out.println(JSON.toJSONString(new Button()));
	}
}
