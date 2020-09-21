package com.infrastructure.project.common.extension;

import java.util.ArrayList;
import java.util.List;

/**
 * Array 工具类
 * @author misswhen
 *
 */
public class ArrayHelper {
	
	/**
	 * 去除IntegerArray中的某一项
	 * @param array
	 * @param item
	 * @return
	 */
	public final static Integer[] removeArrayItem(Integer[] array, Integer item){
		List<Integer> list=new ArrayList<Integer>();
		for(Integer arrayItem : array){
			if(!arrayItem.equals(item))
				list.add(arrayItem);
		}
		
		Integer[] ret=new Integer[list.size()];
		list.toArray(ret);
		return ret;
	}
	
	/**
	 * 把IntegerArray转化为String，中间以split分割
	 * @param array
	 * @param split
	 * @return
	 */
	public final static String toString(Integer[] array, String split){
		StringBuilder sb=new StringBuilder();
		for(Integer item : array){
			sb.append(item.toString());
			sb.append(split);
		}
		String ret=sb.toString();
		if(ret.endsWith(split))
			ret = ret.substring(0, ret.length()-split.length());
		return ret;
	}
	
}
