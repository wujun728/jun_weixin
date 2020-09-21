package com.weixin.fastweixin.company.api.entity;

import java.util.ArrayList;
import java.util.List;

import com.weixin.fastweixin.api.entity.BaseModel;
import com.weixin.fastweixin.exception.WeixinException;

/**
 * 微信完整菜单
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYMenu extends BaseModel {

	private static final long serialVersionUID = 1L;

	private List<QYMenuButton> button;// 一级菜单。总共3个

	public List<QYMenuButton> getButton() {
		return button;
	}

	public void setButton(List<QYMenuButton> button) {
		if (button.size() > 3) {
			throw new WeixinException("一级菜单最多3个");
		}
		this.button = button;
	}

	public void addButton(QYMenuButton singleButton) {
		if (button == null) {
			button = new ArrayList<QYMenuButton>(3);
		}
		if (button.size() == 3) {
			throw new WeixinException("一级菜单最多3个");
		}

		this.button.add(singleButton);
	}

}
