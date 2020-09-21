package com.app.service.aop;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.app.common.util.ToolUtil;
import com.app.redis.JedisClientService;

@Aspect
@Component
public class AOPOutputObjectput {
	
	private static final Logger logger = LoggerFactory.getLogger(AOPOutputObjectput.class);
	
	@Autowired
	public JedisClientService jedisClient;

	/**
	 * 在进入service前为inputObject与outputObject复值
	 * @param joinPoint
	 * @throws Exception 
	 */
	@Before("execution(* com.app.producer.*.*(..))")  
	public void Before(JoinPoint joinPoint) throws Exception {
	}
	
	/**
	 * 环绕通知
	 * @param pjp
	 * @throws Exception
	 */
	@Around("execution(* com.app.producer.*.*(..))")
	public void doAround(ProceedingJoinPoint pjp) throws Exception {
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();
		ServletRequestAttributes sra = (ServletRequestAttributes) ra;
		HttpServletRequest request = sra.getRequest();
		HttpServletResponse response = sra.getResponse();
		try {
			logger.info("环绕通知开始");
			//分别送请求和cookies中获取usertoken
			String userToken = request.getParameter("userToken");
			
			//usertoken最终判断
			if(ToolUtil.isBlank(userToken)) {
				response.setHeader("SESSIONSTATUS", "TIMEOUT");
	            ToolUtil.sendMessageToPageComJson(response, "您还未登录，请先登录。", "401");
			}else{
				if(!jedisClient.exists("userMation:" + userToken)){
					response.setHeader("SESSIONSTATUS", "TIMEOUT");
					ToolUtil.sendMessageToPageComJson(response, "您还未登录，请先登录。", "401");
				}else{
					pjp.proceed();
				}
			}
			
		} catch (Throwable e) {
			StackTraceElement stackTraceElement= e.getStackTrace()[0];// 得到异常棧的首个元素
			ToolUtil.sendMessageToPageComJson(response, "异常：" + stackTraceElement.getClass().getName(), "-9999");
			e.printStackTrace();
		}
	}
	
	/**
	 * 在调用service后为将outputObject里的值输出至前端
	 * @param joinPoint
	 */
	@AfterReturning("execution(* com.app.producer.*.*(..))")  
	public void after(JoinPoint joinPoint) throws Exception {
	}
	
	/**
	 * 通过throwing属性指定连接点方法出现异常信息存储在ex变量中，在异常通知方法中就可以从ex变量中获取异常信息了
	 * @param joinPoint
	 * @param e
	 */
	@AfterThrowing(value="execution(* com.app.producer.*.*(..))", throwing="e")
	public void afterThrowing(JoinPoint joinPoint, Exception e) {
	}
}
