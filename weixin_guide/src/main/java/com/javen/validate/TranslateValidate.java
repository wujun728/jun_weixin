package com.javen.validate;

import com.javen.validate.base.ShortCircuitValidate;
import com.jfinal.core.Controller;
import com.jfinal.render.JsonRender;


/**
 * 百度翻译校验器
 * @author Javen
 * 2016年5月9日
 */
public class TranslateValidate extends ShortCircuitValidate {

	@Override
	protected void validate(Controller c) {
		validateRequired("from", "message", "请输入翻译源语言");
		validateRequired("to", "message", "请输入译文语言");
		validateRequired("q", "message", "请输入您要翻译的内容");
	}

	@Override
	protected void handleError(Controller c) {
		c.setAttr("code", 1);
		c.render(new JsonRender().forIE());
	}

}
