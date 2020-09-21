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
import com.qiton.mapper.SelloutMapper;
import com.qiton.model.Purchase;
import com.qiton.model.Sellout;
import com.qiton.model.vo.SharesVo;
import com.qiton.service.IPurchaseService;
import com.qiton.service.ISelloutService;
import com.qiton.service.ISharesApiService;
import com.qiton.utils.StringUtils;
import com.baomidou.framework.service.impl.SuperServiceImpl;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;

/**
 *
 * Sellout 表数据服务层接口实现类
 *
 */
@Service
public class SelloutServiceImpl extends SuperServiceImpl<SelloutMapper, Sellout> implements ISelloutService {
	
	@Autowired
	private ISharesApiService iSharesApiService;
	
	@Autowired
	private PurchaseMapper purchaseMapper;
	
	@Autowired
	private IPurchaseService iPurchaseService;
	
	@Autowired
	private SelloutMapper selloutMapper;
	
	
	
	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#findSellout()
	 */
	@Override
	public Sellout findSellout(Long code) throws BussinessException {
		if(code == null){
			throw new BussinessException("参数错误");
		}
		
		Sellout selloutQuery = new Sellout();
		EntityWrapper<Sellout> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("sell_stockcode={0}", code);
		entityWrapper.andNew("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		
		List<Sellout> selloutResult = selloutMapper.selectList(entityWrapper);
		if(!selloutResult.isEmpty()){
			return selloutResult.get(0);
		}
		return null;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#addSellout(com.qiton.model.Sellout)
	 */
	@Override
	public Sellout addSellout(Sellout sellout) throws BussinessException {
		if(StringUtils.isBlank(sellout.getSellStockname()) || StringUtils.isBlank(sellout.getSellTechnick())){
			throw new BussinessException("参数错误");
		}
		
		if(sellout.getPurPurprice() == null || sellout.getSellSellprice() == null 
				|| sellout.getSellStockcode() == null || sellout.getSellType() == null
				){
			throw new BussinessException("参数错误");
		}
		
		sellout.setCreateTime(new Date());
		
		EntityWrapper<Sellout> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("sell_stockcode={0}", sellout.getSellStockcode());
		entityWrapper.andNew("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		
		List<Sellout> selloutResult = selloutMapper.selectList(entityWrapper);
		
		if(selloutResult.isEmpty()){
			throw new BussinessException("该卖出股票已存在，请勿重复添加");                     
		}
		
		int result = selloutMapper.insert(sellout);
		if(result != 1){
			throw new BussinessException("卖出股票添加失败，请重试");
		}
		
		return sellout;
		
	}

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#deleteSellout(com.qiton.model.Sellout)
	 */
	@Override
	public void deleteSellout(Sellout sellout) throws BussinessException {
		if(sellout.getSellId() == null){
			throw new BussinessException("参数错误");
		}
		
		purchaseMapper.deleteById(sellout.getSellId());
	}

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#upSellout(com.qiton.model.Sellout)
	 */
	@Override
	public void upSellout(Sellout sellout) throws BussinessException {
		
		Sellout selloutResult = selloutMapper.selectById(sellout.getSellId());
		
		if(selloutResult == null){
			throw new BussinessException("该卖出股票不存在，请添加后再做推荐操作");                     
		}
		sellout.setSellType(0);
		
		int result = selloutMapper.updateById(selloutResult);
		if(result != 1){
			throw new BussinessException("推荐卖出股票失败，请重试");
		}
		
	}

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#downSellout(com.qiton.model.Sellout)
	 */
	@Override
	public void downSellout(Sellout sellout) throws BussinessException {
		Sellout selloutResult = selloutMapper.selectById(sellout.getSellId());
		
		if(selloutResult == null){
			throw new BussinessException("该卖出股票不存在，请添加后再做撤荐操作");                     
		}
		
		sellout.setSellType(1);
		
		int result = selloutMapper.updateById(selloutResult);
		if(result != 1){
			throw new BussinessException("撤荐卖出股票失败，请重试");
		}
		
	}

	

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#addSelloutBefore(java.lang.Long)
	 */
	@Override
	public SharesVo addSelloutBefore(Long code) throws BussinessException {
		SharesVo sharesVo = iSharesApiService.getSharesBySharesCode(code);
		Purchase purchase = iPurchaseService.findPurchase(code);
		if(purchase == null){
			throw new BussinessException("该买入股票不存在，请先添加进买入");
		}
		double purchasePrice = purchase.getPurStockprice();
		double profit = ((sharesVo.getNowPrice() - purchasePrice) / purchasePrice) * 100;
		sharesVo.setProfit(profit);
		return sharesVo;
	}

	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#findSelloutByPage(com.baomidou.mybatisplus.plugins.Page)
	 */
	@Override
	public void findSelloutByPage(Page<Sellout> page) throws BussinessException {
		EntityWrapper<Sellout> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		List<Sellout> list = selloutMapper.selectPage(page, entityWrapper);
		List<Sellout> resultList = new ArrayList<>();
		for(Sellout sellout : list){
			double currentPrice = iSharesApiService.getCurrentPrice(sellout.getSellStockcode());
			double profit = ((currentPrice - sellout.getPurPurprice()) / sellout.getPurPurprice()) * 100;
			sellout.setProfit(profit);
			resultList.add(sellout);
		}
		page.setRecords(resultList);
	}


	@Override
	public void deleteAll(Long[] ids) throws BussinessException {
		if(ids == null || ids.length == 0){
			throw new BussinessException("参数错误");
		}
		
		int result = selloutMapper.deleteBatchIds(Arrays.asList(ids));
		
		if(result == 0){
			throw new BussinessException("批量删除推荐卖出股票失败，请重试");
		}
		
	}
	
	/* (非 Javadoc)
	 * Description:
	 * @see com.qiton.service.ISelloutService#findSellout()
	 */
	@Override
	public List<Sellout> findSellout() throws BussinessException {
		EntityWrapper<Sellout> entityWrapper = new EntityWrapper<>();
		entityWrapper.where("create_time = DATE_FORMAT(NOW(),'%Y-%m-%d')");
		
		List<Sellout> selloutResult = selloutMapper.selectList(entityWrapper);
		List<Sellout> resultList = new ArrayList<>();
		for(Sellout sellout : selloutResult){
			double currentPrice = iSharesApiService.getCurrentPrice(sellout.getSellStockcode());
			double profit = ((currentPrice - sellout.getPurPurprice()) / sellout.getPurPurprice()) * 100;
			sellout.setProfit(profit);
			resultList.add(sellout);
		}
		return resultList;
	}

}