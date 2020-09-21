package com.javen.validate;

import com.javen.validate.base.ShortCircuitValidate;
import com.jfinal.core.Controller;


/**
 * 星座运势
 * @author Javen
 * 2016年5月4日
 */
public class ConstellationValidate extends ShortCircuitValidate {

	@Override
	protected void validate(Controller c) {
		validateRequired("consName", "meaage", "请输入您的星座");
		validateRequired("consType", "meaage", "请选择查询运势类型");
	}

	@Override
	protected void handleError(Controller c) {
		c.keepPara("consName");
		c.keepPara("consType");
		c.render("constellation.jsp");
	}

}
