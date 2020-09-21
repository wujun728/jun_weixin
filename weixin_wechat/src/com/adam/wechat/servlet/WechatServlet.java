package com.adam.wechat.servlet;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;

import com.adam.wechat.util.SQLConstants;
import com.adam.wechat.util.StringUtil;

public class WechatServlet extends HttpServlet implements SQLConstants {

	/**
	 * Constructor of the object.
	 */
	public WechatServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	 private String TOKEN="在验证页面的Token值";

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		//微信加密签名
				String signature=request.getParameter("signature");
				//时间戳
				String timestamp=request.getParameter("timestamp");
				//随机数
				String nonce=request.getParameter("nonce");
				//随机字符串
				String echostr=request.getParameter("echostr");
				//排序
				String[] str={TOKEN,timestamp,nonce};
				Arrays.sort(str);
				//拼接字符串
				String bigStr=str[0]+str[1]+str[2];
				//验证通过返回：echostr

					response.getWriter().print(echostr);
		
					try {
			            InputStream is = request.getInputStream();
			            // 取HTTP请求流长度
			            int size = request.getContentLength();
			            // 用于缓存每次读取的数据
			            byte[] buffer = new byte[size];
			            // 用于存放结果的数组
			            byte[] xmldataByte = new byte[size];
			            int count = 0;
			            int rbyte = 0;
			            // 循环读取
			            while (count < size) { 
			                // 每次实际读取长度存于rbyte中
			                rbyte = is.read(buffer); 
			                for(int i=0;i<rbyte;i++) {
			                    xmldataByte[count + i] = buffer[i];
			                }
			                count += rbyte;
			            }
			            is.close();
			            String requestStr = new String(xmldataByte, "UTF-8");
			            Document doc = DocumentHelper.parseText(requestStr);
			            Element rootElt = doc.getRootElement();
			            String content = rootElt.elementText("Content");
			            String type = rootElt.elementText("MsgType");
			            String toUserName = rootElt.elementText("ToUserName");
			            String fromUserName = rootElt.elementText("FromUserName");
			            String event = "";
			            if ("event".equalsIgnoreCase(type)) {
							event = rootElt.elementText("Event");
							if ("subscribe".equalsIgnoreCase(event)) {
								String responseStr = "<xml>";
				                responseStr += "<ToUserName><![CDATA[" + fromUserName+ "]]></ToUserName>";
				                responseStr += "<FromUserName><![CDATA[" + toUserName + "]]></FromUserName>";
				                responseStr += "<CreateTime>" + System.currentTimeMillis()+ "</CreateTime>";
				                responseStr += "<MsgType><![CDATA[text]]></MsgType>";
				                responseStr += "<Content>" + sql_ADD_BILLS +"</Content>";
				                responseStr += "<FuncFlag>0</FuncFlag>";
				                responseStr += "</xml>";
				                response.getWriter().write(responseStr);
							}
						}
			            
			            //得到所有的有用数据
			            System.out.println(content+ ":" + toUserName + ":" + fromUserName);
			            //文本消息
			            if (StringUtil.isBlank(content) && "text".equals(type)) {
			                String responseStr = "<xml>";
			                responseStr += "<ToUserName><![CDATA[" + fromUserName+ "]]></ToUserName>";
			                responseStr += "<FromUserName><![CDATA[" + toUserName + "]]></FromUserName>";
			                responseStr += "<CreateTime>" + System.currentTimeMillis()+ "</CreateTime>";
			                responseStr += "<MsgType><![CDATA[text]]></MsgType>";
			                responseStr += "<Content> to === "+toUserName+"-----from==== " + fromUserName+"</Content>";
			                responseStr += "<FuncFlag>0</FuncFlag>";
			                responseStr += "</xml>";
			                response.getWriter().write(responseStr);
			            }
			            //图文消息
			            else if (! StringUtil.isBlank(content) && "news".equals(type)) {
			                String responseStr = "<xml>";
			                responseStr += "<ToUserName><![CDATA[" + fromUserName + "]]></ToUserName>";
			                responseStr += "<FromUserName><![CDATA[" + toUserName + "]]></FromUserName>";
			                responseStr += "<CreateTime>" + System.currentTimeMillis() + "</CreateTime>";
			                responseStr += "<MsgType><![CDATA[news]]></MsgType>";
			                responseStr += "<Content><![CDATA[]]></Content>";
			 
			                responseStr += "<ArticleCount>2</ArticleCount>";
			 
			                responseStr += "<Articles>";
			                responseStr += "<item>";
			                responseStr += "<Title><![CDATA[图文消息——红色石头]]></Title>";
			                responseStr += "<Discription><![CDATA[图文消息正文——红色石头]]></Discription>";
			                responseStr += "<PicUrl><![CDATA[http://redstones.sinaapp.com/res/images/redstones_wx_258.jpg]]></PicUrl>";
			                responseStr += "<Url><![CDATA[http://redstones.sinaapp.com/]]></Url>";
			                responseStr += "</item>";
			 
			                responseStr += "<item>";
			                responseStr += "<Title><![CDATA[图文消息——红色石头]]></Title>";
			                responseStr += "<Discription><![CDATA[图文消息正文——红色石头]]></Discription>";
			                responseStr += "<PicUrl><![CDATA[http://redstones.sinaapp.com/res/images/redstones_wx_258.jpg]]></PicUrl>";
			                responseStr += "<Url><![CDATA[http://redstones.sinaapp.com/]]></Url>";
			                responseStr += "</item>";
			 
			                responseStr += "</Articles>";
			                responseStr += "<FuncFlag>1</FuncFlag>";
			                responseStr += "</xml>";
			                response.getWriter().write(responseStr);
			            }
			            //不能识别
			            else {
			            	response.getWriter().write(cantload( toUserName, fromUserName));
			            }
			             
			        } catch (Exception e) {
			            e.printStackTrace();
			        }
		
	}
	
	private String getbackwords(String type ,String toUserName, String fromUserName ){
		String responseStr = "<xml>";
		return responseStr;
	}
	
	

	private String cantload( String toUserName, String fromUserName) throws IOException {
		String responseStr = "<xml>";
		responseStr += "<ToUserName><![CDATA[" + fromUserName + "]]></ToUserName>";
		responseStr += "<FromUserName><![CDATA[" + toUserName + "]]></FromUserName>";
		responseStr += "<CreateTime>" + System.currentTimeMillis() + "</CreateTime>";
		responseStr += "<MsgType><![CDATA[text]]></MsgType>";
		responseStr += "<Content>输入text或者news返回相应类型的消息，另外推荐你关注 '红色石头'（完全采用Java完成），反馈和建议请到http://wzwahl36.net</Content>";
		responseStr += "<FuncFlag>0</FuncFlag>";
		responseStr += "</xml>";
		return responseStr;
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
