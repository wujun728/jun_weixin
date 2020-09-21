package com.qiton.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.joda.time.DateTime;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.baomidou.mybatisplus.plugins.Page;
import com.qiton.exception.BussinessException;
import com.qiton.model.Invite;
import com.qiton.model.SelectOptionTime;
import com.qiton.model.User;
import com.qiton.model.VipManage;
import com.qiton.utils.Config;

/**
 * 用户管理
 * @author Administrator
 *
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合 
@ContextConfiguration(locations="classpath:spring-config.xml") // 加载配置
public class UserManagerTest {
	
	@Autowired
	private IInviteService inviteService;//邀请
	
	@Autowired
	private IUserService userService;//用户
	
	@Test
	public void getAllUser(){
		Page<Invite> page=new Page<>(0, Config.PAGENUM);
		List<HashMap<String, Object>> list=new ArrayList<HashMap<String,Object>>();
		try{
			Page<Invite> pages=inviteService.selectPage(page, null);
			List<Invite> invitelist=pages.getRecords();
			System.out.println("--------"+invitelist.size());
			HashMap<String, Object> map = null;
			for(Invite invite:invitelist){
				map=new HashMap<String,Object>();
				Invite entity=new Invite();
				entity.setInviUsername(invite.getInviUsername()); 
				//通过邀请人取得邀请数量
				int count=inviteService.selectCount(entity);
				System.out.println("-----count----"+count);
				
				User accinviteuser=new User();
				accinviteuser.setUserName(invite.getInviAcceptuser());
				User acceptinviteInfo=userService.selectOne(accinviteuser);
				System.out.println("----acceptinviteInfo-------"+acceptinviteInfo.toString());
				
				User inviteuser=new User();
				inviteuser.setUserName(invite.getInviUsername());
				User inviteUserInfo=userService.selectOne(inviteuser);
				System.out.println("-----inviteUserInfo------"+inviteUserInfo.toString());
				map.put("inviteCount", count);
				map.put("acceptinviteUser", acceptinviteInfo);
				map.put("inviteUser", inviteUserInfo);
				list.add(map);
			}
			System.out.println("-----------------"+list.toString());
			
		}catch(BussinessException e){
			e.printStackTrace();
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 
	* @Title: updateUser_Info 
	* @Description: 修改用户信息
	* @author 尤
	* @date 2016年10月26日 下午4:21:37  
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	@Test
	public void updateUser_Info(){
	/*	User user=new User("aa", "123123", 0, new Date(), new Date(), 0, "18159801679", 100);
		user.setUserId((long) 1);
		userService.updateUser_Info(user);*/
	}
	
	/**
	 * @throws ParseException 
	 * @throws BussinessException 
	 * 
	* @Title: vipDelay 
	* @Description: 会员延期
	* @author 尤
	* @date 2016年10月26日 下午4:21:23  
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	@Test
	public void vipDelay() throws BussinessException, ParseException{
		/*User user=new User("aa", "123123", 0, new Date(), new Date(), 0, "18159801679", 100);
		user.setUserId((long) 1);
		userService.updateVIP_Del( user, "1");
		userService.updateUser_Info(user);*/
	}
	
	
	/**
	 * 
	* @Title: getCurrentUserCapital 
	* @Description: 取得当前用户的信息
	* @author 尤
	* @date 2016年10月27日 上午9:10:36  
	* @param     设定文件 
	* @return void    返回类型 
	* @throws
	 */
	@Test
	public void getCurrentUserCapital(){
		User user = userService.getCurrentUser("1");
		System.out.println("----"+user.toString());
	}
	
	
	/**
	 * 
	* @Title: updateUserCaptical 
	* @Description: 资金操作
	* @author 尤
	* @date 2016年10月27日 上午9:12:08  
	* @param @param user
	* @param @param operId
	* @param @param capiId
	* @param @param money
	* @param @param remark    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	@Test
	public void updateUserCaptical(){
		User user=new User("aa", "123123", 0, new Date(), new Date(), 0, "18159801679", 100, 100);
		user.setUserId((long) 1);
		
		//userService.updateUserCaptical(user, "0", "0", "100", "备注");//充值钱
		//userService.updateUserCaptical(user, "0", "1", "100", "备注");//充值积分
		//userService.updateUserCaptical(user, "1", "0", "20", "备注");//扣钱
		//userService.updateUserCaptical(user, "1", "1", "20", "备注");//扣积分
	}
	


	@Test
	public void getSelectTime() {
		//new DateTime(date).plusDays(delayday).toDate();
		SelectOptionTime optionTime=new SelectOptionTime("2016-11-06","2016-11-10");
		Page<VipManage> page2 = new Page<VipManage>(1, Config.PAGENUM);
		try {
			userService.getSelectTime(page2, optionTime);
		} catch (BussinessException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
