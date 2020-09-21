package com.wasoft.websocket.util;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.garage.value.IntValue;
import com.garage.value.LongValue;
import com.garage.value.StringValue;
import com.garage.value.TimestampValue;
import com.garage.xdatabase.sql.SqlParameterExt;
import com.mixky.common.database.MixkyDataAccess;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.bean.ClusterHost;
import com.wasoft.websocket.chat.bean.GroupUser;
import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.chat.bean.Msg;
import com.wasoft.websocket.chat.bean.SmsStatus;
import com.wasoft.websocket.chat.bean.WorkGroup;

public class DBUtil {

	//查询个人信息
	protected static List<List<String>> getUser(long userid){
		String sql = "select b.f_picturename,b.f_tel,d.mc, a.f_dept_name bmmc, a.f_caption name,a.f_name f_name,e.f_sex f_sex,a.f_email " + 
				"from t_mk_sys_user a " +
				"left join hr_userxx b on a.id=b.id " + 
				"left join t_mk_sys_dept_user c on c.f_user_id=a.id and c.f_dept_id=a.f_dept_id " +
				"left join hr_post d on c.f_post_id=d.id " + 
				"left join hr_rzxxb e on a.id=e.userid " +
				"where a.id=" + userid;
		if (Constants.isCRM){
			sql = "select b.f_picturename,b.yddh, e.mc, d.f_caption bmmc, a.f_caption name,a.f_name f_name, case when(b.xb='2') then 1 else 0 end sex,a.f_email " +
				"from t_mk_sys_user a " +
				"left join cr_gr b on a.grbh=b.grbh " + 
				"left join t_mk_sys_dept_user c on a.grbh=c.grbh " +
				"left join t_mk_sys_dept d on d.id=c.f_dept_id " +
				"left join hr_post e on e.id=c.f_post_id " +
				"where a.id=" + userid;
		}
		List<List<String>> userInfo = MixkyDataAccess.instance().find(sql, null);
		return userInfo;
	}
	//查询出全部在职用户信息
	protected static List<List<String>> getUsers(){
		String sql = "select b.f_picturename,b.f_tel,d.mc, a.f_dept_name bmmc, a.f_caption name,a.f_name f_name,e.f_sex f_sex,a.f_email,a.id id  " + 
				"from t_mk_sys_user a " +
				"left join hr_userxx b on a.id=b.id " + 
				"left join t_mk_sys_dept_user c on c.f_user_id=a.id and c.f_dept_id=a.f_dept_id " +
				"left join hr_post d on c.f_post_id=d.id " + 
				"left join hr_rzxxb e on a.id=e.userid " +
				"where a.f_state=0";
		if (Constants.isCRM){
			sql = "select b.f_picturename,b.yddh, e.mc, d.f_caption bmmc, a.f_caption name,a.f_name f_name, case when(b.xb='2') then 1 else 0 end sex,a.f_email,a.id id " +
					"from t_mk_sys_user a " +
					"left join cr_gr b on a.grbh=b.grbh " + 
					"left join t_mk_sys_dept_user c on a.grbh=c.grbh " +
					"left join t_mk_sys_dept d on d.id=c.f_dept_id " +
					"left join hr_post e on e.id=c.f_post_id " +
					"where a.f_state=0";
		}
		List<List<String>> userInfo = MixkyDataAccess.instance().find(sql, null);
		return userInfo;
	}
	//存储消息
	public static boolean saveMessage(Message m) {
		try {
			String sql = "insert into t_mk_sys_im(id,f_from,f_to,f_join,f_out,f_title,f_message) values(f_newid(),?,?,?,?,?,?)";
			SqlParameterExt spx = new SqlParameterExt();
			spx.add(new LongValue(m.getFrom()));
			spx.add(new LongValue(m.getTo()));
			spx.add(new LongValue(m.getJoin()));
			spx.add(new LongValue(m.getOut()));
			spx.add(new StringValue(m.getTitle()));
			spx.add(new StringValue(m.getContent()));
			MixkyDataAccess.instance().executeProcedure(sql, spx);
			return true;
		} catch (Exception e) {
			Tool.err("save message error: " + e.getMessage());
			return false;
		}
	}
	public static boolean saveMsg(Msg m) {
		try {
			String sql = "insert into t_mk_sys_im(id,f_datetime,f_from,f_to,f_join,f_out,f_title,f_message) values(f_newid(),?,?,?,?,?,?,?)";
			SqlParameterExt spx = new SqlParameterExt();
			spx.add(new TimestampValue(m.getDt()));
			spx.add(new LongValue(m.getFrom()));
			spx.add(new LongValue(m.getTo()));
			spx.add(new LongValue(m.getJoin()));
			spx.add(new LongValue(m.getOut()));
			spx.add(new StringValue(m.getTitle()));
			spx.add(new StringValue(m.getContent()));
			MixkyDataAccess.instance().executeProcedure(sql, spx);
			return true;
		} catch (Exception e) {
			Tool.err("save message error: " + e.getMessage());
			return false;
		}
	}
	//存储离线消息
	public static boolean saveOfflineMessage(Message m){
		try{
			String sql = "insert into t_mk_sys_im_offline(id,f_from,f_to,f_title,f_message) values(f_newid(),?,?,?,?)";            	
	    	SqlParameterExt spx = new SqlParameterExt();
	    	spx.add(new LongValue(m.getFrom()));
	    	spx.add(new LongValue(m.getTo()));	    	
	    	spx.add(new StringValue(m.getTitle()));
	    	spx.add(new StringValue(m.getContent()));
	    	MixkyDataAccess.instance().executeProcedure(sql, spx);
	    	return true;
		}
		catch(Exception e){
			Tool.err("save offline message error: " + e.getMessage());
			return false;
		}
	}
	
