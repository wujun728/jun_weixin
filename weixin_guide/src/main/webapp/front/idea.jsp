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
<link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.css"/>
<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
<link rel="stylesheet" href="<%=path%>/css/index.css" />
<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
<script type="text/javascript" src="<%=path %>/static/weui/js/jquery-weui.js"></script>

<!-- layer -->
<script src="<%=path %>/static/layer/layer.js"></script>
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
				 <p class="page_desc">极速开发微信公众号</p>
			</p>
		</div>
		<form method="post"  action="<%=path%>/ajax/idea">
			<div class="weui_panel">
				<div class="weui_cells_title">意见反馈</div>
				<div class="weui_cells weui_cells_form">


					<div class="weui_cell weui_cell_select weui_select_before">
						<div class="weui_cell_hd">
							<select class="weui_select" name="contact">
								<option value="mobile">手机号</option>
								<option value="QQ">QQ</option>
								<option value="weixin">微信</option>
								<option value="email">邮箱</option>
							</select>
						</div>
						<div class="weui_cell_bd weui_cell_primary">
							<input class="weui_input" type="text" name="account"
								placeholder="请输入联系方式" />
						</div>
					</div>
					<div class="weui_cell">
						<div class="weui_cell_bd weui_cell_primary">
							<textarea class="weui_textarea" name="idea"
								placeholder="请输入您的意见，如有采纳将会提供丰厚的礼品。请确保联系方式正确" rows="5"></textarea>
						</div>
					</div>



				</div>
			</div>
			<div class="weui_btn_area">
				<input type="submit" class="weui_btn weui_btn_primary" value="提交" />
			</div>
		</form>

	</div>
	
<script type="text/javascript">
$(function(){
	$("form").submit(function(){
		$.showLoading("意见提交中...");
		var $form = $(this);
		$.post($form.attr("action"), $form.serialize(), function(data){
			$.hideLoading();
			if (data.code == 0) {
				layer.msg("意见反馈成功", {shift: 1});
				setTimeout(function(){window.location.href = "<%=path%>/"}, 1200);
				return false;
			} else {
				$("#loadingToast").hide();
					layer.msg(data.message, {
						shift : 6
					});
					return false;
				}
			}, "json");
				return false;
			});
		});
	</script>
</body>
</html>