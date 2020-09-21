package com.javen.model;

import com.jfinal.log.Log;
import com.jfinal.plugin.activerecord.Model;

/**
 * 授权获取到的用户信息
 * @author Javen
 */
public class Idea extends Model<Idea> {

	private static final long serialVersionUID = 6204222383226990020L;
	
	static Log log = Log.getLog(Idea.class);
	
	public static final Idea dao = new Idea();
	
	
}
