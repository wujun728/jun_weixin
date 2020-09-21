package com.app.zuul.filter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.common.util.ToolUtil;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;

public class AccessFilter extends ZuulFilter {

	private final Logger _logger = LoggerFactory.getLogger(this.getClass());

	@Override
	public String filterType() {
		return "pre";
	}

	@Override
	public int filterOrder() {
		return 0;
	}

	@Override
	public boolean shouldFilter() {
		return true;
	}

	@Override
	public Object run() {
		RequestContext ctx = RequestContext.getCurrentContext();
		HttpServletRequest request = ctx.getRequest();
		HttpServletResponse response = ctx.getResponse();
		
		_logger.info("send {} to {}", request.getMethod(), request.getRequestURL().toString());
		
//		目前作废
//		//获取usertoken
//		String userToken = request.getParameter("userToken");
//		if(ToolUtil.isBlank(userToken)) {
//			Cookie[] cookies = request.getCookies();
//	        if(null != cookies){
//	            for (Cookie cookie : cookies) {
//	                if ("userToken".equals(cookie.getName())) {
//	                	userToken = cookie.getValue();
//	                }
//	            }
//	        }
//		}
//		
//		//将要新增的参数添加进去,被调用的微服务可以直接 去取,就想普通的一样,框架会直接注入进去
//		List<String> paramsList = new ArrayList<>();
//		paramsList.add(userToken);
//		//获取上下文请求数据
//		Map<String, List<String>> requestQueryParams = ctx.getRequestQueryParams();
//		if (requestQueryParams == null) {
//            requestQueryParams = new HashMap<>();
//        }
//		requestQueryParams.put("userToken", paramsList);
//		ctx.setRequestQueryParams(requestQueryParams);
		ctx.setSendZuulResponse(true);
        ctx.setResponseStatusCode(200);
		
		return null;
	}
	
}
