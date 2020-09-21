package com.app.exception;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.app.common.util.ToolUtil;

@RestControllerAdvice
public class ConsumerExceptionHandler {

	@ExceptionHandler(value = RuntimeException.class) // 指定拦截的异常
	public String errorHandler(HttpServletRequest request, HttpServletResponse response, Exception e) throws Exception {
		if (e instanceof RuntimeException){
			RuntimeException runtimeException = (RuntimeException) e;
			return ToolUtil.getMessageToPageCom(runtimeException.getCause().getMessage(), "-9999");
		}else{
			return ToolUtil.getMessageToPageCom(e.getMessage(), "-9999");
		}
	}

}
