package com.qiton.service;

import com.qiton.exception.BussinessException;
import com.qiton.model.Admin;
import com.qiton.model.User;
import com.sun.tools.javac.util.List;
import com.baomidou.framework.service.ISuperService;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Admin 表数据服务层接口
 *
 */
public interface IAdminService extends ISuperService<Admin> {
	/**
	 * h后台登录
	 * @param admin
	 * @return
	 * @throws BussinessException
	 */
	public Admin login(Admin admin)throws BussinessException;
	
	
	public Admin addAdmin(Admin admin) throws BussinessException;
	
	
	public void deleteAdmin(Long id)throws BussinessException;
	
	
	public void updateAdmin(Admin admin) throws BussinessException;
	
	
	public Admin getAdmin(Admin admin) throws BussinessException;
	
	
	public void getAdmins(Page<Admin> page);
}