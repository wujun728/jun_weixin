/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.controller
 *
 *    Filename:    UserCotroller.java
 *
 *    Description: TODO(用一句话描述该文件做什么)
 *
 *    Copyright:   Copyright (c) 2001-2014
 *
 *    Company:     fzqblog
 *
 *    @author:     抽离
 *
 *    @version:    1.0.0
 *
 *    Create at:   2016年10月21日 下午5:10:05
 *
 *    Revision:
 *
 *    2016年10月21日 下午5:10:05
 *        - first revision
 *
 *****************************************************************/
package com.qiton.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.qiton.exception.BussinessException;
import com.qiton.model.User;
import com.qiton.service.ISmsService;
import com.qiton.service.IUserService;
import com.qiton.utils.StringUtils;

/**
 * @ClassName UserCotroller
 * @Description TODO用户注册控制层
 * @author 抽离
 * @Date 2016年10月21日 下午5:10:05
 * @version 1.0.0
 */
@Controller
@RequestMapping("/user")
public class UserCotroller extends BaseController{
	
    private static final Logger LOGGER = LogManager.getLogger(UserCotroller.class);
	
    private static HttpSession currentsession;
    
	@Autowired
	private ISmsService smsService;
	
	@Autowired
	private IUserService userService;
	
	
	/**
	 * @author 抽离
	 * @Description 用户注册时填写手机号发送验证码
	 * @param phone 用户手机号
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("sendSms")
	public Object sendSms(String phone, 
			HttpSession session){
		currentsession=session;
		String validateCode = StringUtils.getRandomCode();
		session.setAttribute("validateCode", validateCode);
		try{
			smsService.sendSms(phone, validateCode);
			currentsession.setAttribute("rightValidateCode", validateCode);
		}catch(BussinessException e){
			LOGGER.info(phone + "----" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}
		return renderSuccess();
	}
	
	
	
	
	
	/**
	 * 
	 * @author 抽离
	 * @Description 注册用户
	 * @param user
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("regist")
	public Object regist(User user,String sessionId,HttpSession session){
		try{
			this.userService.regist(user, (String) currentsession.getAttribute("rightValidateCode"));
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(user.getPhone() + "----" + e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(user.getPhone() + "----" + e.getLocalizedMessage());
			return renderError("注册失败请重试");
		}
		return renderSuccess();
	}
}
