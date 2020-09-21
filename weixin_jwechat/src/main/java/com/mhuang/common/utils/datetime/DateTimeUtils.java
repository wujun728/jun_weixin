package com.mhuang.common.utils.datetime;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * 时间转换工具
 * @author mHuang
 *
 */
public class DateTimeUtils {

	public static SimpleDateFormat defaultFormatDate = null;
	public static SimpleDateFormat defaultFormatDateTime = null;
	public static SimpleDateFormat defaultFormatDateTime2 = null;
	public static SimpleDateFormat SimpleDefaultFormatDateTime2 = null;
	private final static Long PY = 1000L;
	public static SimpleDateFormat defaultFormatMonthDay = null;
	public static SimpleDateFormat defaultFormatMonthDay_ = null;
	public static SimpleDateFormat defaultFormatMonth = null;
	public static SimpleDateFormat defaultFormatDay = null;
	public static SimpleDateFormat defaultMinute = null;
	
	static{
	    defaultMinute = new SimpleDateFormat("HH");
		defaultFormatDate = new SimpleDateFormat("yyyy-MM-dd");
		defaultFormatDateTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		defaultFormatDateTime2 = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		SimpleDefaultFormatDateTime2 = new SimpleDateFormat("MM-dd HH:mm");
		defaultFormatMonthDay = new SimpleDateFormat("MM月dd日");
		defaultFormatMonth = new SimpleDateFormat("MM月");
		defaultFormatDay = new SimpleDateFormat("dd日");
		defaultFormatMonthDay_ = new SimpleDateFormat("MM-dd");
	}
	
	public static SimpleDateFormat getFormat(String formatStr){
		return new SimpleDateFormat(formatStr);
	}
	
	public static Date parse(String dateStr) throws ParseException{
		return parse(dateStr, defaultFormatDateTime);
	}
	
	public static Date parse(String dateStr,String formatStr) throws ParseException{
		return parse(dateStr,getFormat(formatStr));
	}
	
	public static Date parse(String dateStr,SimpleDateFormat simpleDateFormat) throws ParseException{
		return simpleDateFormat.parse(dateStr);
	}
	
	/**
	 * 时间转UNIT时间戳
	 * 
	 */
	public static String unitToDateStr(long unit){
		return unitToDateStr(unit, defaultFormatDateTime);
	}
	
	public static String unitToDateStr(long unit,String formatStr){
		return unitToDateStr(unit, getFormat(formatStr));
	}
	
	public static  String unitToDateStr(long unit,SimpleDateFormat simpleDateFormat){
		return simpleDateFormat.format(unitToDate(unit));
	}
	
	public static Date unitToDate(long unit){
		return new Date(unit * PY);
	}
	/**
	 * UNIT时间错转时间
	 * 
	 */
	public static long dateStrToUnit(String dateStr){
		return dateStrToUnit(dateStr,defaultFormatDateTime);
	}
	public static long dateStrToUnit(String dateStr,String formatStr){
		return dateStrToUnit(dateStr,getFormat(formatStr));
	}

	public static Long dateToUnit(Date date){
		return date.getTime()/1000;
	}
	
	public static long dateStrToUnit(String dateStr,SimpleDateFormat simpleDateFormat){
		try {
			return parse(dateStr,simpleDateFormat).getTime() / PY;
		} catch (ParseException e) {
			e.printStackTrace();
			return 0L;
		}
	}
	
	public static String getTime(Long dateTime){
		 Calendar calendar = Calendar.getInstance();  
		 calendar.setTime(unitToDate(dateTime));
		 String time = "";
		 int amOrPm = calendar.get(Calendar.AM_PM);
		 int hours = calendar.get(Calendar.HOUR);
		 int mins = calendar.get(Calendar.MINUTE);
		 if(amOrPm == Calendar.AM){
			 if(hours<10){time = "0";}
		 }else{hours+=12;}
		 time+=hours+":";
		 if(mins<10)time+=0;
		 time += mins;
		 return time;
	}
	  /** 
     * 增加日期中某类型的某数值。如增加日期 
     * @param date 日期 
     * @param dateType 类型 
     * @param amount 数值 
     * @return 计算后日期 
     */  
    private static Date addInteger(Date date, int dateType, int amount) {  
        Date myDate = null;  
        if (date != null) {  
            Calendar calendar = Calendar.getInstance();  
            calendar.setTime(date);  
            calendar.add(dateType, amount);  
            myDate = calendar.getTime();  
        }  
        return myDate;  
    }  
    
    /** 
     * 增加日期中某类型的某数值。如增加日期 
     * @param date 日期字符串 
     * @param dateType 类型 
     * @param amount 数值 
     * @return 计算后日期字符串 
     * @throws ParseException 
     */  
    private static String addInteger(String date, int dateType, int amount) throws ParseException {  
        Date myDate = addInteger(parse(date), dateType, amount);  
        return defaultFormatDateTime.format(myDate);  
    }  
    /** 
     * 增加日期的年份。失败返回null。 
     * @param date 日期 
     * @param yearAmount 增加数量。可为负数 
     * @return 增加年份后的日期字符串 
     */  
    public static String addYear(String date, int yearAmount) {  
        try {
			return addInteger(date, Calendar.YEAR, yearAmount);
		} catch (ParseException e) {
			e.printStackTrace();
		}  
        return null;
    }  
      
