package com.javen.controller;

import com.javen.model.Users;
import com.javen.utils.WeiXinUtils;
import com.jfinal.core.Controller;

/**
 * 暂时未使用
 * @author Javen
 * 2016年3月20日
 */
public class UserController extends Controller {
	public void index(){
		renderJson(Users.me.getAll());
	}
	
	public void save(){
		Users.me.save("1123eeeee", WeiXinUtils.filterWeixinEmoji("*ೄ˚༄Javen༡💯"), "dfsfsadfs","http：//", "中国",  "武汉", "湖北", 1);
		renderJson(Users.me.getAll());
	}
	
	public void findByOpenId(){
		renderJson(Users.me.findByOpenId("o_pncsidC-pRRfCP4zj98h6slREw"));
	}
}
