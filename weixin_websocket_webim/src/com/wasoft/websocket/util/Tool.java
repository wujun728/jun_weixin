package com.wasoft.websocket.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;

import com.wasoft.websocket.Constants;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class Tool {
	public static void sleep(int s) {
		try {
			Thread.sleep(1000 * s);
		} catch (Exception e) {
		}
	}
	//返回两个时间相差数
	public static String getDateTimeDiff(Date dt1, Date dt2) {
		
		return getDateTime(getMillis(dt1, dt2));
	}
	//返回两个时间相差天数
	public static int getDayDiff(Date dt1, Date dt2){
		
		long t = getMillis(dt1, dt2);		
		return (int) (t / (1000 * 60 * 60 * 24));
		
	}
	//返回两个时间相差年数
	public static int getYearDiff(Date dt1, Date dt2){
		
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(dt1);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(dt2);
		
		return (cal2.get(Calendar.YEAR) - cal1.get(Calendar.YEAR));
	}
	private static long getMillis(Date dt1, Date dt2){
		Calendar cal1 = Calendar.getInstance();
		cal1.setTime(dt1);
		Calendar cal2 = Calendar.getInstance();
		cal2.setTime(dt2);
		
		long tickCount = cal2.getTimeInMillis() - cal1.getTimeInMillis();
		return tickCount;
	}
	//获取时间长度
	public static String getDateTime(long tickCount) {
		StringBuffer sb = new StringBuffer();
		int day = (int) (tickCount / (1000 * 60 * 60 * 24));
		tickCount %= (1000 * 60 * 60 * 24);// 除去天后剩下的ms数
		int hour = (int) (tickCount / (1000 * 60 * 60));
		tickCount %= (1000 * 60 * 60);
		int min = (int) (tickCount / (1000 * 60));
		tickCount %= (1000 * 60);
		int sec = (int) (tickCount / 1000);

		if (day > 0)
			sb.append(day > 9 ? day : "0" + day).append("天");
		if (hour > 0)
			sb.append(hour > 9 ? hour : "0" + hour).append("小时");
		if (min > 0)
			sb.append(min > 9 ? min : "0" + min).append("分钟");
		if (sec >= 0)
			sb.append(sec > 9 ? sec : "0" + sec).append("秒");
		return sb.toString();
	}

	//过滤br
	public static String filterBr(String s) {
		int index = s.toUpperCase().indexOf("<BR>");
		if (index > 0) {// 滤掉换行
			s = s.substring(0, index);
		}
		return s.trim();
	}
	
	// 将图片文件转化为字节数组字符串，并对其进行Base64编码处理
	public static String getImageStr(String imgFile){		
		InputStream in = null;
		byte[] data = null;
		// 读取图片字节数组
		try {
			in = new FileInputStream(imgFile);
			data = new byte[in.available()];
			in.read(data);
			in.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		// 对字节数组Base64编码
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(data);// 返回Base64编码过的字节数组字符串
	}

	public static String getExt(String imgStr){
		System.out.println("=========================\n" + imgStr);
		if(imgStr.startsWith("data:image")){
			int idx1 = imgStr.indexOf("/");
			int idx2 = imgStr.indexOf(";base64");
			
			return "." + imgStr.substring(idx1 + 1, idx2);			
		}
		return ".img";
	}
	
	// 对字节数组字符串进行Base64解码并生成图片
	public static boolean generateImage(String imgStr, String imgFilePath) {
		if (imgStr == null) // 图像数据为空
			return false;
		if(imgStr.startsWith("data:image")){
			imgStr = imgStr.substring(imgStr.indexOf("base64,") + 7);
			//System.out.println(imgStr);
		}
		BASE64Decoder decoder = new BASE64Decoder();
		try {
			// Base64解码
			byte[] b = decoder.decodeBuffer(imgStr);
			for (int i = 0; i < b.length; ++i) {
				if (b[i] < 0) {// 调整异常数据
					b[i] += 256;
				}
			}
			// 生成jpeg图片			
			OutputStream out = new FileOutputStream(imgFilePath);
			out.write(b);
			out.flush();
			out.close();
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	public static boolean createDir(String dir) {
		try {
			File f = new File(dir);
			if (!f.exists()) {
				return f.mkdirs();
			} else {
				return true;
			}
		} catch (Exception e) {
			System.err.println("create director err:" + e.getMessage());
			return false;
		}
	}
	
	public static String getDirext(String path){
		String pattern = "yyyyMM";
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
	    String dirext = sdf.format(new Date());
	    
	    if(createDir(path + File.separator + dirext)){
	    	return dirext + "/";
	    }
	    else{
	    	return "";
	    }		
	}
	
	public static String toBase64(String s){
		BASE64Encoder encoder = new BASE64Encoder();
		return encoder.encode(s.getBytes());		
	}
	public static String fromBase64(String b64){
		try{
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] b = decoder.decodeBuffer(b64);
			return new String(b);
		}
		catch(Exception e){
			System.err.println("decode base64 error: " + e.getMessage());
			return "";
		}
	}
	//ip是否本机地址
	public static boolean isLocalhost(String ip){
		try{
			Enumeration<NetworkInterface> allNetInterfaces = NetworkInterface.getNetworkInterfaces();
			InetAddress addr = null;
			while (allNetInterfaces.hasMoreElements()) {
				NetworkInterface netInterface = (NetworkInterface) allNetInterfaces.nextElement();
				//System.out.println(netInterface.getName());
				Enumeration<InetAddress> addresses = netInterface.getInetAddresses();
				while (addresses.hasMoreElements()) {
					addr = (InetAddress) addresses.nextElement();
					if (addr != null && addr instanceof Inet4Address) {
						if(addr.getHostAddress().equals(ip)){
							return true;
						}						
					}
				}
			}			
		}
		catch(Exception e){
			System.err.println("get address error: " + e.getMessage());			
		}
		return false;
	}
	//加密
	public static String escape(String src) {
		try{
			int i;
			char j;
			StringBuffer tmp = new StringBuffer();
			tmp.ensureCapacity(src.length() * 6);
			for (i = 0; i < src.length(); i++) {
				j = src.charAt(i);
				if (Character.isDigit(j) || Character.isLowerCase(j)
						|| Character.isUpperCase(j))
					tmp.append(j);
				else if (j < 256) {
					tmp.append("%");
					if (j < 16)
						tmp.append("0");
					tmp.append(Integer.toString(j, 16));
				} else {
					tmp.append("%u");
					tmp.append(Integer.toString(j, 16));
				}
			}
			return tmp.toString();
		}
		catch(Exception e){
			return src;
		}
	}
	//解密
	public static String unescape(String src) {
		try{
			StringBuffer tmp = new StringBuffer();
			tmp.ensureCapacity(src.length());
			int lastPos = 0, pos = 0;
			char ch;
			while (lastPos < src.length()) {
				pos = src.indexOf("%", lastPos);
				if (pos == lastPos) {
					if (src.charAt(pos + 1) == 'u') {
						ch = (char) Integer.parseInt(src.substring(pos + 2, pos + 6), 16);
						tmp.append(ch);
						lastPos = pos + 6;
					} 
					else {
						ch = (char) Integer.parseInt(src.substring(pos + 1, pos + 3), 16);
						tmp.append(ch);
						lastPos = pos + 3;
					}
				} 
				else {
					if (pos == -1) {
						tmp.append(src.substring(lastPos));
						lastPos = src.length();
					} 
					else{
						tmp.append(src.substring(lastPos, pos));
						lastPos = pos;
					}
				}
			}
			return tmp.toString();
		}
		catch(Exception e){
			return src;
		}		
	}
	//返回字符串缩略
	public static String getThumbnail(String s){
		return (s.length() > Constants.MAX_MESSAGE_LENGTH  ? s.substring(0, Constants.MAX_MESSAGE_LENGTH) + " ..." : s);
	}
	public static String formatDate(Date date, String pattern) {
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(date);
	}
	public static String formatDate(Date date){
		return formatDate(date, "yyyy-MM-dd HH:mm:ss.SSS");
	}
	public static String getDateTime(){
		return formatDate(new Date());
	}
	public static void log(String s){
		if(Constants.isLog){
			System.out.println(getDateTime() + " [log] " + s);
		}		
	}
	public static void err(String s){
		System.err.println(getDateTime() + " [err] " + s);
	}
	/**
     * 将输入流转化为字符串
     * @param is
     * @return
     * @throws Exception
     */
    public static String InputStream2String(InputStream is) throws Exception{
		BufferedReader in = new BufferedReader(new InputStreamReader(is,"utf-8")); 
		StringBuffer buffer = new StringBuffer(); 
		String line = ""; 
		while ((line = in.readLine()) != null){ 
		     buffer.append(line); 
		} 
		return buffer.toString();
    }
    public static String getRemoteIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
	public static void main(String [] agrs){
		
		String s = "xxxxxxxxxx";
		s = toBase64(s);
		System.out.println(s);
		s = fromBase64(s);
		System.out.println(s);
	}
	
	
}
