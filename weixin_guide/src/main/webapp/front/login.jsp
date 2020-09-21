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
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
<title>会员登陆</title>
<link rel="stylesheet" href="<%=path %>/static/weui/lib/weui.css"/>
<link rel="stylesheet" href="<%=path %>/static/weui/css/jquery-weui.css"/>
<link rel="stylesheet" href="<%=path %>/css/lgrg.css"/>
<script type="text/javascript" src="<%=path %>/static/weui/lib/jquery-2.1.4.js"></script>
<script type="text/javascript" src="<%=path %>/static/weui/js/jquery-weui.js"></script>
<!-- layer -->
<script src="<%=path %>/static/layer/layer.js"></script>
</head>
<div class="page">
		
   	<div class="hd">
   		
        <h1 class="page_title"><img alt="" width="80px"  height="80px" src="<%=path %>/images/logo.png"></h1>
        <p class="page_desc">极速开发微信公众号</p>
   	</div>
	<div class="bd">
		<form method="post" action="<%=path %>/ajax/login" >
				<div class="weui_cells">
				    <div class="weui_cell">
				        <div class="weui_cell_hd"></div>
				        <div class="weui_cell_bd weui_cell_primary">
				            <input class="weui_input" type="text" name="account" placeholder="请输入手机号或者邮箱">
				        </div>
				    </div>
				</div>
		
				<div class="weui_cells">
				    <div class="weui_cell">
				        <div class="weui_cell_hd"></div>
				        <div class="weui_cell_bd weui_cell_primary">
				            <input class="weui_input" type="password"  name="password" placeholder="请输入密码">
				        </div>
				    </div>
				</div>
				
				<div class="weui_cells">
					        <div class="weui_cell">
					            <div class="weui_cell_hd"></div>
					            <div class="weui_cell_bd weui_cell_primary">
					                <input class="weui_input" type="text" maxlength="4" name="imgCode" placeholder="请输入验证码">
					            </div>
					            <div class="weui_cell_ft">
									<img src="<%=path %>/image_code" id="image_code" onclick="this.src = '<%=path %>/image_code?v=' + Math.random()" height="25" style="border: 1px solid #ccc;border-left: 0;cursor: pointer;" />
					            </div>
					        </div>
					    </div>
				
				<div class="weui_cells weui_cells_checkbox">
		            <label class="weui_cell weui_check_label" for="s11">
		                <div class="weui_cell_hd">
		                    <input type="checkbox" class="weui_check" name="remember" id="s11" checked="checked">
		                    <i class="weui_icon_checked"></i>
		                </div>
		                <div class="weui_cell_bd weui_cell_primary">
		                    <p>记住密码我的登陆状态</p>
		                </div>
		            </label>
		        </div>
		        
				<!-- <p class="error error-pad tc">尊敬的学员，请填写用户名或密码</p> -->
			
				<div class="weui_btn_area">
					<input type="submit"  class="weui_btn weui_btn_primary"   value="登录并开始学习"/>
				</div>
		</form>
		<div class="weui_btn_area">
		    <a class="weui_btn weui_btn_primary" href="<%=path %>/register" id="">免费注册</a>
		</div>
		<div class="weui_btn_area">
		    <a class="weui_btn weui_btn_warn" href="<%=path %>/forget" id="">忘记密码</a>
		</div>
	</div>
</div>
	
	
<script type="text/javascript">
$(function(){
	$("form").submit(function(){
		$.showLoading("登陆中...");
		var $form = $(this);
		$.post($form.attr("action"), $form.serialize(), function(data){
			$.hideLoading();
			if (data.code === 0) {
				layer.msg("登录成功", {shift: 1});
				setTimeout(function(){window.location.href = "<%=path %>/toOauth"}, 1200);
				return false;
			} else {
				$("#image_code").click();
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