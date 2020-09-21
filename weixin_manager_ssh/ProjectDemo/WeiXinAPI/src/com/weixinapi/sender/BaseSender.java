package com.weixinapi.sender;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import javax.net.ssl.HttpsURLConnection;

public class BaseSender {
	
	/**
	 * HTTPS GET请求
	 * @param url
	 * @return
	 * @throws IOException
	 */
	public String httpsGet(String url) throws IOException{
		URL requestURL = new URL(url);
		HttpsURLConnection httpsConnection = (HttpsURLConnection)requestURL.openConnection();
		httpsConnection.setUseCaches(false);
		httpsConnection.setRequestMethod("GET");
		InputStreamReader inputStreamReader=new InputStreamReader(httpsConnection.getInputStream());
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
		StringBuffer stringBuffer=new StringBuffer();
		String line;
		while ((line = bufferedReader.readLine()) != null) {
			stringBuffer.append(line);
		}
		inputStreamReader.close();
		bufferedReader.close();
		httpsConnection.disconnect();
		
		System.out.print(stringBuffer.toString());
		
		return stringBuffer.toString();
	}
	
	/**
	 * HTTPS POST请求
	 * @param url
	 * @param postStr
	 * @return
	 * @throws IOException
	 */
	public String httpsPost(String url, String postStr) throws IOException{
		URL requestURL = new URL(url);
		HttpsURLConnection httpsConnection = (HttpsURLConnection)requestURL.openConnection();
		
		httpsConnection.setDoInput(true);
		httpsConnection.setDoOutput(true);
		httpsConnection.setUseCaches(false);
		httpsConnection.setRequestMethod("POST");
		httpsConnection.setRequestProperty("Content-Length", String.valueOf(postStr.getBytes().length));
		httpsConnection.getOutputStream().write(postStr.getBytes());
		httpsConnection.getOutputStream().flush();
		httpsConnection.getOutputStream().close();
		
		InputStreamReader inputStreamReader=new InputStreamReader(httpsConnection.getInputStream());
		BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
		StringBuffer stringBuffer=new StringBuffer();
		String line;
		while ((line = bufferedReader.readLine()) != null) {
			stringBuffer.append(line);
		}
		inputStreamReader.close();
		bufferedReader.close();
		httpsConnection.disconnect();
		
		System.out.print(stringBuffer.toString());
		
		return stringBuffer.toString();
	}	
}