	//获取离线消息
	public static List<Message> getOfflineMessage(long userid){
		try{
			String sql = "select id,f_from,f_to,f_title,f_message from t_mk_sys_im_offline where f_to=" + userid;
			List<List<String>> list = MixkyDataAccess.instance().find(sql, null);
			List<Message> msgs = new ArrayList<Message>();
			
			if(list.size() > 0){				
				for(List<String> _lst: list){
					long id = Long.parseLong(_lst.get(0));
					long from = Long.parseLong(_lst.get(1));
					long to = Long.parseLong(_lst.get(2));
					String title = _lst.get(3);
					String message = _lst.get(4);
					msgs.add(new Message(from, to, 0, 0, Constants.getType("TALK"),  title, message));
					sql = "delete from t_mk_sys_im_offline where id =" + id + "";
					MixkyDataAccess.instance().exeSql(sql);
				}
				return msgs;
			}
			else{
				return null;
			}			
		}
		catch(Exception e){
			Tool.err("get offline message error: " + e.getMessage());
			return null;
		}
	}
	//存储在线时长
	public static boolean saveDuration(long userid, long duration, long lt, long dt){
		try{
			String sql = "insert into t_mk_sys_im_duration(id,f_userid,f_duration, f_lt, f_dt) values(f_newid(),?,?,?,?)";            	
	    	Tool.log(sql);
			SqlParameterExt spx = new SqlParameterExt();
	    	spx.add(new LongValue(userid));
	    	spx.add(new LongValue(duration));
	    	spx.add(new TimestampValue(new Date(lt)));
	    	spx.add(new TimestampValue(new Date(dt)));
	    	MixkyDataAccess.instance().executeProcedure(sql, spx);
	    	return true;
		}
		catch(Exception e){
			Tool.err("save offline message error: " + e.getMessage());
			return false;
		}
	}
	//获取用户所有工作组
	private static List<List<String>> getAllGroup(long userid){
		String sql = "select a.id, a.f_createuser, a.f_name, a.f_note from t_mk_sys_im_wg a left join t_mk_sys_im_wg_user b on a.id=b.f_wgid " +
					 "where f_del=0 and b.f_userid=" + userid + " order by a.f_createuser,a.f_name";
		List<List<String>> wgs = MixkyDataAccess.instance().find(sql, null);
		return wgs;
	}
	
