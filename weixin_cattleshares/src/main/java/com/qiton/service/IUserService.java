package com.qiton.service;

import com.qiton.exception.BussinessException;
import com.qiton.model.SelectOptionTime;
import com.qiton.model.User;
import com.qiton.model.VipManage;

import java.text.ParseException;

import com.baomidou.framework.service.ISuperService;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * User 表数据服务层接口
 *
 */
public interface IUserService extends ISuperService<User> {
	
	public void regist(User user, String rightValidateCode) throws BussinessException;

	/**
	 * 用户登录
	 * @param user
	 * @return
	 * @throws BussinessException
	 */
	public User userlogin(User user)throws BussinessException;
	
	
	/**
	 * 
	* @Title: getCurrentUser 
	* @Description: 根据id获得用户
	* @author 尤
	* @date 2016年10月26日 上午10:44:33  
	* @param @param id
	* @param @return
	* @param @throws BussinessException    设定文件 
	* @return User    返回类型 
	* @throws
	 */
	public User getCurrentUser(String id)throws BussinessException;
	
	
	/**
	 * 
	* @Title: updateUserCaptical 
	* @Description: 资金操作
	* @author 尤
	* @date 2016年10月26日 上午10:59:33  
	* @param @param operId
	* @param @param capiId
	* @param @param money
	* @param @param remark
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void updateUserCaptical(User user,String operId,String capiId,String money,String remark) throws BussinessException;
	
	/**
	 * @throws ParseException 
	 * 
	* @Title: updateVIP_Del 
	* @Description: 会员延期
	* @author 尤
	* @date 2016年10月26日 下午2:57:07  
	* @param @param current_id
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void updateVIP_Del(User user,String delay_time)throws BussinessException, ParseException;

	/**
	 * 
	* @Title: updateUser_Info 
	* @Description: 修改用户信息
	* @author 尤
	* @date 2016年10月26日 下午3:32:47  
	* @param @param current_Id
	* @param @param mobile
	* @param @param vip_grade
	* @param @param vip_status
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void updateUser_Info(User user)throws BussinessException;
	
	/**
	 * 条件查询
	* @Title: selectByCommand 
	* @Description: TODO
	* @author 尤
	* @date 2016年11月7日 上午10:59:23  
	* @param @param user
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void selectByCommand(VipManage vipManage, Page<VipManage> page) throws BussinessException;
	
	/**
	 * 
	* @Title: getUserList 
	* @Description: 获取用户列表
	* @author 尤
	* @date 2016年11月7日 上午11:16:41  
	* @param @param page
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void getUserList(Page<User> page)throws BussinessException;
	
	
	/**
	 * 
	* @Title: getSelectTime 
	* @Description:根据时间查询出对象
	* @author 尤
	* @date 2016年11月9日 上午9:14:43  
	* @param @param page
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void getSelectTime(Page<VipManage> page,SelectOptionTime optionTime)throws BussinessException;
	
	/**
	 * 
	* @Title: getSelectUserSatate 
	* @Description: 根据用户状态查询出用户列表
	* @author 尤
	* @date 2016年11月9日 上午10:01:39  
	* @param @param page
	* @param @param userState
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void getSelectUserSatate(Page<VipManage> page,String userState)throws BussinessException;
	
	/**
	 * 
	* @Title: selectUserPage 
	* @Description: 
	* @author 尤
	* @date 2016年11月10日 上午9:29:30  
	* @param @param page
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void selectUserPage(Page<VipManage> page)throws BussinessException;
}