package com.javen.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.javen.model.TUser;
import com.jfinal.core.Controller;
import com.jfinal.kit.JsonKit;

/**
 * @author Javen
 * 2016年3月20日
 */
public class TUserController extends Controller {
	public void index(){
		Map<String, Object> paras=new HashMap<String, Object>();
		paras.put("order", "lastLoginDate desc");
//		paras.put("limit", "1");
		List<TUser> users = TUser.dao.findByMap(paras);
		
		System.out.println(JsonKit.toJson(users));
		
		setAttr("users", users);
		render("tuser.jsp");
	}
	
}
