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
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + path;
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<title>Javen微信开发指南</title>
<link rel="stylesheet" href="<%=path%>/static/weui/lib/weui.css" />
<link rel="stylesheet" href="<%=path%>/css/index.css" />
</head>
<body>
	<div class="container js_container"></div>
	<div class="page">

		<div class="hd">

			<h1 class="page_title">
				<img alt="" width="80px" height="80px"
					src="<%=path%>/images/logo.png">
			</h1>
			<p class="page_desc">极速开发微信公众号</p>
		</div>

		<form method="post" action="<%=path%>/file/add"
			enctype="multipart/form-data">
			<input type="file" name="img" />
			<input type="file" name="img2" multiple/>
			<button type="submit" id="save">保存</button>
		</form>



	</div>
</body>
</html>