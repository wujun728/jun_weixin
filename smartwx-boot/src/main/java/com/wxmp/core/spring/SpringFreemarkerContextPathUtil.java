/*
 * FileName：SpringFreemarkerContextPathUtil.java 
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
package com.wxmp.core.spring;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

/**
 * request.getContextPath()
 * 使用nginx做反向代理的时候(比如 设置访问链接、图片链接的时候)，不需要contextPath的；
 * 
 * 因为此项目使用freemaker，对应的文件是spring.ftl文件；
 * 所以以此来判断是否用户自己设置了 contextPath：
 * 	如果设置了，返回null；业务直接使用 request.getContextPath()
 * 	如果设置为空，返回 ""; 业务直接使用""
 */
public class SpringFreemarkerContextPathUtil {
	
	private static String path = null;//静态变量，第一次调用初始化；
	
	public static String getBasePath(HttpServletRequest request){
		if(path != null)
			return path;
		
		path = request.getContextPath();
		String realPath = request.getSession().getServletContext().getRealPath("/");
		String ftlPath = realPath + "/WEB-INF/ftl/spring.ftl";
		
		try {
			BufferedReader reader = new BufferedReader(new FileReader(new File(ftlPath)));
			StringBuffer sb = new StringBuffer("");
			String tmpString = "";
			while ((tmpString = reader.readLine()) != null) {
				sb.append(tmpString);
			}
			reader.close();
			
			//如果包含了，那么返回系统的contextPath
			if(sb.toString().replace(" ", "").contains("<#assignbase=springMacroRequestContext.getContextUrl(\"\")>")){
				path = request.getContextPath();
			}else{
				path = "";//不包含，返回""
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return path;
	}
	
	
	public static String getImgBasePath(HttpServletRequest request, String fileName){
		String realPath = request.getSession().getServletContext().getRealPath("/");
		String ftlPath = realPath + "res\\upload\\"+fileName;
		return ftlPath;
	}
}
