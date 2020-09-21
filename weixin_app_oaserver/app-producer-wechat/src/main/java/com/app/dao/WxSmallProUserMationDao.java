package com.app.dao;

import java.util.Map;

import org.apache.ibatis.annotations.Param;

public interface WxSmallProUserMationDao {

	public Map<String, Object> queryUserMationByOpenId(String openId);

	public int insertWxUserMation(Map<String, Object> map);

	public Map<String, Object> queryUserMationByUserCode(@Param("userCode") String userCode);

	public Map<String, Object> queryUserBindMationByUserId(@Param("userId") String userId);

	public int updateBindUserMation(Map<String, Object> map);

}
