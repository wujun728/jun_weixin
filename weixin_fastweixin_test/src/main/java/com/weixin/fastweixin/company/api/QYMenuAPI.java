package com.weixin.fastweixin.company.api;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPath;
import com.weixin.fastweixin.api.response.BaseResponse;
import com.weixin.fastweixin.company.api.config.QYAPIConfig;
import com.weixin.fastweixin.company.api.entity.QYMenu;
import com.weixin.fastweixin.company.api.enums.QYResultType;
import com.weixin.fastweixin.company.api.response.GetQYMenuResponse;
import com.weixin.fastweixin.util.BeanUtil;
import com.weixin.fastweixin.util.CollectionUtil;
import com.weixin.fastweixin.util.JSONUtil;

/**
 * 自定义菜单管理
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYMenuAPI extends QYBaseAPI {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(QYMenuAPI.class);

	/**
	 * 构造方法，设置apiConfig
	 *
	 * @param config 微信API配置对象
	 */
	public QYMenuAPI(QYAPIConfig config) {
		super(config);
	}

	/**
	 * 创建自定义菜单。
	 * @param menu 自定义菜单
	 * @param agentId 需要生成菜单的应用ID
	 * @return 操作结果
	 */
	public QYResultType create(QYMenu menu, String agentId) {
		BeanUtil.requireNonNull(menu, "菜单不能为空！");
		String url = BASE_API_URL + "cgi-bin/menu/create?access_token=#&agentid=" + agentId;
		BaseResponse response = executePost(url, JSONUtil.toJson(menu));
		return QYResultType.get(response.getErrcode());
	}

	/**
	 * 获取菜单列表。
	 * @param agentId 目标应用的ID
	 * @return QYMenu。与创建菜单时的对象一致。
	 */
	public GetQYMenuResponse list(String agentId) {
		BeanUtil.requireNonNull(agentId, "应用ID不能为空");
		GetQYMenuResponse response;
		String url = BASE_API_URL + "cgi-bin/menu/get?access_token=#&agentid=" + agentId;
		BaseResponse r = executeGet(url);
		if (isSuccess(r.getErrcode())) {
			JSONObject jsonObject = JSONUtil.getJSONFromString(r.getErrmsg());
			// 通过jsonpath不断修改type的值，才能正常解析- -
			List buttonList = (List) JSONPath.eval(jsonObject, "$.menu.button");
			if (CollectionUtil.isNotEmpty(buttonList)) {
				for (Object button : buttonList) {
					List subList = (List) JSONPath.eval(button, "$.sub_button");
					if (CollectionUtil.isNotEmpty(subList)) {
						for (Object sub : subList) {
							Object type = JSONPath.eval(sub, "$.type");
							JSONPath.set(sub, "$.type", type.toString().toUpperCase());
						}
					} else {
						Object type = JSONPath.eval(button, "$.type");
						JSONPath.set(button, "$.type", type.toString().toUpperCase());
					}
				}
			}
			response = JSONUtil.toBean(jsonObject.toJSONString(), GetQYMenuResponse.class);
		} else {
			response = JSONUtil.toBean(r.toJsonString(), GetQYMenuResponse.class);
		}
		return response;
	}

	/**
	 * 删除自定义菜单
	 * @param agentId 目标应用ID
	 * @return 操作结果
	 */
	public QYResultType delete(String agentId) {
		BeanUtil.requireNonNull(agentId, "AgentId不能为空");
		String url = BASE_API_URL + "cgi-bin/menu/delete?access_token=#&agentid=" + agentId;
		BaseResponse response = executeGet(url);
		return QYResultType.get(response.getErrcode());
	}
}
