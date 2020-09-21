/**
 * 采用cxf的webservice实现方式
 * 在配置文件（application-context-ws-cxf.xml）中增加
 * 	<jaxws:endpoint id="IMMessageService" implementor="com.wasoft.websocket.ws.IMService" address="/IMService">
        <jaxws:serviceFactory>
            <ref bean="jaxws-and-aegis-service-factory"/>
        </jaxws:serviceFactory>
    </jaxws:endpoint>
 */
package com.wasoft.websocket.ws;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.jws.WebService;
import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.ChatContainerFactory;
import com.wasoft.websocket.chat.ChatMessageCenter;
import com.wasoft.websocket.chat.IChatContainer;
import com.wasoft.websocket.chat.IChatMessageIn;
import com.wasoft.websocket.chat.WorkGroupManager;
import com.wasoft.websocket.chat.bean.Sms;
import com.wasoft.websocket.chat.bean.SmsStatus;
import com.wasoft.websocket.chat.thread.ThreadFactory;
import com.wasoft.websocket.sms.SmsManager;
import com.wasoft.websocket.util.DBCache;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.Tool;

@WebService
public class IMService extends BaseService{

	private static IMService instance = null;
	
	public static IMService getService(){
		if (instance == null){
			instance = new IMService();
		}
		return instance;
	}
	/**
	 * 检查IM是否已启动 	
	 * 门户：
	 * if(IMService.getService().isStarted){
	 * 	  //已启动....
	 * }
	 * else{
	 * 	  //未启动...
	 * }
	 * 
	 * 应用：
	 * if(IM.getService().isStarted){
	 * 	  //已启动....
	 * }
	 * else{
	 * 	  //未启动...
	 * }
	 * @return 
	 */
	public boolean isStarted(){
		return Constants.Started;
	}
	/**
	 * 返回IM服务的版本号
	 */
	public String getVer(){
		Tool.log("返回IM服务的版本号");
		return "wasoft IMWebService ver 1.0"; 
	}
	
	/**
	 * 获取IM服务器运行时长
	 * @return
	 */
	public String getDura(){		
		return Tool.getDateTimeDiff(ChatContainerFactory.getChatContainer().getStartTime(), new Date());
	}
	
	/**
	 * 发送系统信息，接受人收到来自小秘书的信息
	 * @param to
	 * @param msg
	 * @return
	 */
	public boolean sendIM(long to, String msg){		
		return ChatMessageCenter.sendSystemMsg(to, msg);		
	}
	//通过用户名发送信息
	public boolean sendUserIM(String username, String msg){
		return ChatMessageCenter.sendSystemMsg(username, msg);
	}
	//给所有在线用户发送消息
	public void sendIMtoAll(String msg){
		ChatMessageCenter.sendSystemMsgToAll(msg);
	}
	//发送短信
	public String sendSms(long userid, String msg) {		
		Sms sms = new Sms(userid, DBCache.getPhone(userid), msg);
		if (sms.getPhone() != null) {
			if (sms.getPhone().length() > 11){
				sms.setPhone(sms.getPhone().substring(0, 11));
			}
		} 
		else {
			return "电话号码有误";
		}
		String ret = SmsManager.sendSms(sms);
		ThreadFactory.saveSms(new SmsStatus(Constants.proxyId, sms.getUserid(), sms.getPhone(), sms.getMsg(), ret));

		return ret;
	}

	//发送邮件
	public void sendMail(long userid, String subject, String body){		
		ThreadFactory.sendMail(userid, subject, body);		
	}
	/**
	 * 检查用户是否在线
	 * @param userid
	 * @return
	 */
	public boolean isOnline(long userid){
		IChatContainer container = ChatContainerFactory.getChatContainer();
		return container == null ? false : container.isOnline(userid);		
	}
	public boolean isUserOnline(String username){
		return isOnline(DBUtil.getUserid(username));
	}
	/**
	 * 获取所有在线用户
	 */
	public ArrayList<String> getAllOnlineUsers(){
		ArrayList<String> users = new ArrayList<String>();
    	
    	Collection<IChatMessageIn> conns = ChatContainerFactory.getChatContainer().getConnections();
    	for (IChatMessageIn conn : conns) {
    		users.add(conn.getUi().getUserid() + ", " + conn.getUi().getNickname());
    	}    	
    	return users;
	}
	
	/**
	 * 获取用户的所在工作组
	 * @param userid
	 * @return
	 */
	public String getAllGroups(long userid){		
		return WorkGroupManager.getAllGroup(userid);
	}
	/**
	 * 向用户前端推送脚本执行
	 * @param userid
	 * @param script
	 * @param param
	 * @return
	 */	
	public boolean pushCall(long userid, String methodName, String param){
		if(isOnline(userid)){
			String cmd = "{'type':" + Constants.getType("CMD") + ",'cmd':" + Constants.getCmd("SYSTEM_PUSH") + ",'result':'" + methodName + "','param':" + param + "}";
			ChatMessageCenter.sendSystemCmd(userid, cmd);
			return true;
		}
		return false;
	}	
	public boolean pushCall1(String username, String methodName, String param){
		return pushCall(DBUtil.getUserid(username), methodName, param);
	}
	//简化版，默认第三个参数是空对象
	public boolean pc(long userid, String methodName){
		return pushCall(userid, methodName, "{}");
	}
	public boolean pushNotify(long userid, String msg){
		return pushCall(userid, "Portal.Notify", "{msg:'" + msg + "'}");
	}
	//强制退出
	public void forceExit(long userid){
		ChatMessageCenter.forceExit(userid);
	}
	//通过IP获取地址
	public String getAddr(String ip){
		return DBCache.getAddr(ip);
	}
}
