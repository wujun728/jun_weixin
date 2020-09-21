package com.qiton.service;

import com.qiton.exception.BussinessException;
import com.qiton.model.Purchase;
import com.qiton.model.Sellout;
import com.qiton.model.vo.SharesVo;

import java.util.List;

import com.baomidou.framework.service.ISuperService;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Sellout 表数据服务层接口
 *
 */
public interface ISelloutService extends ISuperService<Sellout> {
	
	public SharesVo addSelloutBefore(Long code)throws BussinessException;

	public Sellout addSellout(Sellout sellout) throws BussinessException;
	
	public void deleteAll(Long[] ids) throws BussinessException;
	
	public void deleteSellout(Sellout sellout) throws BussinessException;
	
	public void upSellout(Sellout sellout) throws BussinessException;
	
	public void downSellout(Sellout sellout)throws BussinessException;
	
	public void findSelloutByPage(Page<Sellout> page) throws BussinessException;
	
	public Sellout findSellout(Long code) throws BussinessException;
	
	public List<Sellout> findSellout() throws BussinessException;

}