package com.wasoft.websocket.chat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import com.google.gson.Gson;
import com.mixky.toolkit.DateTool;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.chat.bean.Sms;
import com.wasoft.websocket.chat.bean.SmsStatus;
import com.wasoft.websocket.chat.bean.UserInfo;
import com.wasoft.websocket.chat.bean.UserStatus;
import com.wasoft.websocket.chat.thread.ThreadFactory;
import com.wasoft.websocket.sms.SmsManager;
import com.wasoft.websocket.util.DBCache;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.Tool;
import org.apache.tomcat.util.res.StringManager;

public class ChatMessageHelper {
	protected static final StringManager sm = StringManager.getManager(Constants.Package);
	
	//图片处理        
    public static void handleImage(IChatMessageIn cmi, Message in){
    	try{
    		String dir = cmi.getCwss().getRootPath() + Constants.DOWNLOADDIR;
    		String dirext = Tool.getDirext(dir);
    		String imgName = cmi.getUi().getUserid() + "_" + System.currentTimeMillis() + Tool.getExt(in.getContent());        		
    		String imgPath = dir + dirext + imgName;	  
    		if(Tool.generateImage(in.getContent(), imgPath)){
    			String imgurl =  "<img src='" + cmi.getCwss().getCtxPath() + Constants.DOWNLOADDIR + dirext + imgName + "'/>";
				in.setContent(imgurl);		
    		}
    		else{
    			in.setContent(sm.getString("chat.message.proxy.cmd.img.error"));
    		}
    	}
    	catch(Exception e){
    		Tool.err(e.getMessage());
    	}
    }
    
    public static void bdMessage(String message){//IM主窗口接收
    	Message m = new Message(0, 0, 0, 0, Constants.getType("TALK"), sm.getString("chat.message.system"), message);
    	broadcast(new Gson().toJson(m));
    }
    
    public static void bdMessage(Message msg){//弹屏给所有在线用户
    	Collection<IChatMessageIn> conns = ChatContainerFactory.getChatContainer().getConnections();
        for (IChatMessageIn connection : conns) {
        	msg.setTo(connection.getUi().getUserid());
            send(connection, new Gson().toJson(msg));
        }
    }
    //广播
    public static void broadcast(String message){
    	Collection<IChatMessageIn> conns = ChatContainerFactory.getChatContainer().getConnections();
        for (IChatMessageIn connection : conns) {
            send(connection, message);
        }
    }
    
    //发送文字信息
    public static void send(IChatMessageIn conn, String message){    	   	
    	try {
    		conn.send(message);
            
        } catch (Exception e) {
            Tool.err("send error: " + e.getMessage() + "==> userid: " + conn.getUi().getUserid() + ",message: " + Tool.getThumbnail(message));
        }
    }
    //需要记录数据库
    public static void send(IChatMessageIn conn, Message msg){
    	send(conn, new Gson().toJson(msg));
    	ThreadFactory.saveMessage(msg);//save to db
    }
    
    //获取所有在线用户列表
    public static String getAllOnlineUsers(long userid){        	
    	ArrayList<UserInfo> users = new ArrayList<UserInfo>();
    	
    	users.add(new UserInfo(userid, userid,
    			 Constants.proxyId, sm.getString("chat.message.proxy.name"),
    			"",sm.getString("chat.message.proxy.zw"),"400-650-6900",
    			sm.getString("chat.message.proxy.bm"),"sys", 1, 0));//小秘书
    	
    	Collection<IChatMessageIn> conns = ChatContainerFactory.getChatContainer().getConnections();
    	for (IChatMessageIn conn : conns) {
    		//from self to self
    		users.add(new UserInfo(userid, userid, conn.getUi().getUserid(), conn.getUi().getNickname(), 
    				conn.getUi().getPicname(), conn.getUi().getZw(), conn.getUi().getMobile(),
    				conn.getUi().getBm(), conn.getUi().getAddr(), conn.getUi().getSex(), conn.getUi().getStatus()));
    	}
    	String s = new Gson().toJson(users);
        Tool.log("--> getAllOnlineUsers: " +  Tool.getThumbnail(s));
        return s;
    } 
    //刷新在线用户列表
    public static void sendRefreshUserList(Message in, IChatMessageIn conn){
    	Tool.log("REFRESH_USER_LIST");    	
    	String s = "{'type':" + in.getType() + ",'cmd':" + in.getContent() + ", 'onlineusers':" + 
				getAllOnlineUsers(conn.getUi().getUserid()) + ",'groups':" + WorkGroupManager.getAllGroup(conn.getUi().getUserid()) + "}";    	
		send(conn, s);
		
		Tool.log("--> send to [" + conn.getUi().getUserid() + "]: " +  Tool.getThumbnail(s));
    }
    
