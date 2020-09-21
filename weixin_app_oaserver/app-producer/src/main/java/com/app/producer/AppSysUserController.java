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

import com.alibaba.fastjson.JSON;
import com.app.common.constans.Constants;
import com.app.common.util.ToolUtil;
import com.app.dao.AppSysUserDao;
import com.app.redis.JedisClientService;

/**
 * 
 * @author 
 *
 */
@RestController
public class AppSysUserController {
	
	@Autowired
	private JedisClientService jedisClient;
	@Autowired
	private AppSysUserDao appSysUserDao;

	/**
	 * 
	     * @Title: login
	     * @Description: 手机端用户登录
	     * @param @throws Exception    参数
	     * @return void    返回类型
	     * @throws
	 */
	@RequestMapping("/post/AppSysUserController/queryUserMationToLogin")
	@ResponseBody
	public void login(HttpServletResponse response, @RequestParam String name, @RequestParam String password) throws Exception{
		Map<String, Object> map = new HashMap<>();
		map.put("userCode", name);
		Map<String, Object> userMation = appSysUserDao.queryMationByUserCode(map);
		if(userMation == null){
			ToolUtil.sendMessageToPageComJson(response, "请确保用户名输入无误！", "-9999");
		}else{
			int pwdNum = Integer.parseInt(userMation.get("pwdNum").toString());
			for(int i = 0; i < pwdNum; i++){
				password = ToolUtil.MD5(password);
			}
			if(password.equals(userMation.get("password").toString())){
				if(Constants.SYS_USER_LOCK_STATE_ISLOCK.equals(userMation.get("userLock").toString())){
					ToolUtil.sendMessageToPageComJson(response, "您的账号已被锁定，请联系管理员解除！", "-9999");
				}else{
					List<Map<String, Object>> allMenuMation = appSysUserDao.queryAppMenuByUserId(userMation);//获取用户所拥有的APP菜单
					allMenuMation = ToolUtil.allMenuToTree(allMenuMation);
					List<Map<String, Object>> authPointsMation = appSysUserDao.queryAppAuthPointsByUserId(userMation);//获取用户所拥有的APP权限点
					jedisClient.set("userMation:" + userMation.get("id").toString() + "-APP", JSON.toJSONString(userMation));
					jedisClient.set("allMenuMation:" + userMation.get("id").toString() + "-APP", JSON.toJSONString(allMenuMation));
					jedisClient.set("authPointsMation:" + userMation.get("id").toString() + "-APP", JSON.toJSONString(authPointsMation));
					ToolUtil.sendMessageToPageComJson(response, userMation);
				}
			}else{
				ToolUtil.sendMessageToPageComJson(response, "密码输入错误！", "-9999");
			}
		}
	}
	
}