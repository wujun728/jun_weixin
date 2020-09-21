package com.qiton.service;

import com.qiton.exception.BussinessException;
import com.qiton.model.Purchase;
import com.qiton.model.User;

import java.util.List;

import com.baomidou.framework.service.ISuperService;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *@author 抽离
 * Purchase 表数据服务层接口
 *
 */
public interface IPurchaseService extends ISuperService<Purchase> {

	public Purchase addPurchase(Purchase purchase) throws BussinessException;
	
	public void upPurchase(Purchase purchase)throws BussinessException;
	
	public void downPurchase(Purchase purchase)throws BussinessException;
	
	public void deletePurchase(Purchase purchase) throws BussinessException;
	
	public void deleteAll(Long[] ids) throws BussinessException;
	
	public Purchase findPurchase(Long code)throws BussinessException;
	
	public List<Purchase> findPurchases()throws BussinessException;
	
	public void findPurchasesByPage(Page<Purchase> page)throws BussinessException;

}