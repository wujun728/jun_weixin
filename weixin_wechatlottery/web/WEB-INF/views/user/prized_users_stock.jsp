<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Wang Genshen
  Date: 2017-07-04
  Time: 22:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
    String path = request.getContextPath();
%>
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>所有中奖用户</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
</head>
<body>
<div class="row none-box">
    <p class="col-lg-12 text-center text-primary">恭喜所有中原始股票奖用户！</p>
    <c:forEach items="${requestScope.prized_users}" var="user">
        <div class="col-lg-4" style="margin-top: 10px; height:30px;">
            ${user.wechatNickname}&nbsp;${user.hidePhone}
        </div>
    </c:forEach>
</div>
<div class="row none-box">
    <c:if test="${requestScope.lottery == 'y'}">
        <a href="<%=path %>/pay/confirm_stock" class="col-xs-offset-3 col-xs-6 col-lg-offset-4 col-lg-4 btn btn-primary">确认中原始股票奖名额</a>
        <p>
        <small>必须确认中奖名额才能开启下一轮抽奖！</small>
        </p>
    </c:if>
</div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
</html>
