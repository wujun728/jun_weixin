package com.qiton.model;

import java.util.Date;

import com.baomidou.mybatisplus.annotations.TableField;
import com.fasterxml.jackson.annotation.JsonFormat;

/**
 * 
* @ClassName: VipManage 
* @Description: 会员管理 
* @author 尤
* @date 2016年11月10日 上午9:17:26 
*
 */
public class VipManage {
	
	/** 受邀请人id */
	private Long inviAcceptuserid;
	
	/** 接受邀请用户 */
	private String inviAcceptuser;

	/** 接受人电话 */
	private String inviAcceptmobile;

	/** 接受人注册时间 */
	private Date inviRegisttime;
	
	
	private String userName;

	/** 0:普通用户，1:会员用户，2:合作用户 */
	private Integer grade;
	
	private Date endVipTime;
	
	/** 邀请金币 */
	private Integer inviGold;
	/** 邀请积分 */
	private Integer inviMark;
	
	
	private Long count;      //邀请人数


	public VipManage() {
		super();
	}


	public VipManage(Long inviAcceptuserid, String inviAcceptuser, String inviAcceptmobile, Date inviRegisttime,
			String userName, Integer grade, Date endVipTime, Integer inviGold, Integer inviMark, Long count) {
		super();
		this.inviAcceptuserid = inviAcceptuserid;
		this.inviAcceptuser = inviAcceptuser;
		this.inviAcceptmobile = inviAcceptmobile;
		this.inviRegisttime = inviRegisttime;
		this.userName = userName;
		this.grade = grade;
		this.endVipTime = endVipTime;
		this.inviGold = inviGold;
		this.inviMark = inviMark;
		this.count = count;
	}


	public Long getInviAcceptuserid() {
		return inviAcceptuserid;
	}


	public void setInviAcceptuserid(Long inviAcceptuserid) {
		this.inviAcceptuserid = inviAcceptuserid;
	}


	public String getInviAcceptuser() {
		return inviAcceptuser;
	}


	public void setInviAcceptuser(String inviAcceptuser) {
		this.inviAcceptuser = inviAcceptuser;
	}


	public String getInviAcceptmobile() {
		return inviAcceptmobile;
	}


	public void setInviAcceptmobile(String inviAcceptmobile) {
		this.inviAcceptmobile = inviAcceptmobile;
	}

	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	public Date getInviRegisttime() {
		return inviRegisttime;
	}


	public void setInviRegisttime(Date inviRegisttime) {
		this.inviRegisttime = inviRegisttime;
	}


	public String getUserName() {
		return userName;
	}


	public void setUserName(String userName) {
		this.userName = userName;
	}


	public Integer getGrade() {
		return grade;
	}


	public void setGrade(Integer grade) {
		this.grade = grade;
	}

	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss",timezone = "GMT+8")
	public Date getEndVipTime() {
		return endVipTime;
	}


	public void setEndVipTime(Date endVipTime) {
		this.endVipTime = endVipTime;
	}


	public Integer getInviGold() {
		return inviGold;
	}


	public void setInviGold(Integer inviGold) {
		this.inviGold = inviGold;
	}


	public Integer getInviMark() {
		return inviMark;
	}


	public void setInviMark(Integer inviMark) {
		this.inviMark = inviMark;
	}


	public Long getCount() {
		return count;
	}


	public void setCount(Long count) {
		this.count = count;
	}


	@Override
	public String toString() {
		return "VipManage [inviAcceptuserid=" + inviAcceptuserid + ", inviAcceptuser=" + inviAcceptuser
				+ ", inviAcceptmobile=" + inviAcceptmobile + ", inviRegisttime=" + inviRegisttime + ", userName="
				+ userName + ", grade=" + grade + ", endVipTime=" + endVipTime + ", inviGold=" + inviGold
				+ ", inviMark=" + inviMark + ", count=" + count + "]";
	}
	
	
	
	
	
	
	
	
	
	
	
}
