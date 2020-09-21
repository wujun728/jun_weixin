
package com.qiton.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.ModelAndView;

import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;
import com.qiton.exception.BussinessException;
import com.qiton.model.Reference;
import com.qiton.model.Teacher;
import com.qiton.service.ITeacherService;
import com.qiton.utils.Config;
/**
 * 教师管理
 * @author yqc
 *  
 *
 */
@Controller
@RequestMapping("/teacher")
public class TeacherController extends BaseController{
	private static final Logger LOGGER=LogManager.getLogger(TeacherController.class);

	@Autowired
	private ITeacherService teacherService;
	
	/**
	 * 新增老师
	 * @param teacher
	 * @return
	 */
	@RequestMapping("/addTeacher")
	@ResponseBody
	public Object addTeacher(Teacher teacher,HttpServletRequest request){
		try{
			teacherService.addTeacher(teacher);
		}catch(BussinessException e){
			LOGGER.info("添加老师出错" +teacher + "----:" + e.getLocalizedMessage());
			return renderError("添加老师出错");
		}catch (Exception e) {
			LOGGER.info("添加老师出错" +teacher + "----:" + e.getLocalizedMessage());
			return renderError("添加老师出错");
		}
		return renderSuccess();
	}
	
	/**
	 * 根据id取得老师的信息
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/getTeacherInfo")
	@ResponseBody
	public Object getTeacherInfo(Long id,HttpServletRequest request){
		Teacher selectteacher = null;
		try{
			 selectteacher=teacherService.getTeacher(id);
		}catch(BussinessException e){
			LOGGER.info("获取老师信息失败---");
			e.printStackTrace();
			return renderError("获取老师信息错误");
		}catch (Exception e) {
			LOGGER.info("获取老师信息失败---");
			e.printStackTrace();
			return renderError("获取老师信息失败");
		}
		return renderSuccess(selectteacher);
	}
	
	
	/**
	 * 修改老师信息
	 * @param id
	 * @param teacher
	 * @param request
	 * @return
	 */
	@RequestMapping("/updateTeacherInfo")
	@ResponseBody
	public Object updateTeacherInfo(Long id,Teacher teacher,HttpServletRequest request){
		try{
			Teacher selectteacher=teacherService.selectById(id);
			Teacher whTeacher=new Teacher();
			whTeacher.setTechId(id);
			int b=teacherService.updateTeacher(teacher, whTeacher);
		}catch(BussinessException e){
			LOGGER.info("更新老师失败---");
			e.printStackTrace();
			return renderError("更新老师错误");
		}catch (Exception e) {
			LOGGER.info("更新老师失败---");
			e.printStackTrace();
			return renderError("更新老师错误");
		}
		return renderSuccess();
	}
	
	/**
	 * 删除老师
	 * @param id
	 * @param request
	 * @return
	 */
	@RequestMapping("/deleteTeacher")
	 @ResponseBody
	public Object deleteTeacher(Long id,HttpServletRequest request){
		try{
			int b=teacherService.deleteTeacher(id);
		}catch(BussinessException e){
			LOGGER.info("删除老师出错" + e.getLocalizedMessage());
			return renderError("删除老师失败---");
		}catch (Exception e) {
			LOGGER.info("删除老师出错" + e.getLocalizedMessage());
			return renderError("删除老师失败---");
		}
		return renderSuccess();
	}
	
	/**
	 * 
	* @Title: selectTechList 
	* @Description: 取得所有老师列表
	* @author 尤
	* @date 2016年11月2日 上午10:58:33  
	* @param @param currentPage
	* @param @param request
	* @param @return    设定文件 
	* @return ModelAndView    返回类型 
	* @throws
	 */
	@RequestMapping("/selectTechList")
	@ResponseBody
	public Object selectTechList(Page<Reference> page,HttpServletRequest request){
		Page<Teacher> page2=new Page<Teacher>(page.getCurrent(), Config.PAGENUM);
		Page<Teacher> pages = null;
		try{
			 pages=teacherService.selectPage(page2, null);
		}catch(BussinessException e){
			LOGGER.info("获取老师列表出错" + e.getLocalizedMessage());
			return renderError("获取老师列表出错---");
		}catch (Exception e) {
			LOGGER.info("获取老师列表出错" + "----:" + e.getLocalizedMessage());
			return renderError("获取老师列表出错---");
		}
		return renderSuccess(pages);
	}
	
    @RequestMapping("/testupload")
    public String testupload(HttpServletRequest request){
    	return "/uploadImg";
    }
    
    /**
     * 
    * @Title: deleteAllTech 
    * @Description: 批量删除id
    * @author 尤
    * @date 2016年11月4日 上午9:05:40  
    * @param @param idList
    * @param @param request
    * @param @return    设定文件 
    * @return Object    返回类型 
    * @throws
     */
    @RequestMapping("/deleteAllTech")
    @ResponseBody
    public Object deleteAllTech(String idList,HttpServletRequest request){
    	String[] list=idList.split(",");
    	List<Long> idLists=new ArrayList<Long>();
    	for(String i:list){
    		idLists.add((long) Integer.parseInt(i));
    	}
		try{
			teacherService.deleteBatchIds(idLists);
		}catch(BussinessException e){
			LOGGER.info("删除老师出错" + e.getLocalizedMessage());
			return renderError("删除老师出错---");
		}catch (Exception e) {
			LOGGER.info("删除老师出错" + "----:" + e.getLocalizedMessage());
			return renderError("删除老师出错---");
		}
		return renderSuccess();
    }
	
    @RequestMapping("/gotTechListJsp")
    public String gotTechListJsp(HttpServletRequest request){
		return "/teacher-manage";
    }
    
}
