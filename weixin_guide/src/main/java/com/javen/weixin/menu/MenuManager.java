/**
 * Copyright (c) 2015-2016, Javen Zhou  (javen205@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.javen.weixin.menu;


import com.jfinal.kit.JsonKit;
import com.jfinal.weixin.sdk.api.ApiConfig;
import com.jfinal.weixin.sdk.api.ApiConfigKit;
import com.jfinal.weixin.sdk.api.ApiResult;
import com.jfinal.weixin.sdk.api.MenuApi;

/**
 * 菜单管理器类 
 * @author Javen
 * 2016年5月30日
 */
public class MenuManager  {
	 public static void main(String[] args) { 
		 
		   // 将菜单对象转换成json字符串
		   //有问题：主菜单项多了一个type
		   String jsonMenu = JsonKit.toJson(getTestMenu()).toString();
		   System.out.println(jsonMenu);
		   ApiConfig ac = new ApiConfig();
			
			// 配置微信 API 相关常量
		   String appId = "wx614c453e0d1dcd12";
			ac.setAppId(appId);
			ac.setAppSecret("19a02e4927d346484fc70327970457f9");
//			ac.setAppId(PropKit.get("appId"));
//			ac.setAppSecret(PropKit.get("appSecret"));
			ApiConfigKit.putApiConfig(ac);
			ApiConfigKit.setThreadLocalAppId(appId);
		   
		   //创建菜单
	       ApiResult apiResult=MenuApi.createMenu(jsonMenu);
	       System.out.println(apiResult.getJson());
	 }  
	 
	 
	  
	    /** 
	     * 组装菜单数据 
	     *  
	     * @return 
	     */  
	    private static Menu getTestMenu() {  
	    	ClickButton btn11 = new ClickButton();  
	        btn11.setName("微信相册发图");  
	        btn11.setType("pic_weixin");  
	        btn11.setKey("rselfmenu_1_1");
	  
	        ClickButton btn12 = new ClickButton();  
	        btn12.setName("拍照或者相册发图");  
	        btn12.setType("pic_photo_or_album");  
	        btn12.setKey("rselfmenu_1_2");;  
	  
	        ClickButton btn13 = new ClickButton();  
	        btn13.setName("系统拍照发图");  
	        btn13.setType("pic_sysphoto");  
	        btn13.setKey("rselfmenu_1_3");
	  
	        ClickButton btn21 = new ClickButton();  
	        btn21.setName("扫码带提示");  
	        btn21.setType("scancode_waitmsg");  
	        btn21.setKey("rselfmenu_2_1");;  
	  
	        ClickButton btn22 = new ClickButton();  
	        btn22.setName("扫码推事件");  
	        btn22.setType("scancode_push");  
	        btn22.setKey("rselfmenu_2_2");;  
	  
	        ViewButton btn23 = new ViewButton();  
	        btn23.setName("我的设备");  
	        btn23.setType("view");  
	        btn23.setUrl("https://hw.weixin.qq.com/devicectrl/panel/device-list.html?appid=wx614c453e0d1dcd12"); 
	        
	        ViewButton btn31 = new ViewButton();  
	        btn31.setName("微社区");  
	        btn31.setType("view");  
	        btn31.setUrl("http://whsf.tunnel.mobi/whsf/msg/wsq");  
	  
	        
	        ClickButton btn32 = new ClickButton();  
	        btn32.setName("发送位置");  
	        btn32.setType("location_select");  
	        btn32.setKey("rselfmenu_3_2"); 
	  
	        //http://tencent://message/?uin=572839485&Site=在线咨询&Menu=yes
	        //http://wpa.qq.com/msgrd?v=3&uin=572839485&site=qq&menu=yes
	        
	        ViewButton btn33 = new ViewButton();  
	        btn33.setName("在线咨询");  
	        btn33.setType("view");  
	        btn33.setUrl("http://wpa.qq.com/msgrd?v=3&uin=572839485&site=qq&menu=yes");  
	  
	        ViewButton btn34 = new ViewButton();  
	        btn34.setName("我的博客");  
	        btn34.setType("view");  
	        btn34.setUrl("http://www.cnblogs.com/zyw-205520"); 
	        
	        ClickButton btn35 = new ClickButton();  
	        btn35.setName("点击事件");  
	        btn35.setType("click");  
	        btn35.setKey("rselfmenu_3_5"); 
	        
	        ComButton mainBtn1 = new ComButton();  
	        mainBtn1.setName("发图");  
	        mainBtn1.setSub_button(new Button[] { btn11, btn12, btn13});  
	  
	        ComButton mainBtn2 = new ComButton();  
	        mainBtn2.setName("扫码");  
	        mainBtn2.setSub_button(new Button[] { btn21, btn22 ,btn23});  
	  
	        ComButton mainBtn3 = new ComButton();  
	        mainBtn3.setName("个人中心");  
	        mainBtn3.setSub_button(new Button[] { btn31, btn32, btn33, btn34 ,btn35 });  
	  
	        /** 
	         * 这是公众号xiaoqrobot目前的菜单结构，每个一级菜单都有二级菜单项<br> 
	         *  
	         * 在某个一级菜单下没有二级菜单的情况，menu该如何定义呢？<br> 
	         * 比如，第三个一级菜单项不是“更多体验”，而直接是“幽默笑话”，那么menu应该这样定义：<br> 
	         * menu.setButton(new Button[] { mainBtn1, mainBtn2, btn33 }); 
	         */  
	        Menu menu = new Menu();  
	        menu.setButton(new Button[] { mainBtn1, mainBtn2, mainBtn3 });  
	        return menu;  
	    }
}
