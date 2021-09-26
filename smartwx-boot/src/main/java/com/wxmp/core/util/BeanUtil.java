/*
 * FileName：BeanUtil.java 
 * <p>
 * Copyright (c) 2017-2020, <a href="http://www.webcsn.com">hermit (794890569@qq.com)</a>.
 * <p>
 * Licensed under the GNU General Public License, Version 3 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.gnu.org/licenses/gpl-3.0.html
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */
package com.wxmp.core.util;

import org.apache.commons.beanutils.PropertyUtils;

import javax.persistence.Id;
import javax.persistence.Transient;
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 
 * Bean 转换工具
 */

public class BeanUtil {
	
	/**
	 * 获取所有的属性和值，包括父类的 
	 * @param bean
	 * @return
	 */
	public static Map<String, Object> getAllFields(Object bean) {
		return getAllFields(bean,bean.getClass());
	}
	
	/**
	 * 获取所有的属性和值，包括父类的 
	 * @param bean
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map<String, Object> getAllFields(Object bean,Class clazz) {
		if (clazz == null) {
			return null;
		}
		try{
			Map<String, Object> map = new LinkedHashMap<String, Object>();
			Field[] fields = clazz.getDeclaredFields();
			if (fields != null) {
				for (Field field : fields) {
					 //排除肯定不持久化的部分
	                if (Modifier.isTransient(field.getModifiers())) continue;
	                if (Modifier.isStatic(field.getModifiers())) continue;
	                if (field.getAnnotation(Transient.class) != null) continue;
	                if (field.getAnnotation(Id.class) != null) continue;
	                
	                map.put(field.getName(), PropertyUtils.getProperty(bean, field.getName()));
				}
			}
			Class superClass = clazz.getSuperclass();//递归获取父类的Field
			Map<String, Object> superMap = getAllFields(bean,superClass);
			if (superMap != null) {
				map.putAll(superMap);
			}
			if (map.size() == 0) {
				return null;
			}
			return map;
		}catch(Exception e){
			e.printStackTrace();
			return null;
		}
	}
	
	//获取属性的值
	public static Object getProperty(Object bean, String fieldName)throws Exception{
		Class<?>  fieldType = PropertyUtils.getPropertyType(bean, fieldName.trim());
		if(fieldType != null){
			return PropertyUtils.getProperty(bean, fieldName.trim());
		}
		return null;
	}
	
	/**
	 * 设置property的值
	 * @param bean
	 * @param fieldName
	 * @param value
	 * @throws Exception
	 */
	public static void setProperty(Object bean, String fieldName, Object value) throws Exception{
		Class<?>  fieldType = PropertyUtils.getPropertyType(bean, fieldName);
		
		if(value == null || "".equals(value)){
			PropertyUtils.setProperty(bean, fieldName, null);
		}else{
			Object tmpValue = null;
			if(fieldType == String.class){
				tmpValue = value.toString();
			}else if(fieldType == Double.class){
				tmpValue = new Double(value.toString());
			}else if(fieldType == Double.TYPE){
				tmpValue = Double.valueOf(new Double(value.toString()).doubleValue());
			}else if(fieldType == Float.class){
				tmpValue = new Float(value.toString());
			}else if(fieldType == Float.TYPE){
				tmpValue = Float.valueOf(new Float(value.toString()).floatValue());
			}else if(fieldType == Integer.class){
				tmpValue = new Integer(value.toString());
			}else if(fieldType == Integer.TYPE){
				tmpValue = Integer.valueOf(new Integer(value.toString()).intValue());
			}else if(fieldType == Long.class){
				tmpValue = Long.valueOf(value.toString());
			}else if(fieldType == Long.TYPE){
				tmpValue = Long.valueOf(Long.valueOf(value.toString()).longValue());
			}else if(fieldType == Boolean.class){
				tmpValue = Boolean.valueOf(value.toString());
			}else if(fieldType == Boolean.TYPE){
				tmpValue = Boolean.valueOf(Boolean.valueOf(value.toString()).booleanValue());
			}else if (fieldType == java.util.Date.class) {
				tmpValue = DateUtil.changeStrToDate2((String) value);
			}else{
				tmpValue = null;
			}
			
			PropertyUtils.setProperty(bean, fieldName, tmpValue);
		}
	}
	
	/**
	 * 获取属性类型
	 * @param bean
	 * @param property
	 * @return
	 * @throws Exception
	 */
	public static Class<?> getPropertyType(Object bean,String property)throws Exception{
		try {
			Field field = bean.getClass().getDeclaredField(property);
			if(field != null)
				return PropertyUtils.getPropertyType(bean, property);
		} catch (SecurityException e) {
			e.printStackTrace();
		} catch (NoSuchFieldException e) {
			return null;
		}
		return null;
	}
	
}
