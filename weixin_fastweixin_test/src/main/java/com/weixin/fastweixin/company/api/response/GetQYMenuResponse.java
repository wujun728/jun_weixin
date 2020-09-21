package com.weixin.fastweixin.company.api.response;

import com.weixin.fastweixin.api.response.BaseResponse;
import com.weixin.fastweixin.company.api.entity.QYMenu;

/**
 * Response -- 获取菜单
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetQYMenuResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private QYMenu menu;

	public QYMenu getMenu() {
		return menu;
	}

	public void setMenu(QYMenu menu) {
		this.menu = menu;
	}

}
