package com.wasoft.websocket.chat;

import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.util.res.StringManager;
import com.google.gson.Gson;
import com.mixky.toolkit.DateTool;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.bean.GroupUser;
import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.chat.bean.WorkGroup;
import com.wasoft.websocket.chat.bean.WorkGroupUser;
import com.wasoft.websocket.chat.thread.ThreadFactory;
import com.wasoft.websocket.util.DBCache;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.HTMLFilter;
import com.wasoft.websocket.util.Tool;

public class WorkGroupManager{
	protected static final StringManager sm = StringManager.getManager(Constants.Package);
	//处理工作组信息
    public static void handleGroup(IChatMessageIn cmi, Message in){
    	String title = String.format("%s&nbsp;%s", cmi.getUi().getNickname(), DateTool.formatDate(null, DateTool.FORMAT_DATETIME));        
        String filteredMessage = in.getTitle().equals("img") ? in.getContent() : HTMLFilter.filter(in.getContent());
        Message m = new Message(cmi.getUi().getUserid(), in.getTo(), 0, 0, in.getType(), title, filteredMessage);
        
        if(in.getTitle().equals("img")){
        	ChatMessageHelper.handleImage(cmi, m);
        }        
		
		sendGroupMessage(cmi, m);//多播
    }
  
	//创建工作组
    public static void createWorkGroup(IChatMessageIn cmi, Message in){
    	Tool.log("CREATE_WORKGROUP");
    	String title = in.getTitle();
    	String result;
		try{
    		WorkGroup wg = new Gson().fromJson(title, WorkGroup.class);
    		wg.setF_createUser(cmi.getUi().getUserid());        		
    		if(DBUtil.createWorkgroup(wg)){
    			result = "ok";    				
			}
			else{
				result = sm.getString("chat.message.workgroup.create.error");
			}	
		}
		catch(Exception e){	    
			result = sm.getString("chat.message.workgroup.cmd.error");
		}
		String s = "{'type':" + in.getType() + ",'cmd':" + in.getContent() + ",'result':'" + result + "'}"; 
		Tool.log("--> send to [" + cmi.getUi().getUserid() + "]: " + s);
		ChatMessageHelper.send(cmi, s);
    }
    
	//解散工作组
    public static void destroyWorkGroup(IChatMessageIn cmi, Message in){
    	Tool.log("DESTROY_WORKGROUP");
    	String result;
    	try{
    		DBUtil.destroyWorkgroup(Long.parseLong(in.getTitle()));
    		result = sm.getString("chat.message.workgroup.cmd.destroy.success");
    	}
    	catch(Exception e){
    		Tool.err("destroy workgroup error: " + e.getMessage());
    		result = sm.getString("chat.message.workgroup.cmd.destroy.failed");
    	}
    	String s = "{'type':" + in.getType() + ",'cmd':" + in.getContent() + ",'result':'" + result + "'}"; 
		Tool.log("--> send to [" + cmi.getUi().getUserid() + "]: " + s);
		ChatMessageHelper.send(cmi, s);
    }
    
