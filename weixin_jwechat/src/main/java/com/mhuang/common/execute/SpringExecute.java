package com.mhuang.common.execute;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import com.mhuang.spring.SpringContextUtil;

/**
 * spring反射
 * @author mHuang
 *
 */
public class SpringExecute extends InvokeExecute{

	/**
	 * 
	 * @param beanName spring調用的beanString
	 * @param methodName 调用的class类的方法
	 * @return 
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 * @throws InstantiationException
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getMethodToValue(String beanName,
			String methodName) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, InstantiationException{
		Object bean =  SpringContextUtil.getBean(beanName);
		Method method = bean.getClass().getMethod(methodName);
		return (T) method.invoke(bean);
	}
	
	/**
	 * 
	 * @param beanName 调用spring 的beanString
	 * @param methodName 调用的class类的方法
	 * @param param 传递的参数
	 * @return 
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 * @throws InstantiationException
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getMethodToValue(String beanName,
			String methodName,Object param) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, InstantiationException{
		Object bean =  SpringContextUtil.getBean(beanName);
		Method method = bean.getClass().getMethod(methodName,checkType(param));
		return (T) method.invoke(bean,param);
	}
	/**
	 * 
	 * @param beanName 调用的Spring的beanString
	 * @param methodName 调用的方法 
	 * @param params 调用的参数。
	 * @return 返回类型
	 * @throws NoSuchMethodException
	 * @throws SecurityException
	 * @throws IllegalAccessException
	 * @throws IllegalArgumentException
	 * @throws InvocationTargetException
	 * @throws InstantiationException
	 */
	@SuppressWarnings("unchecked")
	public static <T> T getMethodToValue(String beanName,
		String methodName,
		Object... params) 
		throws NoSuchMethodException, SecurityException, 
			IllegalAccessException, IllegalArgumentException, 
			InvocationTargetException, InstantiationException{
		Object bean =  SpringContextUtil.getBean(beanName);
		Class<?>[] clazzes = new Class[params.length];
		int index = 0;
		for(Object obj : params){
			clazzes[index++] = checkType(obj);
		}
		Method method = bean.getClass().getMethod(methodName, clazzes);
		return (T) method.invoke(bean,params);
	}
}
