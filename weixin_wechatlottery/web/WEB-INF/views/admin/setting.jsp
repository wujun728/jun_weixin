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
    <title>系统设置</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/plugins/sweet-alert/sweet-alert.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
</head>
<body>
    <div class="row none-box">
        <form action="<%=path %>/setting/change" method="post">
            <div class="form-group">
                <label for="startTime">活动开始时间</label>
                <input type="datetime" class="form-control" id="startTime" name="startTime" value="${applicationScope.activity_begin_time}"/>
                <label for="totalUser">活动参与总人数</label>
                <input type="number" class="form-control" id="totalUser" name="totalUser" value="${applicationScope.activity_max_user}"/>
                <label for="prizedCount">活动中奖人数</label>
                <input type="number" class="form-control" id="prizedCount" name="prizedCount" value="${applicationScope.prized_count}"/>
                <label for="prizedUsers">配置内部中奖用户（格式为微信昵称:手机号,微信昵称:手机号）</label>
                <input type="text" class="form-control" id="prizedUsers" name="prizedUsers" value="${applicationScope.prized_users}"/>
                <label for="prizedCount">原始股中奖人数</label>
                <input type="number" class="form-control" id="prizedCountStock" name="prizedCountStock" value="${applicationScope.prized_count_stock}"/>
                <input class="btn btn-primary" type="submit" value="修改活动配置" />
            </div>
        </form>
        <a href="<%=path %>/setting/start_game" class="btn btn-primary">现在开始活动</a>
        <a href="<%=path %>/setting/end_game" class="btn btn-primary">现在结束活动</a>
    </div>
    <div class="row none-box" style="margin-top: 20px;">
        <div class="col-xs-offset-1 col-xs-10 col-lg-offset-1 col-lg-10"><img src="<%=path %>/${applicationScope.logo_img}" class="img-responsive"/></div>
        <div class="col-xs-12">
            <form action="<%=path %>/upload" method="post" enctype="multipart/form-data" name="upload">
                <div class="form-group">
                    <input type="file" class="form-control" id="logoImg" name="logoImg" value="选择图片"/>
                    <input class="btn btn-primary" type="submit" value="上传" onclick="return checkFile('upload', 0, 'jpg,jpeg,bmp,png', 5);"/>
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
