package com.app.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * 全局异常控制类
 * @author 卫志强
 *
 */
@ControllerAdvice
public class GlobalExceptionHandler {
	
	/**
     * 异常处理
     */
    @ExceptionHandler(value = Exception.class)
    public void errorHandler(HttpServletRequest request, Exception exception) {
        
    }
	
}
