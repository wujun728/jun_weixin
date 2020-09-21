package com.weixin.fastweixin.company.api;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.weixin.fastweixin.api.response.BaseResponse;
import com.weixin.fastweixin.company.api.config.QYAPIConfig;
import com.weixin.fastweixin.company.api.entity.QYAgent;
import com.weixin.fastweixin.company.api.enums.QYResultType;
import com.weixin.fastweixin.company.api.response.GetQYAgentInfoResponse;
import com.weixin.fastweixin.company.api.response.GetQYAgentListResponse;
import com.weixin.fastweixin.util.BeanUtil;
import com.weixin.fastweixin.util.JSONUtil;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public class QYAgentAPI extends QYBaseAPI {

	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(QYAgentAPI.class);

	/**
	 * 构造方法，设置apiConfig
	 *
	 * @param config 微信API配置对象
	 */
	public QYAgentAPI(QYAPIConfig config) {
		super(config);
	}

	/**
	 * 获取全部应用列表
	 * @return 应用列表
	 */
	public GetQYAgentListResponse getAll() {
		GetQYAgentListResponse response;
		String url = BASE_API_URL + "cgi-bin/agent/list?access_token=#";
		BaseResponse r = executeGet(url);
		String jsonResult = isSuccess(r.getErrcode()) ? r.getErrmsg() : r.toJsonString();
		response = JSONUtil.toBean(jsonResult, GetQYAgentListResponse.class);
		return response;
	}

	/**
	 * 获取应用信息
	 * @param agentId 应用ID
	 * @return 应用信息
	 */
	public GetQYAgentInfoResponse getInfo(String agentId) {
		BeanUtil.requireNonNull(agentId, "agentId is null");
		GetQYAgentInfoResponse response;
		String url = BASE_API_URL + "cgi-bin/agent/get?access_token=#&agentid=" + agentId;
		BaseResponse r = executeGet(url);
		String jsonResult = isSuccess(r.getErrcode()) ? r.getErrmsg() : r.toJsonString();
		response = JSONUtil.toBean(jsonResult, GetQYAgentInfoResponse.class);
		return response;
	}

	/**
	 * 设置应用信息
	 * -----------------------------------------------
	 * 设置应用信息方法使用新的update方法代替。
	 * -----------------------------------------------
	 * @param agent 应用对象
	 * @param mediaId 应用的logo
	 * @return 创建结果
	 */
	@Deprecated
	public QYResultType create(QYAgent agent, String mediaId) {
		String url = BASE_API_URL + "cgi-bin/agent/set?access_token=#";
		final Map<String, Object> params = new HashMap<String, Object>();
		params.put("agentid", agent.getAgentId());
		params.put("report_location_flag", String.valueOf(agent.getReportLocationFlag()));
		params.put("logo_mediaid", mediaId);
		params.put("name", agent.getName());
		params.put("description", agent.getDescription());
		params.put("redirect_domain", agent.getRedirectDomain());
		params.put("isreportuser", agent.getIsReportUser());
		params.put("isreportenter", agent.getIsReportEnter());
		BaseResponse response = executePost(url, JSONUtil.toJson(params));
		return QYResultType.get(response.getErrcode());
	}

	/**
	 * 新的设置应用信息
	 * @param params
	 * @return
	 */
	public QYResultType update(Map<String, Object> params) {
		String url = BASE_API_URL + "cgi-bin/agent/set?access_token=#";
		BaseResponse response = executePost(url, JSONUtil.toJson(params));
		return QYResultType.get(response.getErrcode());
	}
}
