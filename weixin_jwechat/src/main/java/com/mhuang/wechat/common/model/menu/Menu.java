package com.mhuang.wechat.common.model.menu;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.annotation.JSONField;
import com.mhuang.wechat.common.consts.WechatConsts;

import lombok.Data;

/**
 * @Package: com.mhuang.wechat.common.menu
 * @Description 菜单
 * @author huang.miao
 * @date 2016年12月22日 上午10:56:23  
 * @since 1.0.0
 * @group skiper-opensource
 */
@Data
public class Menu implements Serializable{

	private static final long serialVersionUID = 1L;

	@JSONField(name=WechatConsts.BUTTON)
	private List<Button> button = new LinkedList<Button>();

	public void buttonAdd(String type,String name,String key){
		button.add(Button.add(type, name, key));
	}
	
	public Button buttonAddSub(String subName,String type,String name,String key){
		return Button.subButton(subName, type, name, key);
	}
	
	public static void main(String[] args) {
		Menu menu = new Menu();
		Button button = menu.buttonAddSub("subName", "click", "dianji", "1234");
		button.addSubButton("view", "viewName", "viewKey");
		button.addSubButton("view", "viewName", "viewKey");
		menu.getButton().add(button);
		System.out.println(JSON.toJSONString(menu));
	}
}
