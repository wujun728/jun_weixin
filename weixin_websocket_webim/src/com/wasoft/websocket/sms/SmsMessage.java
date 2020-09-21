package com.wasoft.websocket.sms;

public class SmsMessage {


	private String sjhm;// 手机号吗
	private String dxnr;//短信内容
	private String jhfssj;//计划发送时间
	private String sjfssj;//实际发送时间
	private String fszt;//发送状态
	private String pzid;//主键
	private String ztbgid;//状态报告id
	private String fsjb;//发送级别
	
	public String getFsjb() {
		return fsjb;
	}
	public void setFsjb(String fsjb) {
		this.fsjb = fsjb;
	}
	public SmsMessage() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SmsMessage(String sjhm,String dxnr,String jhfssj,String sjfssj,String fszt,String pzid,String ztbgid) {
		super();
		this.sjhm = sjhm;
		this.dxnr = dxnr;
		this.jhfssj=jhfssj;
		this.sjfssj=sjfssj;
		this.fszt = fszt;
		this.pzid = pzid;
		this.ztbgid = ztbgid;
	}
	
	public String getSjhm() {
		return sjhm;
	}
	public void setSjhm(String sjhm) {
		this.sjhm = sjhm;
	}
	public String getDxnr() {
		return dxnr;
	}
	public void setDxnr(String dxnr) {
		this.dxnr = dxnr;
	}
	public String getFszt() {
		return fszt;
	}
	public void setFszt(String fszt) {
		this.fszt = fszt;
	}
	public String getPzid() {
		return pzid;
	}
	public void setPzid(String pzid) {
		this.pzid = pzid;
	}
	public String getJhfssj() {
		return jhfssj;
	}
	public void setJhfssj(String jhfssj) {
		this.jhfssj = jhfssj;
	}
	public String getSjfssj() {
		return sjfssj;
	}
	public void setSjfssj(String sjfssj) {
		this.sjfssj = sjfssj;
	}
	public String getZtbgid() {
		return ztbgid;
	}
	public void setZtbgid(String ztbgid) {
		this.ztbgid = ztbgid;
	}

}