	protected static List<List<String>> getAllGroup(){
		String sql = "select a.id, a.f_createuser, a.f_name, a.f_note, wm_concat(b.f_userid) us from t_mk_sys_im_wg a left join t_mk_sys_im_wg_user b on a.id=b.f_wgid " +
					 "where f_del=0 " + 
					 "group by a.id, a.f_createuser,a.f_name, a.f_note " + 
					 "order by a.f_createuser,a.f_name";
		List<List<String>> wgs = MixkyDataAccess.instance().find(sql, null);
		return wgs;
	}
	
	//创建工作组
	public static boolean createWorkgroup(WorkGroup wg){
		try{
			if(wg.getId() != 0){//修改
				String sql = "update t_mk_sys_im_wg set f_name=?,f_note=? where id=?";
				SqlParameterExt spx = new SqlParameterExt();
				spx.add(new StringValue(wg.getF_name()));
		    	spx.add(new StringValue(wg.getF_note()));
		    	spx.add(new LongValue(wg.getId()));
				MixkyDataAccess.instance().executeProcedure(sql, spx);
				DBCache.refreshCache();
				return true;
			}
			else{//增加
				String proc = "p_im_crtwg(?,?,?,?)";
				SqlParameterExt spx = new SqlParameterExt();
				spx.add(new StringValue(wg.getF_name()));
		    	spx.add(new StringValue(wg.getF_note()));
				spx.add(new LongValue(wg.getF_createUser()));
				spx.add(new IntValue(1), SqlParameterExt.SQL_INPUT_OUTPUT);
		    	MixkyDataAccess.instance().executeProcedure(proc, spx);
		    	DBCache.refreshCache();
		    	return (spx.get(4).getInt() == 0);		
			}				
		}
		catch(Exception e){
			Tool.err("create workgroup error: " + e.getMessage());
			return false;
		}		
	}
	
	//解散工作组
	public static boolean destroyWorkgroup(long wgid){
		try{
			//删除工作组用户
			String sql = "delete from t_mk_sys_im_wg_user where f_wgid=" + wgid;
			MixkyDataAccess.instance().exeSql(sql);
			//将工作组标记删除状态
			sql = "update t_mk_sys_im_wg set f_destroytime=sysdate,f_del=1 where id=" + wgid;
			MixkyDataAccess.instance().exeSql(sql);
			DBCache.refreshCache();
			return true;
		}
		catch(Exception e){
			Tool.err("destroy workgroup error: " + e.getMessage());
			return false;
		}	
	}

