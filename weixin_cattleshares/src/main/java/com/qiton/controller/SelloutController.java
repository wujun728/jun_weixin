/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.controller
 *
 *    Filename:    SelloutController.java
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
 *    Create at:   2016年11月4日 下午3:19:46
 *
 *    Revision:
 *
 *    2016年11月4日 下午3:19:46
 *        - first revision
 *
 *****************************************************************/
package com.qiton.controller;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.plugins.Page;
import com.qiton.exception.BussinessException;
import com.qiton.model.Purchase;
import com.qiton.model.Sellout;
import com.qiton.model.User;
import com.qiton.model.vo.SharesVo;
import com.qiton.service.IPurchaseService;
import com.qiton.service.ISelloutService;
import com.qiton.service.ISharesApiService;

/**
 * @ClassName SelloutController
 * @Description TODO(这里用一句话描述这个类的作用)
 * @author 抽离
 * @Date 2016年11月4日 下午3:19:46
 * @version 1.0.0
 */
@Controller
@RequestMapping("/sellout")
public class SelloutController extends BaseController {
	
	 private static final Logger LOGGER = LogManager.getLogger(SelloutController.class);
		
	@Autowired
	private ISharesApiService iSharesApiService;
	
	@Autowired
	private IPurchaseService iPurchaseService;
	
	@Autowired
	private ISelloutService iSelloutService;

	@RequestMapping("addSelloutBefore")
	public Object addSelloutBefore(Long code){
		SharesVo sharesVo = null;
		try {
			sharesVo  = iSelloutService.addSelloutBefore(code);
		} catch (BussinessException e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		} catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("获取股票出错，请重试");
		}	
		return renderSuccess(sharesVo);
	}
	
	
	
	@ResponseBody
	@RequestMapping("addSellout")
	public Object addSellout(Sellout sellout){
		try {
			iSelloutService.addSellout(sellout);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("添加股票出错，请重试");
		}
		return renderSuccess(sellout);
	}
	
	
	
	@ResponseBody
	@RequestMapping("deleteSellout")
	public Object deleteSellout(Sellout sellout) {
		try {
			iSelloutService.deleteSellout(sellout);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("删除股票出错，请重试");
		}
		return renderSuccess();
	}
	
	@ResponseBody
	@RequestMapping("upSellout")
	public Object upSellout(Sellout sellout) {
		try {
			iSelloutService.upSellout(sellout);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("推荐卖出股票出错，请重试");
		}
		return renderSuccess();
	}
	
	@ResponseBody
	@RequestMapping("downSellout")
	public Object downSellout(Sellout sellout) {
		try {
			iSelloutService.downSellout(sellout);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("撤荐卖出股票出错，请重试");
		}
		return renderSuccess();
	}
	
	
	@ResponseBody
	@RequestMapping("getSellouts")
	public Object getSellouts(Page<Sellout> page) {
		Page<Sellout> pageResult = new Page<Sellout>(page.getCurrent(), 10);
		try{
			iSelloutService.findSelloutByPage(pageResult);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("撤荐卖出股票出错，请重试");
		}
			return renderSuccess(page);
		}
	
	@ResponseBody
	@RequestMapping("getSelloutList")
	public Object getSelloutList(HttpSession session){
		User user = (User) session.getAttribute("current_user");
		List<Sellout> list = null;
		try {
			list = iSelloutService.findSellout();
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("获取股票出错，请重试");
		}
		if(user.getGrade() == 0 || user == null){
			return renderSuccess(list);
		}
		else{
			return renderVipSuccess(list);
		}
	}
	
	@ResponseBody
	@RequestMapping("deleteAll")
	public Object deleteAll(Long[] ids){
		try{
			iSelloutService.deleteAll(ids);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("批量删除卖出股票出错，请重试");
		}
		return renderSuccess();
	}
	
}
