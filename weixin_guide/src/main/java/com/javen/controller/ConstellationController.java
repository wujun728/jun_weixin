package com.javen.controller;

import com.javen.service.JuHeConstellation;
import com.javen.service.entity.Constellation;
import com.javen.validate.ConstellationValidate;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.log.Log;

/**
 * @author Javen
 * 2016年5月4日
 */
public class ConstellationController extends Controller {
	private Log log=Log.getLog(ConstellationController.class);
	public void index(){
		render("constellation.jsp");
	}
	
	/**
	 * 星座运势 
	 */
	@Before(ConstellationValidate.class)
	public void getConstellation(){
		String consName = getPara("consName");
		String consType = getPara("consType");
		Constellation constellation = JuHeConstellation.getConstellation(consName, consType);
		
		log.error("parameter:consName>>"+consName+"  consType>>>"+consType);
		log.error("Response result:"+constellation.toString());
		
		int code = constellation.getCode();
		if (code==0) {
			setAttr("constellation", constellation);
			render("constellation_result.jsp");
			return ;
		}else {
			setAttr("consName", consName);
			setAttr("consType", consType);
			setAttr("meaage", constellation.getReason());
			forwardAction("/constellation/");
			return ;
		}
	}
}
