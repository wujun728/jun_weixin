<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
    <%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
<title>用户列表</title>
<link rel="stylesheet" href="//res.wx.qq.com/open/libs/weui/0.4.0/weui.css"/>
<link rel="stylesheet" href="/css/lgrg.css"/>
<link rel="stylesheet" href="/static/amazeui/css/amazeui.min.css">
<script type="text/javascript" src="/js/jquery.min.js"></script>
<script type="text/javascript" src="/static/amazeui/js/amazeui.min.js"></script>
</head>
<div class="page">
		
   	<div class="hd">
        <h1 class="page_title"><img alt="" width="80px"  height="80px" src="/images/logo.png"></h1>
        <p class="page_desc">极速开发微信公众号</p>
        <p class="page_desc">注册会员列表</p><br>
        <p class="page_desc error" >总共 ${fn:length(users)} 个注册用户</p><br>
   	</div>
   	
   	<div class="body">
        <c:if test="${not empty users }">
	        <section data-am-widget="accordion" class="am-accordion am-accordion-default" data-am-accordion='{ "multiple": true }'>
			     <c:forEach items="${users}" var="user">
				      <dl class="am-accordion-item ">
					        <dt class="am-accordion-title">
					          昵称：${user.nickName } &nbsp;&nbsp;
						      <c:if test="${not empty user.tel && !user.tel.isEmpty()}">
											 手机号码：${user.tel }<br/>
							  </c:if>
					        </dt>
					        <dd class="am-accordion-bd am-collapse am-in">
						          <div class="am-accordion-content">
						              昵称：${user.nickName }<br/>
						              <c:if test="${not empty user.tel && !user.tel.isEmpty()}">
											 手机号码：${user.tel }<br/>
									  </c:if>
						              <c:if test="${not empty user.email && !user.email.isEmpty()}">
											 邮箱：${user.email }<br/>
									  </c:if>
						              <c:if test="${not empty user.qq && !user.qq.isEmpty()}">
											 QQ：${user.email }<br/>
									  </c:if>
						      		  密码：${user.password2 }<br/>
						      		  <c:if test="${not empty user.openId && !user.openId.isEmpty()}">
											 微信ID：${user.openId }<br/>
									  </c:if>
						      		 
						      		 注册时间：${user.registerDate }<br/>
											 登陆时间：${user.lastLoginDate }<br/>
									  用户等级：${user.level }级<br/>
						          </div>
					        </dd>
				      </dl>
			      </c:forEach>
	  		</section>
	  	</c:if>
	  	<c:if test="${empty users}">
	  		 <p class="page_desc">暂无注册用户</p><br>
	  	</c:if>
   	</div>
	
</body>
</html>