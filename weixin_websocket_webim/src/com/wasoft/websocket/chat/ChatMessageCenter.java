package com.wasoft.websocket.chat;

import java.util.Collection;
import java.util.Date;

import org.apache.tomcat.util.res.StringManager;

import com.google.gson.Gson;
import com.mixky.toolkit.DateTool;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.chat.bean.Sms;
import com.wasoft.websocket.chat.bean.SmsStatus;
import com.wasoft.websocket.chat.cluster.ClusterManager;
import com.wasoft.websocket.chat.thread.ThreadFactory;
import com.wasoft.websocket.sms.SmsManager;
import com.wasoft.websocket.util.DBCache;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.HTMLFilter;
import com.wasoft.websocket.util.Tool;
import com.wasoft.websocket.util.TwoDimensionCode;
import com.wasoft.websocket.ws.IMService;

public class ChatMessageCenter {
	protected static final StringManager sm = StringManager.getManager(Constants.Package);
    //处理系统指令
    public static void handleCommand(IChatMessageIn cmi, Message in){
    	if (in.getTitle().equalsIgnoreCase("img")){//更新头像照片
    		String ret = "更新照片失败！";
    		try{
        		String dir = cmi.getCwss().getRootPath() + Constants.DOWNLOADDIR + "photo/";        		
        		String imgName = cmi.getUi().getUserid() + ".JPG";        		
        		String imgPath = dir + imgName;        		
        		if(Tool.generateImage(in.getContent(), imgPath)){
        			ret = "更新照片成功";		
        		}        		
        	}
        	catch(Exception e){
        		Tool.err(e.getMessage());
        		ret = e.getMessage();
        	}
    		//发送结果
    		System.out.println(ret + ",userid = " + in.getTo());
    		IMService.getService().pushNotify(in.getTo(), ret);
    	}
    	else{    	
	    	String cmd = in.getContent();    	
	    	if (cmd.equals(Constants.getCmd("REFRESH_USER_LIST"))){	        		
	    		ChatMessageHelper.sendRefreshUserList(in, cmi);
	    	}
	    	else if (cmd.equals(Constants.getCmd("REFRESH_GROUP_USER"))){
	    		WorkGroupManager.sendGroupUser(cmi, in);
	    	}
	    	else if (cmd.equals(Constants.getCmd("CREATE_WORKGROUP"))){	
	    		WorkGroupManager.createWorkGroup(cmi, in);
	    	}
	    	else if (cmd.equals(Constants.getCmd("DESTROY_WORKGROUP"))){	
	    		WorkGroupManager.destroyWorkGroup(cmi, in);
	    	}
	    	else if (cmd.equals(Constants.getCmd("ADD_WORKGROUP_USER"))){
	    		WorkGroupManager.addGroupUser(cmi, in);	        		
	    	}
	    	else if (cmd.equals(Constants.getCmd("DEL_WORKGROUP_USER"))){	        		
	    		WorkGroupManager.delGroupUser(cmi, in);
	    	}
	    	else if (cmd.equals(Constants.getCmd("EXIT_WORKGROUP"))){	        		
	    		WorkGroupManager.ExitWorkGroup(cmi, in);
	    	}
	    	else if (cmd.equals(Constants.getCmd("SMS_GET_PHONE"))){	        		
	    		ChatMessageHelper.sendUserPhone(cmi, in);
	    	}
	    	else if (cmd.equals(Constants.getCmd("SMS_SEND_MSG"))){	        		
	    		ChatMessageHelper.sendSmsMsg(cmi, in);
	    	}
	    	else if (cmd.equals(Constants.getCmd("SYSTEM_USER_STATUS"))){	        		
	    		ChatMessageHelper.sendUserStatus(cmi, in);
	    	}
	    	else{
	    		Tool.err("not find command: " + cmd);
	    	}
    	}
    }
    
