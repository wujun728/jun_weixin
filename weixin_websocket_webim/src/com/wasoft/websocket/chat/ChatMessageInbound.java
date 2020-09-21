package com.wasoft.websocket.chat;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;
import org.apache.tomcat.util.res.StringManager;
import com.google.gson.Gson;
import com.mixky.engine.certification.MixkyUserCertification;
import com.mixky.engine.organization.dao.User;
import com.mixky.toolkit.DateTool;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.chat.bean.UserInfo;
import com.wasoft.websocket.chat.thread.ThreadFactory;
import com.wasoft.websocket.util.Tool;
import com.wasoft.websocket.ws.IMService;

public final class ChatMessageInbound extends MessageInbound implements IChatMessageIn{
	
	private static final StringManager sm = StringManager.getManager(Constants.Package);
	private ChatWebSocketServlet cwss;    
	private UserInfo ui = new UserInfo();    
    
    public UserInfo getUi(){
    	return ui;
    }
    public ChatMessageInbound(ChatWebSocketServlet cwss, HttpServletRequest request) {
    	this.cwss = cwss;
    	User user = MixkyUserCertification.instance().getUserInfo(request);
    	ui.setUserid(user.getId());
    	ui.setNickname(user.getF_caption() + "(" + user.getF_name() + ")");
    	String a = IMService.getService().getAddr(Tool.getRemoteIpAddr(request));
    	ui.setAddr(a.equals("") ? "" : "(" + a + ")");  
    	ChatMessageHelper.initCMI(this);
    	Tool.log(" ==>> remote user[" + ui.getUserid() + "] inbound.");
    }
    public IChatContainer getCwss(){
    	return cwss;
    }
    @Override
    protected void onOpen(WsOutbound outbound) {
    	Tool.log(" ==>> remote user[" + ui.getUserid() + "] open socket.");    	
    	ChatWebSocketServlet.getInstance().add(ui.getUserid(), this);
    	if(cwss.isMaxOnline()){
    		ChatMessageHelper.bdMessage(sm.getString("chat.message.system.maxonline", DateTool.formatDate(null, null), cwss.getMAX_ONLINE()));
    	}
    	ui.setLoginTime(new Date().getTime());
        String content = ui.getNickname();
        //from ont to self
        //Message m_self = new Message(userid, userid, userid, 0, TYPE.get("CMD"), nickname, content);
        //String m = new Gson().toJson(m_self);
        String m = "{'type':" + Constants.getType("CMD") + ",'cmd':" + Constants.getCmd("SYSTEM_USER_LOGIN") + ",'userid':" + ui.getUserid() + "}";
        Tool.log("--> send to [" + ui.getUserid() + "]: " + m);
        ChatMessageHelper.send(this, m);
        ChatMessageHelper.sendOfflineMessage(this);
        
        if(Constants.isSaveLogin){//save to db
	        content = sm.getString("chat.login", DateTool.formatDate(null,null), ui.getNickname());
	        Message m_all = new Message(ui.getUserid(), 0, ui.getUserid(), 0, Constants.getType("CMD"), ui.getNickname(), content);            
	        ThreadFactory.saveMessage(m_all);
        }
        //from one to all
        UserInfo _ui = new UserInfo(ui.getUserid(), 0, ui.getUserid(), ui.getNickname(), ui.getPicname(), 
        			ui.getZw(), ui.getMobile(), ui.getBm(), ui.getAddr(), ui.getSex(), ui.getStatus());
        
        String message = new Gson().toJson(_ui);
        Tool.log("--> broadcast: " + message);
        ChatMessageHelper.broadcast(message);
    }

    @Override
    protected void onClose(int status) {   
    	Tool.log(" ==>> remote user[" + ui.getUserid() + "] close socket.");
    	
    	doClose();
    }
    
    @Override
    protected void onBinaryMessage(ByteBuffer message) throws IOException {
    	
    	getWsOutbound().writeBinaryMessage(message);
    }
    
    public void writeTextMessage(CharBuffer buffer)throws IOException{
    	getWsOutbound().writeTextMessage(buffer);
    }
    
    public void send(String msg){
    	try{
    		CharBuffer buffer = CharBuffer.wrap(msg);
            getWsOutbound().writeTextMessage(buffer);
    	}
    	catch(Exception e){
    		Tool.err("send message error: " + e.getMessage());
    	}
    }
    @Override
    protected void onTextMessage(CharBuffer message) throws IOException{
    	
    	//Tool.log("<-- get message : [" + message.toString() + "] from " + this.nickname);
    	Message in = new Gson().fromJson(message.toString(), Message.class);
    	
    	if(in.getType() == Constants.getType("CMD")){//系统指令
    		ChatMessageCenter.handleCommand(this, in);	        	
    	}
    	else if(in.getType() == Constants.getType("GROUP")){//工作组
    		WorkGroupManager.handleGroup(this, in);
    	}
    	else if(in.getType() == Constants.getType("TALK")){//对话
    		ChatMessageCenter.handleTalk(this, in);
    	}
    }
    public void forceClose(){
    	Tool.log(" ==>> force close this connection.");
    	int TATUS_CLOSE_NORMAL = 1000;
    	try{
    		getWsOutbound().close(TATUS_CLOSE_NORMAL, null);
    	}
    	catch(Exception e){
    		Tool.err("force close error: " + e.getMessage());
    	}
    	finally {
            doClose();
        }
    }
    
    public void doClose(){    	
    	destroy();
    	
    	String msg = "{'type':" + Constants.getType("CMD") + ",'cmd':" + Constants.getCmd("SYSTEM_USER_LOGOUT") + ",'userid':" + ui.getUserid() + ",'lt':'" + DateTool.formatDate(null, DateTool.FORMAT_DATETIME) + "'}";
        //String message = new Gson().toJson(m);
        Tool.log("--> broadcast: " + msg);
        Tool.log("");
        ChatMessageHelper.broadcast(msg);
    }    
    public void destroy(){
    	long dt = (new Date()).getTime();
    	long loginTime = ui.getLoginTime();
    	long duration = (dt - loginTime)/1000;
    	if(duration >= Constants.MIN_DURATION && loginTime > 0){
    		ThreadFactory.saveDuration(ui.getUserid(), duration, loginTime, dt);	
    	}
    	else{
    		Tool.log("ignore online:" + duration + ", " + loginTime);
    	}
    	ChatWebSocketServlet.getInstance().remove(ui.getUserid());
        
        if(Constants.isSaveLogin){//save to db
	        String content = sm.getString("chat.logout", DateTool.formatDate(null,null), ui.getNickname());
	        Message m = new Message(0, 0, 0, ui.getUserid(), Constants.getType("CMD"), ui.getNickname(), content);
	        ThreadFactory.saveMessage(m);
        }
    }    
}
