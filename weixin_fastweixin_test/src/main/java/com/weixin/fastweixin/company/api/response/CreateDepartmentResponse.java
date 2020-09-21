package com.weixin.fastweixin.company.api.response;

import com.weixin.fastweixin.api.response.BaseResponse;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class CreateDepartmentResponse extends BaseResponse {

	private static final long serialVersionUID = 1L;

	private Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "CreateDepartmentResponse{" + "id=" + id + '}';
	}

}
