package com.qiton.service.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qiton.exception.BussinessException;
import com.qiton.mapper.PurchaseMapper;
import com.qiton.model.Purchase;
import com.qiton.service.IPurchaseService;
import com.qiton.service.ISharesApiService;
import com.qiton.utils.DateUtils;
import com.qiton.utils.StringUtils;
import com.baomidou.framework.service.impl.SuperServiceImpl;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Purchase 表数据服务层接口实现类
 *
 */
@Service
public class PurchaseServiceImpl extends SuperServiceImpl<PurchaseMapper, Purchase> implements IPurchaseService {

	@Autowired
	private ISharesApiService iSharesApiService;
	
	@Autowired
	private PurchaseMapper purchaseMapper;
	
	/*
	 * Description: 添加买入
	 * @see com.qiton.service.IPurchaseService#addPurchase(com.qiton.model.Purchase)
	 */
	@Override
	public Purchase addPurchase(Purchase purchase) throws BussinessException {
		if(StringUtils.isBlank(purchase.getPurStockname()) || StringUtils.isBlank(purchase.getPurTechnick())){
			throw new BussinessException("参数错误");
		}
		
		if(purchase.getPurStockcode() == null || purchase.getPurStockprice() == null 
				|| purchase.getPurType() == null){
			throw new BussinessException("参数异常");
		}
		
		purchase.setCreateTime(new Date());
		
		EntityWrapper<Purchase> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("pur_stockcode={0}", purchase.getPurStockcode());
		entityWrapper.andNew("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		List<Purchase> purchaseResult = purchaseMapper.selectList(entityWrapper);
		
		if(!purchaseResult.isEmpty()){
			throw new BussinessException("该股票已存在，请勿重复添加");                     
		}
		
		int result = purchaseMapper.insert(purchase);
		if(result != 1){
			throw new BussinessException("股票添加失败，请重试");
		}
		
		return purchase;
	}



	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.IPurchaseService#deletePurchase(com.qiton.model.Purchase)
	 */
	@Override
	public void deletePurchase(Purchase purchase) throws BussinessException {
		
		if(purchase.getPurId() == null){
			throw new BussinessException("参数异常");
		}
		
		int result = purchaseMapper.deleteById(purchase.getPurId());
		
		if(result == 0){
			throw new BussinessException("删除失败，请重试");
		}
	}

	
	
	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.IPurchaseService#findPurchases()
	 */
	@Override
	public List<Purchase> findPurchases() throws BussinessException {
		EntityWrapper<Purchase> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		List<Purchase> list = purchaseMapper.selectList(entityWrapper);
		if(list == null){
			throw new BussinessException("获取买入股票代码失败，请重试");
		}
		List<Purchase> resultList = new ArrayList<>();
		for(Purchase pur : list){
			double currentPrice = iSharesApiService.getCurrentPrice(pur.getPurStockcode());
			double profit = ((currentPrice - pur.getPurStockprice()) / pur.getPurStockprice()) * 100;
			pur.setProfit(profit);
			resultList.add(pur);
		}
		return resultList;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.IPurchaseService#findPurchasesByPage(com.baomidou.mybatisplus.plugins.Page)
	 */
	@Override
	public void findPurchasesByPage(Page<Purchase> page) throws BussinessException {
		EntityWrapper<Purchase> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		List<Purchase> list = purchaseMapper.selectPage(page, entityWrapper);
		List<Purchase> resultList = new ArrayList<>();
		for(Purchase pur : list){
			double currentPrice = iSharesApiService.getCurrentPrice(pur.getPurStockcode());
			double profit = ((currentPrice - pur.getPurStockprice()) / pur.getPurStockprice()) * 100;
			pur.setProfit(profit);
			resultList.add(pur);
		}
		page.setRecords(resultList);
	}



	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.IPurchaseService#updatePurType(com.qiton.model.Purchase)
	 */
	@Override
	public void upPurchase(Purchase purchase) throws BussinessException {	
		
		Purchase purchaseResult = purchaseMapper.selectById(purchase.getPurId());
		
		if(purchaseResult == null){
			throw new BussinessException("该股票不存在，请添加再做推荐");                     
		}
		
			
		purchaseResult.setPurType(0);
		int result = purchaseMapper.updateById(purchaseResult	);
		
		if(result != 1){
			throw new BussinessException("推荐股票失败，请重试");
		}
	}



	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.IPurchaseService#downPurchase(com.qiton.model.Purchase)
	 */
	@Override
	public void downPurchase(Purchase purchase) throws BussinessException {
		Purchase purchaseResult = purchaseMapper.selectById(purchase.getPurId());
		
		if(purchaseResult == null){
			throw new BussinessException("该股票不存在，请添加再做撤荐");                     
		}
			
		purchaseResult.setPurType(1);
		int result = purchaseMapper.updateById(purchaseResult	);
		
		if(result != 1){
			throw new BussinessException("撤荐股票失败，请重试");
		}
		
	}



	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.IPurchaseService#findPurchase(java.lang.Long)
	 */
	@Override
	public Purchase findPurchase(Long code) throws BussinessException {
		if(code == null){
			throw new BussinessException("参数错误");
		}
		EntityWrapper<Purchase> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("pur_stockcode={0}", code);
		entityWrapper.andNew("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		List<Purchase> purchaseResult = purchaseMapper.selectList(entityWrapper);
		
		if(!purchaseResult.isEmpty()){
			return purchaseResult.get(0);
		}
		return null;
	}



	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.IPurchaseService#deleteAll(java.lang.Long[])
	 */
	@Override
	public void deleteAll(Long[] ids) throws BussinessException {
		
		if(ids == null || ids.length == 0){
			throw new BussinessException("参数错误");
		}
		
		int result = purchaseMapper.deleteBatchIds(Arrays.asList(ids));
		
		if(result == 0){
			throw new BussinessException("批量删除推荐买入股票失败，请重试");
		}
		
	}


}