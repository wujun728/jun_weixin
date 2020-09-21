package com.mhuang.wechat.common.utils;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.ConnectException;
import java.net.MalformedURLException;
import java.net.URL;
import java.security.KeyStore;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContexts;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mhuang.common.utils.network.MyX509TrustManager;

/**
 * 通用工具类
 * @author 李欣桦
 * @date 2014-11-21下午9:10:30
 */
public class CommonUtil {
	
	private static Logger log = LoggerFactory.getLogger(CommonUtil.class);
    
	public static String httpsSSLRequest(String requestUrl,String request,String mchid) throws Exception{
		//指定读取证书格式为PKCS12
	    KeyStore keyStore = KeyStore.getInstance("PKCS12");
	    //读取本机存放的PKCS12证书文件@TODO证书地址
//	    FileInputStream instream = new FileInputStream(new File("D:/apiclient_cert.p12"));
	    FileInputStream instream = new FileInputStream(new File("/ca/apiclient_cert.p12"));
	    try {
	    	//指定PKCS12的密码(商户ID)
	    	keyStore.load(instream, mchid.toCharArray());
	    } finally {
	    	instream.close();
	    }
	    SSLContext sslcontext = SSLContexts.custom()
	    .loadKeyMaterial(keyStore, mchid.toCharArray()).build();
	    HostnameVerifier verifier =  new HostnameVerifier(){  
	        public boolean verify(String string,SSLSession ssls) {  
	                return true;  
	            }  
	    };
	    //指定TLS版本
	    SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(
	    sslcontext,new String[] { "TLSv1" },null,
	    verifier);
	    //设置httpclient的SSLSocketFactory
	    CloseableHttpClient httpclient = HttpClients.custom()
	    .setSSLSocketFactory(sslsf)
	    .build();
	    String response = null;
	    CloseableHttpResponse responses = null;
	    try {
            HttpPost httppost = new HttpPost(requestUrl);
            StringEntity s = new StringEntity(request,"UTF-8");
            s.setContentEncoding("UTF-8");
            s.setContentType("application/xml");
            httppost.setEntity(s);
            responses = httpclient.execute(httppost); 
            HttpEntity entity = responses.getEntity();
            response = EntityUtils.toString(entity);
            EntityUtils.consume(entity);  
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if(responses != null){
                    responses.close();
                    responses = null;
                }
                if (httpclient != null){
                    httpclient.close();
                    httpclient = null;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            log.info("endTime："+System.currentTimeMillis());
            log.debug("执行完毕！！");
        }
	    return response;
	}
	/**
	 * 发送https请求
	 * @param requestUrl 请求地址
	 * @param requestMethod 请求方式（GET、POST）
	 * @param outputStr 提交的数据
	 * @return 返回微信服务器响应的信息
	 */
	public static String httpsRequest(String requestUrl, String requestMethod, String outputStr) {
		try {
			// 创建SSLContext对象，并使用我们指定的信任管理器初始化
			TrustManager[] tm = { new MyX509TrustManager() };
			SSLContext sslContext = SSLContext.getInstance("SSL", "SunJSSE");
			sslContext.init(null, tm, new java.security.SecureRandom());
			// 从上述SSLContext对象中得到SSLSocketFactory对象
			SSLSocketFactory ssf = sslContext.getSocketFactory();
			URL url = new URL(requestUrl);
			HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
			conn.setSSLSocketFactory(ssf);
			conn.setDoOutput(true);
			conn.setDoInput(true);
			conn.setUseCaches(false);
			// 设置请求方式（GET/POST）
			conn.setRequestMethod(requestMethod);
			conn.setRequestProperty("content-type", "application/x-www-form-urlencoded"); 
			// 当outputStr不为null时向输出流写数据
			if (null != outputStr) {
				OutputStream outputStream = conn.getOutputStream();
				// 注意编码格式
				outputStream.write(outputStr.getBytes("UTF-8"));
				outputStream.close();
			}
			// 从输入流读取返回内容
			InputStream inputStream = conn.getInputStream();
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream, "utf-8");
			BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
			String str = null;
			StringBuffer buffer = new StringBuffer();
			while ((str = bufferedReader.readLine()) != null) {
				buffer.append(str);
			}
			// 释放资源
			bufferedReader.close();
			inputStreamReader.close();
			inputStream.close();
			inputStream = null;
			conn.disconnect();
			return buffer.toString();
		} catch (ConnectException ce) {
			log.error("连接超时：{}", ce);
		} catch (Exception e) {
			log.error("https请求异常：{}", e);
		}
		return null;
	}

	public static String urlEncodeUTF8(String source){
		String result = source;
		try {
			result = java.net.URLEncoder.encode(source,"utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return result;
	}
}