package com.mhuang.common.execute;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.LinkedHashSet;

/**
 * JDK反射封裝
 * @author mHuang
 */
public class JDKExecute extends InvokeExecute{
	
	/**
	 * 
	 * @param clazz 调用的class类
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
	public static <T> T getMethodToValue(Class<?> clazz,
			String methodName) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, InstantiationException{
		Method method = clazz.getMethod(methodName);
		return (T) method.invoke(clazz.newInstance());
	}
	
	/**
	 * 
	 * @param clazz 调用的class类
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
	public static <T> T getMethodToValue(Class<?> clazz,
			String methodName,Object param) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException, InstantiationException{
		Method method = clazz.getMethod(methodName, checkType(param));
		return (T) method.invoke(clazz.newInstance(),param);
	}
	/**
	 * 
	 * @param clazz 调用的class类
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
	public static <T> T getMethodToValue(Class<?> clazz,
		String methodName,
		Object... params) 
		throws NoSuchMethodException, SecurityException, 
			IllegalAccessException, IllegalArgumentException, 
			InvocationTargetException, InstantiationException{
		Class<?>[] clazzes = new Class[params.length];
		int index = 0;
		for(Object obj : params){
			clazzes[index++] = checkType(obj);
		}
		Method method = clazz.getMethod(methodName, clazzes);
		return (T) method.invoke(clazz.newInstance(),params);
	} 
	
	
	
}
