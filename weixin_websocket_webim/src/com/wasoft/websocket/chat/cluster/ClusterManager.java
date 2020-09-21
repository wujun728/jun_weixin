package com.wasoft.websocket.chat.cluster;

import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import com.wasoft.websocket.chat.bean.ClusterHost;
import com.wasoft.websocket.util.DBUtil;
import com.wasoft.websocket.util.Tool;

public class ClusterManager {

	private List<ClusterHost> chs;
	private static ClusterManager cm = null;
	
	private ClusterManager(){
		this.chs = DBUtil.getClusterHosts();		
		for(ClusterHost ch : chs){
			if(Tool.isLocalhost(ch.getIp())){
				ch.setLocal(true);
				StartServer(ch.getPort());
			}
			else{
				ch.setLocal(false);
				if(ch.getSocket() == null){
					ch.setSocket(getSocket(ch.getIp(), ch.getPort()));
				}
			}
		}
	}
	
	private static synchronized void syncInit(){
		Tool.log("==============================");
		if (cm == null) {
			cm = new ClusterManager();
		}
	}

	public static ClusterManager getInstance() {
		if (cm == null) {
			syncInit();
		}
		return cm;
	}

	private Socket getSocket(String ip, int port){		
		Socket socket = null;
		Tool.log("try to connect server ip: " + ip + ", port: " + port);
		for(int i = 1; i <= 3; i++){			
			try
	        {
	        	socket = new Socket(ip, port);
	        	Tool.log("connect server sucess.");
	        	break;
	        }
	        catch(Exception e)
	        {        	
	         	Tool.err("connect failed: " + e.getMessage());			
	        }
		}
        
        return socket;
	}
	private void StartServer(int port){
		Tool.log("start server ...");
		try
		{    			
			ServerSocket serverSocket = new ServerSocket(port);		        
			ExecutorService executorService = Executors.newFixedThreadPool(this.chs.size());
			Tool.log("Start server success, listener port: " + port);
			while(true){
				 if (serverSocket == null)
					 break;
		         executorService.execute(new Handler(serverSocket.accept()));		            
		    }
			
		}
		catch(Exception e){
			Tool.err("start server error: " + e.getMessage());			
		}
	}
	class Handler implements Runnable
	{
	    private Socket socket;
	    public Handler(Socket socket)
	    {
	        this.socket = socket;
	    }
	    
	    public void run()
	    {
	    	String remoteip = this.socket.getInetAddress().getHostAddress();
	    	Tool.log("accept host request from " + remoteip);
	    	boolean isClusterHost = false;
	    	for(ClusterHost ch : chs){
	    		if(ch.getIp().equals(remoteip)){
	    			isClusterHost = true;
	    			ch.setSocket(socket);
	    			break;	    			  
	    		}	    		
	    	}
	    	if(isClusterHost){
				try{
					socket.setKeepAlive(true);
					Tool.log("connect is ok.");
	    			while(true){
	    			    try {  
	    			    	Thread.sleep(100);  
	    			    } catch (InterruptedException e1) {  
	    			    	e1.printStackTrace();  
	    			    }  
	    			    if (socket != null){  
	    			        try{    
	    			            InputStream is = socket.getInputStream();
	    			            int readInt;
	    			            StringBuffer sb = new StringBuffer();
	    			            while((readInt = is.read()) != -1){
	    			            	Tool.log("read data: " + readInt);
	    			            	if (readInt == '@'){
	    			            		break;
	    			            	}
	    			            	else{
	    			            		sb.append((char)readInt);
	    			            	}
	    			            }
	    			            Tool.log("receive data: " + Tool.fromBase64(sb.toString()));
	    			            is.close();    			              
	    			        }
	    			        catch(Exception e){  
	    			            Tool.err("receive data error: " + e.getMessage());  
	    			        }
	    			    }  
	    			}
				}
				catch(Exception e){
					Tool.err("listner error: " + e.getMessage());
				}
	    	}
	    }
	}	
	
	public void send(String msg){
		Tool.log("send msg: " + msg);
		if (chs != null){
			for(ClusterHost ch: chs){
				if(!ch.isLocal() && ch.getSocket() != null){
					send(ch.getSocket(), msg);
				}
			}
		}		
	}
	public void send(Socket socket, String msg){
		Tool.log("send to: " + socket.getInetAddress().getHostAddress());
		String data = Tool.toBase64(msg) + "@";
		try{
	        OutputStream os = socket.getOutputStream();
	        byte [] buf = new byte[data.length()];
	        os.write(buf);
		}
		catch(Exception e){
			Tool.err("send data error: " + e.getMessage());
		}
	}
	
	public String receive(){
		
		return "";
	}
	public static void main(String [] args){
		
		
	}
}
