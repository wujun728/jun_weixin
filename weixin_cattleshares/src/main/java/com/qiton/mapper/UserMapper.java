package com.qiton.mapper;

import com.qiton.model.SelectOptionTime;
import com.qiton.model.User;
import com.qiton.model.VipManage;

import java.util.List;

import com.baomidou.mybatisplus.mapper.AutoMapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

/**
 *
 * User 表数据库控制层接口
 *
 */
public interface UserMapper extends AutoMapper<User> {

	/**
	 * 
	* @Title: selectUserList 
	* @Description: 分页查询用户
	* @author 尤
	* @date 2016年11月10日 上午10:24:52  
	* @param @param page
	* @param @return    设定文件 
	* @return List<VipManage>    返回类型 
	* @throws
	 */
	List<VipManage> selectUserList(Pagination page);
	
	/**
	 * 
	* @Title: selectUserList 
	* @Description: 根据时间分页查询用户
	* @author 尤
	* @date 2016年11月10日 上午10:25:07  
	* @param @param page
	* @param @return    设定文件 
	* @return List<VipManage>    返回类型 
	* @throws
	 */
	List<VipManage> selectUserListByTime(Pagination page,VipManage vipManage);
	
	
	List<VipManage> getSelectTime(Pagination page,SelectOptionTime selectOptionTime);
	
	List<VipManage> getSelectUserSatate(Pagination page,String userState);
}