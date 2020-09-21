package com.adam.wechat.util;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import javax.servlet.jsp.tagext.TryCatchFinally;

public class DBHelper {
	public Connection getDBhelper() {

	String url = null;
	String username = null;
	String password= null;
	String driver = null;
	
	Properties prop =new Properties();
	
	try {
		prop.load(this.getClass().getClassLoader().getResourceAsStream("DBconfig.properties"));
		username = prop.getProperty("username");
		password = prop.getProperty("userpassword");
		url = prop.getProperty("url");
		driver = prop.getProperty("driver");
		
		Class.forName(driver);
		return DriverManager.getConnection(url, username, password);
	} catch (Exception e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	return null;
	}
}