  //发送工作组用户
    public static void sendGroupUser(IChatMessageIn cmi, Message in){
    	Tool.log("REFRESH_GROUP_USER");
		String s = "{'type':" + in.getType() + ",'cmd':" + in.getContent() + ", 'wgid':" + 
				in.getTitle() + ",'users':" + getGroupUsers(cmi, in.getTitle()) + "}";
		ChatMessageHelper.send(cmi, s);
		
		//如果被操作用户在线，发送更新工作组消息    		
    	try{
    		IChatMessageIn conn = ChatContainerFactory.getChatContainer().getCmi(in.getTo());
    		if(conn != null){
    			in.setContent(Constants.getCmd("REFRESH_USER_LIST"));
    			ChatMessageHelper.sendRefreshUserList(in, conn);
    		}
    	}
    	catch(Exception e){
    		Tool.err("Fatal error: " + e.getMessage());
    	}    		
    }
    //增加用户到工作组
    public static void addGroupUser(IChatMessageIn cmi, Message in){
    	Tool.log("ADD_WORKGROUP_USER");        	
    	try{
    		WorkGroupUser wgu = new Gson().fromJson(in.getTitle(), WorkGroupUser.class); 
    		long userid;
    		if(Constants.isCRM){
    			userid = Long.valueOf(DBUtil.getUseridFromGrbh(wgu.getUserid()).get(0));
    			DBUtil.addUser2Workgroup(wgu.getWgid(), wgu.getUserid());    			
    		}
    		else{
    			userid = Long.valueOf(wgu.getUserid());
    			DBUtil.addUser2Workgroup(wgu.getWgid(), userid);
    			
    		}
    		in.setTo(userid);
        	in.setTitle(String.valueOf(wgu.getWgid()));        	
    	}
    	catch(Exception e){
    		Tool.err("add groupuser error: " + e.getMessage());
    		in.setTitle("0");
    	}        	
    	in.setContent(Constants.getCmd("REFRESH_GROUP_USER"));
    	//增加成功更新工作组用户表
    	sendGroupUser(cmi, in);
    	
    }
    //删除工作组中用户
    public static void delGroupUser(IChatMessageIn cmi, Message in){
    	Tool.log("DEL_WORKGROUP_USER");    	
    	try{
    		WorkGroupUser wgu = new Gson().fromJson(in.getTitle(), WorkGroupUser.class);
    		long userid = Long.valueOf(wgu.getUserid());
    		DBUtil.delUserFromWorkgroup(wgu.getWgid(), userid);
        	
        	in.setTitle(String.valueOf(wgu.getWgid()));
        	in.setTo(userid);
    	}
    	catch(Exception e){
    		Tool.err("del groupuser error: " + e.getMessage());
    		in.setTitle("0");
    	}        	
    	in.setContent(Constants.getCmd("REFRESH_GROUP_USER"));
    	//删除成功更新工作组用户表
    	sendGroupUser(cmi, in);
    }
    //退出工作组
    public static void ExitWorkGroup(IChatMessageIn cmi, Message in){
    	Tool.log("EXIT_WORKGROUP");    	
    	try{
    		WorkGroupUser wgu = new Gson().fromJson(in.getTitle(), WorkGroupUser.class);
    		long userid = Long.valueOf(wgu.getUserid());
			DBUtil.delUserFromWorkgroup(wgu.getWgid(), userid);        	         	
    	}
    	catch(Exception e){
    		Tool.err("del groupuser error: " + e.getMessage());       		
    	}        	
    	in.setContent(Constants.getCmd("REFRESH_USER_LIST"));
    	//删除成功更新用户表
    	ChatMessageHelper.sendRefreshUserList(in, cmi);
    }
  //获取工作组成员
    public static String getGroupUsers(IChatMessageIn cmi, String wgid){
    	List<GroupUser> users = new ArrayList<GroupUser>();
    	try{
    		users = DBCache.getGroupUser(Long.parseLong(wgid));
    		//在线的在列表前面
    		List<GroupUser> online = new ArrayList<GroupUser>();
    		List<GroupUser> offline = new ArrayList<GroupUser>();
        	for (GroupUser user: users) {     
        		IChatMessageIn _cmi = ChatContainerFactory.getChatContainer().getCmi(user.getUserid());    			
        		if( _cmi != null){
        			user.setOnline(true); 
        			user.setSex(cmi.getUi().getSex());
        			user.setStatus(_cmi.getUi().getStatus());
        			online.add(user);
        		}
        		else{
        			user.setOnline(false);
        			offline.add(user);
        		}
        	}
        	online.addAll(offline);
        	users = online;
    	}
    	catch(Exception e){
    		Tool.err("get Groupusers error: " + e.getMessage());
    		GroupUser u = new GroupUser(cmi.getUi().getUserid(), cmi.getUi().getNickname());
    		u.setOnline(true);
    		users.add(u);
    	}
    	String s = new Gson().toJson(users);
        Tool.log("--> getGroupUsers: " + Tool.getThumbnail(s));
        return s;
    }
    
    //发送消息到工作组所有在线成员
    public static void sendGroupMessage(IChatMessageIn cmi, Message in){
    	List<GroupUser> users = new ArrayList<GroupUser>();
    	ThreadFactory.saveMessage(in);//save to db                   
		Tool.log("--> multicast: " + new Gson().toJson(in));
    	try{
    		users = DBCache.getGroupUser(in.getTo());
    		String s = new Gson().toJson(in);
        	for (GroupUser user: users) {
        		IChatMessageIn inbound = ChatContainerFactory.getChatContainer().getCmi(user.getUserid());//connections.get(user.getUserid());
        		if( inbound != null ){//&& inbound != this){            			
        			ChatMessageHelper.send(inbound, s);            			            			
        		}
        	}            	
    	}
    	catch(Exception e){
    		Tool.err("mutilcast error: " + e.getMessage());
    	}
    }
  
    //获取工作组
    public static String getAllGroup(long userid){
    	
    	String s = new Gson().toJson(DBCache.getAllGroup(userid));
    	Tool.log("--> getAllGroup of " + userid + ": " + Tool.getThumbnail(s));
    	return s;
    }
}
