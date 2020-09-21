package com.qiton.service.impl;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.qiton.exception.BussinessException;
import com.qiton.mapper.TeacherMapper;
import com.qiton.model.Teacher;
import com.qiton.service.ITeacherService;
import com.qiton.utils.StringUtils;
import com.baomidou.framework.service.impl.SuperServiceImpl;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Teacher 表数据服务层接口实现类
 *
 */
@Service
public class TeacherServiceImpl extends SuperServiceImpl<TeacherMapper, Teacher> implements ITeacherService {
	private static final Logger log=LoggerFactory.getLogger(TeacherServiceImpl.class);
	
	
	@Resource
	private TeacherMapper teacherMapper;
	
	
	@Override
	public int addTeacher(Teacher teacher) {
		if(teacher == null || StringUtils.isBlank(teacher.getTechNick())||StringUtils.isBlank(teacher.getTechHead())
				||StringUtils.isBlank(teacher.getTechTitle())||StringUtils.isBlank(teacher.getTechLabel())
				||StringUtils.isBlank(teacher.getTechIntro())||StringUtils.isBlank(teacher.getTechMechanism())
				||StringUtils.isBlank(teacher.getTchCertificate())
				 || teacher.getTechIntro().length() > 200 
			){
					throw new BussinessException("参数错误");	
		}
		// TODO Auto-generated method stub
		int b=teacherMapper.insert(teacher);
		if(b!=0){
			return b;
		}else{
			throw new BussinessException("新增失败");
		}
	}

	
	@Override
	public Teacher getTeacher(Long id) {
		// TODO Auto-generated method stub
		if(id==null){
					throw new BussinessException("参数错误");	
		}
		Teacher teacher2=teacherMapper.selectById(id);
		if(teacher2!=null){
			return teacher2;
		}else{
			throw new BussinessException("用户不存在");
		}
	}

	@Override
	public int updateTeacher(Teacher teacher,Teacher whTeacher) {
		if(teacher == null || StringUtils.isBlank(teacher.getTechNick())||StringUtils.isBlank(teacher.getTechHead())
				||StringUtils.isBlank(teacher.getTechTitle())||StringUtils.isBlank(teacher.getTechLabel())
				||StringUtils.isBlank(teacher.getTechIntro())||StringUtils.isBlank(teacher.getTechMechanism())
				||StringUtils.isBlank(teacher.getTchCertificate())
				|| teacher.getTechIntro().length() > 200 
			){
					throw new BussinessException("参数错误");	
		}
		// TODO Auto-generated method stub
		int b=teacherMapper.update(teacher, whTeacher);
		if(b!=0){
			return b;
		}else{
			throw new BussinessException("修改失败");
		}
	}

	@Override
	public int deleteTeacher(Long id) {
		if(id==null){
			throw new BussinessException("参数错误");	
		}
		// TODO Auto-generated method stub
		int b=teacherMapper.deleteById(id);
		if(b!=0){
			return b;
		}else{
			throw new BussinessException("删除失败");
		}
	}

	
}