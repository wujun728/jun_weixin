package com.javen.validate;

import com.javen.validate.base.ShortCircuitValidate;
import com.jfinal.core.Controller;
import com.jfinal.render.JsonRender;


/**
 * 登录校验器
 * @author Javen
 * 2016年4月2日
 */
public class IdeaValidate extends ShortCircuitValidate {

	@Override
	protected void validate(Controller c) {
		validateRequired("account", "message", "请输入您的联系方式");
		
		validateRequired("idea", "message", "请输入您的反馈意见");
		validateString("idea", 15, 1000, "message", "反馈意见的字数必须大于15");
		
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("code", 1);
		c.render(new JsonRender().forIE());
	}

}
