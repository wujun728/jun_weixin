package com.wasoft.websocket.chat.thread;

import com.wasoft.websocket.util.DBUtil;

public class SaveDuration implements Runnable{
	private long userid;
	private long duration;
	private long lt;
	private long dt;
	public SaveDuration(long userid, long duration, long lt, long dt){
    	this.userid = userid;
    	this.duration = duration;
    	this.lt = lt;
    	this.dt = dt;
    }
    public void run(){
    	DBUtil.saveDuration(this.userid, this.duration, this.lt, this.dt);
    }
}
