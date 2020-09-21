package com.wasoft.websocket.chat.thread;

import java.util.Date;
import java.util.concurrent.ConcurrentLinkedQueue;
import com.wasoft.websocket.chat.bean.Message;
import com.wasoft.websocket.chat.bean.Msg;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.Tool;

public class SaveMsg implements Runnable{
	private static final int MAX_SIZE = 200;	
	private static final int MAX_DURA = 1000*60*60*2;//2hour
	private static final int SCHEDULE_HOUR = 1;
	private static ConcurrentLinkedQueue<Msg> queue;	
	private static long timestamp = 0;
	private Message m; 
	
	public static void init(){
		queue = new ConcurrentLinkedQueue<Msg>();
		timestamp = new Date().getTime();
	}	
	public SaveMsg(Message m){
		this.m = m;
	}
    public void run(){    	
    	try{        	        	
        	queue.offer(new Msg(this.m));        	
        	if(isSave()){
        		dumpMsg();
        	}
        	else{
        		//Tool.log("save msg to memory, " + size);
        	}
    	}
    	catch(Exception e){
    		Tool.err(e.getMessage());
    	}
    }
    
    private static boolean isTimeout(){
		long now = new Date().getTime();
		if((now - timestamp) > MAX_DURA){
			timestamp = now;
			return true;
		}
		else{
			return false;
		}			
	}
    
    private static boolean isSave(){
    	/*
    	Calendar cal = Calendar.getInstance();
    	return SCHEDULE_HOUR == cal.get(Calendar.HOUR_OF_DAY);
    	*/
    	return queue.size()>= MAX_SIZE || isTimeout();
    }
    
    public static void dumpMsg(){
    	try{
			//Tool.log("dump msg to db...");        			
			while(!queue.isEmpty()){    		
	    		DBUtil.saveMsg(queue.poll());    		
	    	}
    	}
    	catch(Exception e){
    		Tool.err(e.getMessage());
    	}
    }
}
