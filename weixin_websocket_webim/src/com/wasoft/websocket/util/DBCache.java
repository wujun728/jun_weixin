package com.wasoft.websocket.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.wasoft.websocket.chat.bean.GroupUser;
import com.wasoft.websocket.chat.bean.WorkGroup;

public class DBCache extends DBUtil{

	//缓存某个用户的工作组
	private static Map<Long, List<GroupUser>> groupUsers = new HashMap<Long, List<GroupUser>>();
	//缓存所有工作组
	private static List<List<String>> AllGroups = new ArrayList<List<String>>();	
	//缓存登录用户信息
	private static Map<Long, List<String>> userInfos = new HashMap<Long, List<String>>();
	
	//存储IP对应的地址
	private static Map<String, String> ips = new HashMap<String, String>();
	
	static{
		refreshCache();
	}
	
	public static void refreshCache(){
		refreshGroupUser();
		refreshAllGroup();
	}
	//刷新工作组用户，用于提取某个工作组的所有用户
	public static void refreshGroupUser(){
		Tool.log("refresh GroupUsers.");
		List<List<String>> list = getGroupUser();
		Map<Long, List<GroupUser>> m = new HashMap<Long, List<GroupUser>>();
		for(List<String> lst: list){
			long wgid = Long.parseLong(lst.get(0));
			long userid = Long.parseLong(lst.get(1));
			String nickname = lst.get(2) + "(" + lst.get(3) + ")";
			if(!m.containsKey(wgid)){
				m.put(wgid, new ArrayList<GroupUser>());					
			}			
			m.get(wgid).add(new GroupUser(userid, nickname));							
		}
		groupUsers = m;
	}
	//刷新所有工作组，用于提取某个用户的所有工作组
	public static void refreshAllGroup(){
		Tool.log("refresh all Group.");
		AllGroups = getAllGroup();		
	}
	//刷新所有用户缓存
	public static void refreshUserInfos(){
		Tool.log("refresh all UserInfos.");
		
		/*方法效率不高，需要多次的sql操作
		Iterator<Map.Entry<Long,  List<List<String>>>> iter = userInfos.entrySet().iterator();
		while (iter.hasNext()) {
			Map.Entry<Long, List<List<String>>> entry =  iter.next();
			long key = entry.getKey();
			entry.setValue(DBUtil.getUserInfo(key));
		}
		*/
		//一次sql操作
		List<List<String>> users = DBUtil.getUsers();
		for(List<String> user: users){
			long userid = Long.parseLong(user.get(8));//t_mk_sys_user.id
			if(userInfos.containsKey(userid)){
				userInfos.put(userid, user);
			}
		}		
	}
	//////////////////////////////////////////////////////////////////
	
	//获取工作组用户
	public static List<GroupUser> getGroupUser(long groupid){
		Tool.log("[cache] get GroupUsers of group[" + groupid + "]");
		return groupUsers.get(groupid);
		
	}
	//获取用户的工作组
	public static List<WorkGroup> getAllGroup(long userid){
		Tool.log("[cache] get all group of user[" + userid + "]");
		List<WorkGroup> wgs = new ArrayList<WorkGroup>();    	
    	for(List<String> lst: AllGroups){
    		if(isInArray(lst.get(4), userid)){//[111,222,333...], 111
    			long id = Long.parseLong(lst.get(0));        		
        		long f_crtuser = Long.parseLong(lst.get(1));
        		String f_name = lst.get(2);
        		String f_note = lst.get(3);
        		wgs.add(new WorkGroup(id, f_crtuser, f_name, f_note));
    		}
    	}
		return wgs;
	}
	
	private static boolean isInArray(String str, long l){
		String [] arr = str.split(",");
		if(arr.length > 0){
			for(String s: arr){
				if(Long.parseLong(s) == l){
					return true;
				}
			}
			return false;	
		}
		else{
			return false;
		}		
	}
	//获取用户信息
	public static List<String> getUserInfo(long userid){
		
		if(userInfos.containsKey(userid)){
			Tool.log("[cache] get userinfo of userid[" + userid + "]");			
		}
		else{			
			Tool.log("[DB] get userinfo of userid[" + userid + "] from db");
			List<List<String>> users = getUser(userid);
			if(users.size() > 0){
				userInfos.put(userid, users.get(0));
			}						
		}		
		return userInfos.get(userid);
	}
	//电话号码
	public static String getPhone(long userid){
		
		List<String> userInfo = getUserInfo(userid);		
		return userInfo != null ? userInfo.get(1) : "";
		
	}
	//罗俊(10035)
	public static String getUsername(long userid){
		
		List<String> userInfo = getUserInfo(userid);
		return userInfo != null ? userInfo.get(4) + "(" + userInfo.get(5) + ")" : "";
		
	}
	//邮件地址
	public static String getMail(long userid){
		List<String> userInfo = getUserInfo(userid);
		return userInfo != null ? userInfo.get(7) : "";
	}
	//通过IP获取地址
	public static String getAddr(String ip){		
		String addr = ips.get(ip); 
		if( addr == null){
			addr = DBUtil.getAddr(ip);
			ips.put(ip, addr);			
		}
		return addr;
	}
}
