package com.app.entity;

public class SysQuartz {
	
	private String id;

	private String name;

	private String groups;

	private Integer status;

	private String cron;

	private String remark;
	
	private String quartzIp;
	
	private String quartzPort;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name == null ? null : name.trim();
	}

	public String getGroups() {
		return groups;
	}

	public void setGroups(String groups) {
		this.groups = groups == null ? null : groups.trim();
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getCron() {
		return cron;
	}

	public void setCron(String cron) {
		this.cron = cron == null ? null : cron.trim();
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark == null ? null : remark.trim();
	}
	
	public String getQuartzIp() {
		return quartzIp;
	}

	public void setQuartzIp(String quartzIp) {
		this.quartzIp = quartzIp;
	}

	public String getQuartzPort() {
		return quartzPort;
	}

	public void setQuartzPort(String quartzPort) {
		this.quartzPort = quartzPort;
	}

	@Override
	public String toString() {
		return "SysQuartz [id=" + id + ", name=" + name + ", groups=" + groups + ", status=" + status + ", cron=" + cron
				+ ", remark=" + remark + ", quartzIp=" + quartzIp + ", quartzPort=" + quartzPort + "]";
	}

}