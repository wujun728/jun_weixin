package com.app.producer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.util.ToolUtil;
import com.app.dao.AppCompanyChatDao;

/**
 * 
 * @author 
 *
 */
@RestController
public class AppCompanyChatController {
	
	@Autowired
	private AppCompanyChatDao appcompanyChatDao;

	/**
	 * 
	     * @Title: querycompanyDepartment
	     * @Description: 获取通讯录数据
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppCompanyChatController/querycompanyDepartment")
	@ResponseBody
	public void querycompanyDepartment(HttpServletResponse response, @RequestParam String userToken) throws Exception{
		Map<String, Object> map = new HashMap<String, Object>();
        if(userToken.contains("-")){
        	userToken = userToken.substring(0, userToken.indexOf("-"));
        }
		map.put("userId", userToken);
		//获取公司单位
		List<Map<String, Object>> companyDepartment = appcompanyChatDao.queryCompanyDepartmentByUserId(map);
		
		//循环获取分组的人列表
		for(Map<String, Object> depart : companyDepartment){
			List<Map<String, Object>> userList = null;
			userList = appcompanyChatDao.queryDepartmentUserByDepartId(depart);
			depart.put("list", userList);
		}
		ToolUtil.sendMessageToPageComJson(response, companyDepartment);
	}
	
}