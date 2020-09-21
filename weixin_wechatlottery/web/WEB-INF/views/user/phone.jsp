<%--
  Created by IntelliJ IDEA.
  User: Wang Genshen
  Date: 2017-07-04
  Time: 21:14
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
    String path = request.getContextPath();
%>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>绑定手机号</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/plugins/sweet-alert/sweet-alert.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
</head>
<body>
<div class="row none-box">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 none-box">
        <img src="<%=path %>/${applicationScope.logo_img}" class="img-responsive"/>
    </div>
</div>
<div class="row none-box">
    <div class="col-xs-6 col-sm-6 com-md-6 col-lg-4">
        <h4>
            欢迎您：${sessionScope.user.wechatNickname}
        </h4>
    </div>
</div>
<div class="row none-box">

    <form id="updatePhoneForm">
        <div class="form-group">
            <input type="text" class="form-control" id="phone" name="phone" placeholder="请输入手机号" />
        </div>

        <button type="button" class="btn btn-primary col-xs-12" onclick="updatePhone();">绑定手机号</button>
    </form>

</div>
<div class="row none-box">
    <div class="col-xs-12">
        <h4>绑定手机号说明</h4>
        <p>1、手机号用于中奖后主办方通知您领取奖品</p>
        <p>2、手机号保密</p>
    </div>
</div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/plugins/sweet-alert/sweet-alert.min.js"></script>
<script src="<%=path %>/js/main.js"></script>
</html>

