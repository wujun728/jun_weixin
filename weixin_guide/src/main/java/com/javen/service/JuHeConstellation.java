package com.javen.service;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.javen.service.entity.Constellation;
import com.jfinal.kit.HttpKit;
import com.jfinal.kit.PropKit;

/**
 * @author Javen
 * 2016年5月4日
 * 星座运势查询
 */
public class JuHeConstellation {
	private static final String URL="http://web.juhe.cn:8080/constellation/getAll";
	public static  Constellation getConstellation(String consName,String type){
		Map<String, String> queryParas =new HashMap<String, String>();
		queryParas.put("key", PropKit.get("jh_key"));
		queryParas.put("consName", consName);
		queryParas.put("type", type);
		String resString = HttpKit.get(URL, queryParas );
		
		return parseConstellation(resString, type);
	}
	
	private static Constellation parseConstellation(String result,String type){
		JSONObject jsonObject = JSON.parseObject(result);
		int code=jsonObject.getInteger("error_code");
		Constellation constellation=new Constellation();
		constellation.setCode(code);
		if (code==0) {
			
			
			constellation.setName(jsonObject.getString("name"));
			if (type.equals("today") || type.equals("tomorrow")) {
				constellation.setDate(jsonObject.getString("date"));
				constellation.setAll(jsonObject.getString("all"));
				constellation.setColor(jsonObject.getString("color"));
				constellation.setHealth(jsonObject.getString("health"));
				constellation.setLove(jsonObject.getString("love"));
				constellation.setMoney(jsonObject.getString("money"));
				constellation.setNumber(jsonObject.getString("number"));
				constellation.setQFriend(jsonObject.getString("QFriend"));
				constellation.setSummary(jsonObject.getString("summary"));
				constellation.setWork(jsonObject.getString("work"));
			}else if (type.equals("week") || type.equals("nextweek")) {
				constellation.setWeekDate(jsonObject.getString("date"));
				constellation.setWeekHealth(jsonObject.getString("health"));
				constellation.setWeekJob(jsonObject.getString("job"));
				constellation.setWeekLove(jsonObject.getString("love"));
				constellation.setWeekFinance(jsonObject.getString("money"));
				constellation.setWeekWork(jsonObject.getString("work"));
			}else if (type.equals("month")) {
				constellation.setDate(jsonObject.getString("date"));
				constellation.setMonthAll(jsonObject.getString("all"));
				constellation.setWeekHealth(jsonObject.getString("health"));
				constellation.setWeekLove(jsonObject.getString("love"));
				constellation.setWeekFinance(jsonObject.getString("money"));
				constellation.setWeekWork(jsonObject.getString("work"));
			}else if (type.equals("year")) {
				constellation.setDate(jsonObject.getString("date"));
				constellation.setCareer(jsonObject.getJSONArray("career").getString(0));
				constellation.setYearLove(jsonObject.getJSONArray("love").getString(0));
				constellation.setYearHealth(jsonObject.getJSONArray("health").getString(0));
				constellation.setYearFinance(jsonObject.getJSONArray("finance").getString(0));
				constellation.setLuckyStone(jsonObject.getString("luckyStone"));
				JSONObject mimaJsonObject=jsonObject.getJSONObject("mima");
				constellation.setInfo(mimaJsonObject.getString("info"));
				constellation.setText(mimaJsonObject.getJSONArray("text").getString(0));
			}
			
		}else {
			constellation.setReason(jsonObject.getString("reason"));
		}
		return constellation;
	}
	

	public static void main(String[] args) {
		// today,tomorrow,week,nextweek,month,year
		System.out.println(getConstellation("天秤座2", "year2").toString());
	}

}
