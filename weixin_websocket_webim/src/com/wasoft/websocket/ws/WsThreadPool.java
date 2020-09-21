package com.wasoft.websocket.ws;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import com.wasoft.websocket.util.Tool;

public class WsThreadPool extends ThreadPoolExecutor {
	private static final int pool_size = 10;
	private boolean is_paused;
	private ReentrantLock pause_lock = new ReentrantLock();
	private Condition unpaused = pause_lock.newCondition();

	public WsThreadPool() {
		super(	pool_size, 			// core pool size  线程池维护线程的最小数量
				pool_size * 2, 		// maximum pool size  线程池维护线程的最大数量
				0L, 				// keep-alive time for idle thread  线程池维护线程所允许的空闲时间
				TimeUnit.SECONDS, 	// time unit for keep-alive setting  线程池维护线程所允许的空闲时间的单位
				new LinkedBlockingQueue<Runnable>(pool_size)// work queue  线程池所使用的缓冲队列
				//,handler 线程池对拒绝任务的处理策略
				); 
	}

	public WsThreadPool(int corePoolSize)
	{
		super(	corePoolSize,
				corePoolSize * 2,
				0L,
				TimeUnit.SECONDS,
				new LinkedBlockingQueue<Runnable>(corePoolSize)); 
	}
	
	protected void beforeExecute(Thread t, Runnable r) {
		super.beforeExecute(t, r);
		pause_lock.lock();
		try 
		{
			while (is_paused)
			{
				Tool.log("wait...");
				unpaused.await();
			}				
		}
		catch (InterruptedException e) {
			t.interrupt();
		} finally {
			pause_lock.unlock();
		}
	}

	public void pause() {
		pause_lock.lock();
		try {
			is_paused = true;
		} finally {
			pause_lock.unlock();
		}
	}

	public void resume() {
		pause_lock.lock();
		try {
			is_paused = false;
			unpaused.signalAll();
		} finally {
			pause_lock.unlock();
		}
	}
}