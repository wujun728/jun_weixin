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
</head>
<body>
	<div class="container js_container"></div>
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

		<div class="weui_panel">
		<div class="weui_panel_hd">订单列表</div>
				<c:if test="${not empty  orders}">
				
					<c:forEach items="${orders}" var="order">
						<div class="weui_panel_bd">
							<div class="weui_media_box weui_media_text">
								<!-- <h4 class="weui_media_title">课程名称</h4> -->
								<p class="weui_media_desc">订单号：${order.transaction_id } </p>
								<ul class="weui_media_info">
									<li class="weui_media_info_meta">购买时间</li>
									<li class="weui_media_info_meta">${order.buyTime }  </li><br/>
									<li class="weui_media_info_meta ">课程名称</li>
									<li class="weui_media_info_meta ">${order.courseName }</li>
									<li class="weui_media_info_meta weui_media_info_meta_extra">课时数</li>
									<li class="weui_media_info_meta ">${order.couresCount }</li><br/>
									<li class="weui_media_info_meta ">金额</li>
									<li class="weui_media_info_meta ">￥${order.total_fee } </li><br/>
									<c:if test="${not empty  order.url}">
										<li class="weui_media_info_meta ">直播地址 </li>
										<li class="weui_media_info_meta weui_media_info_meta_extra"><a href="${order.url }">点击观看大讲堂直播</a> </li>
									</c:if>
								</ul>
							</div>
						</div>
					</c:forEach>	
				</c:if>
				<c:if test="${empty  orders}">
					<div class="weui_panel_bd">
							<div class="weui_media_box weui_media_text">
								暂无订单
							</div>
						</div>
				</c:if>
		</div>
	</div>
</body>
</html>