	//增加用户到工作组
	public static boolean addUser2Workgroup(long wgid, long userid){
		try{
			String sql = "insert into t_mk_sys_im_wg_user values(" + wgid + "," + userid +")";
			MixkyDataAccess.instance().exeSql(sql);
			DBCache.refreshCache();
			return true;
		}
		catch(Exception e){
			Tool.err("add user to workgroup error: " + e.getMessage());
			return false;
		}	
	}
	public static boolean addUser2Workgroup(long wgid, String grbh){
		List<Long> userids = getUseridFromGrbh(grbh);
		boolean ret = false;
		for(Long userid: userids){
			Tool.log("add user to group: " + wgid + ", " + userid);
			ret = addUser2Workgroup(wgid, userid);
		}
		return ret;
	}
	// 删除工作组用户
	public static boolean delUserFromWorkgroup(long wgid, long userid) {
		try {
			String sql = "delete from t_mk_sys_im_wg_user where f_wgid=" + wgid + " and " + "f_userid=" + userid;
			MixkyDataAccess.instance().exeSql(sql);
			DBCache.refreshCache();
			return true;
		} catch (Exception e) {
			Tool.err("del user from workgroup error: " + e.getMessage());
			return false;
		}
	}
	/*
	public static boolean delUserFromWorkgroup(long wgid, String grbh){
		List<Long> userids = getUseridFromGrbh(grbh);
		boolean ret = false;
		for(Long userid: userids){
			ret = delUserFromWorkgroup(wgid, userid);
		}
		return ret;
	}
	*/
	// 通过个人编号获取userid
	public static List<Long> getUseridFromGrbh(String grbh){
		String sql = "select id from t_mk_sys_user where grbh='" + grbh + "'";
		List<List<String>> list = MixkyDataAccess.instance().find(sql, null);
		List<Long> userids = new ArrayList<Long>();
		for(List<String> lst: list){
			userids.add(Long.valueOf(lst.get(0)));
		}
		return userids;
	}
	//获取工作组用户
	private static List<GroupUser> getGroupUser(long groupid){
		try {
			List<GroupUser> users = new ArrayList<GroupUser>();
			String sql = "select b.id,b.f_caption,b.f_name from t_mk_sys_im_wg_user a left join t_mk_sys_user b on a.f_userid=b.id where b.f_state=0 and a.f_wgid=" + groupid;			
			List<List<String>> list = MixkyDataAccess.instance().find(sql, null);
			for(List<String> lst: list){
				long userid = Long.parseLong(lst.get(0));
				String nickname = lst.get(1) + "(" + lst.get(2) + ")";
				users.add(new GroupUser(userid, nickname));
			}
			return users;
		} catch (Exception e) {
			Tool.err("get group user error: " + e.getMessage());
			return null;
		}
	}
	//获取所有工作组用户，采用缓存机制
	//每次更新工作，刷新缓存
	protected static List<List<String>> getGroupUser(){
		
		try {			
			String sql = "select a.f_wgid,b.id,b.f_caption,b.f_name from t_mk_sys_im_wg_user a left join t_mk_sys_user b on a.f_userid=b.id where b.f_state=0";			
			List<List<String>> list = MixkyDataAccess.instance().find(sql, null);
			return list;
			
		} catch (Exception e) {
			Tool.err("get group user error: " + e.getMessage());
			return null;
		}
	}
	//获取用户sim卡归属地
	public static String getSimInfo(String phone) {
		if(phone == null || phone.length() < 7){
			return "";
		}
		else{
			phone = phone.substring(0, 7);
		}
		String sql = "select a.prefix, c.name, d.vcard from t_mk_sys_im_phone_segment a " + 
					"left join t_mk_sys_im_region c on a.region_id=c.id " +
					"left join t_mk_sys_im_SIMCARDTYPE d on a.cardtype=d.id ";
		String tj = "where a.prefix='" + phone +"'";
		List<List<String>> lst = MixkyDataAccess.instance().find(sql + tj, null);
		if(lst.size() > 0){
			String city = lst.get(0).get(1);
			String corp = lst.get(0).get(2);
			return corp + "(" + city + ")";
		}
		else{
			tj = "where a.prefix like '" + phone.substring(0,3) +"%' and rownum=1";
			lst = MixkyDataAccess.instance().find(sql + tj, null);
			if(lst.size() > 0){
				return lst.get(0).get(2);
			}
			return "";
		}
	}

	// 存储短信息
	public static boolean saveSms(SmsStatus s) {
		try {
			String sql = "insert into t_mk_sys_im_sms(id,f_from,f_to,f_phone,f_note,f_state) values(f_newid(),?,?,?,?,?)";
			SqlParameterExt spx = new SqlParameterExt();
			spx.add(new LongValue(s.getFrom()));
			spx.add(new LongValue(s.getTo()));
			spx.add(new StringValue(s.getNumber()));
			spx.add(new StringValue(s.getNote()));
			spx.add(new StringValue(s.getStatus()));
			MixkyDataAccess.instance().executeProcedure(sql, spx);
			return true;
		} catch (Exception e) {
			Tool.err("save sms error: " + e.getMessage());
			return false;
		}
	}

	//通过用户名获取用户id
	public static long getUserid(String name){
		try {
			String sql = "select id from t_mk_sys_user where f_state=0 and (f_caption='" + name + "' or f_name='" + name + "')";
			List<List<String>> userInfo = MixkyDataAccess.instance().find(sql, null);
			if(userInfo.size() > 0){
				long userid = Long.parseLong(userInfo.get(0).get(0));
				return userid;
			}
			else{
				return 0;
			}
		} catch (Exception e) {
			Tool.err("get userid error: " + e.getMessage());
			return 0;
		}
	}
	
	//通过电话获取用户id
	public static long getUserid1(String phone) {
		try {
			String sql = "select id from hr_userxx where f_tel like '" + phone + "%'";
			List<List<String>> userInfo = MixkyDataAccess.instance().find(sql, null);
			if (userInfo.size() > 0) {
				long userid = Long.parseLong(userInfo.get(0).get(0));
				return userid;
			} else {
				return 0;
			}
		} catch (Exception e) {
			Tool.err("get userid error: " + e.getMessage());
			return 0;
		}
	}
	
