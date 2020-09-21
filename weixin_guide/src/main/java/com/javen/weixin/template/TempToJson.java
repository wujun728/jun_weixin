/**
 * Copyright (c) 2015-2016, Javen Zhou  (javenlife@126.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 */
package com.javen.weixin.template;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.jfinal.kit.JsonKit;

public class TempToJson {
	public static String getTempJson(String touser,String template_id,String topcolor,String url,DataItem data){
		TempEntity entity=new TempEntity();
		entity.setTouser(touser);
		entity.setTemplate_id(template_id);
		entity.setTopcolor(topcolor);
		entity.setUrl(url);
		entity.setData(data);
		
		return JsonKit.toJson(entity);
	}
	
	public static void main(String[] args) {
		DataItem2 dataItem=new DataItem2();
		dataItem.setFirst(new TempItem("您好,你已购买课程成功", "#743A3A"));
		dataItem.setKeyword1(new TempItem("15FE65EGBE9823", "#FF0000"));
		dataItem.setKeyword2(new TempItem("39.8元", "#c4c400"));
		dataItem.setKeyword3(new TempItem("电吉他音乐一对一专业培训", "#c4c400"));
		dataItem.setKeyword4(new TempItem("高老师020-12345678", "#c4c400"));
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy年MM月dd日  HH时mm分ss秒");
		String time=sdf.format(new Date());
		dataItem.setKeyword5(new TempItem(time, "#0000FF"));
		dataItem.setRemark(new TempItem("您的订单已提交，我们将尽快发货，祝生活愉快", "#008000"));
		
		String json=getTempJson("o_pncsidC-pRRfCP4zj98h6slREw", "7y1wUbeiYFsUONKH1IppVi47WwViICAjREZSdR3Zahc",
				"#743A3A", "http://www.cnblogs.com/zyw-205520/tag/%E5%BE%AE%E4%BF%A1/", dataItem);
		System.out.println(json);
	}
}
