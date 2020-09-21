package com.app.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

public interface JobDiaryDao {

	public List<Map<String, Object>> queryJobDiaryDayReceived(@Param("receivedId") String userToken, @Param("diaryType") int diaryType, PageBounds pageBounds);

}