	//通过用户名获取用户信息
	public static String getUserInfo(String name){
		try {
			if(Constants.isCRM){
				String sql = "select a.grbh,a.f_name,a.f_caption,b.yddh,b.gddh,d.f_caption bmmc,e.mc " +
							"from t_mk_sys_user a " + 
							"left join cr_gr b on a.grbh=b.grbh " +
							"left join t_mk_sys_dept_user c on a.grbh=c.grbh " +
							"left join t_mk_sys_dept d on d.id=c.f_dept_id " +
							"left join hr_post e on e.id=c.f_post_id " +
							"where a.f_name='" + name +"' or a.f_caption='" + name +"'";
				List<List<String>> userInfo = MixkyDataAccess.instance().find(sql, null);
				if(userInfo.size() > 0){
					List<String> user = userInfo.get(0);
					String s = String.format("客户编号：%s<br>登录名：%s<br>姓名：%s<br>移动电话：%s<br>固定电话：%s<br>部门：%s<br>职务：%s",
							user.get(0),user.get(1),user.get(2),user.get(3),user.get(4),user.get(5),user.get(6));
					
					return s;
				}
			}
			else{
				String sql = "select d.f_name,d.f_caption,d.f_email,a.f_tel, c.mc, d.f_dept_name bmmc,e.f_mc,f.f_mc " +
						 "from hr_userxx a " +
						 "left join t_mk_sys_dept_user b on b.f_user_id=a.id " +
						 "left join hr_post c on b.f_post_id=c.id " + 
						 "left join t_mk_sys_user d on a.id=d.id and d.f_dept_id=b.f_dept_id " +
						 "left join hr_bm_Loandept e on a.f_qydw=e.f_bm " +
						 "left join hr_bm_xz_level f on a.f_xzlevel=f.f_bm " +
						 "where d.f_name='" + name +"' or d.f_caption='" + name +"'";
				List<List<String>> userInfo = MixkyDataAccess.instance().find(sql, null);
				if(userInfo.size() > 0){
					List<String> user = userInfo.get(0);
					String s = String.format("工号：%s<br>姓名：%s<br>电邮：%s<br>电话：%s<br>职务：%s<br>部门：%s<br>签约单位：%s<br>行政级别：%s",
							user.get(0),user.get(1),user.get(2),user.get(3),user.get(4),user.get(5),user.get(6),user.get(7));
					
					return s;
				}
			}			
		} 
		catch (Exception e) {
			Tool.err("get userinfo error: " + e.getMessage());			
		}
		return name + ": 未找到该用户！" ;
	}
	//获取当天过生日的用户
	public static List<List<String>> getBirthday(){		
		try{
			String sql = "select a.id,f_ygbm,f_tel,to_char(f_birthday,'yyyymmdd'),b.f_caption " + 
						"from hr_userxx a left join t_mk_sys_user b on a.id=b.id " +
						"where b.f_state=0 and to_char(f_birthday,'mmdd')=to_char(sysdate,'mmdd')";
						//"where a.id=1618";
			if (Constants.isCRM){
				sql = "select a.id,a.f_name,b.yddh,to_char(b.csrq,'yyyymmdd'),a.f_caption " +
						"from t_mk_sys_user a left join cr_gr b on a.grbh=b.grbh " +
						"where a.f_state=0 and to_char(b.csrq,'mmdd')=to_char(sysdate,'mmdd')";
			}
			return MixkyDataAccess.instance().find(sql, null);
		}
		catch(Exception e){
			Tool.err("get user's birthday error: " + e.getMessage());
		}
		return null;
	}
	//获得集群信息
	public static List<ClusterHost> getClusterHosts(){		
		try{
			String sql = "select f_ip,f_port from t_mk_sys_im_cluster";
			List<List<String>> list = MixkyDataAccess.instance().find(sql, null);
			List<ClusterHost> hosts = new ArrayList<ClusterHost>();
			
			if(list.size() > 0){				
				for(List<String> _lst: list){					
					hosts.add(new ClusterHost(_lst.get(0).trim(), Integer.parseInt(_lst.get(1))));					
				}
				return hosts;
			}						
		}
		catch(Exception e){
			Tool.err("get cluster hosts error: " + e.getMessage());
		}
		return null;
	}
	
