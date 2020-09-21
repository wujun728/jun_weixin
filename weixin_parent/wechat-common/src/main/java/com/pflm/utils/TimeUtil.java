package com.pflm.utils;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

/**
 * 时间工具类
 *
 * @author qxw
 * @data 2018年6月7日下午5:01:55
 */
public class TimeUtil{
    private static final  int MSEC = 1000;
    public static final String FULL_PATTERN = "yyyy-MM-dd HH:mm:ss";
    public static final String TOMINUTE_PATTERN = "yyyy-MM-dd HH:mm";
    public static final String DATE_PATTERN = "yyyy-MM-dd";
    public static final String DATE_PATTERN1 = "yyyy年MM月dd日  HH:mm";
    public static final String FULL_PATTERN_SLASH = "yyyy/MM/dd HH:mm:ss";
    public static final String DATE_PATTERN_SLASH = "yyyy/MM/dd";
    public static final String FULL_SHORT_PATTERN = "yyyyMMddHHmmss";
    public static final String DATE_SHORT_PATTERN = "yyyyMMdd";
    // 一天的毫秒数 60*60*1000*24
    public final static long DAY_MILLIS = 86400000;
    // 一小时的毫秒数 60*60*1000
    public final static long HOUR_MILLIS = 3600000;

    // 一分钟的毫秒数 60*1000
    public final static long MINUTE_MILLIS = 60000;
    // 一秒的毫秒数 1000
    public final static long SECOND_MILLIS = 1000;

    /*int 类型秒数转成 string 日期*/
    public static String timet2String(int timet, String pattern) {

        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        String s = sdf.format(new Date(((long) timet) * MSEC));
        return (s);
    }
    /*int 类型秒数转成 string yyyy-MM-dd HH:mm:ss 日期*/
    public static String timet2FullString(int timet) {
        return (timet2String(timet, FULL_PATTERN));
    }

