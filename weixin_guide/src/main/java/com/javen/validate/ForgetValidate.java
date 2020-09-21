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
public class ForgetValidate extends ShortCircuitValidate {

	@Override
	protected void validate(Controller c) {
		int type = c.getParaToInt("forgettype");
		System.out.println("forgettype>>>>"+type);
		//邮箱注册
		if (type==0){
			validateRequired("account", "message", "请输入您要找回密码的账号");
			validateRegex("account", RegexUtils.EMAIL_OR_PHONE, "message", "请检查您要找回密码的账号格式");

			validateRequired("imgCode", "message", "请输入验证码");
			validateCaptcha("imgCode", "message", "验证码错误");
			
			validateRequired("number", "message", "请输入您收到的验证码");
			validateString("number", 6, 6, "message", "请输入6位您收到的证密码");
		}else {
			
			validateRequired("pass_one", "message", "请输入您的新密码");
			validateString("pass_one", 6, 24, "message", "请输入6~24位的新密码");
			
			validateRequired("pass_two", "message", "请输入您的确认密码");
			validateString("pass_two", 6, 24, "message", "请输入6~24位的确认密码");
			
		}

		
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("code", 1);
		c.render(new JsonRender().forIE());
	}

}
