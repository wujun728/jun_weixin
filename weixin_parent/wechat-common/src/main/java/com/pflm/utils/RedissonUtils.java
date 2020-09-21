package com.pflm.utils;
import java.io.IOException;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

import org.redisson.Redisson;
import org.redisson.api.RAtomicLong;
import org.redisson.api.RBoundedBlockingQueue;
import org.redisson.api.RLock;
import org.redisson.api.RPermitExpirableSemaphore;
import org.redisson.api.RQueue;
import org.redisson.api.RSemaphore;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.redisson.config.ReadMode;
import org.redisson.config.SubscriptionMode;
import org.redisson.connection.balancer.LoadBalancer;
import org.redisson.connection.balancer.RoundRobinLoadBalancer;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONObject;

/**
 * https://github.com/redisson/redisson/wiki
 * @author qxw
 * 2017年11月22日
 * Redisson分布式锁
 */


public class RedissonUtils {
	    private  RedissonUtils(){}
		private static RedissonClient redissonClient=null;
		private static Config config=null;
		static{
					config = new Config();
					//单Redis节点模式
		      		//config.useSingleServer().setAddress("redis://192.168.188.4:6380").setPassword("ty3foGTrNiKi");
					config.useSingleServer().setAddress("redis://127.0.0.1:6379").setPassword(null)
					//最小空闲连接数 默认值：32长期保持一定数量的连接有利于提高瞬时写入反应速度
					.setConnectionMinimumIdleSize(5)
					//连接池大小默认值：64
					.setConnectionPoolSize(64)
					//连接空闲超时，单位：毫秒 默认值：10000 如果当前连接池里的连接数量超过了最小空闲连接数，
					//而同时有连接空闲时间超过了该数值，那么这些连接将会自动被关闭，并从连接池里去掉。时间单位是毫秒。
					.setIdleConnectionTimeout(10000)
					//同节点建立连接时的等待超时。时间单位是毫秒。 默认值：10000
					.setConnectTimeout(10000)
					//等待节点回复命令的时间。该时间从命令发送成功时开始计时 默认值：3000
					.setTimeout(3000)
					//命令失败重试次数 默认值：3
					.setRetryAttempts(2)
					//在一条命令发送失败以后，等待重试发送的时间间隔。时间单位是毫秒 默认值：1500
					.setRetryInterval(1500);
					
//					//Redis集群模式
//					config.useClusterServers().setScanInterval(2000) // 集群状态扫描间隔时间，单位是毫秒
//				    //可以用"rediss://"来启用SSL连接
//				    .addNodeAddress("redis://127.0.0.1:7000", "redis://127.0.0.1:7001").addNodeAddress("redis://127.0.0.1:7002").setPassword(null)
//				    //默认值： SLAVE（只在从服务节点里读取） 设置读取操作选择节点的模式。 可用值为： SLAVE - 只在从服务节点里读取。 MASTER - 只在主服务节点里读取。 MASTER_SLAVE - 在主从服务节点里都可以读取。
//				    .setReadMode(ReadMode.SLAVE)
//				    //订阅操作的负载均衡模式 默认值：SLAVE（只在从服务节点里订阅）
//				    .setSubscriptionMode(SubscriptionMode.SLAVE);
//				
				   // 主从模式
//					config.useMasterSlaveServers()
//				    //可以用"rediss://"来启用SSL连接
//				    .setMasterAddress("redis://127.0.0.1:6379")
//				    .addSlaveAddress("redis://127.0.0.1:6389", "redis://127.0.0.1:6332", "redis://127.0.0.1:6419")
//				    .addSlaveAddress("redis://127.0.0.1:6399").setPassword(null)
//				    //从节点连接池大小默认值：64
//				    .setSlaveConnectionPoolSize(64)
//				    //主节点最小空闲连接数默认值：32
//				    .setMasterConnectionMinimumIdleSize(32)
//				    //主节点连接池大小默认值：64
//				    .setMasterConnectionPoolSize(64)
				    ;

					
		}				

		public static RedissonClient getRedisson() throws IOException{
			  //先检查实例是否存在，如果不存在才进入下面的同步块
		        if(redissonClient==null){
		             synchronized (RedissonUtils.class){
		               //再次判断实例是否存在，不存在 则创建
		               if(redissonClient==null){
		            	   // 取得一个数据库连接对象
							redissonClient = Redisson.create(config);
		                }
		            }
		        }
				return redissonClient;
		  }
		
	
		
		
	public static void main(String[] args) throws InterruptedException, IOException{
		
//		RLock fairLock = getRedisson().getLock("TEST_KEY");
//		
//		System.out.println(fairLock.toString());
////		fairLock.lock(); 
//		// 尝试加锁，最多等待10秒，上锁以后10秒自动解锁
//		boolean res = fairLock.tryLock(10, 10, TimeUnit.SECONDS);
//		System.out.println(res);
//		fairLock.unlock();
		
		RPermitExpirableSemaphore semaphore = getRedisson().getPermitExpirableSemaphore("mySemaphore");
		// 获取一个信号，有效期只有2秒钟。
		String permitId = semaphore.acquire(2, TimeUnit.SECONDS);
		System.out.println("permitId  "+permitId);
		semaphore.release(permitId);
		
		
		//有界阻塞队列
//		RBoundedBlockingQueue<JSONObject> queue = getRedisson().getBoundedBlockingQueue("anyQueue");
		// 如果初始容量（边界）设定成功则返回`真（true）`，
		// 如果初始容量（边界）已近存在则返回`假（false）`。
//		System.out.println(queue.trySetCapacity(10));
//		JSONObject o=new JSONObject();
//		o.put("name", 1);
//		if(!queue.contains(o)){
//			queue.offer(o);
//		}
		
//		JSONObject o2=new JSONObject();
//		o2.put("name", 2);
		// 此时容量已满，下面代码将会被阻塞，直到有空闲为止。
		
//		if(!queue.contains(o2)){
//			queue.offer(o2);
//		}
		
//		//  获取但不移除此队列的头；如果此队列为空，则返回 null。
//		JSONObject obj = queue.peek();
//		//获取并移除此队列的头部，在指定的等待时间前等待可用的元素（如果有必要）。
//		JSONObject ob = queue.poll(10, TimeUnit.MINUTES);                                                    
		
		//获取并移除此队列的头，如果此队列为空，则返回 null。
//		 Iterator<JSONObject> iterator=queue.iterator();
//		 while (iterator.hasNext()){
//			  JSONObject i =iterator.next();
//		      System.out.println(i.toJSONString());
//		      iterator.remove();
//		    
//		  }
//			while(queue.size()>0){
//				JSONObject ob = queue.poll();     
//				System.out.println(ob.toJSONString());
//			}
//		
//		JSONObject someObj = queue.poll();
//		System.out.println(someObj.toJSONString());
	}
}
