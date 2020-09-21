package com.wasoft.websocket.chat;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.concurrent.atomic.AtomicInteger;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.wasoft.websocket.chat.bean.ClusterHost;
import com.wasoft.websocket.util.Tool;

@ServerEndpoint(value = "/websocket/javax/chat")
public class ChatAnnotation implements IChatContainer{

	private static ChatAnnotation chatAnnotation = null;
    
    //private static final AtomicInteger connectionIds = new AtomicInteger(0);
    //private static final Set<ChatAnnotation> connections = new CopyOnWriteArraySet<ChatAnnotation>();
	//private final String nickname;
	private volatile int MAX_ONLINE = 0;
	private final int MAX_ONLINE_SEND = 200;
	private static volatile Date startTime;
    private volatile int serviceCount;
    private String rootPath;
    private String ctxPath;
    private ArrayList<ClusterHost> hosts = new ArrayList<ClusterHost>();	
	private static final ConcurrentHashMap<Long, IChatMessageIn> connections =
            							new ConcurrentHashMap<Long, IChatMessageIn>();

    public ChatAnnotation() {       
        startTime = new Date();
        serviceCount = 0;
        rootPath = "";//this.getServletConfig().getServletContext().getRealPath("/");
        ctxPath = "";//this.getServletConfig().getServletContext().getContextPath();

    	chatAnnotation = this;
    }
    public static ChatAnnotation getInstance(){
    	return chatAnnotation;
    }
    @OnOpen
    public void onOpen(Session session) {
//        this.session = session;        
//        connections.add(1l, this); 
        
    }
    
    public IChatMessageIn getCmi(long userid){return null;}
	
	public boolean isOnline(long userid){return true;}
	
	public void add(long userid, IChatMessageIn cmi){}
	
	public void remove(long userid){}
	
	public boolean isMaxOnline(){return true;}
	
	public Collection<IChatMessageIn> getConnections(){return null;}
		
	public Date getStartTime(){return null;}
	
	public int getServiceCount(){return 0;}
	
	public void setServiceCount(int serviceCount){}
	
	public String getRootPath(){return null;}

	public String getCtxPath(){return null;}

    public int getMAX_ONLINE(){return 0;}
    
	public void destroyCmis(){}
}