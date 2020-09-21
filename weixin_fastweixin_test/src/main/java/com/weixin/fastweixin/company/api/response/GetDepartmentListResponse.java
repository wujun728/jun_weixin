package com.weixin.fastweixin.company.api.response;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;
import com.weixin.fastweixin.api.response.BaseResponse;
import com.weixin.fastweixin.company.api.entity.QYDepartment;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class GetDepartmentListResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	@JSONField(name = "department")
	private List<QYDepartment> departments;

	public List<QYDepartment> getDepartments() {
		return departments;
	}

	public void setDepartments(List<QYDepartment> departments) {
		this.departments = departments;
	}
}
