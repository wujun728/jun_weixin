package com.mhuang.common.execute;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * 反射调用抽象
 * @author mHuang
 *
 */
public abstract class InvokeExecute {

	@Deprecated
	private final static Class<?>[] TYPECLASSES = new Class<?>[]{
		Map.class,List.class, //集合
		int.class,int[].class, //数字数据
		Integer.class,Integer[].class,
		long.class,long[].class,
		Long.class,Long[].class,
		short.class,short[].class,
		Short.class,Short[].class,
		float.class,float[].class,
		Float.class,Float[].class,
		Double.class,Double[].class,
		char.class,char[].class,//字符类型
		Character.class,Character[].class,
		byte.class,byte[].class,//字节类型
		Byte.class,Byte[].class,//
		boolean.class,boolean[].class,//布尔类型
		Boolean.class,Boolean[].class,
		String.class //字符串类型
	};
	
	private final static Map<Class<?>, Class<?>> CONST_TYPES = new LinkedHashMap<Class<?>, Class<?>>(){
		private static final long serialVersionUID = 1L;
	{
		put(HashMap.class, Map.class);
		put(LinkedHashMap.class,Map.class);
		put(TreeMap.class,Map.class);
		put(Hashtable.class,Map.class);
		put(ArrayList.class,List.class);
		put(LinkedList.class,List.class);
	}};
	
	static Class<?> checkType(Object obj){
		if(CONST_TYPES.containsKey(obj.getClass())){
			return CONST_TYPES.get(obj.getClass());
		}else{
			return obj.getClass();
		}
	}
}
