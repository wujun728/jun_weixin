<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<meta name="viewport"
	content="width=device-width,initial-scale=1,user-scalable=0">
<title>工具集合</title>
<link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.css"/>
<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
<link rel="stylesheet" href="<%=path %>/css/index.css"/>
</head>
<body>
	<div class="page">
		<div class="hd">

			<h1 class="page_title">
				<img alt="" width="80px" height="80px"
					src="<%=path%>/images/constellation/constellation.png">
			</h1>
			<p class="page_desc">
				在线工具集合<br />星座运势
			</p>
			
		</div>
		<form method="post" action="<%=path%>/constellation/getConstellation">
			<div class="weui_cells weui_cells_form">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label for="consname" class="weui_label" style="width: 100px">星座名称</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<input class="weui_input" id="consname" type="text" name="consName" value="${ consName}" placeholder="请选择星座名称">
					</div>
				</div>
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label for="constype" class="weui_label" style="width: 100px">运势类型</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<input class="weui_input" id="constype" name="consType" value="${ consType}" type="text" placeholder="请选择运势类型" >
					</div>
				</div>
				<div class="weui_btn_area">
					<input type="submit" class="weui_btn weui_btn_primary"
						value="星座运势查询" 					
						/>
<!-- 							onclick="javascript:wap.gpay();" -->
				</div>
			</div>
		</form>
	</div>
		
		
	<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
	<script type='text/javascript' src="<%=path %>/static/weui/js/jquery-weui.js"></script>
	<!-- layer -->
	<script src="<%=path%>/static/layer/layer.js"></script>
	
		<script type="text/javascript">
			$("#consname").picker(
				{
					title : "请选择星座",
					cols : [ {
						textAlign : 'left',
						values : [ '白羊座', '金牛座', '双子座', '巨蟹座',
								'狮子座', '处女座', '天秤座', '天蝎座', '射手座', '魔羯座', '水瓶座', '双鱼座' ]
					} ]
				});
			$("#constype").picker(
					{
						title : "请选择运势类型",
						cols : [ {
							textAlign : 'center',
							values : [ 'today', 'tomorrow', 'week', 'nextweek',
									'month', 'year' ]
						} ]
					});
			
			$(document).ready(function(){
				var errmeaage='${meaage}';
			    if(errmeaage!=''){
			    	layer.msg(errmeaage, {shift: 6});
			    }
			});
		</script>
</body>
</html>