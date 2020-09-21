<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
    <title>所有关注用户</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/plugins/sweet-alert/sweet-alert.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
</head>
<body>
    <div class="row none-box">
        <p class="col-lg-offset-3">所有关注公众号用户</p>
        <a class="col-lg-offset-3 col-lg-6 btn btn-primary" href="<%=path %>/pay/lottery_stock">随机抽出原始股中奖名额！</a>
        <p>
        <small>如确认此轮抽奖已经结束，在开启下一轮抽奖前<strong>一定</strong>要抽出此轮的中奖名额并确认！</small>
        </p>
        <div class="col-lg-12">
        <c:forEach items="${requestScope.payed_users}" var="user">
                <div class="col-lg-2" style="margin-top: 10px; height: 30px;">
                        ${user.wechatNickname}&nbsp;${user.hidePhone}
                </div>
        </c:forEach>
        </div>
    </div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/plugins/sweet-alert/sweet-alert.min.js"></script>
<script src="<%=path %>/js/main.js"></script>
<script>
    $(function() {
       setInterval("toAllPayed()", 5000);
    });

    function toAllPayed() {
        window.location.href = "<%=path %>/pay/all_payed_stock";
    }
</script>
</html>
