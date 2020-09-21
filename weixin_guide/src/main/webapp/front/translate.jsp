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
				<img alt="" width="150px" height="80px"
					src="<%=path%>/images/translate.png">
			</h1>
			<p class="page_desc">
				在线工具集合<br />在线翻译
			</p>

		</div>
		<form method="post" action="<%=path%>/ajax/translates">
			<div class="weui_cells weui_cells_form">
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label for="consname" class="weui_label" style="width: 100px">翻译源语言</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<input class="weui_input" id="from" type="text" name="from"
							placeholder="请选择翻译源语言">
					</div>
				</div>
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label for="constype" class="weui_label" style="width: 100px">译文语言</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<input class="weui_input" id="to" name="to" type="text"
							placeholder="请选择译文语言">
					</div>
				</div>
				<div class="weui_cell">
					<div class="weui_cell_hd">
						<label for="constype" class="weui_label" style="width: 100px">译文内容</label>
					</div>
					<div class="weui_cell_bd weui_cell_primary">
						<input class="weui_input"  name="q" type="text"
							placeholder="请输入您要翻译的内容">
					</div>
				</div>
				<div class="weui_btn_area">
					<input type="submit" class="weui_btn weui_btn_primary" value="在线翻译" />
				</div>
			</div>
		</form>
	</div>


	<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
	<script type='text/javascript' src="<%=path %>/static/weui/js/jquery-weui.js"></script>
	<!-- layer -->
	<script src="<%=path%>/static/layer/layer.js"></script>
	<script type="text/javascript">
			$("#from").picker(
				{
					title : "请选择翻译源语言",
					cols : [ {
						textAlign : 'left',
						values : [ '中文', '英语', '粤语', '文言文', '繁体中文',
								'日语', '韩语', '法语', '西班牙语', '泰语', '阿拉伯语', '俄语', '葡萄牙语', '德语', '意大利语', '希腊语', '荷兰语', '波兰语', '保加利亚语', '爱沙尼亚语', '葡萄牙语', '丹麦语', '芬兰语', '捷克语', '罗马尼亚语', '斯洛文尼亚语', '瑞典语', '匈牙利语' ]
					} ]
				});
			$("#to").picker(
					{
						title : "请选择译文语言",
						cols : [ {
							textAlign : 'center',
							values : [ '中文', '英语', '粤语', '文言文', '繁体中文',
										'日语', '韩语', '法语', '西班牙语', '泰语', '阿拉伯语', '俄语', '葡萄牙语', '德语', '意大利语', '希腊语', '荷兰语', '波兰语', '保加利亚语', '爱沙尼亚语', '葡萄牙语', '丹麦语', '芬兰语', '捷克语', '罗马尼亚语', '斯洛文尼亚语', '瑞典语', '匈牙利语' ]
							} ]
					});
			$(function(){
				$("form").submit(function(){
					$.showLoading("翻译中 ...");
					var $form = $(this);
					$.post($form.attr("action"), $form.serialize(), function(data){
						if (data.code === 0) {
							$.hideLoading();
							layer.alert(data.data, {icon: 6});
							return false;
						} else {
							$.hideLoading();
							layer.msg(data.message, {shift: 6});
							return false;
						}
					}, "json");
					return false;
				});
			});
		</script>
</body>
</html>