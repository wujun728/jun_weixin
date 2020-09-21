/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.controller
 *
 *    Filename:    PurchaseController.java
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
 *    Create at:   2016年10月31日 下午4:58:42
 *
 *    Revision:
 *
 *    2016年10月31日 下午4:58:42
 *        - first revision
 *
 *****************************************************************/
package com.qiton.controller;

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
import com.qiton.model.User;
import com.qiton.model.vo.SharesVo;
import com.qiton.service.IPurchaseService;
import com.qiton.service.ISharesApiService;

/**
 * @ClassName PurchaseController
 * @Description 买入控制层
 * @author 抽离
 * @Date 2016年10月31日 下午4:58:42
 * @version 1.0.0
 */
@RequestMapping("/purchase")
@Controller
public class PurchaseController extends BaseController {

	 private static final Logger LOGGER = LogManager.getLogger(PurchaseController.class);
	
	@Autowired
	private ISharesApiService iSharesApiService;
	
	@Autowired
	private IPurchaseService iPurchaseService;
	
	
	/**
	 * 
	 * @Description 添加买入前调用api返回对应数据
	 * @param purId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("addPurchaseBefore")
	public Object addPurchaseBefore(Long code){
		SharesVo sharesVo = null;
		try {
			 sharesVo = iSharesApiService.getSharesBySharesCode(code);
		}catch (BussinessException e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		} catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("获取股票出错，请重试");
		}	
		return renderSuccess(sharesVo);
	}
	
	@ResponseBody
	@RequestMapping("addPurchase")
	public Object addPurchase(Purchase purchase, HttpSession session){
		try {
			iPurchaseService.addPurchase(purchase);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("添加买入股票出错，请重试");
		}
		return renderSuccess(purchase);
	}
	
	
	@ResponseBody
	@RequestMapping("deletePurchase")
	public Object deletePurchase(Purchase purchase){
		try {
			iPurchaseService.deletePurchase(purchase);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("删除买入股票出错，请重试");
		}
		return renderSuccess();
	}
	
	
	@ResponseBody
	@RequestMapping("upPurchase")
	public Object upPurchase(Purchase purchase){
		try {
			iPurchaseService.upPurchase(purchase);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("推荐买入股票出错，请重试");
		}
		return renderSuccess();
	}
	
	@ResponseBody
	@RequestMapping("downPurchase")
	public Object downPurchase(Purchase purchase){
		try {
			iPurchaseService.downPurchase(purchase);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("撤荐买入股票出错，请重试");
		}
		return renderSuccess();
	}
	
	
	@ResponseBody
	@RequestMapping("getPurchases")
	public Object getPurchases(Page<Purchase> page, HttpSession session){
		try {
			Page<Purchase> pageResult = new Page<Purchase>(page.getCurrent(), 10);
			iPurchaseService.findPurchasesByPage(pageResult);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("获取股票出错，请重试");
		}
		return renderSuccess(page);
	}
	
	@ResponseBody
	@RequestMapping("getPurchaseList")
	public Object getPurchaseList(HttpSession session){
		User user = (User) session.getAttribute("current_user");
		List<Purchase> list = null;
		try {
			list = iPurchaseService.findPurchases();
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
		try {
			iPurchaseService.deleteAll(ids);
		}catch(BussinessException e){
			LOGGER.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info(e.getLocalizedMessage());
			return renderError("批量删除买入股票出错，请重试");
		}
		return renderSuccess();
	}
	
}
