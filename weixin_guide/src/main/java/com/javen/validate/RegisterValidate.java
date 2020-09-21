package com.javen.validate;

import com.javen.utils.RegexUtils;
import com.javen.validate.base.ShortCircuitValidate;
import com.jfinal.core.Controller;
import com.jfinal.render.JsonRender;


/**
 * 注册校验器
 * @author Javen
 * 2016年4月2日
 */
public class RegisterValidate extends ShortCircuitValidate {

	@Override
	protected void validate(Controller c) {
		int type = c.getParaToInt("regtype");
		System.out.println("type>>>>"+type);
		
		validateRequired("nickName", "message", "请输入昵称");
		
		//邮箱注册
		if (type==0){
			validateRequired("email", "message", "请输入您的邮箱");
			validateEmail("email", "message", "请检查您的邮箱");
			
		}else {
			validateRequired("tel", "message", "请输入您的手机号");
			validateRegex("tel", RegexUtils.PHONE, "message", "请检查您的手机号");
		}
		validateRequired("password", "message", "请输入您的密码");
		validateString("password", 6, 24, "message", "请输入6~24位的密码");

		validateRequired("imgCode", "message", "请输入验证码");
		validateCaptcha("imgCode", "message", "验证码错误");
		
		validateRequired("number", "message", "请输入手机验证密码");
		validateString("number", 6, 6, "message", "请输入6位的验证密码");
		
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("code", 1);
		c.render(new JsonRender().forIE());
	}

}
