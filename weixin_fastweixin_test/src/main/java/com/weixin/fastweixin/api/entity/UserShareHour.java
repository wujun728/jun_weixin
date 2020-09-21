package com.weixin.fastweixin.api.entity;

import com.alibaba.fastjson.annotation.JSONField;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class UserShareHour extends BaseDataCube {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "ref_hour")
	private Integer refHour;
	@JSONField(name = "share_scene")
	private Integer shareScene;
	@JSONField(name = "share_count")
	private Integer shareCount;
	@JSONField(name = "share_user")
	private Integer shareUser;

	public Integer getRefHour() {
		return refHour;
	}

	public void setRefHour(Integer refHour) {
		this.refHour = refHour;
	}

	public Integer getShareScene() {
		return shareScene;
	}

	public void setShareScene(Integer shareScene) {
		this.shareScene = shareScene;
	}

	public Integer getShareCount() {
		return shareCount;
	}

	public void setShareCount(Integer shareCount) {
		this.shareCount = shareCount;
	}

	public Integer getShareUser() {
		return shareUser;
	}

	public void setShareUser(Integer shareUser) {
		this.shareUser = shareUser;
	}

}
