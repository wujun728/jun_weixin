package com.weixin.fastweixin.company.message.req;

/**
 * 微信公众号异步任务完成事件
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYBatchJobEvent extends QYBaseEvent {

	private String jobId;
	private String jobType;
	private int errCode;
	private String errMsg;

	public QYBatchJobEvent(String jobId, String jobType, int errCode, String errMsg) {
		this.jobId = jobId;
		this.jobType = jobType;
		this.errCode = errCode;
		this.errMsg = errMsg;
	}

	public String getJobId() {
		return jobId;
	}

	public void setJobId(String jobId) {
		this.jobId = jobId;
	}

	public String getJobType() {
		return jobType;
	}

	public void setJobType(String jobType) {
		this.jobType = jobType;
	}

	public int getErrCode() {
		return errCode;
	}

	public void setErrCode(int errCode) {
		this.errCode = errCode;
	}

	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}

	@Override
	public String toString() {
		return "QYMenuEvent [jobId=" + jobId + ", jobType=" + jobType + ", errCode=" + errCode + ", errMsg=" + errMsg + ", toUserName=" + toUserName
				+ ", fromUserName=" + fromUserName + ", createTime=" + createTime + ", msgType=" + msgType + ", event=" + event + ", agentId="
				+ agentId + "]";
	}
}
