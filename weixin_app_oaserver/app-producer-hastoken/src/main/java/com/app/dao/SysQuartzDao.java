package com.app.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Select;

import com.app.entity.SysQuartz;

public interface SysQuartzDao {
	
	public int deleteByPrimaryKey(String id);

	public int insert(SysQuartz record);

	public int insertSelective(SysQuartz record);

	public SysQuartz selectByPrimaryKey(String id);

	public int updateByPrimaryKeySelective(SysQuartz record);

	public int updateByPrimaryKey(SysQuartz record);

	@Select("select * from sys_quartz where quartz_ip = #{quartzIp} and quartz_port = #{quartzPort}")
	public List<SysQuartz> selectAll(Map<String, Object> map);
	
	public int deleteByName(String name);
	
}