	public static String getAddr(String ip){
		try{			
			if (ip.startsWith("192.168")){
				return "内网";
			}
			String [] ips = ip.split("[.]");
			long lip = Long.parseLong(ips[0]) * 255 * 255 * 255 + 
					Long.parseLong(ips[1]) * 255 * 255 +
					Long.parseLong(ips[2]) * 255 + Integer.parseInt(ips[3]);
			String sql = "select address from t_mk_sys_ipaddress where startip<=" + lip + " and endip>=" + lip + " order by (endip-startip)";
			List<List<String>> addr = MixkyDataAccess.instance().find(sql, null);
			if (addr.size() > 0){				
				return addr.get(0).get(0);
			}
			else{				
				return "";
			}
		}
		catch(Exception e){
			System.err.println("get address from ip error: " + e.getMessage());
			return "";
		}
	}
	
	//是否当天第一次登陆
	public static boolean isTodayFirstLogin(long userid){
		
		return false;
	}
	
	//用于隐藏私有方法
	public void hidden(){
		getAllGroup(0);
		getGroupUser(0);
	}
}
/**
 * 
CREATE TABLE "T_MK_SYS_IM" 
   (	
    "ID" NUMBER, 
	"F_DATETIME" DATE DEFAULT sysdate, 
	"F_FROM" NUMBER(10,0), 
	"F_TO" NUMBER, 
	"F_JOIN" NUMBER(10,0), 
	"F_OUT" NUMBER(10,0), 
	"F_MESSAGE" VARCHAR2(1024), 
	"F_TITLE" VARCHAR2(64), 
	"F_TOG" NUMBER(10,0), 
	 CONSTRAINT "K_ID" PRIMARY KEY ("ID")
   );
   
CREATE TABLE "T_MK_SYS_IM_CLUSTER" 
   (	
    "F_IP" CHAR(15) NOT NULL ENABLE, 
	"F_PORT" NUMBER NOT NULL ENABLE
   );

CREATE TABLE "T_MK_SYS_IM_DURATION" 
   (	
    "ID" NUMBER, 
	"F_DT" DATE DEFAULT sysdate, 
	"F_USERID" NUMBER(10,0), 
	"F_DURATION" NUMBER, 
	"F_LT" DATE DEFAULT sysdate, 
	 CONSTRAINT "K_DID" PRIMARY KEY ("ID")
   );

CREATE TABLE "T_MK_SYS_IM_OFFLINE" 
   (	
    "ID" NUMBER, 
	"F_DATETIME" DATE DEFAULT sysdate NOT NULL ENABLE, 
	"F_FROM" NUMBER(10,0) NOT NULL ENABLE, 
	"F_TO" NUMBER(10,0) NOT NULL ENABLE, 
	"F_TITLE" VARCHAR2(64), 
	"F_MESSAGE" VARCHAR2(1024),
	PRIMARY KEY ("ID")
   ); 
CREATE TABLE "T_MK_SYS_IM_PHONE_SEGMENT" 
   (	
    "PREFIX" VARCHAR2(255), 
	"HD_BEGIN" VARCHAR2(10), 
	"HD_END" VARCHAR2(10), 
	"PROVINCE_ID" NUMBER(10,0), 
	"CARDTYPE" NUMBER(10,0), 
	"REGION_ID" NUMBER(10,0), 
	 PRIMARY KEY ("PREFIX")
   );
CREATE TABLE "T_MK_SYS_IM_REGION" 
   (	
    "ID" NUMBER(10,0) NOT NULL ENABLE, 
	"NAME" VARCHAR2(50) NOT NULL ENABLE, 
	"PARENT" NUMBER(10,0) NOT NULL ENABLE, 
	"ILEVEL" NUMBER(10,0) DEFAULT 1 NOT NULL ENABLE, 
	 PRIMARY KEY ("ID")
   );
CREATE TABLE "T_MK_SYS_IM_REGIONCODE" 
   (	
    "ID" NUMBER(10,0), 
	"CODE" VARCHAR2(10), 
	"REGION_ID" NUMBER(10,0), 
	 PRIMARY KEY ("ID"),
	 CONSTRAINT "FKA64C26E1583E3311" FOREIGN KEY ("REGION_ID") REFERENCES "T_MK_SYS_IM_REGION" ("ID") ENABLE
   );
CREATE TABLE "T_MK_SYS_IM_SIMCARDTYPE" 
   (	
    "ID" NUMBER(10,0), 
	"VCARD" VARCHAR2(50), 
	"DELETED" NUMBER(10,0) DEFAULT 0, 
	"YYSTYPE" NUMBER(10,0) DEFAULT 1, 
	 PRIMARY KEY ("ID")
   );
CREATE TABLE "T_MK_SYS_IM_SMS" 
   (	
    "ID" NUMBER, 
	"F_DATETIME" DATE DEFAULT sysdate, 
	"F_FROM" NUMBER(10,0), 
	"F_TO" NUMBER(10,0), 
	"F_PHONE" VARCHAR2(11), 
	"F_NOTE" VARCHAR2(256), 
	"F_STATE" VARCHAR2(128), 
	 CONSTRAINT "PK_ID" PRIMARY KEY ("ID")
   );
CREATE TABLE "T_MK_SYS_IM_WG" 
   (	
    "ID" NUMBER, 
	"F_NAME" VARCHAR2(64), 
	"F_NOTE" VARCHAR2(256), 
	"F_CREATEUSER" NUMBER(10,0), 
	"F_CREATETIME" DATE DEFAULT sysdate, 
	"F_DESTROYTIME" DATE, 
	"F_DEL" NUMBER(1,0) DEFAULT 0, 
	 CONSTRAINT "PKEY_ID" PRIMARY KEY ("ID")
   );
CREATE TABLE "T_MK_SYS_IM_WG_OFFLINE" 
   (	
    "ID" NUMBER, 
	"F_DATETIME" DATE DEFAULT sysdate NOT NULL ENABLE, 
	"F_FROM" NUMBER(10,0) NOT NULL ENABLE, 
	"F_TO" NUMBER(10,0) NOT NULL ENABLE, 
	"F_TITLE" VARCHAR2(64), 
	"F_MESSAGE" VARCHAR2(1024)
   );
CREATE TABLE "T_MK_SYS_IM_WG_USER" 
   (	
    "F_WGID" NUMBER, 
	"F_USERID" NUMBER(10,0), 
	 CONSTRAINT "PK_WGID_USERID" PRIMARY KEY ("F_WGID", "F_USERID")
    );
CREATE TABLE "T_MK_SYS_IPADDRESS" 
   (	
    "STARTIP" NUMBER(18,0) NOT NULL ENABLE, 
	"ENDIP" NUMBER(18,0) NOT NULL ENABLE, 
	"ADDRESS" NVARCHAR2(256)
   );
CREATE INDEX "IDX_ENDIP" ON "T_MK_SYS_IPADDRESS" ("ENDIP"); 
CREATE INDEX "IDX_STARTIP" ON "T_MK_SYS_IPADDRESS" ("STARTIP"); 
                         
create or replace procedure p_im_crtwg(
   v_name in varchar2,
   v_note in varchar2, 
   v_userid in number,
   v_ret in out smallint
) 
   as
   v_id number;
   v_errorcode number;
   v_errormsg varchar2(200);
begin
   v_id:=f_newid();
   insert into t_mk_sys_im_wg(id,f_name,f_note,f_createuser) values(v_id,v_name,v_note,v_userid);
  
   insert into t_mk_sys_im_wg_user(f_wgid, f_userid) values(v_id, v_userid);
   
    commit;
    v_ret:=0;
  
exception
   when others then
   v_errorcode:=sqlcode;
   v_errormsg :=sqlerrm;
   rollback;
   insert into t_wa_sys_log_err(err_date,name_proc,err_code,err_msg)
           values(sysdate,'p_im_crtwg',v_errorcode,v_errormsg);
   v_ret:=1;
   commit;
end; 
 */
