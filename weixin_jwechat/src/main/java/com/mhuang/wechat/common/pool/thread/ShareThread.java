package com.mhuang.wechat.common.pool.thread;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mhuang.wechat.common.pool.service.ExecuteService;

/**
 * 
 * @Description 分享处理线程
 * @author mHuang
 * @date 2015年6月16日 上午11:58:37 
 * @version V1.0.0
 */
public class ShareThread extends BaseThread{

	public  Logger logger =  LoggerFactory.getLogger(getClass());
	
	private String usrId;
	private String status;
	private String type;
	private String shareName;
	private String uuid;
	
	public ShareThread(String usrId,String status,String type,String shareName,String uuid,ExecuteService weChatService){
		super(weChatService);
		this.weChatService = weChatService;
		this.usrId = usrId;
		this.status = status;
		this.type = type;
		this.shareName = shareName;
		this.uuid = uuid;
	}

	@Override
	public void run() {
		try {
			/**
			 *  锁定分享时候的用户id和uuid
			 */
			synchronized (new Object[]{usrId,uuid}) { //
				logger.info("run wechatService share");
				weChatService.share(usrId, status,type, shareName, uuid);
				logger.info("stop wechatService share");
			}
		} catch (Exception e) {
			logger.error("share Exception",e);
		}
	}
}
