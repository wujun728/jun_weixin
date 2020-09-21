/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.service.impl
 *
 *    Filename:    SmsServiceImpl.java
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
 *    Create at:   2016年10月21日 下午4:30:35
 *
 *    Revision:
 *
 *    2016年10月21日 下午4:30:35
 *        - first revision
 *
 *****************************************************************/
package com.qiton.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qiton.exception.BussinessException;
import com.qiton.mapper.UserMapper;
import com.qiton.model.User;
import com.qiton.service.ISmsService;
import com.qiton.utils.SmsUtil;
import com.qiton.utils.StringUtils;

/**
 * @ClassName SmsServiceImpl
 * @Description 
 * @author 抽离
 * @Date 2016年10月21日 下午4:30:35
 * @version 1.0.0
 */
@Service
public class SmsServiceImpl implements ISmsService{

	@Autowired
	private UserMapper userMapper;
	
	/* Description:
	 * @see com.qiton.service.ISmsService#sendSms(java.lang.String)
	 */
	@Override
	public void sendSms(String phoneNumber, String validateCode) throws BussinessException {
		if(StringUtils.isBlank(phoneNumber) || phoneNumber.length() != 11){
			throw new BussinessException("参数错误");
		}
		User userQuery = new User();
		userQuery.setPhone(phoneNumber);
		if(userMapper.selectOne(userQuery) != null){
			throw new BussinessException("手机号已经注册过了");
		}
		if(!SmsUtil.send(phoneNumber, "财富金牛提醒您，您的注册验证码为：" + validateCode)){
			throw new BussinessException("短信发送失败,请重试");
		}
	}

}
