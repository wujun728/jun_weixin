package com.mhuang.wechat.common.pool.service;

/**
 * 执行接口..可自行拓展
 * @author mHuang
 *
 */
public interface ExecuteService {

	/**
	 * 微信分享
	 * @param usrId
	 * 		
	 * @param status
	 * @param type
	 * @param shareName
	 * @param uuid
	 */
	public void share(String usrId, String status, String type,
			String shareName, String uuid);
	public void subscribe(String openId, String status);
	public void scan(String openId,String eventKey);
	public void subscribeOtherEvent(String openId,String status, String eventKey);
	public void saveOpTextSend(String openId, String content);
}
