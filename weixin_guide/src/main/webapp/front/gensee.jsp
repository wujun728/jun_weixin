<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<title>Javen微信开发指南</title>
<link rel="stylesheet"
	href="//res.wx.qq.com/open/libs/weui/0.4.0/weui.css" />
<link rel="stylesheet" href="<%=path%>/css/index.css" />
<script type="text/javascript" src="<%=path %>/js/jquery-2.1.4.js"></script>
<!-- layer -->
<script src="<%=path %>/static/layer/layer.js"></script>
</head>
<body>
	<div class="page">

		<div class="hd">

			<h1 class="page_title">
				<img alt="" width="80px" height="80px"
					src="<%=path%>/images/logo.png">
			</h1>
			<p class="page_desc">
				在线英语教育领导品牌<br />外教一对一，随时随地学英语
			</p>
		</div>
			<div class="weui_btn_area">
				  <a href="<%=path %>/gensee/training" target="_blank" class="weui_btn weui_btn_primary">按钮</a>
			</div>
		</form>

	</div>
</body>
</html>