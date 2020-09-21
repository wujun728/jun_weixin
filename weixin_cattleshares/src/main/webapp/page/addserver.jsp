<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta charset="UTF-8">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/js/bootstrap/css/bootstrap.min.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/js/bootstrap/css/bootstrap-theme.min.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/fonts/font-awesome.min.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/my.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/addServer.css" />
		<title>新增客服</title>
	</head>
	<body>
		<div class="content-left">
			<div class="send border">
					<h5>新增客服</h5>
					<div class="send-content">
						<form class="addserver-form" method="get">
							<div class="send-left">
								<div>用户名：<p>*</p></div>
								<input type="text" name="adminUsername" id="adminUsername" value="" placeholder="请输入用户名"/>
							</div>
							<div class="send-left">
								<div>密码：<p>*</p></div>
								<input type="password" name="adminPassword" id="adminPassword" value="" placeholder="请输入密码"/>
							</div>
							<div class="send-left">
								<div>确认密码：<p>*</p></div>
								<input type="password" name="cadminPassword" id="cadminPassword" value="" placeholder="确认密码"/>
							</div>
						
						<!--<div class="authority">
							<div>分配权限：</div>
							<input class="check-input" type="checkbox" value="" id="checkbox1" data-toggle="checkbox" checked="checked">
							<label class="checkbox checkbox-inline" for="checkbox1">
                        	
                    		股票推荐
							</label>
							<input class="check-input" type="checkbox" value="" id="checkbox2" data-toggle="checkbox" checked="checked">
							<label class="checkbox checkbox-inline" for="checkbox2">
                        	
                    		股票推荐
							</label>
							<input class="check-input" type="checkbox" value="" id="checkbox2" data-toggle="checkbox" checked="checked">
							<label class="checkbox checkbox-inline" for="checkbox2">
                        	
                    		股票推荐
							</label>
							<input class="check-input" type="checkbox" value="" id="checkbox2" data-toggle="checkbox" checked="checked">
							<label class="checkbox checkbox-inline" for="checkbox2">
                        	
                    		股票推荐
							</label>
						</div>-->
						
							<input class="btn btn-color btn-add" type="submit" value="新增"/>
						</form>
					</div>
					
				</div>
				
				<div class="con-table">
					<table class="table table-hover border">
						<tr class="firstline table-content">
							<th>用户名</th>
							<th class="float-l">密码</th>
							<th>操作</th>
						</tr>
						<tr class="table-content">
							<td class="number">1</td>
							<td class="">123456</td>
							<td class="number">
								<i class="small-icon small-change"></i>
								<i class="small-icon small-deleteline"></i>
							</td>
						</tr>
						
					</table>
				</div>
		</div>
		
		
		<script src="${pageContext.request.contextPath}/resource/js/bootstrap/js/bootstrap.min.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/jquery/jquery-3.0.0.min.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/jquery/jquery.validate.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/jquery/validate.expand.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/addServer.js"></script>
	</body>
</html>
