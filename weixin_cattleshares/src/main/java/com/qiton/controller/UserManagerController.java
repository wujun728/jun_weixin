package com.qiton.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.baomidou.mybatisplus.plugins.Page;
import com.qiton.exception.BussinessException;
import com.qiton.model.Invite;
import com.qiton.model.Reference;
import com.qiton.model.SelectOptionTime;
import com.qiton.model.Teacher;
import com.qiton.model.User;
import com.qiton.model.VipManage;
import com.qiton.service.IInviteService;
import com.qiton.service.IUserService;
import com.qiton.utils.Config;
import com.sun.xml.internal.xsom.impl.scd.Iterators.Map;

/**
 *
 * @ClassName: UserManagerController
 * @Description: 用户管理功能模块
 * @author 尤
 * @date 2016年10月26日 上午10:34:20
 *
 */
@RequestMapping("/userManager")
@Controller
public class UserManagerController extends BaseController {

	private static final Logger log = LogManager.getLogger(UserManagerController.class);

	@Autowired
	private IInviteService inviteService;// 邀请

	@Autowired
	private IUserService userService;// 用户

	/**
	 * 
	 * @Title: getAllUser @Description:获得用户列表 @author 尤 @date 2016年10月26日
	 * 上午10:37:35 @param @param current @param @param request @param @return
	 * 设定文件 @return Object 返回类型 @throws
	 *//*
	@RequestMapping("/getAllUser")
	@ResponseBody
	public Object getAllUser(Page<Invite> page, HttpServletRequest request) {
		Page<Invite> page2 = new Page<>(page.getCurrent(), Config.PAGENUM);
		List<HashMap<String, Object>> list = new ArrayList<HashMap<String, Object>>();
		Page<Invite> pages ;
		try {
			pages = inviteService.selectPage(page2, null);
			List<Invite> invitelist = pages.getRecords();
			System.out.println("--------" + invitelist.size());
			HashMap<String, Object> map = null;
			for (Invite invite : invitelist) {
				map = new HashMap<String, Object>();
				
				Invite entity = new Invite();
				entity.setInviUsername(invite.getInviUsername());
				// 通过邀请人取得邀请数量
				int count = inviteService.selectCount(entity);
				System.out.println("-----count----" + count);

				User accinviteuser = new User();
				accinviteuser.setUserName(invite.getInviAcceptuser());
				User acceptinviteInfo = userService.selectOne(accinviteuser);
				System.out.println("----acceptinviteInfo-------" + acceptinviteInfo.toString());

				User inviteuser = new User();
				inviteuser.setUserName(invite.getInviUsername());
				User inviteUserInfo = userService.selectOne(inviteuser);
				System.out.println("-----inviteUserInfo------" + inviteUserInfo.toString());
				
				map.put("inviteCount", count);
				map.put("acceptinviteUser", acceptinviteInfo);
				//map.put("inviteUser", inviteUserInfo);
				list.add(map);
			}
			System.out.println("-----------------" + list.toString());
		} catch (BussinessException e) {
			e.printStackTrace();
			return renderError(e.getLocalizedMessage());
		} catch (Exception e) {
			return  renderError("访问失败请重试");
		}
		return renderSuccess(list);
	}
*/
	
	
	
	/**
	 * @Title: getCurrentUserCapital @Description: 取得用户资金 @author 尤 @date
	 * 2016年10月26日 上午10:37:54 @param @param acceptId @param @param
	 * request @param @return 设定文件 @return Object 返回类型 @throws
	 */
	@RequestMapping("/getCapital")
	@ResponseBody
	public Object getCurrentUserCapital(String acceptId, HttpServletRequest request) {
		User user = null;
		try {
			user = userService.getCurrentUser(acceptId);
		} catch (BussinessException e) {
			e.printStackTrace();
			log.info("----获取数据出错----" + e.getLocalizedMessage());
			return  renderError(e.getLocalizedMessage());
		} catch (Exception e) {
			e.printStackTrace();
			log.info("----获取数据出错----" + e.getLocalizedMessage());
			return  renderError("-获取数据出错");
		}
		return renderSuccess(user);
	}

