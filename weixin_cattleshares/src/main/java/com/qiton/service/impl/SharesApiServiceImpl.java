/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.service.impl
 *
 *    Filename:    SharesApiServiceImpl.java
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
 *    Create at:   2016年10月31日 下午3:11:06
 *
 *    Revision:
 *
 *    2016年10月31日 下午3:11:06
 *        - first revision
 *
 *****************************************************************/
package com.qiton.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.qiton.exception.BussinessException;
import com.qiton.model.Shares;
import com.qiton.model.vo.SharesVo;
import com.qiton.service.ISharesApiService;
import com.qiton.utils.HttpUtils;
import com.qiton.utils.StringUtils;

/**
 * @ClassName SharesApiServiceImpl
 * @Description TODO(这里用一句话描述这个类的作用)
 * @author 抽离
 * @Date 2016年10月31日 下午3:11:06
 * @version 1.0.0
 */
@Service
public class SharesApiServiceImpl implements ISharesApiService {

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISharesApiService#getSharesBySharesCode(java.lang.Long)
	 */
	@Override
	public SharesVo getSharesBySharesCode(Long code) throws BussinessException{
		if(code == null){
			throw new BussinessException("股票代码不可为空");
		}
		String host = "http://ali-stock.showapi.com";
	    String path = "/real-stockinfo";
	    String method = "GET";
	    Map<String, String> headers = new HashMap<String, String>();
	    //最后在header中的格式(中间是英文空格)为Authorization:APPCODE 83359fd73fe94948385f570e3c139105
	    headers.put("Authorization", "APPCODE 4ea787c71bb247f5a8b2499fb6eaf508");
	    Map<String, String> querys = new HashMap<String, String>();
	    querys.put("code", code.toString());
	    querys.put("needIndex", "0");
	    querys.put("need_k_pic", "1");

	    Shares shares = null;
	    try {
	    	HttpResponse response = HttpUtils.doGet(host, path, method, headers, querys);
	    	//获取response的body
	    	String str = EntityUtils.toString(response.getEntity());
	    	shares = JSON.parseObject(str, Shares.class);
	    } catch (Exception e) {
	    	e.printStackTrace();
	    }
	    
	    String error = shares.getShowapiResError();
	    
	    if(StringUtils.isNotBlank(error)){
	    	throw new BussinessException(error);
	    }
	    
	    String remark = shares.getShowapiResBody().getkPic().getRemark();
	   
	    if(StringUtils.isNotBlank(remark)){
	    	throw new BussinessException(remark);
	    }
		SharesVo sharesVo = new SharesVo();
		
		sharesVo.setName(shares.getShowapiResBody().getStockMarket().getName());
		sharesVo.setCode(shares.getShowapiResBody().getStockMarket().getCode());
		sharesVo.setNowPrice(shares.getShowapiResBody().getStockMarket().getNowPrice());
		sharesVo.setDayurl(shares.getShowapiResBody().getkPic().getDayurl());
		sharesVo.setWeekurl(shares.getShowapiResBody().getkPic().getWeekurl());
		sharesVo.setMonthurl(shares.getShowapiResBody().getkPic().getMonthurl());
		sharesVo.setMinurl(shares.getShowapiResBody().getkPic().getMinurl());
		sharesVo.setCurDate(new Date());
		
		return sharesVo;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISharesApiService#getCurrentPrice(java.lang.Long)
	 */
	@Override
	public double getCurrentPrice(Long code) throws BussinessException {
		return getSharesBySharesCode(code).getNowPrice();
	}
	
	

}
