<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
		<meta name="viewport" content="width=device-width, initial-scale=1.0">

		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/login.css" />
		<title>后台登录</title>
		<script src="${pageContext.request.contextPath}/resource/js/jquery/jquery-3.0.0.min.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/login.js"></script>
	</head>
	<body>
		<div class="htmleaf-container">
	<p class="center"></p>
	<p class="center">用户登录</p>
	<div id="wrapper" class="login-page">
	  <div id="login_form" class="form">
		<!--<form class="register-form">
		  <input type="text" placeholder="用户名" id="r_user_name">
		  <input type="password" placeholder="密码" id="r_password">
		  <input type="password" placeholder="请确认您的密码" id="re_password">
		  <input type="text" placeholder="手机号" id="r_emial">
		  <div>
	    	<input type="text" placeholder="输入验证码" id="r_emial" style="width: 42%;">
		  	<input class="yzmbtn" type="button" name="" id="catchYzm" value="获取验证码" style="width: 42%;background:#374850;color: #ffffff;cursor: pointer;margin-left: 5%"/>
		  </div>
          
		  <button id="create">创建账户</button>
		  <p class="message">已经有了一个账户? <a href="#">立刻登录</a></p>
		</form>-->
		<form class="login-form">
		  <input type="text" placeholder="用户名" id="adminUsername" name="adminUsername">
		  <img class="prompt prompt-username" src="${pageContext.request.contextPath}/resource/img/delete.png" />
		  <input type="password" placeholder="密码" id="adminPassword" name="adminPassword">
		  <img class="prompt prompt-psw" src="${pageContext.request.contextPath}/resource/img/delete.png" />
		  <button id="login">登　录</button>
		  <!--<ul>
			  <li class="message"><a href="#">注册账户</a></li>
			  <li class="forgotpsw"><a href="#">忘记密码</a></li>
		  </ul>-->
		</form>
	  </div>
	</div>
</div>
	
	<div style="text-align:center;margin:50px 0; font:normal 14px/24px 'MicroSoft YaHei';">
	</body>
</html>