    //初始化登录用户的照片地址，移动电话和职务
    public static void initCMI(IChatMessageIn cmi){
    	UserInfo ui = cmi.getUi();
    	long userid = ui.getUserid();
    	try{
        	List<String> userInfo = DBCache.getUserInfo(userid);
        	if (userInfo != null){	        						
        		ui.setMobile(userInfo.get(1));
        		ui.setZw(userInfo.get(2));        		
        		String bmmc =  userInfo.get(3);        		
				if (bmmc == null){
					ui.setBm("");
				}
				else{
					int i = bmmc.lastIndexOf("/");
					ui.setBm((i >=0 ) ? bmmc.substring(i + 1) : bmmc);
				}					
				String path = userInfo.get(0);
				if(path == null){
					
				}
				else{
					int i = path.lastIndexOf("/");        		
					ui.setPicname((i >=0) ? path.substring(i + 1) : "");
				}
				String sex = userInfo.get(6);
				ui.setSex(sex == null ? 0 : Integer.parseInt(sex));
			}
        	else{
        		ui.setPicname("");
        		ui.setZw("");
        		ui.setMobile("");
        		ui.setBm("");
        		ui.setSex(0);
        	}
    	}
    	catch(Exception e){
    		Tool.err("init user[" + userid + "] error: " + e.getMessage());
    	}
    }
    //发送离线消息
  	public static void sendOfflineMessage(IChatMessageIn cmi){
  		long userid = cmi.getUi().getUserid();
      	List<Message> msgs = DBUtil.getOfflineMessage(userid);
      	if(msgs != null){
      		Tool.log("send offline message to " + userid);        		
      		for(Message msg: msgs){
      			Tool.sleep(2);//休眠2秒，保证前台初始化正常
      			String s = new Gson().toJson(msg);
      			Tool.log("--> send to [" + userid + "]: " + s);
      			send(cmi, s);
          	}
      	}
      	else{
      		Tool.log("not offline message of " + userid);
      	}
    }
    //发送用户的手机号和姓名
  	public static void sendUserPhone(IChatMessageIn cmi, Message in){
      	long userid = Long.parseLong(in.getTitle());
      	List<String> userInfo = DBCache.getUserInfo(userid);
      	String phone = "";
      	String name = "";
      	if (userInfo != null){
      		phone =  userInfo.get(1);
      		name = userInfo.get(4);
      	}
      	String sim = DBUtil.getSimInfo(phone);
      	phone = phone + " " + sim;
      	String s = "{'type':" + in.getType() + ",'cmd':" + in.getContent() + 
      			",'result':{'userid':" + userid + ", 'phone':'" + phone + "','name':'" + name + "'}}";      	
      	send(cmi, s);
    }        
    //发送短信信息
  	public static void sendSmsMsg(IChatMessageIn cmi, Message in){
      	String title = in.getTitle();
      	Sms sms = new Gson().fromJson(title, Sms.class);
      	if(sms.getPhone().length() > 11){
      		sms.setPhone(sms.getPhone().substring(0, 11));
      	}
      	String ret = SmsManager.sendSms(sms);
      	ThreadFactory.saveSms(new SmsStatus(cmi.getUi().getUserid(), sms.getUserid(), sms.getPhone(), sms.getMsg(), ret));
      	String s = "{'type':" + in.getType() + ",'cmd':" + in.getContent() + ",'result':'" + ret + "'}";        	
      	send(cmi, s);
    }
  	//将来自短信的信息发送给在线用户
  	public static void sendSms2Message(Sms sms){
  		
  		String msg = sms.getMsg();
  		if (msg.length() >= 5){
  			String name = msg.substring(0, 5);
  			Tool.log("name:" + name);
  			long to = DBUtil.getUserid(name);
  			long from = sms.getUserid();  			
  			Tool.log("to: " + to + ", from: " + from);
  			String title = String.format("%s&nbsp;%s", DBCache.getUsername(from), DateTool.formatDate(null, DateTool.FORMAT_DATETIME));
  			IChatMessageIn cmi = ChatContainerFactory.getChatContainer().getCmi(to);
  	  		if (cmi != null){//在线
  	  			Message m = new Message(from, to, 0, 0, Constants.getType("TALK"), title, sms.getMsg().substring(5));
  	  			send(cmi, m);  	  			
  	  		}
  	  		else{//已离线，使用短信发送
  	  			sms.setPhone(DBCache.getPhone(to));  	  			
  	  			if(sms.getPhone() != null && !sms.getPhone().equals("")){
  	  				String ret = SmsManager.sendSms(sms);
  	  				ThreadFactory.saveSms(new SmsStatus(from, to, sms.getPhone(), sms.getMsg(), ret));
  	  			}
  	  			else{
  	  				Tool.err("sms can not send msg[" + sms.getMsg() + "],tel is null!");
  	  			}
  	  		}
  		}
  		else{
  			Tool.err("msg have no toName " + msg);
  		}
  	}
  	//发送用户状态
  	public static void sendUserStatus(IChatMessageIn cmi,Message in){  		
    	try{
    		UserStatus us = new Gson().fromJson(in.getTitle(), UserStatus.class);
    		cmi.getUi().setStatus(us.getStatus());//给该连接设置状态
    		String msg = "{'type':" + Constants.getType("CMD") + ",'cmd':" + in.getContent()+ ",'userid':" + us.getUserid() + ",'status':" + us.getStatus() + "}";
            //String message = new Gson().toJson(m);
            Tool.log("--> broadcast: " + msg);        
            ChatMessageHelper.broadcast(msg);
    	}
    	catch(Exception e){
    		Tool.err("send user status error: " + e.getMessage());       		
    	}  		
  	}
}