    /** 
     * 增加日期的年份。失败返回null。 
     * @param date 日期 
     * @param yearAmount 增加数量。可为负数 
     * @return 增加年份后的日期 
     */  
    public static Date addYear(Date date, int yearAmount) {  
        return addInteger(date, Calendar.YEAR, yearAmount);  
    }  
      
    /** 
     * 增加日期的月份。失败返回null。 
     * @param date 日期 
     * @param yearAmount 增加数量。可为负数 
     * @return 增加月份后的日期字符串 
     */  
    public static String addMonth(String date, int yearAmount) {  
        try {
			return addInteger(date, Calendar.MONTH, yearAmount);
		} catch (ParseException e) {
			e.printStackTrace();
		}  
        return null;
    }  
      
    /** 
     * 增加日期的月份。失败返回null。 
     * @param date 日期 
     * @param yearAmount 增加数量。可为负数 
     * @return 增加月份后的日期 
     */  
    public static Date addMonth(Date date, int yearAmount) {  
        return addInteger(date, Calendar.MONTH, yearAmount);  
    }  
      
    /** 
     * 增加日期的天数。失败返回null。 
     * @param date 日期字符串 
     * @param dayAmount 增加数量。可为负数 
     * @return 增加天数后的日期字符串 
     */  
    public static String addDay(String date, int dayAmount) {  
        try {
			return addInteger(date, Calendar.DATE, dayAmount);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;  
    }  
  
    /** 
     * 增加日期的天数。失败返回null。 
     * @param date 日期 
     * @param dayAmount 增加数量。可为负数 
     * @return 增加天数后的日期 
     */  
    public static Date addDay(Date date, int dayAmount) {  
        return addInteger(date, Calendar.DATE, dayAmount);  
    }
    
    public static long unitDayTime(Date date,String time){
    	return dateToUnit(dayTime(date,time));
    }
    
    public static String formatDate(Date date){
    	return defaultFormatDate.format(date);
    }
    
    public static String formatMonth(Date date){
        return defaultFormatMonth.format(date);
    }
    
    public static String formatDay(Date date){
        return defaultFormatDay.format(date);
    }
    
    public static Date dayTime(Date date,String time){
    	try {
			return parse(dayTime(defaultFormatDate.format(date)," "+time));
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	return null;
    }
    /**
     * 获取当天开始时间
     * @return
     */
    public static Date beginDayTime(Date date){
    	try {
			return parse(dayTime(defaultFormatDate.format(date)," 00:00:00"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
    	return null;
    }
    public static Date parseDate(String date){
        try {
            return parse(date,defaultFormatDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }
    public static int daysBetween(Date date1,Date date2)  
    {  
        Calendar cal = Calendar.getInstance();  
        cal.setTime(date1);  
        long time1 = cal.getTimeInMillis();               
        cal.setTime(date2);  
        long time2 = cal.getTimeInMillis();       
        long between_days=(time2-time1)/(1000*3600*24);  
          
       return Integer.parseInt(String.valueOf(between_days));         
    }  
    public static String beginDayTime(String date){
    	try {
			return dayTime(defaultFormatDate.format(parse(date,defaultFormatDate))," 00:00:00");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
    }
    
    public static String endDayTime(String date){
    	try {
			return dayTime(defaultFormatDate.format(parse(date,defaultFormatDate))," 23:59:59");
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
    }
    
    public static Date endDayTime(Date date){
		try {
			return parse(dayTime(defaultFormatDate.format(date)," 23:59:59"));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
    }
    
    public static String dayTime(String dateStr,String time){
    	dateStr += time;
		return dateStr;
    }
    
    public static String formatMonthDay(Date date){
    	return defaultFormatMonthDay.format(date);
    }
    
    public static String formatMonthDay_(Date date){
        return defaultFormatMonthDay_.format(date);
    }
    
    public static String formatMinute(Date date){
        long minute = Long.parseLong(defaultMinute.format(date));
        if(minute < 13){
            return "上午";
        }else if(minute < 19){
            return "下午";
        }else{
            return "晚上";
        }
    }
    
    public static String formatDateTime2(Long unit){
        return unitToDateStr(unit,SimpleDefaultFormatDateTime2);
    }
    public static String formatTime(Long unit){
    	Date date = unitToDate(unit);
    	Calendar calendar = Calendar.getInstance();  
        calendar.setTime(date);
        int hours = calendar.get(Calendar.HOUR_OF_DAY),
        		mins = calendar.get(Calendar.MINUTE);
        String hour,min;
        if(hours < 10){hour = "0"+hours;}
        else{hour = String.valueOf(hours);}
        if(mins < 10){min = "0"+mins;}
        else{min = String.valueOf(mins);}
        return hour+":"+min;
    }
    
    public static String getWeekOfUnit(Long dt) {
        return getWeekOfDate(unitToDate(dt));
    }
    
    public static String getWeekOfDate(Date dt) {
        String[] weekDays = {"周日", "周一", "周二", "周三", "周四", "周五", "周六"};
        Calendar cal = Calendar.getInstance();
        cal.setTime(dt);
        int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
        if (w < 0)
            w = 0;
        return weekDays[w];
    }
	public static void main(String[] args) {
		System.out.println(unitToDateStr(dateStrToUnit("2015-10-15 08:00:00")));
		System.out.println(beginDayTime(new Date()));
		System.out.println(endDayTime(new Date()));
		System.out.println(beginDayTime(defaultFormatDateTime.format(new Date())));
		System.out.println(endDayTime(defaultFormatDateTime.format(new Date())));
	}
}
