package com.qiton.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.baomidou.mybatisplus.plugins.Page;
import com.qiton.exception.BussinessException;
import com.qiton.model.Reference;
import com.qiton.utils.Config;
import com.qiton.utils.StringUtils;

/**
 * 
* @ClassName: ReferenceServiceTest 
* @Description: 内参模块 
* @author 尤
* @date 2016年11月2日 上午11:06:42 
*
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合 
@ContextConfiguration(locations="classpath:spring-config.xml") // 加载配置
public class ReferenceServiceTest {
	@Autowired
	private IReferenceService service;
	
	@Test
	public void pubReference() throws ParseException{
		Reference reference=new Reference((long) 123123, "测试3",new Date());
		try{
			service.pubReference(reference);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	@Test
	public void deleteReference(){
		Long rerId=(long) 1;
		try{
			service.deleteReference(rerId);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void updateReference(){
		Reference reference=new Reference((long) 123456, "测试",new Date());
		Long rerId=(long) 2;
		try{
			service.updateReference(reference, rerId);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void getAllReference(){
		Page<Reference> page=new Page<Reference>(0, 4);
		try{
			service.getAllReference(page);
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
}
