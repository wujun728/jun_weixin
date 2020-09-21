package com.javen.validate;

import com.javen.utils.RegexUtils;
import com.javen.validate.base.ShortCircuitValidate;
import com.jfinal.core.Controller;
import com.jfinal.render.JsonRender;


/**
 * 登录校验器
 * @author Javen
 * 2016年4月2日
 */
public class LoginValidate extends ShortCircuitValidate {

	@Override
	protected void validate(Controller c) {
		validateRequired("account", "message", "请输入您的登陆账号");
		validateRegex("account", RegexUtils.EMAIL_OR_PHONE, "message", "请检查您的登陆账号");
		
		validateRequired("password", "message", "请输入您的密码");
		validateString("password", 6, 24, "message", "请输入6~24位的密码");
		
		validateRequired("imgCode", "message", "请输入验证码");
		validateCaptcha("imgCode", "message", "验证码错误");
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("code", 1);
		c.render(new JsonRender().forIE());
	}

}
