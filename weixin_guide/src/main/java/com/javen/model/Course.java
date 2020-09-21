package com.javen.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;

/**
 * @author Javen
 * 2016年3月20日
 * 课程
 */
@SuppressWarnings("serial")
public class Course extends Model<Course> {
	public static final Course dao=new Course();
	
	public Course getCourseById(String id){
		return dao.findFirstByCache("tenMinute", "getCouresById"+id, "select * from course where id=?", id);
	}
	
	public List<Course> getCourseByType(String courseType){
		return dao.findByCache("tenMinute", "getCourseByType"+courseType, "select * from course where courseType=?", courseType);
	}
	
	public List<Course> getCourseByTop(int count){
		String sql="select id,courseName,courseLogo,introduce  from course order by createTime desc limit ?";
		
		return dao.findByCache("tenMinute", "getCouresByTop"+count, sql, count);
	}
	
	public List<Course> getAll(){
		return dao.findByCache("tenMinute", "getAll", "select * from course");
	}
	
	
}
