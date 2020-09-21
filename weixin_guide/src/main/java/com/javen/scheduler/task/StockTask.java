package com.javen.scheduler.task;

import com.javen.model.Stock;

public class StockTask implements Runnable{

	@Override
	public void run() {
		Stock.dao.setAllStockCount(80);
	}

}
