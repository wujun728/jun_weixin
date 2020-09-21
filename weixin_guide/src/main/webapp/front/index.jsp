<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%
	String path = request.getContextPath();
	/* String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/"; 
	因为微信使用的是80端口 再JSSDK中签名验证不要端口号
	
	*/
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":"
			+ path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
<title>Javen微信开发指南</title>
<link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.css"/>
<link rel="stylesheet" href="<%=path %>/css/index.css"/>
</head>
<body>
	<div class="container js_container">

    </div>
	<div class="page">
		
    	<div class="hd">
    		
	        <h1 class="page_title"><img alt="" width="80px"  height="80px" src="<%=path %>/images/logo.png"></h1>
	        <p class="page_desc">极速开发微信公众号</p>
    	</div>
    	
    	<div class="weui_grids">
			    <a href="tel:13545191275" class="weui_grid">
			        <div class="weui_grid_icon">
			            <img src="<%=path %>/images/iconfont-dianhua.png" alt="">
			        </div>
			        <p class="weui_grid_label">
			            热线电话
			        </p>
			    </a>
			    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=572839485&site=qq&menu=yes" class="weui_grid">
			        <div class="weui_grid_icon">
			            <img src="<%=path %>/images/iconfont-qq.png" alt="">
			        </div>
			        <p class="weui_grid_label">
			            QQ在线咨询
			        </p>
			    </a>
			    <a target="_blank" href="http://www.cnblogs.com/zyw-205520"  class="weui_grid">
			        <div class="weui_grid_icon">
			            <img src="<%=path %>/images/iconfont-guanwang.png" alt="">
			        </div>
			        <p class="weui_grid_label">
			            官网
			        </p>
			    </a>
			    <a target="_blank" href="#"  class="weui_grid">
			        <div class="weui_grid_icon">
			            <img src="<%=path %>/images/iconfont-gouwuche.png" alt="">
			        </div>
			        <p class="weui_grid_label">
			            订单查询
			        </p>
			    </a>
			    <a  href="http://buluo.qq.com/mobile/barindex.html?bid=31726"  class="weui_grid">
			        <div class="weui_grid_icon">
			            <img src="<%=path %>/images/iconfont-shequ.png" alt="">
			        </div>
			        <p class="weui_grid_label">
			            微社区
			        </p>
			    </a>
			    <a target="_blank" href="<%=path %>/idea"  class="weui_grid">
			        <div class="weui_grid_icon">
			            <img src="<%=path %>/images/iconfont-yijian.png" alt="">
			        </div>
			        <p class="weui_grid_label">
			            意见反馈
			        </p>
			    </a>
			    
		</div>
		
		<!-- 微信开发定制 -->
	    <div class="bd" >
	        <div class="weui_panel weui_panel_access">
	            <div class="weui_panel_hd green"><h3 >微信开发定制</h3></div>
	            <div class="weui_panel_bd">
	            	<a href="#" class="weui_media_box weui_media_appmsg">
	                    <div class="weui_media_hd">
	                        <img class="weui_media_appmsg_thumb" src="<%=path %>/images/iconfont-personal.png" alt="">
	                    </div>
	                    <div class="weui_media_bd">
	                        <h4 class="weui_media_title">私人定制</h4>
	                        <p class="weui_media_desc">量身打造个人专属微信公众号</p>
	                    </div>
	                </a>
	            	<a href="#" class="weui_media_box weui_media_appmsg">
	                    <div class="weui_media_hd">
	                        <img class="weui_media_appmsg_thumb" src="<%=path %>/images/iconfont-xiaoban.png"" alt="">
	                    </div>
	                    <div class="weui_media_bd">
	                        <h4 class="weui_media_title">小班</h4>
	                        <p class="weui_media_desc">小班交流，高效指导</p>
	                    </div>
	                </a>
	                <a href="#" class="weui_media_box weui_media_appmsg">
	                    <div class="weui_media_hd">
	                        <img class="weui_media_appmsg_thumb" src="<%=path %>/images/iconfont-daxuetang.png" alt="">
	                    </div>
	                    <div class="weui_media_bd">
	                        <h4 class="weui_media_title">公开课</h4>
	                        <p class="weui_media_desc">名师培训</p>
	                    </div>
	                </a>
	            </div>
	            <a class="weui_panel_ft" href="#">查看更多</a>
	        </div>
	    </div>
	    
	    
	    
    </div>
</body>
</html>