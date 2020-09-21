package com.app.producer;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.util.ToolUtil;
import com.app.dao.JobDiaryDao;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import com.github.miemiedev.mybatis.paginator.domain.PageList;

@RestController
public class JobDiaryController {
	
	@Autowired
	private JobDiaryDao jobDiaryDao;

	/**
	 * 
	     * @Title: queryJobDiaryDayReceived
	     * @Description: 遍历我收到的日志
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@GetMapping("JobDiary")
	public void queryJobDiaryDayReceived(HttpServletResponse response, 
			@RequestParam String userToken, 
			@RequestParam int limit, 
			@RequestParam int page,
			@RequestParam int diaryType) {
		List<Map<String, Object>> beans = jobDiaryDao.queryJobDiaryDayReceived(userToken, diaryType, new PageBounds(page, limit));
		PageList<Map<String, Object>> beansPageList = (PageList<Map<String, Object>>)beans;
		ToolUtil.sendMessageToPageComJson(response, beans, beansPageList.getPaginator().getTotalCount());
	}

}
