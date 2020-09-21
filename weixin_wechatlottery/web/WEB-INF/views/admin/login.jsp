<%--
  Created by IntelliJ IDEA.
  User: Wang Genshen
  Date: 2017-07-13
  Time: 22:05
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path= request.getContextPath();
%>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>管理员登录</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/plugins/sweet-alert/sweet-alert.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
</head>
<body>
    <div class="row none-box">
        <div class="col-xs-offset-1 col-xs-10 col-lg-offset-3 col-lg-6">
            <span style="color:red;">${requestScope.msg}</span>
            <form action="<%=path %>/admin/login" method="post">
                <div class="form-group">
                    <input type="password" class="form-control" id="pwd" name="pwd" placeholder="请输入登录密码"/>
                    <p>
                    <input class="col-xs-12 col-lg-12 btn btn-primary" type="submit" value="登录" />
                    </p>
                </div>
            </form>
        </div>
    </div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/plugins/sweet-alert/sweet-alert.min.js"></script>
<script src="<%=path %>/js/main.js"></script>
</html>