    //获取日期清除时间    用于比较日期区间时的开始时间
    public static Date getBeginDateClearTime(Date date) {

        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY,0);
        c.set(Calendar.MINUTE,0);
        c.set(Calendar.SECOND,0);
        c.set(Calendar.MILLISECOND,0);
        return c.getTime();
    }
    //获取日期并设置时间为最后时间(23:59:59.999)    用于比较日期区间时的结束时间，用小于等于号比较
    public static Date getEndDateEndTime(Date date) {

        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.HOUR_OF_DAY,23);
        c.set(Calendar.MINUTE,59);
        c.set(Calendar.SECOND,59);
        c.set(Calendar.MILLISECOND,999);
        return c.getTime();
    }
    //获取日期下一天并清除时间    用于比较日期区间时的结束时间，用小于号比较
    public static Date getEndDateForNextDay(Date date) {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE,1);
        c.set(Calendar.HOUR_OF_DAY,0);
        c.set(Calendar.MINUTE,0);
        c.set(Calendar.SECOND,0);
        c.set(Calendar.MILLISECOND,0);
        return c.getTime();
    }
    /**
     *  //获取日期下一天并清除时间    用于比较日期区间时的结束时间，用小于号比较
     *  修改 天数可配
     *  可以为负值，提前几天
     */
    public static Date getEndDateForNextDay(Date date,int daycount) {

        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE,daycount);
        c.set(Calendar.HOUR_OF_DAY,0);
        c.set(Calendar.MINUTE,0);
        c.set(Calendar.SECOND,0);
        c.set(Calendar.MILLISECOND,0);
        return c.getTime();
    }
    public static int getYear(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.YEAR);
    }
    public static int getMonth(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.MONTH)+1;
    }
    public static int getDay(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.DATE);
    }
    public static int getHour(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.HOUR_OF_DAY);
    }
    public static int getMinute(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.MINUTE);
    }
    public static int getSecond(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        return c.get(Calendar.SECOND);
    }
    public static int  getWeek(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        int week= c.get(Calendar.DAY_OF_WEEK);
        if(week==Calendar.MONDAY){return 1;}
        if(week==Calendar.TUESDAY){return 2;}
        if(week==Calendar.WEDNESDAY){return 3;}
        if(week==Calendar.THURSDAY){return 4 ;}
        if(week==Calendar.FRIDAY){return 5 ;}
        if(week==Calendar.SATURDAY){return 6 ;}
        return 7;
    }
    public static Date getDateFormHourMinuteStr(String hhmm) throws ParseException
    {
        return getDateFormHourMinuteStr("",hhmm);
    }

    public static Date getDateFormHourMinuteStr(String ymd,String hhmm) throws ParseException
    {
        SimpleDateFormat dft=new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String fmt="";

        if(ymd==null || ymd.length()<10)
        {
            fmt="1900-01-01 "+hhmm+":00";
        }else
        {
            ymd=ymd.trim();
            fmt=ymd+" "+hhmm+":00";
        }

        Date reulst=dft.parse(fmt);

        return reulst;
    }

    public static int betweenDays(long beginMilliseconds,long endMilliseconds)
    {
        long temp = endMilliseconds- beginMilliseconds;
        return  (int)(temp / DAY_MILLIS) ;
    }
    public static int betweenHours(long beginMilliseconds,long endMilliseconds)
    {
        long temp = endMilliseconds- beginMilliseconds;
        return   (int)(temp / HOUR_MILLIS);
    }
    public static int betweenMinute(long beginMilliseconds,long endMilliseconds)
    {
        long temp = endMilliseconds- beginMilliseconds;
        return   (int)(temp / MINUTE_MILLIS);
    }
    public static int betweenSecond(long beginMilliseconds,long endMilliseconds)
    {
        long temp = endMilliseconds- beginMilliseconds;
        return   (int)(temp / SECOND_MILLIS);
    }
    public static Date getMonthFirstDay(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.set(Calendar.DAY_OF_MONTH, 1);
        return c.getTime();
    }
    public static Date getMonthLastDay(Date date)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MONTH,1);
        c.set(Calendar.DAY_OF_MONTH, 1);
        c.add(Calendar.DAY_OF_MONTH, -1);
        return c.getTime();
    }
    public static Date getYearFirstDay(int year)
    {
        Calendar c=Calendar.getInstance();
        c.set(year, 0, 1, 0, 0, 0);
        return c.getTime();
    }
    public static Date getYearLastDay(int year)
    {
        Calendar c=Calendar.getInstance();
        c.set(year, 11, 1, 0, 0, 0);
        c.add(Calendar.MONTH,1);
        c.set(Calendar.DAY_OF_MONTH, 1);
        c.add(Calendar.DAY_OF_MONTH, -1);
        return c.getTime();
    }
    public static Date addDate(Date date,int days)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE,days);
        return c.getTime();
    }
    public static Date addHour(Date date,int hours)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.HOUR_OF_DAY,hours);
        return c.getTime();
    }
    public static Date addMinute(Date date,int minutes)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MINUTE,minutes);
        return c.getTime();
    }
    public static Date addSecond(Date date,int seconds)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.SECOND,seconds);
        return c.getTime();
    }
    public static Date addMonth(Date date,int months)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.MONTH,months);
        return c.getTime();
    }
    /**
     * 根据参数创建一个日期
     * 注意，月份从1开始
     */
    public static Date createDate(int year,int month,int date,int hour,int minute,int second)
    {
        Calendar c=Calendar.getInstance();
        c.set(year, month-1,date,hour,minute,second);
        c.set(Calendar.MILLISECOND,0);
        return c.getTime();
    }
    /**
     * 比较两个日期是否相等。年，月，日，时，分，秒相同的日期即相等
     */
    public static boolean dateEquals(Date date1,Date date2)
    {
        Calendar c=Calendar.getInstance();
        c.setTime(date1);
        c.set(Calendar.MILLISECOND,0);
        date1=c.getTime();

        c.setTime(date2);
        c.set(Calendar.MILLISECOND,0);
        date2=c.getTime();
        return date1.equals(date2);
    }
    public static boolean isDateTime(String dateStr,String format)
    {
        if(dateStr==null || format==null){return false;}
        if(dateStr.length()!=format.length()){return false;}

        try
        {
            SimpleDateFormat dateFormat = new SimpleDateFormat(format);
            dateFormat.setLenient(false);
            Date date=dateFormat.parse(dateStr);
            String result=dateFormat.format(date);
            return dateStr.equals(result);      // 这里用equals主要是为了防止像20121032这样数据会转为20121101
        }
        catch (Exception e)
        {
            // 如果throw java.text.ParseException或者NullPointerException，就说明格式不对
            return false;
        }

    }
    /**
     *计算开始年月与结束年月之间包含多少个月份。开区间。
     *
     */
    public static int getMonthsBetweenYearMonth(int startYear,int startMonth,int endYear,int endMonth)
    {
        int startYearMonth=startYear*100+startMonth;
        int endYearMonth=endYear*100+endMonth;
        if(startYearMonth>endYearMonth)
        {
            int tmpYear=startYear;
            int tmpMonth=startMonth;
            startYear=endYear;
            startMonth=endMonth;
            endYear=tmpYear;
            endMonth=tmpMonth;
        }
        int year=endYear-startYear;
        if(endMonth>startMonth)
        {
            int month=endMonth-startMonth+1;
            return year*12+month;
        }else
        {
            int month=(12-startMonth+1)+endMonth;
            year=year-1;
            return year*12+month;
        }
    }
    public static int getMonthsBetweenYearMonth(int startYearMonth, int endYearMonth)
    {
        int startYear=startYearMonth/100;
        int startMonth=startYearMonth % 100;
        int endYear=endYearMonth/100;
        int endMonth=endYearMonth % 100;

        return getMonthsBetweenYearMonth(startYear,startMonth,endYear,endMonth);
    }




    public static String getNowDayTimeShortStr() {

        SimpleDateFormat sdf = new SimpleDateFormat(FULL_SHORT_PATTERN);
        String s = sdf.format(new Date());
        return (s);
    }

    public static String getNowDayShortStr() {

        SimpleDateFormat sdf = new SimpleDateFormat(DATE_SHORT_PATTERN);
        String s = sdf.format(new Date());
        return (s);
    }

    public static String getNowDayFullStr() {

        SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN);
        String s = sdf.format(new Date());
        return (s);
    }
    public static String getNowDayFullStr1() {

        SimpleDateFormat sdf = new SimpleDateFormat(DATE_PATTERN1);
        String s = sdf.format(new Date());
        return (s);
    }

    public static String getNowDayTimeFullStr() {

        SimpleDateFormat sdf = new SimpleDateFormat(FULL_PATTERN);
        String s = sdf.format(new Date());
        return (s);
    }
    /**
	 * 时间处理_2, String 时间，返回友好时间 几分钟前，几小时前，等
	 * String 时间格式yyyy-MM-dd HH:mm:ss"
	 * @author c_abc
	 *
	 */
	public static String getTimeYh(String timeStr ,Date daa){
			String str=timeStr.trim();
			Date da=daa;
			Date ta=TimeUtil.dateFormFormatStr(str,TimeUtil.FULL_PATTERN);
			Long old=ta.getTime();
			Long now=da.getTime();
			int t=TimeUtil.betweenDays(old, now);
			//大于零，昨天以前
			if(t>0)	{return ""+str.substring(5,str.length()-3);}
			if(t<0) {return "";}
			int s=TimeUtil.betweenHours(old, now);
			if(s>0)	{return ""+s+"小时前";}
			if(s<0) {return "";}
			int f=TimeUtil.betweenMinute(old, now);
			if(f>0) {return ""+f+"分钟前";}
			if(f==0){return ""+1+"分钟内";}
			return "";
	}

    public static Date dateFormFormatStr(String dateStr,String format) {
        SimpleDateFormat fmt=new SimpleDateFormat(format);
        Date result=null;
        try {
            result = fmt.parse(dateStr);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return result;
    }
    /**
	 * 将字符串转换为Date日期
	 * @param strDate 日期字符串
	 * @return
	 */
	public static Date stringToDate(String strDate) {
		try {
			if(strDate != null && !"".equals(strDate) && !"0".equals(strDate)) {
				SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				Long time = new Long(strDate);
				String d = format.format(time);
				return format.parse(d);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 将字符串转换为Date日期
	 * @param strDate 日期字符串
	 * @return
	 */
	public static Date stringToDate(String strDate, String formatStr) {
		try {
			SimpleDateFormat format = new SimpleDateFormat(formatStr);
			return format.parse(strDate);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 获取传入时间的前一天整点时间戳
	 * @param d 
	 * @return
	 */
	public static long getYesterdayTimestamp(Date d) {
		Date dNow = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dNow);
		calendar.add(Calendar.DAY_OF_MONTH, -1); 
		return calendar.getTimeInMillis()/1000;
	}
	
	/**
	 * 获取传入时间的前一天,以format显示
	 * @param d 		日期
	 * @param format 	日期格式
	 * @return
	 */
	public static String getYesterdayTimestamp(Date d, String format) {
		Date dNow = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(dNow);
		calendar.add(Calendar.DAY_OF_MONTH, -1); 
		SimpleDateFormat formats = new SimpleDateFormat(format);
		return formats.format(new Date(calendar.getTimeInMillis()));
	}
	
	/** 获取当前月天数 **/
	public static int getDayOfMonth(){
		Calendar calendar = Calendar.getInstance(Locale.CHINA);
		int day = calendar.getActualMaximum(Calendar.DATE);
		return day;
	}
	
	/** 获取传入月份天数 **/
	public static int getDayOfMonth(int month){
		
		Calendar time=Calendar.getInstance(); 
		time.clear(); 
		time.set(Calendar.YEAR, time.get(Calendar.YEAR)); 
		//year年
		time.set(Calendar.MONTH,month-1);
		//Calendar对象默认一月为0,month月 
		return time.getActualMaximum(Calendar.DAY_OF_MONTH);
	}
	
	/** 获取当前月份 **/
	public static int getCurrentMonth() {
		return Calendar.getInstance().get(Calendar.MONTH) + 1;    
	}
	
	/** 获取当前年份 **/
	public static int getCurrentYear() {
		return Calendar.getInstance().get(Calendar.YEAR);    
	}
	
	/**
	 * 判断当前时间是否在时间段内
	 * @param startDate		开始时间
	 * @param endDate		结束时间
	 * @param currentDate	当前时间
	 */
	public static boolean isBetweenDate(Date startDate, Date endDate, Date currentDate) {
		if(currentDate.compareTo(startDate) >= 0 && endDate.compareTo(currentDate) >= 0) {
			return true;
		}
		return false;
	}
	
	public static Long timeDifference(Date d){
		Date dNow = new Date();
		//SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		long between = 0;
        try {
            Date begin = dNow;
            between = (d.getTime() - begin.getTime())/1000;// 得到两者的毫秒数
        } catch (Exception ex) {
            ex.printStackTrace();
        }
		return between;
	}
	
	public static int[] getTimestampByMonth() {
		int[] timestamps = new int[2];
		
		
		
		return timestamps;
	}
	

	public static String DATE_FORMAT_FULL 			= "yyyy-MM-dd HH:mm:ss.SSS";
	
	public static String DATE_FORMAT_NORMAL 		= "yyyy-MM-dd HH:mm:ss";
	
	public static String DATE_FORMAT_QUERY			= "yyyy-MM-dd HH:mm";
	
	public static String DATE_FORMAT_DATE 			= "yyyy年MM月dd日";
	
	public static String DATE_FORMAT 				= "yyyyMMdd";
	
	public static String DATE_FORMAT_YYYY_MM_DD 	= "yyyy-MM-dd";
	
	public static String DATE_FORMAT_YYYY_MM_DD_HH 	= "yyyy-MM-dd HH";
	
	public static String DATE_FORMAT_YYYYMMDDHHmmss = "yyyyMMddHHmmss";
	
	public static String DATE_FORMAT_NORMAL_CN 		= "yyyy年MM月dd日HH:mm:ss";

	public static Calendar formatRDate(String strDate) {
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		Calendar cal = Calendar.getInstance();
		try {
			date = sdf2.parse(strDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		cal.setTime(date);
		return cal;
	}
	
	public static String dateToStr(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_FULL);
		return format.format(date);
	}
	
	/**
	 * 
	 * @param date
	 * @return yyyy-MM-dd HH:mm
	 */
	public static String date2Str(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_QUERY);
		return format.format(date);
	}

	public static String dateToStrNormal(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_NORMAL);
		return format.format(date);
	}

	public static Date strToDate(String strDate) {
		SimpleDateFormat dtFormat = null;
		try {
			if (strDate.length() == DATE_FORMAT_QUERY.length()) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_QUERY);
			} else if (strDate.length() == DATE_FORMAT_YYYY_MM_DD.length()) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
			} else if (strDate.length() == DATE_FORMAT_NORMAL.length()) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_NORMAL);
			}

			return dtFormat.parse(strDate);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static Date stirngToDate(String strDdate, String format) {
		SimpleDateFormat dtFormat = null;
		
		try {
			if (format.equals(DATE_FORMAT_FULL)) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_FULL);
			} else if (format.equals(DATE_FORMAT_NORMAL)) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_NORMAL);
			}  else if (format.equals(DATE_FORMAT_QUERY)) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_QUERY);
			} else if (format.equals(DATE_FORMAT_DATE)) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_DATE);
			}  else if (format.equals(DATE_FORMAT)) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT);
			} else if (format.equals(DATE_FORMAT_YYYY_MM_DD)) {
				dtFormat = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
			}

			return dtFormat.parse(strDdate);

		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

   
	
	

	/**
	 * 获取时间描述
	 */
	public static String getDateSpoken() {
		Calendar cal = Calendar.getInstance();
		int hour = cal.get(Calendar.HOUR_OF_DAY);
		if (hour >= 6 && hour < 8) {
			return "早上";
		} else if (hour >= 8 && hour < 11) {
			return "上午";
		} else if (hour >= 11 && hour < 13) {
			return "中午";
		} else if (hour >= 13 && hour < 18) {
			return "下午";
		} else {
			return "晚上";
		}
	}

	public static String getNowDate() {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_DATE);
		return format.format(new Date());
	}
	
	
	public static String getNowDate(String dateFormate) {
		SimpleDateFormat format = new SimpleDateFormat(dateFormate);
		return format.format(new Date());
	}

	public static String getNowDay() {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
		return format.format(new Date());
	}

	/**
	 * 获取明天 
	 */
	public static String getTomorrowDay() {
		Calendar cd = Calendar.getInstance();
		cd.add(Calendar.DATE, 1);
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
		return format.format(cd.getTime());
	}
	
	/**
	 * 获取昨天
	 */
	public static Date getYesterday() {
		Calendar cd = Calendar.getInstance();
		cd.add(Calendar.DATE, -1);
		return cd.getTime();
	}
	
	
	/**
	 * 几小时前
	 */
	public static Date getBeforeHour(int hour) {
		Calendar cd = Calendar.getInstance();
		cd.add(Calendar.HOUR, hour);
		return cd.getTime();
	}
	
	/**
	 * 获取几天前
	 * 负数：前几天
	 * 证书：后几天
	 */
	public static Date getBeforDay(Integer day) {
		Calendar cd = Calendar.getInstance();
		cd.add(Calendar.DATE, day * (-1));
		return cd.getTime();
	}
	
	/**
	 * 获取当天凌晨时间
	 */
	public static Date getNowDayZero() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
	    cal.set(Calendar.HOUR_OF_DAY, 0);
	    cal.set(Calendar.MINUTE, 0);
	    cal.set(Calendar.SECOND, 0);
	    cal.set(Calendar.MILLISECOND, 0);
	    //SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_NORMAL);
	    return  cal.getTime();
	   // return format.format(cal.getTime());
	}
	
	/**
	 * 获取昨天
	 */
	public static String getYesterdayStr() {
		Calendar cd = Calendar.getInstance();
		cd.add(Calendar.DATE, -1);
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
		return format.format(cd.getTime());
	}
	
	
	/**
	 * 获取几分钟前
	 */
	public static Date getBeforeMin(int min) {
		Calendar cd = Calendar.getInstance();
		cd.add(Calendar.MINUTE, min);
		return cd.getTime();
	}
	
	/**
	 * 获取几分钟前(正为后,负为前)
	 */
	public static Date getBeforeMin(int min,Date date) {
		Calendar cd = Calendar.getInstance();
		cd.setTime(date);
		cd.add(Calendar.MINUTE, min);
		return cd.getTime();
	}
	
	/**
	 * 获得本年第一天的日期
	 */
	public static String getCurrentYearFirstDate() {
		int yearPlus = getYearPlus();
		GregorianCalendar currentDate = new GregorianCalendar();
		currentDate.add(GregorianCalendar.DATE, yearPlus);
		Date yearDay = currentDate.getTime();
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
		// DateFormat df = DateFormat.getDateInstance();
		String preYearDay = format.format(yearDay);
		return preYearDay;
	}

	private static int getYearPlus() {
		Calendar cd = Calendar.getInstance();
		int yearOfNumber = cd.get(Calendar.DAY_OF_YEAR);// 获得当天是一年中的第几天
		cd.set(Calendar.DAY_OF_YEAR, 1);// 把日期设为当年第一天
		cd.roll(Calendar.DAY_OF_YEAR, -1);// 把日期回滚一天。
		int MaxYear = cd.get(Calendar.DAY_OF_YEAR);
		if (yearOfNumber == 1) {
			return -MaxYear;
		} else {
			return 1 - yearOfNumber;
		}
	}

	public static Date getExpireDate(int month) {
		Calendar cd = Calendar.getInstance();
		cd.set(Calendar.MONTH, month);
		return cd.getTime();
	}

	public static String getCNDate(Date lgesSigndate) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_NORMAL_CN);
		return format.format(lgesSigndate);
	}
	
	public static String strDate2NowDay(String strDate) {
		Date date = strToDate(strDate);
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
		return format.format(date);
	}
	
	public static String strDate2NowDay(Date date) {
		SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
		return format.format(date);
	}
	
	// 用来全局控制 上一周，本周，下一周的周数变化
    private static int weeks = 0;
   
    // 获得当前日期与本周一相差的天数
    private static int getMondayPlus() {
        Calendar cd = Calendar.getInstance();
        // 获得今天是一周的第几天，星期日是第一天，星期二是第二天......
        int dayOfWeek = cd.get(Calendar.DAY_OF_WEEK);
        if (dayOfWeek == 1) {
            return -6;
        } else {
            return 2 - dayOfWeek;
        }
    }

    // 获得上周星期一的日期
    public static String getPreviousMonday() {
        weeks--;
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks);
        Date monday = currentDate.getTime();
        SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
        String preMonday = format.format(monday);
        return preMonday;
    }

    // 获得当前周星期一的日期
    public static String getCurrentMonday() {
        weeks = 0;
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus);
        Date monday = currentDate.getTime();
        SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
        String preMonday = format.format(monday);
        return preMonday;
    }

    // 获得下周星期一的日期
    public static String getNextMonday() {
        weeks++;
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks);
        Date monday = currentDate.getTime();
        SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
        String preMonday = format.format(monday);
        return preMonday;
    }

    // 获得当周的周日的日期
    public static String getSunday() {
        int mondayPlus = getMondayPlus();
        GregorianCalendar currentDate = new GregorianCalendar();
        currentDate.add(GregorianCalendar.DATE, mondayPlus + 7 * weeks + 6);
        Date monday = currentDate.getTime();
        SimpleDateFormat format = new SimpleDateFormat(DATE_FORMAT_YYYY_MM_DD);
        String preMonday = format.format(monday);
        return preMonday;
    } 
    /**
     * 得到某年某月的第一天
     * 
     * @param year
     * @param month
     * @return
     */
    public static String getFirstDayOfMonth(int year, int month) {
	    Calendar cal = Calendar.getInstance();
	    cal.set(Calendar.YEAR, year);
	    cal.set(Calendar.MONTH, month-1);
	    cal.set(Calendar.DAY_OF_MONTH, cal.getMinimum(Calendar.DATE));
	    return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }
    
    /**
     * 得到当年1月的第一天
     * @return
     */
    public static String getFirstDayOfMonth() {
	    Calendar cal = Calendar.getInstance();
	    cal.set(Calendar.YEAR, cal.get(Calendar.YEAR));
	    cal.set(Calendar.MONTH, 1-1);
	    cal.set(Calendar.DAY_OF_MONTH, cal.getMinimum(Calendar.DATE));
	    return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }
    
    /**
     * 得到当年12月的最后一天
     * @return
     */
    public static String getLastDayOfMonth() {
	    Calendar cal = Calendar.getInstance();
	    cal.set(Calendar.YEAR, cal.get(Calendar.YEAR));
	    cal.set(Calendar.MONTH, 12-1);
	    cal.set(Calendar.DAY_OF_MONTH, 1);
	    int value = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	    cal.set(Calendar.DAY_OF_MONTH, value);
	    return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }
     
    /**
     * 得到某年某月的最后一天
     * 
     * @param year
     * @param month
     * @return
     */
    public static String getLastDayOfMonth(int year, int month) {
	    Calendar cal = Calendar.getInstance();
	    cal.set(Calendar.YEAR, year);
	    cal.set(Calendar.MONTH, month-1);
	    cal.set(Calendar.DAY_OF_MONTH, 1);
	    int value = cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	    cal.set(Calendar.DAY_OF_MONTH, value);
	    return new SimpleDateFormat("yyyy-MM-dd").format(cal.getTime());
    }
    
    
    /**
     * 得到某年某月的前某个月的月数
     * @param pre 前几个月
     * @return
     */
    public static int getLastDayOfMonth(int pre) {
    	Calendar c = Calendar.getInstance();
	    c.add(Calendar.MONTH, -pre);
	    // 因为是0~11月  所以 加1 好是 1~12月
	    return (c.get(Calendar.MONTH)+1);
    }
    
    /**
     * 得到某年某月的前某个月的月数
     * @return
     */
    public static String getPreMonth() {
    	Calendar c = Calendar.getInstance();
	    c.add(Calendar.MONTH, -4);
	    return new SimpleDateFormat("yyyy-MM-01").format(c.getTime());
    }
    
    /**
     * 获取当前月的第一天
     * @return
     */
    public static String getCurrentMonthFirstDay() {
    	Calendar c = Calendar.getInstance();
	    c.add(Calendar.MONTH, -0);
	    return new SimpleDateFormat("yyyy-MM-01").format(c.getTime());
    }
    
    /**
     * 获取当前月的最后一天
     * @return
     */
    public static String getCurrentMonthLastDay() {
    	Calendar cale = Calendar.getInstance();   
        cale.set(Calendar.DAY_OF_MONTH, cale.getActualMaximum(Calendar.DAY_OF_MONTH));//设置为1号,当前日期既为本月第一天 
	    return new SimpleDateFormat("yyyy-MM-dd").format(cale.getTime());
    }
    
	/**
	 * 判断是否是周末
	 * @return
	 */
    public static boolean isWeekend(){
    	Calendar cal = Calendar.getInstance();
		int week=cal.get(Calendar.DAY_OF_WEEK)-1;
		if(week==0){// week ==6 ||  0代表周日，6代表周六
			return true;
		}
		return false;
	}
    
    /**
     * 获取今天  N年前/后的时间
     * @param years
     * @return
     */
    public static Date todayAfterYear(int years){
    	Calendar calendar = Calendar.getInstance();
    	
    	Date date = new Date(System.currentTimeMillis());
    	
    	calendar.setTime(date);
    	calendar.add(Calendar.YEAR, years);
    	
    	return date = calendar.getTime();
    }
    
    /**
     * 获取某天  N年前/后的时间
     * @param years
     * @return
     */
    public static Date thisDayAfterYear(int years, Date date){
    	Calendar calendar = Calendar.getInstance();
    	
    	calendar.setTime(date);
    	calendar.add(Calendar.YEAR, years);
    	
    	return date = calendar.getTime();
    }
    
    public static String dateToStr(Date date, String formatStr) {
		SimpleDateFormat format = new SimpleDateFormat(formatStr);
		return format.format(date);
	}
    
    public static Date getTodayEnd(){
    	return TimeUtil.stringToDate(TimeUtil.getNowDate(TimeUtil.DATE_FORMAT_YYYY_MM_DD + " 23:59:59"), TimeUtil.DATE_FORMAT_NORMAL);
    }
    /**
	  * 
	  * @desc：
	  *
	  * @param dateStr 日期字符串
	  * @param formatStr 解析字符串
	  * @return
	  * @throws ParseException 
	  * 
	  * @date:2016年10月31日 下午3:30:37
	  */
	 public static Date getDateFromStr(String dateStr,String formatStr) throws ParseException{
		 SimpleDateFormat customFormat = new SimpleDateFormat(formatStr);
		 return  customFormat.parse(dateStr);
	 }
	 
	 
	 	/**
		 * unix时间戳转换成格式化时间
		 * 
		 * @author Sivan
		 * @return
		 */
		public static String unixTimestampToDateStr(long unixTimestamp,String format) {
			 SimpleDateFormat sdf = new SimpleDateFormat(format);
			 return sdf.format(new Date(unixTimestamp * 1000));
		}

		
		/**
		 * 字符串时间转换为unix时间戳
		 * 
		 * @return
		 * @throws ParseException 
		 */
		public static long getUnixDate(String date) {
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			try {
				Date d=simpleDateFormat.parse(date);
				return (long) ((simpleDateFormat.parse(simpleDateFormat.format(d))).getTime() / 1000);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return 0;
		}
		
		
		
		/**
		 * 获取昨天的最晚时间
		 * 
		 * @return 参数说
		 * @author Decheng Zhang
		 * @see 类、类#方法、类#成员
		 */
		public static String getCurrentDayLatestTime() {
			Calendar currentDate = Calendar.getInstance();
			currentDate.add(Calendar.DATE, -1);
			currentDate.set(Calendar.HOUR_OF_DAY, 23);
			currentDate.set(Calendar.MINUTE, 59);
			currentDate.set(Calendar.SECOND, 59);
			SimpleDateFormat format = new SimpleDateFormat(TimeUtil.DATE_FORMAT_NORMAL);
			return format.format(currentDate.getTime());
		}
		
		/***
		 * 获取昨天的最早时间
		 * 
		 * @return
		 */
		public static String  getCurrentDayEarliestTime() {
			Calendar currentDate = Calendar.getInstance();
			currentDate.add(Calendar.DATE, -1);
			currentDate.set(Calendar.HOUR_OF_DAY, 00);
			currentDate.set(Calendar.MINUTE, 00);
			currentDate.set(Calendar.SECOND, 00);
			SimpleDateFormat format = new SimpleDateFormat(TimeUtil.DATE_FORMAT_NORMAL);
			return format.format(currentDate.getTime());
		}
		/**
		 * 获取当前时间戳
		 * 
		 * @return
		 */
		public static int getUnixDate() {
			Date date = new Date();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(
					"yyyy-MM-dd HH:mm:ss");
			try {
				System.out.println((simpleDateFormat.parse(simpleDateFormat
						.format(date))).getTime() / 1000);
				return (int) ((simpleDateFormat
						.parse(simpleDateFormat.format(date))).getTime() / 1000);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return 0;
		}
}

