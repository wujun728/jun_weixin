package com.qiton.service;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.baomidou.mybatisplus.plugins.Page;
import com.qiton.exception.BussinessException;
import com.qiton.model.Teacher;
import com.qiton.service.ITeacherService;
/**
 * 老师模块测试
 * @author Administrator
 *
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合 
@ContextConfiguration(locations="classpath:spring-config.xml") // 加载配置
public class TeacherServiceTest {
	
	@Autowired
	private ITeacherService iTeacherService;
	
	@Test
	public void AddTeacherTest(){
		try{
			Teacher teacher=new Teacher("张老师", "a.jpg",
					"分析师", "股神", "简介", "所属机构 ", "分析师资格证", 5,"特长");
			int b=iTeacherService.addTeacher(teacher);
			System.out.println("------------"+b);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void selectTeacherTest(){
		try{
			Teacher teacher2=iTeacherService.getTeacher((long) 1);
			System.out.println("------------"+teacher2.toString());
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void updateTeacherTest(){
		try{
			Teacher teacher=new Teacher("a老师", "a.jpg", "分析师", "股神", "简介", "所属机构", "分析师资格证", 5, "特长");
			Teacher teacher3=new Teacher();
			teacher3.setTechId((long) 3);;
			int b=iTeacherService.updateTeacher(teacher, teacher3);
			System.out.println("------------"+b);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	
	
	@Test
	public void deleteTeacherTest(){
		try{
			int b=iTeacherService.deleteTeacher((long) 2);
			System.out.println("------------"+b);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	@Test
	public void selectTechListTest(){
		Page<Teacher> page=new Page<Teacher>(0, 2);
		try{
			Page<Teacher> pages=iTeacherService.selectPage(page, null);
			/*List<Teacher> list=pages.getRecords();
			for(Teacher teacher:list){
				System.out.println("-----------"+teacher.toString());
			}*/
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	@Test
	public void deleteAllTech(){
		List<Long> idList2=new ArrayList<Long>();
		idList2.add((long) 1);
		idList2.add((long) 3);
		try{
			iTeacherService.deleteBatchIds(idList2);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
}
