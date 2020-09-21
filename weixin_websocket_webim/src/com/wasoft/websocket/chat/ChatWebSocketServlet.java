package com.wasoft.websocket.chat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;

import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

import com.wasoft.websocket.Constants;
import com.wasoft.websocket.chat.bean.ClusterHost;
import com.wasoft.websocket.util.Tool;

@WebServlet(urlPatterns = "/websocket/chat")  
public class ChatWebSocketServlet extends WebSocketServlet implements IChatContainer{
	
	private static final long serialVersionUID   = -5244425739050753233L;
	private static ChatWebSocketServlet cws = null;
	private volatile int MAX_ONLINE = 0;
	private final int MAX_ONLINE_SEND = 200;
	private static volatile Date startTime;
    private volatile int serviceCount;
    private String rootPath;
    private String ctxPath;
    private ArrayList<ClusterHost> hosts = new ArrayList<ClusterHost>();
	//private final Set<ChatMessageInbound> connections = new CopyOnWriteArraySet<ChatMessageInbound>();	
	private static final ConcurrentHashMap<Long, IChatMessageIn> connections =
            							new ConcurrentHashMap<Long, IChatMessageIn>();	
	@Override
    public void init() throws ServletException{
		Tool.log("=== init ChatWebSocketServlet... ===");
        super.init();
        startTime = new Date();
        serviceCount = 0;
        rootPath = this.getServletConfig().getServletContext().getRealPath("/");
        ctxPath = this.getServletConfig().getServletContext().getContextPath();
        
        cws = this;
        Constants.Started = true;
        Tool.log("=== init ChatWebSocketServlet success ===");
	}
	
	@Override
    protected StreamInbound createWebSocketInbound(String subProtocol, HttpServletRequest request){
    	
        return new ChatMessageInbound(this, request);
    }
	public static IChatContainer getInstance(){
		return cws;
	}
	
	public IChatMessageIn getCmi(long userid){		
		return connections.get(userid); 
	}
	public boolean isOnline(long userid){
		return connections.get(userid) != null;
	}
	public void add(long userid, IChatMessageIn cmi){
		connections.put(userid, cmi);
	}
	public void remove(long userid){
		connections.remove(userid);
	}
	public boolean isMaxOnline(){
		if(connections.size() > MAX_ONLINE){
    		MAX_ONLINE = connections.size();
    		if(MAX_ONLINE > MAX_ONLINE_SEND){
    			return true;
    		}
    	}
		return false;
	}	
	public Collection<IChatMessageIn> getConnections() {
        return Collections.unmodifiableCollection(connections.values());
    }
		
	public Date getStartTime() {
		return startTime;
	}
	public int getServiceCount() {
		return serviceCount++;
	}
	public void setServiceCount(int serviceCount) {
		this.serviceCount = serviceCount;
	}
	public String getRootPath() {
		return rootPath;
	}
	public String getCtxPath() {
		return ctxPath;
	}	
    public int getMAX_ONLINE() {
		return MAX_ONLINE;
	}
	public void destroyCmis() {
		Collection<IChatMessageIn> cmis = getConnections();
        for (IChatMessageIn cmi : cmis) {
            cmi.destroy();
        }		
	}    
}