package com.weixin.fastweixin.company.message.req;

/**
 * 微信企业号异步任务类型
 * @attention: 暂时好像没用到
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public final class QYBatchJobType {

	private String SYNCUSER 	= "sync_user";// 增量更新成员
	private String REPLACEUSER 	= "replace_user";// 全量覆盖成员
	private String INVITEUSER 	= "invite_user";// 邀请成员关注
	private String REPLACEPARTY = "replace_party";// 全量覆盖部门

	private QYBatchJobType() {
	}
}
