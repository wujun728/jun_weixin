package com.app.dao;

import java.util.List;
import java.util.Map;

public interface AppSysUserDao {

	public Map<String, Object> queryMationByUserCode(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> queryAppMenuByUserId(Map<String, Object> map) throws Exception;
	
	public List<Map<String, Object>> queryAppAuthPointsByUserId(Map<String, Object> map) throws Exception;
	
}
