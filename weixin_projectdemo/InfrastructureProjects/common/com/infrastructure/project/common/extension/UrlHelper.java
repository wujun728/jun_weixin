package com.infrastructure.project.common.extension;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;
import org.apache.taglibs.standard.tag.common.core.UrlSupport;

public class UrlHelper {
	
	public static String resolveUrl(String url, PageContext pageContext) throws JspException{		
		return UrlSupport.resolveUrl(url, null, pageContext);	
	}
	
	public static String resolveWithReturnUrl(String url, Object returnUrl, PageContext pageContext) throws JspException, UnsupportedEncodingException{	
		StringBuilder urlBuilder = new StringBuilder(UrlSupport.resolveUrl(url, null, pageContext));
		
		if(returnUrl!=null && !returnUrl.toString().isEmpty())
			urlBuilder.append("?returnUrl=").append(URLEncoder.encode(returnUrl.toString(), "UTF-8"));

		return urlBuilder.toString();		
	}
	
	public static String resolveWithReturnUrl(String url, Object returnUrl, Object returnQuery, PageContext pageContext) throws JspException, UnsupportedEncodingException{	
		StringBuilder urlBuilder = new StringBuilder(UrlSupport.resolveUrl(url, null, pageContext));
		
		if(returnUrl!=null && !returnUrl.toString().isEmpty())
			urlBuilder.append("?returnUrl=").append(URLEncoder.encode(returnUrl.toString()+resolveQuery(returnQuery!=null?returnQuery.toString():null, null), "UTF-8"));
		
		return urlBuilder.toString();		
	}
	
	static String aa,bb;
	
	public static String resolveWithReturnUrl(String url, Object returnUrl, Object returnQuery, String appendReturnQuery, PageContext pageContext) throws JspException, UnsupportedEncodingException{	
		StringBuilder urlBuilder = new StringBuilder(UrlSupport.resolveUrl(url, null, pageContext));
		
		if(returnUrl!=null && !returnUrl.toString().isEmpty())
			urlBuilder.append("?returnUrl=").append(URLEncoder.encode(returnUrl.toString()+resolveQuery(returnQuery!=null? returnQuery.toString(): null, appendReturnQuery), "UTF-8"));
		
		return urlBuilder.toString();		
	}
	
	private static String resolveQuery(String returnQuery, String appendReturnQuery) {
		StringBuilder queryBuilder = new StringBuilder();
		
		Map<String,String> queryMap=new HashMap<String,String>();
		if(returnQuery!=null && !returnQuery.isEmpty())
		{
			String[] returnQueryArray=returnQuery.split("&");
			for(String item : returnQueryArray){
				String[] itemArray=item.split("=");
				if(itemArray.length<2)
					queryMap.put(itemArray[0], "");
				else
					queryMap.put(itemArray[0], itemArray[1]);
			}
			
		}
		
		if(appendReturnQuery!=null && !appendReturnQuery.isEmpty())
		{
			String[] appendReturnQueryArray=appendReturnQuery.split("&");
			for(String item : appendReturnQueryArray){
				String[] itemArray=item.split("=");
				if(itemArray.length<2)
					queryMap.put(itemArray[0], "");
				else
					queryMap.put(itemArray[0], itemArray[1]);
			}
			
		}
		
		int index=0;
		for(Map.Entry<String, String> entry : queryMap.entrySet()){
			if(index==0)
				queryBuilder.append("?");
			queryBuilder.append(entry.getKey());
			queryBuilder.append("=");
			queryBuilder.append(entry.getValue());
			if(index<queryMap.size()-1)
				queryBuilder.append("&");
			index++;
		}
		
		return queryBuilder.toString();
	}

}
