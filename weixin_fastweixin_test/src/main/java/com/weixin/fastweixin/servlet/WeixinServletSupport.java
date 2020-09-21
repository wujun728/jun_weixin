package com.weixin.fastweixin.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * 
 * @author 	Lian
 * @date	2016年4月12日
 * @since	1.0	
 */
public abstract class WeixinServletSupport extends HttpServlet {

	private static final long serialVersionUID = 1L;
	@SuppressWarnings("unused")
	private static final Logger LOG = LoggerFactory.getLogger(WeixinServletSupport.class);
	private final WeixinSupport support = getWeixinSupport();

	/**
	 * 强制要求servlet框架开发者自行实现weixinSupport类
	 *
	 * @return 用户自行实现的weixinSupport对象
	 */
	protected abstract WeixinSupport getWeixinSupport();

	/**
	 * 重写servlet中的get方法，用于处理微信服务器绑定，置为final方法，用户已经无需重写这个方法啦
	 *
	 * @param request  http请求对象
	 * @param response http响应对象
	 * @throws ServletException servlet异常
	 * @throws IOException      IO异常
	 */
	@Override
	protected final void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		support.bindServer(request, response);
	}

	/**
	 * 重写servlet中的post方法，用于接收微信服务器发来的消息，置为final方法，用户已经无需重写这个方法啦
	 *
	 * @param request  http请求对象
	 * @param response http响应对象
	 * @throws ServletException servlet异常
	 * @throws IOException      IO异常
	 */
	@Override
	protected final void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (support.isLegal(request)) {
			return;
		}
		// 设置响应编码格式
		response.setCharacterEncoding("UTF_8");
		String resp = support.processRequest(request);
		PrintWriter pw = response.getWriter();
		pw.write(resp);
		pw.flush();
		pw.close();
	}
}
