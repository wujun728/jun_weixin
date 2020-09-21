package com.app.producer;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.app.common.util.ToolUtil;
import com.app.dao.WxSmallProUserMationDao;
import com.app.redis.JedisClientService;
import com.app.wechat.util.Constants;
import com.app.wechat.util.WxchatUtil;

import net.sf.json.JSONObject;

/**
 * 
 * @author 卫志强
 *
 */
@RestController
public class WxSmallProUserMationController {
	
	@Autowired
	private WxSmallProUserMationDao wxSmallProUserMationDao;
	
	@Autowired
	private JedisClientService jedisClientService;

	/**
	 * 
	     * @Title: queryUserMationByOpenId
	     * @Description: 根据openId获取用户信息
	     * @return String 返回类型
	     * 
	 */
	@SuppressWarnings("unchecked")
	@GetMapping("/getUserMationByOpenId")
	public void queryUserMationByOpenId(HttpServletResponse response, @RequestParam String openId) {
		Map<String, Object> map = new HashMap<>();
		//判断该微信用户在redis中是否存在数据
		String key = WxchatUtil.getWechatUserOpenIdMation(openId);
		if(ToolUtil.isBlank(jedisClientService.get(key))){
			//该用户没有绑定账号
			//判断该用户的openId是否存在于数据库
			Map<String, Object> bean = wxSmallProUserMationDao.queryUserMationByOpenId(openId);
			if(bean != null && !bean.isEmpty()){
				//存在数据库
				map.putAll(bean);
				jedisClientService.set(key, JSON.toJSONString(bean));
			}else{
				//不存在
				map.put("id", ToolUtil.getSurFaceId());
				map.put("joinTime", ToolUtil.getTimeAndToString());
				map.put("openId", openId);
				map.put("userId", "");
				wxSmallProUserMationDao.insertWxUserMation(map);
				jedisClientService.set(key, JSON.toJSONString(map));
			}
		}else{
			map = JSONObject.fromObject(jedisClientService.get(key));
		}
		ToolUtil.sendMessageToPageComJson(response, map);
	}
	
	/**
	 * 
	     * @Title: bindUserMation
	     * @Description: openId绑定用户信息
	     * @return String 返回类型
	     * 
	 */
	@PostMapping("/bindUserMation")
	public void bindUserMation(HttpServletResponse response, 
			@RequestParam String openId, 
			@RequestParam String userCode, 
			@RequestParam String password) {
		//根据账号获取用户信息
		Map<String, Object> userMation = wxSmallProUserMationDao.queryUserMationByUserCode(userCode);
		//判断该账号是否存在
		if(userMation != null && !userMation.isEmpty()){
			int pwdNum = Integer.parseInt(userMation.get("pwdNum").toString());
			for(int i = 0; i < pwdNum; i++){
				password = ToolUtil.MD5(password);
			}
			//判断密码是否正确
			if(password.equals(userMation.get("password").toString())){
				//判断账号是否锁定
				if(Constants.SYS_USER_LOCK_STATE_ISLOCK.equals(userMation.get("userLock").toString())){
					ToolUtil.sendMessageToPageComJson(response, "您的账号已被锁定，请联系管理员解除.", "-9999");
				}else{
					Map<String, Object> wxUserMation = wxSmallProUserMationDao.queryUserMationByOpenId(openId);
					//判断该用户的openId是否存在于数据库
					if(wxUserMation != null && wxUserMation.isEmpty()){
						//判断当前openId是否已经绑定账号
						if(wxUserMation.containsKey("userId") && !ToolUtil.isBlank(wxUserMation.get("userId").toString())){
							ToolUtil.sendMessageToPageComJson(response, "该微信用户已绑定账号.", "-9999");
						}else{
							//判断该账号是否被别人绑定
							Map<String, Object> isBindInWx = wxSmallProUserMationDao.queryUserBindMationByUserId(userMation.get("id").toString());
							if(isBindInWx != null && !isBindInWx.isEmpty()){
								ToolUtil.sendMessageToPageComJson(response, "该账号已被绑定.", "-9999");
							}else{
								//构建绑定信息对象
								Map<String, Object> map = new HashMap<>();
								map.put("userId", userMation.get("id"));
								map.put("bindTime", ToolUtil.getTimeAndToString());
								map.put("openId", openId);
								wxSmallProUserMationDao.updateBindUserMation(map);
								//重新获取绑定信息，存入redis，返回前端
								map = wxSmallProUserMationDao.queryUserMationByOpenId(openId);
								String key = WxchatUtil.getWechatUserOpenIdMation(openId);
								jedisClientService.set(key, JSON.toJSONString(map));
								ToolUtil.sendMessageToPageComJson(response, map);
							}
						}
					}else{
						ToolUtil.sendMessageToPageComJson(response, "该微信用户不存在.", "-9999");
					}
				}
			}else{
				ToolUtil.sendMessageToPageComJson(response, "密码输入错误.", "-9999");
			}
		}else{
			ToolUtil.sendMessageToPageComJson(response, "该账号不存在，请核实后进行登录.", "-9999");
		}
	}
	
}