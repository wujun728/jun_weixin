package com.qiton.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.qiton.exception.BussinessException;
import com.qiton.model.Admin;
import com.qiton.model.User;
import com.qiton.service.IAdminService;
import com.qiton.service.IUserService;
/**
 * 后台登录测试类
 * @author yqc
 *
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合 
@ContextConfiguration(locations="classpath:spring-config.xml") // 加载配置
public class LoginServiceTest {
	
	@Autowired
	private IAdminService service;
	
	@Autowired
	private IUserService userservice;
	
	@Test
	public void login(){
		Admin admin=new Admin("admin", "1111", 1);
		try{
			Admin selectadmin=service.login(admin);
			System.out.println("-----------"+selectadmin.toString());
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void userlogin(){
		User user=new User();
		try{
			User selectuser=userservice.userlogin(user);
			System.out.println("-----------"+selectuser.toString());
		}catch(BussinessException e){
			e.printStackTrace();
		}
	}
	
}
