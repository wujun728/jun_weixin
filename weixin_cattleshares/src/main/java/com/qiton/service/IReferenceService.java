package com.qiton.service;

import com.qiton.exception.BussinessException;
import com.qiton.model.Reference;
import com.baomidou.framework.service.ISuperService;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Reference 表数据服务层接口
 *
 */
public interface IReferenceService extends ISuperService<Reference> {

	/**
	 * 
	* @Title: pubReference 
	* @Description: 发布内参
	* @author 尤
	* @date 2016年11月2日 上午9:44:07  
	* @param @param reference
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void pubReference(Reference reference) throws BussinessException;
	
	/**
	 * 
	* @Title: deleteReference 
	* @Description: 删除内参
	* @author 尤
	* @date 2016年11月2日 上午10:20:31  
	* @param @param rerId
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void deleteReference(Long rerId)throws BussinessException;
	
	/**
	 * 
	* @Title: updateReference 
	* @Description: 更改内参
	* @author 尤
	* @date 2016年11月2日 上午10:20:45  
	* @param @param reference
	* @param @param whereRefId
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void updateReference(Reference reference,Long whereRefId)throws BussinessException;
	
	/**
	 * 
	* @Title: getAllReference 
	* @Description: 分页取得所有内参信息
	* @author 尤
	* @date 2016年11月2日 上午10:39:32  
	* @param @param current
	* @param @throws BussinessException    设定文件 
	* @return void    返回类型 
	* @throws
	 */
	public void getAllReference(Page<Reference> page) throws BussinessException;
	
}