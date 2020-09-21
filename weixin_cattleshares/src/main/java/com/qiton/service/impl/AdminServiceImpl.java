package com.qiton.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.qiton.exception.BussinessException;
import com.qiton.mapper.AdminMapper;
import com.qiton.model.Admin;
import com.qiton.service.IAdminService;
import com.qiton.utils.StringUtils;
import com.baomidou.framework.service.impl.SuperServiceImpl;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Admin 表数据服务层接口实现类
 *
 */
@Service
public class AdminServiceImpl extends SuperServiceImpl<AdminMapper, Admin> implements IAdminService {

	private static final org.slf4j.Logger log = LoggerFactory.getLogger(AdminServiceImpl.class);
	
	@Resource
	private AdminMapper adminmapper;
	
	/**
	 * 后台登录验证
	 */
	@Override
	public Admin login(Admin admin)throws BussinessException{
		if(admin == null || StringUtils.isBlank(admin.getAdminUsername()) || StringUtils.isBlank(admin.getAdminPassword())
				|| admin.getAdminUsername().length() < 4 || admin.getAdminUsername().length() > 20 
				|| admin.getAdminPassword().length() < 6 || admin.getAdminPassword().length() > 20 ){
					throw new BussinessException("参数错误");	
		}
		 Admin admin2=new Admin();
		admin2.setAdminUsername(admin.getAdminUsername());
		Admin selectadmin=adminmapper.selectOne(admin2);
		if(selectadmin==null||!admin.getAdminPassword().trim().equals(selectadmin.getAdminPassword()))
		{
			throw new BussinessException("用户名或密码不正确");
		}
		return selectadmin;
		
	}

	/*  @author 抽离
	 * Description:添加客服
	 * @see com.qiton.service.IAdminService#addAdmin(com.qiton.model.Admin)
	 */
	@Override
	public Admin addAdmin(Admin admin) throws BussinessException {
		if(StringUtils.isBlank(admin.getAdminUsername()) || StringUtils.isBlank(admin.getAdminPassword())
				|| admin.getAdminUsername().length() < 6 || admin.getAdminUsername().length() > 20 
				|| admin.getAdminPassword().length() < 6 || admin.getAdminPassword().length() > 20 
				){
			throw new BussinessException("参数错误");
		}
			
		Admin adminQuery = new Admin();
		adminQuery.setAdminUsername(admin.getAdminUsername());
		if(adminmapper.selectOne(adminQuery) != null){
			throw new BussinessException("客服名字已存在");
		}
		
		admin.setAdminType(0);
		
		adminmapper.insert(admin);
		
		return admin;
		
	}

	/*  @author 抽离
	 * Description:删除客服
	 * @see com.qiton.service.IAdminService#deleteAdmin(java.lang.Long)
	 */
	@Override
	public void deleteAdmin(Long id) throws BussinessException {

		int result = adminmapper.deleteById(id);
		
		if(result != 1){
			throw new BussinessException("删除失败，请重试");
		}
		
	}

	/*  @author 抽离
	 * Description:更新客服
	 * @see com.qiton.service.IAdminService#updateAdmin(com.qiton.model.Admin)
	 */
	@Override
	public void updateAdmin(Admin admin) throws BussinessException {
		if(StringUtils.isBlank(admin.getAdminUsername()) || StringUtils.isBlank(admin.getAdminPassword())
				|| admin.getAdminUsername().length() < 6 || admin.getAdminUsername().length() > 20 
				|| admin.getAdminPassword().length() < 6 || admin.getAdminPassword().length() > 20 
				){
			throw new BussinessException("参数错误");
		}
			
		Admin adminQuery = new Admin();
		adminQuery.setAdminUsername(admin.getAdminUsername());
		if(adminmapper.selectOne(adminQuery) != null){
			throw new BussinessException("客服名字已存在");
		}
		
		admin.setAdminType(0);//更新时必须重设标识客服
		
		int result = adminmapper.updateById(admin);
		
		if(result != 1){
			throw new BussinessException("更新失败，请重试");
		}
		
	}

	/*  @author 抽离
	 * Description:获取单个客服
	 * @see com.qiton.service.IAdminService#getAdmin(com.qiton.model.Admin)
	 */
	@Override
	public Admin getAdmin(Admin admin) throws BussinessException {
		
		Admin adminResult = adminmapper.selectOne(admin);
		
		if(adminResult == null){
			throw new BussinessException("客户不存在，请重试");
		}
		
		return adminResult;
	}

	/**
	 * @author 抽离
	 * 获取客服列表
	 */
	@Override
	public void getAdmins(Page<Admin> page) {
		EntityWrapper<Admin> entityWrapper = new EntityWrapper<Admin>();
		entityWrapper.where("admin_type={0}", 0);
		List<Admin> admins = adminmapper.selectPage(page, entityWrapper);
		page.setRecords(admins);
	}

}