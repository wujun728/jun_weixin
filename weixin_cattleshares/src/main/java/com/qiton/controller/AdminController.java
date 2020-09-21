/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.controller
 *
 *    Filename:    AdminController.java
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
 *    Create at:   2016年10月25日 下午2:54:31
 *
 *    Revision:
 *
 *    2016年10月25日 下午2:54:31
 *        - first revision
 *
 *****************************************************************/
package com.qiton.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.plugins.Page;
import com.qiton.exception.BussinessException;
import com.qiton.model.Admin;
import com.qiton.service.IAdminService;

/**
 * @ClassName AdminController
 * @Description 管理员控制层类
 * @author 抽离
 * @Date 2016年10月25日 下午2:54:31
 * @version 1.0.0
 */
@Controller
@RequestMapping("/admin")
public class AdminController extends BaseController{

	 private static final Logger LOGGER = LogManager.getLogger(AdminController.class);
	
	@Autowired
	private IAdminService iAdminService;
	

	/**
	 * @author 抽离
	 * @Description 添加客服
	 * @param admin
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/addAdmin")
	public Object addAdmin(Admin admin, HttpSession session){
		System.out.println("===============");
		try{
			iAdminService.addAdmin(admin);
		}catch(BussinessException e){
			LOGGER.info("添加客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info("添加客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError("添加出错请重试");
		}
		return renderSuccess(admin);
	}
	
	
	/**
	 * @author 抽离
	 * @Description 删除客服
	 * @param admin
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("deleteAdmin")
	public Object deleteAdmin(Admin admin, HttpSession session){
		try{
			iAdminService.deleteAdmin(admin.getAdminId());
		}catch(BussinessException e){
			LOGGER.info("删除客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info("删除客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError("删除出错请重试");
		}
		return renderSuccess("删除成功");
	}
	
	
	/**
	 * @author 抽离
	 * @Description 更新客服
	 * @param admin
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("updateAdmin")
	public Object updateAdmin(Admin admin, HttpSession session){
		try{
			iAdminService.updateAdmin(admin);
		}catch(BussinessException e){
			LOGGER.info("更新客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info("更新客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError("更新出错请重试");
		}
		return renderSuccess("更新成功");
	}
	
	
	/**
	 * @author 抽离
	 * @Description 获取单个客服
	 * @param admin
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getAdmin")
	public Object getAdmin(Admin admin, HttpSession session){
		Admin	adminResult;
		try{
			adminResult = iAdminService.getAdmin(admin);
		}catch(BussinessException e){
			LOGGER.info("获取客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info("获取客服出错" +admin + "----:" + e.getLocalizedMessage());
			return renderError("获取客服出错请重试");
		}
		return renderSuccess(adminResult);
	}
	
	/**
	 * @author 抽离
	 * @Description ajax分页获取客服列表
	 * @param page
	 * @param session
	 * @return
	 */
	@ResponseBody
	@RequestMapping("getAdmins")
	public Object getAdmins(Page<Admin> page, HttpSession session){
		try{
			iAdminService.getAdmins(page);
		}catch(BussinessException e){
			LOGGER.info("获取客服列表出错" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			LOGGER.info("获取客服列表出错" + "----:" + e.getLocalizedMessage());
			return renderError("获取客服列表出错请重试");
		}
		return renderSuccess(page);
	}
	
	@RequestMapping("/addServer")
	public String addServerJsp(HttpServletRequest request){
		return "/addserver";
	}

	
}
