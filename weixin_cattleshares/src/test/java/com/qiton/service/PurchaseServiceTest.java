/******************************************************************
 *
 *    
 *
 *    Copyright (c) 2016-forever 
 *    http://www.fzqblog.top
 *
 *    Package:     com.qiton.service
 *
 *    Filename:    UserServiceTesst.java
 *
 *    Description: TODO(用一句话描述该文件做什么)
 *
 *    Copyright:   Copyright (c) 2001-2014
 *
 *    Company:     fzqblog
 *
 *    @author:     抽离
 *
 *    @version:    1.0.0
 *
 *    Create at:   2016年10月24日 上午10:01:12
 *
 *    Revision:
 *
 *    2016年10月24日 上午10:01:12
 *        - first revision
 *
 *****************************************************************/
package com.qiton.service;

import java.util.Date;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.qiton.model.Purchase;

/**
 * @ClassName UserServiceTesst
 * @Description TODO(这里用一句话描述这个类的作用)
 * @author 抽离
 * @Date 2016年10月24日 上午10:01:12
 * @version 1.0.0
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {
		"classpath:springmvc-servlet.xml",
		"classpath:spring-config.xml"
})
public class PurchaseServiceTest {
	
	@Autowired
	private IPurchaseService iPurchaseService;
	
	@Autowired
	private ISelloutService iSelloutService;
	
	@Test
	public void addPurchase(){
		Purchase purchase = new Purchase();
		purchase.setPurPurchasetime(new Date());
		purchase.setPurStockcode(600887L);
		purchase.setPurStockprice(10.55);
		purchase.setPurTechnick("张老师");
		purchase.setPurType(1);
		purchase.setPurStockname("伊利股份");
		iPurchaseService.addPurchase(purchase);
	}
	
	@Test
	public void addSelloutBefore(){
		Purchase purchase = new Purchase();
		purchase.setPurId(2L);
		iPurchaseService.upPurchase(purchase);
	}
}
