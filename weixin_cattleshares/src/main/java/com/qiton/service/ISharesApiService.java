/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.service
 *
 *    Filename:    SharesApiService.java
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
 *    Create at:   2016年10月31日 下午3:10:17
 *
 *    Revision:
 *
 *    2016年10月31日 下午3:10:17
 *        - first revision
 *
 *****************************************************************/
package com.qiton.service;

import com.qiton.exception.BussinessException;
import com.qiton.model.Shares;
import com.qiton.model.vo.SharesVo;

/**
 * @ClassName SharesApiService
 * @Description 股票Api业务类
 * @author 抽离
 * @Date 2016年10月31日 下午3:10:17
 * @version 1.0.0
 */
public interface ISharesApiService {

	public SharesVo getSharesBySharesCode(Long code)throws BussinessException;

	
	public double getCurrentPrice(Long code)throws BussinessException;
}
