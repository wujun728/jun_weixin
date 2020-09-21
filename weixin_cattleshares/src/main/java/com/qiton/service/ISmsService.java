/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.service
 *
 *    Filename:    SmsService.java
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
 *    Create at:   2016年10月21日 下午4:30:20
 *
 *    Revision:
 *
 *    2016年10月21日 下午4:30:20
 *        - first revision
 *
 *****************************************************************/
package com.qiton.service;

import com.qiton.exception.BussinessException;

/**
 * @ClassName SmsService
 * @Description 短信验证发送接口
 * @author 抽离
 * @Date 2016年10月21日 下午4:30:20
 * @version 1.0.0
 */
public interface ISmsService {

	public void sendSms(String phoneNumber, String validateCode) throws BussinessException;
}
