package com.wasoft.websocket.chat;

import java.util.Collection;
import java.util.Date;
/**
 * 会话容器接口
 *
 */
public interface IChatContainer {
	
	public IChatMessageIn getCmi(long userid);
	
	public boolean isOnline(long userid);
	
	public void add(long userid, IChatMessageIn cmi);
	
	public void remove(long userid);
	
	public boolean isMaxOnline();
	
	public Collection<IChatMessageIn> getConnections();
		
	public Date getStartTime();
	
	public int getServiceCount();
	
	public void setServiceCount(int serviceCount);
	
	public String getRootPath();

	public String getCtxPath() ;

    public int getMAX_ONLINE();
    
	public void destroyCmis();
}