	/**
	 * 
	 * @Title: Capital_Operation @Description: 资金操作 @author 尤 @date 2016年10月26日
	 * 上午11:01:25 @param @param currentMark @param @param
	 * currentGold @param @param operId @param @param capiId @param @param
	 * money @param @param remark @param @param request @param @return
	 * 设定文件 @return Object 返回类型 @throws
	 */
	@RequestMapping("/capital_Operation")
	@ResponseBody
	public Object Capital_Operation(User user, String operId, String capiId,
			 String money, String remark, HttpServletRequest request) {
		try {
			userService.updateUserCaptical(user, operId, capiId, money, remark);
		} catch (BussinessException e) {
			e.printStackTrace();
			log.info("-----资金操作失败------" + e.getLocalizedMessage());
			return  renderError(e.getLocalizedMessage());
		} catch (Exception e) {
			e.printStackTrace();
			log.info("--资金操作失败---------" + e.getLocalizedMessage());
			return renderError("资金操作失败");
		}
		return renderSuccess("操作成功");
	}

	/**
	 * 
	* @Title: VIP_Delay 
	* @Description: 会员延期
	* @author 尤
	* @date 2016年10月26日 下午3:24:34  
	* @param @param current_Id
	* @param @param endvip_time
	* @param @param delay_time
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 */
	@RequestMapping("/vip_Delay")
	@ResponseBody
	public Object VIP_Delay(User user,String delay_time, HttpServletRequest request) {
		try {
			userService.updateVIP_Del( user, delay_time);
		} catch (BussinessException e) {
			e.printStackTrace();
			log.info("--会员延期失败---------" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		} catch (Exception e) {
			e.printStackTrace();
			log.info("--会员延期失败---------" + e.getLocalizedMessage());
			return renderError("会员延期失败");
		}
		return renderSuccess("延期成功");
	}
	
	/**
	 * 
	* @Title: Update_UserInfo 
	* @Description: 修改用户信息
	* @author 尤
	* @date 2016年11月7日 上午11:13:48  
	* @param @param user
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 */
	@RequestMapping("/update_UserInfo")
	@ResponseBody
	public Object Update_UserInfo(User user,HttpServletRequest request){
		try{
			userService.updateUser_Info(user);
		}catch(BussinessException e){
			e.printStackTrace();
			log.info("--修改用户信息失败---------" + e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			e.printStackTrace();
			log.info("--修改用户信息失败---------" + e.getLocalizedMessage());
			return renderError("修改用户信息失败");
		}
		return renderSuccess("修改用户信息成功");
	}
	
	
	
	
	/**
	 * 
	* @Title: getUserList 
	* @Description: 查询列表
	* @author 尤
	* @date 2016年11月7日 上午11:19:13  
	* @param @param page
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 *//*
	@RequestMapping("/getUserList")
	@ResponseBody
	public Object getUserList(Page<User> page,HttpServletRequest request){
		Page<User> page2=new Page<User>(page.getCurrent(), Config.PAGENUM);
		try{
			userService.getUserList(page2);
		}catch(BussinessException e){
			log.info("查询错误");
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			log.info("查询错误");
			return renderError(e.getLocalizedMessage());
			}
		return renderSuccess(page2);
	}*/
	
	
	/**
	 * 
	* @Title: deleteAllUser 
	* @Description: 批量删除
	* @author 尤
	* @date 2016年11月7日 下午1:44:26  
	* @param @param idList
	* @param @param request
	* @param @return    设定文件 
	* @return Object    返回类型 
	* @throws
	 */
    @RequestMapping("/deleteAllUser")
    @ResponseBody
    public Object deleteAllUser(String idList,HttpServletRequest request){
    	String[] list=idList.split(",");
    	List<Long> idLists=new ArrayList<Long>();
    	for(String i:list){
    		idLists.add((long) Integer.parseInt(i));
    	}
		try{
			for(int i=0;i<idLists.size();i++){
				User user=userService.selectById(list[i]);
				Invite entity=new Invite();
				entity.setInviAcceptuser(user.getUserName());
				inviteService.deleteSelective(entity);
			}
		}catch(BussinessException e){
			log.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}catch (Exception e) {
			log.info(e.getLocalizedMessage());
			return renderError(e.getLocalizedMessage());
		}
		return renderSuccess();
    }
    
    
    /**
	 * 
	 * @Title: getAllUser @Description:根据时间区间获得用户列表 @author 尤 @date 2016年10月26日
	 * 上午10:37:35 @param @param current @param @param request @param @return
	 * 设定文件 @return Object 返回类型 @throws
	 */
	@RequestMapping("/getSelectTime")
	@ResponseBody
	public Object getSelectTime(Page<VipManage> page,SelectOptionTime optionTime, HttpServletRequest request) {
		Page<VipManage> page2 = new Page<VipManage>(page.getCurrent(), Config.PAGENUM);
		try {
			userService.getSelectTime(page2, optionTime);
		} catch (BussinessException e) {
			e.printStackTrace();
			return renderError(e.getLocalizedMessage());
		} catch (Exception e) {
			return  renderError("访问失败请重试-"+e.getLocalizedMessage());
		}
		return renderSuccess(page2);
	}

    
	 /**
		 * 
		 * @Title: getAllUser @Description:根据用户状态获得用户列表 @author 尤 @date 2016年10月26日
		 * 上午10:37:35 @param @param current @param @param request @param @return
		 * 设定文件 @return Object 返回类型 @throws
		 */
		@RequestMapping("/getSelectUserSatate")
		@ResponseBody
		public Object getSelectUserSatate(Page<VipManage> page,String userState, HttpServletRequest request) {
			Page<VipManage> page2 = new Page<VipManage>(page.getCurrent(), Config.PAGENUM);
			try {
				userService.getSelectUserSatate(page2, userState);
			} catch (BussinessException e) {
				e.printStackTrace();
				return renderError(e.getLocalizedMessage());
			} catch (Exception e) {
				return  renderError("访问失败请重试-"+e.getLocalizedMessage());
			}
			return renderSuccess(page2);
		}
    
		
		/**
		 * 
		* @Title: selectByCommand 
		* @Description: 条件查询
		* @author 尤
		* @date 2016年11月7日 上午11:13:20  
		* @param @param user
		* @param @param page
		* @param @param request
		* @param @return    设定文件 
		* @return Object    返回类型 
		* @throws
		 */
		@RequestMapping("/selectByCommand")
		@ResponseBody
		public Object selectByCommand(VipManage vipManage,String current,HttpServletRequest request){
			Page<VipManage> page2=new Page<VipManage>(Integer.parseInt(current), Config.PAGENUM);
			try{
				/*VipManage vipManage=new VipManage();
				vipManage.setInviAcceptmobile(inviAcceptmobile);*/
				System.out.println("-----"+vipManage.toString());
				userService.selectByCommand(vipManage,page2);
			}catch(BussinessException e){
				log.info("查询错误");
				return renderError(e.getLocalizedMessage());
			}catch (Exception e) {
				log.info("查询错误");
				return renderError(e.getLocalizedMessage());
			}
			
			return renderSuccess(page2);
		}
		
		
		
		/**
		 * 
		* @Title: gotMember_Manage 
		* @Description: 
		* @author 尤
		* @date 2016年11月9日 上午10:55:11  
		* @param @param request
		* @param @return    设定文件 
		* @return String    返回类型 
		* @throws
		 */
		@RequestMapping("/gotMember_Manage")
		public String gotMember_Manage(HttpServletRequest request){
			return "/member-manage";
		}
		
		
		/**
		 * 
		 * @Title: getAllUser @Description:获得用户列表 @author 尤 @date 2016年10月26日
		 * 上午10:37:35 @param @param current @param @param request @param @return
		 * 设定文件 @return Object 返回类型 @throws
		 */
		@RequestMapping("/getUserList")
		@ResponseBody
		public Object getUserList(String current, HttpServletRequest request) {
			Page<VipManage> page2 = new Page<VipManage>(Integer.parseInt(current), Config.PAGENUM);
			try{
				userService.selectUserPage(page2);
			} catch (BussinessException e) {
				e.printStackTrace();
				return renderError(e.getLocalizedMessage());
			} catch (Exception e) {
				return  renderError("访问失败请重试");
			}
			System.out.println("--------"+page2.toString());
			return renderSuccess(page2);
		}
		
}
