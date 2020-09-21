package com.qiton.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.plugins.Page;
import com.qiton.exception.BussinessException;
import com.qiton.model.Admin;
import com.qiton.model.Reference;
import com.qiton.service.IReferenceService;
import com.qiton.utils.Config;

/**
 * 
* @ClassName: PubReferenceController 
* @Description: 内参管理 
* @author 尤
* @date 2016年11月2日 上午9:24:20 
*
 */
@Controller
@RequestMapping("/reference")
public class ReferenceController extends BaseController{
	
	private static final Logger log=LogManager.getLogger(ReferenceController.class);
	
	@Autowired
	private IReferenceService rerService;
	
	/**
	 * @throws ParseException \
	 * 
	* @Title: pubReference 
	* @Description: 发布内参
	* @author 尤
	* @date 2016年11月2日 上午9:36:47  
	* @param @param reference
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 */
	@RequestMapping("/pubReference")
	@ResponseBody
	public Object pubReference(Reference reference,HttpServletRequest request) throws ParseException{
		try{
			reference.setRerPubtime(new Date());
			rerService.pubReference(reference);
		}catch(BussinessException e){
			e.printStackTrace();
			log.info("--发布失败--"+e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}
		return renderSuccess();
	}
	
	
	/**\
	 * 
	* @Title: pubReference 
	* @Description: 删除内参
	* @author 尤
	* @date 2016年11月2日 上午9:36:47  
	* @param @param reference
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 */
	@RequestMapping("/deleteReference")
	@ResponseBody
	public Object deleteReference(Long rerId,HttpServletRequest request){
		try{
			rerService.deleteReference(rerId);
		}catch(BussinessException e){
			e.printStackTrace();
			log.info("--删除失败--"+e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}
		return renderSuccess();
	}
	
	
	
	/**\
	 * 
	* @Title: pubReference 
	* @Description: 修改内参
	* @author 尤
	* @date 2016年11月2日 上午9:36:47  
	* @param @param reference
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 */
	@RequestMapping("/updateReference")
	@ResponseBody
	public Object updateReference(Reference reference,Long rerId,HttpServletRequest request){
		try{
			reference.setRerPubtime(new Date());
			rerService.updateReference(reference, rerId);
		}catch(BussinessException e){
			e.printStackTrace();
			log.info("--更新失败--"+e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}
		return renderSuccess();
	}
	
	
	/**\
	 * 
	* @Title: pubReference 
	* @Description: 获取内参
	* @author 尤
	* @date 2016年11月2日 上午9:36:47  
	* @param @param reference
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 */
	@RequestMapping("/getAllReference")
	@ResponseBody
	public Object getAllReference(Page<Reference> page,HttpServletRequest request){
		
		Page<Reference> pageResult = new Page<Reference>(page.getCurrent(),Config.PAGENUM);
		try{
			rerService.getAllReference(pageResult);
		}catch(BussinessException e){
			e.printStackTrace();
			log.info("--获取失败--"+e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}
		return renderSuccess(pageResult);
	}
	
}
