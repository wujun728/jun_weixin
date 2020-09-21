package com.mhuang.common.utils.datetime;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;

public class RelativeDateFormat {

    private static final long ONE_MINUTE = 60000L; 
    private static final long ONE_HOUR = 3600000L; 
    private static final long ONE_DAY = 86400000L; 
    private static final long ONE_WEEK = 604800000L; 
   
    private static final String ONE_SECOND_AGO = "秒前"; 
    private static final String ONE_MINUTE_AGO = "分钟前"; 
    private static final String ONE_HOUR_AGO = "小时前"; 
    private static final String ONE_DAY_AGO = "天前"; 
    private static final String ONE_MONTH_AGO = "月前"; 
    private static final String ONE_YEAR_AGO = "年前"; 
   
    
    private static final String YESTERDAY = "昨天";
    private static final String NOW = "今天";
    private static final String DOMANI = "明天";
   
    
    public static String formatDay(Long time){
        String date = DateTimeUtils.formatDate(DateTimeUtils.unitToDate(time)),
            yesterday = DateTimeUtils.formatDate(DateTimeUtils.addDay(new Date(), -1)),
            now = DateTimeUtils.formatDate(DateTimeUtils.addDay(new Date(), 0)),
            domani = DateTimeUtils.formatDate(DateTimeUtils.addDay(new Date(), 1));
        if(StringUtils.equals(yesterday,date)){
            return YESTERDAY;
        }else if(StringUtils.equals(now, date)){
            return NOW;
        }else if(StringUtils.equals(domani, date)){
            return DOMANI;
        }
        return null;
    }
    
    public static void main(String[] args) throws ParseException { 
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:m:s"); 
        Date date = format.parse("2013-11-11 18:35:35"); 
        System.out.println(format(date)); 
    } 
   
    public static boolean formatMonth(Date date){
        long delta = new Date().getTime() - date.getTime(); 
        if (delta < 1L * ONE_MINUTE) { 
            return false;
        } 
        if (delta < 45L * ONE_MINUTE) { 
            return false;
        } 
        if (delta < 24L * ONE_HOUR) { 
            return false;
        } 
        if (delta < 48L * ONE_HOUR) { 
            return false;
        } 
        if (delta < 30L * ONE_DAY) { 
            return false;
        }
        if (delta < 12L * 4L * ONE_WEEK) { 
            long months = toMonths(delta); 
            return months <= 0 ? false:true;
        } else { 
            return true;
        } 
    }
    public static String format(Date date) { 
        long delta = new Date().getTime() - date.getTime(); 
        if (delta < 1L * ONE_MINUTE) { 
            long seconds = toSeconds(delta); 
            return (seconds <= 0 ? 1 : seconds) + ONE_SECOND_AGO; 
        } 
        if (delta < 45L * ONE_MINUTE) { 
            long minutes = toMinutes(delta); 
            return (minutes <= 0 ? 1 : minutes) + ONE_MINUTE_AGO; 
        } 
        if (delta < 24L * ONE_HOUR) { 
            long hours = toHours(delta); 
            return (hours <= 0 ? 1 : hours) + ONE_HOUR_AGO; 
        } 
        if (delta < 48L * ONE_HOUR) { 
            return "昨天"; 
        } 
        if (delta < 30L * ONE_DAY) { 
            long days = toDays(delta); 
            return (days <= 0 ? 1 : days) + ONE_DAY_AGO; 
        }
        if (delta < 12L * 4L * ONE_WEEK) { 
            long months = toMonths(delta); 
            return (months <= 0 ? 1 : months) + ONE_MONTH_AGO; 
        } else { 
            long years = toYears(delta); 
            return (years <= 0 ? 1 : years) + ONE_YEAR_AGO; 
        } 
    } 
   
    private static long toSeconds(long date) { 
        return date / 1000L; 
    } 
   
    private static long toMinutes(long date) { 
        return toSeconds(date) / 60L; 
    } 
   
    private static long toHours(long date) { 
        return toMinutes(date) / 60L; 
    } 
   
    private static long toDays(long date) { 
        return toHours(date) / 24L; 
    } 
   
    private static long toMonths(long date) { 
        return toDays(date) / 30L; 
    } 
   
    private static long toYears(long date) { 
        return toMonths(date) / 365L; 
    } 
}
