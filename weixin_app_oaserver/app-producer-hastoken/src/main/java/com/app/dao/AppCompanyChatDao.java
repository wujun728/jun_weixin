package com.app.dao;

import java.util.List;
import java.util.Map;

public interface AppCompanyChatDao {
	
	public List<Map<String, Object>> queryCompanyDepartmentByUserId(Map<String, Object> map) throws Exception;

	public List<Map<String, Object>> queryDepartmentUserByDepartId(Map<String, Object> depart) throws Exception;

}
