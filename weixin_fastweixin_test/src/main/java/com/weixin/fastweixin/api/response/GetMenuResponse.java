package com.weixin.fastweixin.api.response;

import com.weixin.fastweixin.api.entity.Menu;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetMenuResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private Menu menu;

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}
}
