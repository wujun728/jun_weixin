package com.adam.wechat.dao;

import java.util.List;
import java.util.Map;

import com.adam.wechat.bean.Bill;

public interface BillsDao {

	public boolean saveBill(Bill bill);
	
	public List<Bill> queryBills(Map<String, String> map);
}
