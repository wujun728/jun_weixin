/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.exception
 *
 *    Filename:    BussinessException.java
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
 *    Create at:   2016年10月20日 下午2:48:31
 *
 *    Revision:
 *
 *    2016年10月20日 下午2:48:31
 *        - first revision
 *
 *****************************************************************/
package com.qiton.exception;

/**
 * @ClassName BussinessException
 * @Description 业务异常
 * @author 抽离
 * @Date 2016年10月20日 下午2:48:31
 * @version 1.0.0
 */
public class BussinessException extends RuntimeException {
	

	public BussinessException() {
		super();
	}
	
	public BussinessException(String message) {
		super(message);
	}
	
	

}
