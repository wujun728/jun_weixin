package com.qiton.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.qiton.exception.BussinessException;
import com.qiton.mapper.ReferenceMapper;
import com.qiton.model.Admin;
import com.qiton.model.Invite;
import com.qiton.model.Reference;
import com.qiton.model.User;
import com.qiton.service.IReferenceService;
import com.qiton.utils.Config;
import com.qiton.utils.StringUtils;
import com.baomidou.framework.service.impl.SuperServiceImpl;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Reference 表数据服务层接口实现类
 *
 */
@Service
public class ReferenceServiceImpl extends SuperServiceImpl<ReferenceMapper, Reference> implements IReferenceService {

	@Resource
	private ReferenceMapper referenceMapper;
	
	/**
	 * 发布内参
	 */
	@Override
	public void pubReference(Reference reference) throws BussinessException {
		// TODO Auto-generated method stub
		if(reference==null||StringUtils.isBlank(reference.getRerSharecode().toString())
				||StringUtils.isBlank(reference.getRerRerinfo())
				||reference.getRerSharecode().toString().length()!=6||reference.getRerRerinfo().length()>200
				){
			throw new BussinessException("参数错误");
		}
		int b=referenceMapper.insert(reference);
		if(b!=1){
			throw new BussinessException("发布失败");
		}
	}

	/**
	 * 删除内参
	 */
	@Override
	public void deleteReference(Long rerId) throws BussinessException {
		// TODO Auto-generated method stub
		if(rerId==null||StringUtils.isBlank(rerId.toString())){
			throw new BussinessException("参数有错");
		}
		int b=referenceMapper.deleteById(rerId);
		if(b!=1){
			throw new BussinessException("删除失败");
		}
	}

	/**
	 * 更改内参
	 */
	@Override
	public void updateReference(Reference reference, Long whereRefId) throws BussinessException {
		// TODO Auto-generated method stub
		if(reference==null||whereRefId==null||reference.getRerSharecode().toString().length()!=6
				||reference.getRerRerinfo().length()>200){
			throw new BussinessException("参数出错");
		}
		Reference whReference=new Reference();
		whReference.setRerId(whereRefId);
		int b=referenceMapper.update(reference, whReference);
		if(b!=1){
			throw new BussinessException("修改失败");
		}
	}

	/**
	 * 分页获得内参
	 */
	@Override
	public void getAllReference(Page<Reference> page) {
		EntityWrapper<Reference> entityWrapper = new EntityWrapper<Reference>();
		List<Reference> rers = referenceMapper.selectPage(page, null);
		page.setRecords(rers);
	}

	
	

}