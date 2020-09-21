package com.weixin.fastweixin.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.weixin.fastweixin.message.aes.AesException;
import com.weixin.fastweixin.message.aes.WXBizMsgCrypt;
import com.weixin.fastweixin.util.StrUtil;

/**
 * 微信企业平台交互操作基类
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
@Controller
public abstract class QYWeixinControllerSupport extends QYWeixinSupport {

	/**
	 * 绑定微信服务器
	 *
	 * @param request
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	protected final String bind(HttpServletRequest request) {
		return legalStr(request);
	}

	/**
	 * 微信消息交互处理
	 *
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	protected final String process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// if(StrUtil.isBlank(legalStr(request))){
		// return "";
		// }
		String result = processRequest(request);
		response.getWriter().write(result);
		return null;
	}

	/**
	 * 验证请求URL是否正确的方法
	 *
	 * @param request
	 * @return
	 */
	protected String legalStr(HttpServletRequest request) {
		String echoStr = "";
		if (StrUtil.isBlank(getToken()) || StrUtil.isBlank(getAESKey()) || StrUtil.isBlank(getCropId())) {
			return echoStr;
		}
		try {
			WXBizMsgCrypt pc = new WXBizMsgCrypt(getToken(), getAESKey(), getCropId());
			echoStr = pc.verifyUrl(request.getParameter("msg_signature"), request.getParameter("timestamp"), request.getParameter("nonce"),
					request.getParameter("echostr"));
		} catch (AesException e) {
			e.printStackTrace();
		}
		return echoStr;
	}
}