    //处理对话
    public static void handleTalk(IChatMessageIn cmi, Message in){
    	IChatContainer cwss = cmi.getCwss();
    	String title = String.format("%s&nbsp;%s", cmi.getUi().getNickname(), DateTool.formatDate(null, DateTool.FORMAT_DATETIME));
        String filteredMessage = in.getTitle().equals("img") ? in.getContent() : HTMLFilter.filter(in.getContent());
        Message m = new Message(cmi.getUi().getUserid(), in.getTo(), 0, 0, in.getType(), title, filteredMessage);
        
        if(in.getTitle().equals("img")){
        	ChatMessageHelper.handleImage(cmi, m);
        }            

        String s = new Gson().toJson(m);
        
        if(m.getTo() != 0){
        	
        	if(m.getTo() == Constants.proxyId){
        		proxy(cwss, m, cmi, in, s);//小秘书
        	}        	
        	else{//点对点单聊        		
        		IChatMessageIn conn = null;
            	try{            		
            		conn = ChatContainerFactory.getChatContainer().getCmi(m.getTo());
            	}
            	catch(Exception e){
            		Tool.err("Fatal error: " + e.getMessage());
            	}            	
            	if (conn == null){//对方已下线，发回自己离线信息
            		ThreadFactory.saveMessage(m);
            		DBUtil.saveOfflineMessage(m); 
            		//消息回传给自己  
            		chgFromTo(m);
            		s = new Gson().toJson(m);
            		Tool.log("--> send to self[" + cmi.getUi().getUserid() + "]: " + s);
            		ChatMessageHelper.send(cmi, s);//回传不用记录数据库
            		
            		m = m.clone();
            		m.setContent(sm.getString("chat.message.offline"));
            		m.setTitle(sm.getString("chat.message.system"));            		
            		Tool.log("--> send to [" + cmi.getUi().getUserid() + "]: " + new Gson().toJson(m));  
            		ChatMessageHelper.send(cmi, m);
            		//ClusterManager.getInstance().send(s);
            	}
            	else{         
            		//消息送达接受人
            		Tool.log("--> send to [" + conn.getUi().getUserid() + "]: " + s);
            		//Date start = new Date();
            		ChatMessageHelper.send(conn, m);
            		//Tool.log("--> " + ((new Date()).getTime() - start.getTime()));
            		//将消息回传给自己
            		m = m.clone();
            		chgFromTo(m);
            		s = new Gson().toJson(m);
            		Tool.log("--> send to self[" + cmi.getUi().getUserid() + "]: " + s);
            		//start = new Date();            		
            		ChatMessageHelper.send(cmi, s);//回传不用记录数据库
            		//Tool.log("--> " + ((new Date()).getTime() - start.getTime()));
            	}
        	}
        }
        else{//to = 0 ：广播
        	Tool.log("--> broadcast: " + s);
        	ChatMessageHelper.broadcast(s);
        }
    }
    //小秘书
    private static void proxy(IChatContainer cwss, Message m, IChatMessageIn cmi, Message in, String s){
		int serviceCount = cwss.getServiceCount();
//		if(in.getTitle().equals("img")){
//			m.setContent(sm.getString("chat.message.proxy.cmd.img"));        			
//			sendProxyMsg(m);
//			return;
//		}
//		else{
//			Tool.log("title: " + in.getTitle());
//		}
		ThreadFactory.saveMessage(m);
		m = m.clone();
		chgFromTo(m);
		ChatMessageHelper.send(cmi, new Gson().toJson(m));//回传		
		chgFromTo(m);
		
		String cmd = Tool.unescape(m.getContent());//先进行解码
		if(cmd.toUpperCase().startsWith("TO")||cmd.startsWith("找")){        			
			cmd = Tool.filterBr(cmd);
			int index = cmd.indexOf('@');
			if (index > 0){//滤掉@符号
				cmd = cmd.substring(0, index) + cmd.substring(index + 1);
			}
			
			String name = "";            			
			if(cmd.toUpperCase().startsWith("TO") && cmd.length() > 2){
				name = cmd.substring(2);	 
			}
			else if(cmd.startsWith("找") && cmd.length() > 2){
				name = cmd.substring(1);	 
			}
			else{
				Tool.err("error: name is not set.");
			}
			
			long userid = DBUtil.getUserid(name);
			if(userid == 0){            				
				m.setContent(name + sm.getString("chat.message.proxy.nobody"));
    			sendProxyMsg(cmi, m);
			}
			else{
				ChatMessageHelper.send(cmi, "{'type':" + Constants.getType("CMD") + ",'cmd':" + Constants.getCmd("OPEN_USER_WIN") + ",'result':" + userid + "}");
			}
		}            		
		else if(cmd.toUpperCase().startsWith("ALL@")){//弹屏广播给所有在线用户
    		Tool.log("--> dapscreen broadcast: " + s);	            		
    		m.setContent(sm.getString("chat.message.proxy.all") + cmd.substring(4));
    		int i = 0;
    		Collection<IChatMessageIn> conns = ChatContainerFactory.getChatContainer().getConnections();
    		for (IChatMessageIn conn : conns) {	            			
    			if(conn != cmi){
    				m.setTo(conn.getUi().getUserid());	            				
    				ChatMessageHelper.send(conn, new Gson().toJson(m));//群发不存信息，使用字符串
    				i ++;
    			}
            }
    		m = m.clone();
    		m.setTo(Constants.proxyId);
    		m.setContent(sm.getString("chat.message.proxy.send.success", i));
    		sendProxyMsg(cmi, m);
		}
		else if(Tool.filterBr(cmd.toUpperCase()).equals("H")){
			m.setContent(sm.getString("chat.message.proxy.help"));
    		sendProxyMsg(cmi, m);
		}
		else if(cmd.toUpperCase().startsWith("API")){
			//m.setContent(sm.getString("chat.message.proxy.api"));
			m.setContent(Constants.API_HTML);
			sendProxyMsg(cmi, m);
		}
		else if(cmd.toUpperCase().startsWith("INFO@")){
			Tool.log("--> query user info...");
			if(cmd.length() > 5){
    			String name = Tool.filterBr(cmd.substring(5));	            			
    			m.setContent( DBUtil.getUserInfo(name));	            			
			}
			else{
				m.setContent(sm.getString("chat.message.proxy.cmd.error"));
			}
			sendProxyMsg(cmi, m);
		}
		else if(cmd.toUpperCase().startsWith("QR@")){
			Tool.log("--> create qr...");
			String qr_content = Tool.unescape(in.getContent());
			if(qr_content.length() > 3){
    			String qr = qr_content.substring(3);
    			String imgName = cmi.getUi().getUserid() + "_" + System.currentTimeMillis() +".png";
    			String dir = cwss.getRootPath() + Constants.DOWNLOADDIR;
        		String dirext = Tool.getDirext(dir);
    			String imgPath = dir + dirext + imgName;	            			 
    			if(TwoDimensionCode.encoderQRCode(qr, imgPath)){
    				String imgurl =  "<img src='" + cwss.getCtxPath() + Constants.DOWNLOADDIR + dirext + imgName + "'/>";
    				m.setContent(imgurl);	
    			}
    			else{
    				m.setContent(sm.getString("chat.message.proxy.qrcode.failed"));
    			}            				            			
			}
			else{
				m.setContent(sm.getString("chat.message.proxy.cmd.error"));
			}
			sendProxyMsg(cmi, m);
		}
		else if(cmd.toUpperCase().startsWith("IP@")){
			Tool.log("--> query ip...");
			if(cmd.length() > 3){
    			String addr = Tool.filterBr(cmd.substring(3));
    			addr += ": " + IMService.getService().getAddr(addr);
    			m.setContent(addr);	            			
			}
			else{
				m.setContent(sm.getString("chat.message.proxy.cmd.error"));
			}
			sendProxyMsg(cmi, m);
		}
		else if(cmd.toUpperCase().startsWith("TEL@")){
			Tool.log("--> query tel...");
			if(cmd.length() > 4){
    			String phone = Tool.filterBr(cmd.substring(4));
    			phone += ": " + DBUtil.getSimInfo(phone);
    			m.setContent(phone);	            			
			}
			else{
				m.setContent(sm.getString("chat.message.proxy.cmd.error"));
			}
			sendProxyMsg(cmi, m);
		}
		else if(cmd.toUpperCase().startsWith("REFRESH")){
			DBCache.refreshUserInfos();
			m.setContent("refresh userinfo success");
			sendProxyMsg(cmi, m);
		}
		else{            			
			m.setContent(sm.getString("chat.message.proxy.sysinfo", 
					DateTool.formatDate(ChatContainerFactory.getChatContainer().getStartTime(), DateTool.FORMAT_DATETIME), 
					Tool.getDateTimeDiff(ChatContainerFactory.getChatContainer().getStartTime(), new Date()), cwss.getMAX_ONLINE(), serviceCount));
			sendProxyMsg(cmi, m);
		}
    }
    private static void sendProxyMsg(IChatMessageIn cmi,Message m){
    	chgFromToAndTitle(m, getProxyTitle());    	
    	ChatMessageHelper.send(cmi, m);
    }
    private static void chgFromToAndTitle(Message m,String title){
    	chgFromTo(m);
		m.setTitle(title);
    }
    private static void chgFromTo(Message m){
    	long _from = m.getFrom();
		m.setFrom(m.getTo());
		m.setTo(_from);
    }
    private static String getProxyTitle(){
    	return String.format("%s&nbsp;%s", sm.getString("chat.message.proxy.name"), DateTool.formatDate(null, DateTool.FORMAT_DATETIME));
    }
    
    //通过代理发送系统消息给userid
    public static boolean sendSystemMsg(long to, String msg){
    	
        Message m = new Message(Constants.proxyId, to, 0, 0, Constants.getType("TALK"), getProxyTitle(), msg);        
        IChatMessageIn cmi = ChatContainerFactory.getChatContainer().getCmi(to);
        if(cmi != null){
        	ChatMessageHelper.send(cmi, m);
        	return true;
        }
        else{//是否离线
        	Tool.log("userid: " + to + " is offline.");
        	return false;
        }
    }
    //给指定登录名发送
    public static boolean sendSystemMsg(String loginName, String msg){
    	long userid = DBUtil.getUserid(loginName);
		return sendSystemMsg(userid, msg);
    }
    //给所有在线用户发送消息
    public static void sendSystemMsgToAll(String msg){
    	Message m = new Message(Constants.proxyId, 0, 0, 0, Constants.getType("TALK"), getProxyTitle(), msg);
    	
    	ChatMessageHelper.bdMessage(m);
    }
    //如果用户在线发送信息，否则发送短信
    public static void sendSystemMsg_Sms(long to, String msg){
    	String tel = DBCache.getPhone(to);
    	sendSystemMsg_Sms(to, tel, msg);
    }
    public static void sendSystemMsg_Sms(long to, String tel, String msg){
    	if (ChatContainerFactory.getChatContainer().isOnline(to)){
    		sendSystemMsg(to, msg);
    	}
    	else{
    		Sms sms = new Sms(to, tel, msg);
    		String ret = SmsManager.sendSms(sms);
    		ThreadFactory.saveSms(new SmsStatus(Constants.proxyId, sms.getUserid(), sms.getPhone(), sms.getMsg(), ret));
    	}
    }
    /**
     * 发送系统命令
     * @param to 接收人ID
     * @param cmd 命令，由前端注册方法名
     * @return
     */
    public static boolean sendSystemCmd(long to, String cmd){
    	IChatMessageIn cmi = ChatContainerFactory.getChatContainer().getCmi(to);
        if(cmi != null){
        	ChatMessageHelper.send(cmi, cmd);
        	return true;
        }
        else{//离线用户
        	Tool.log("userid: " + to + " is offline.");
        	return false;
        }
    }
    /**
     * 强制退出
     * @param userid 已登录用户ID
     */
    public static void forceExit(long userid){
    	//调用前端方法强行退出
    	IMService.getService().pc(userid, "Portal.Exit");
    	//，并断开连接
    	if(ChatContainerFactory.getChatContainer() != null){
	    	IChatMessageIn cmi = ChatContainerFactory.getChatContainer().getCmi(userid);
	    	if(cmi != null){
	    		cmi.forceClose();
	    	}
    	}
    }
}
