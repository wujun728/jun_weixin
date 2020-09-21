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
    <title>已支付</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
</head>
<body>
<div class="row none-box">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 none-box">
        <img src="<%=path %>/${applicationScope.logo_img}" class="img-responsive"/>
    </div>
</div>
<div class="row none-box">
    <div class="col-xs-12 col-sm-12 com-md-12 col-lg-12">
        <h4>
            欢迎您：${sessionScope.user.wechatNickname}
        </h4>
        <p>您共支付${requestScope.total_fee_yuan}元参与抽奖！</p>
        <h5>汽车大奖</h5>
        <p>
            <c:choose>
                <c:when test="${requestScope.prized >= 1}">
                    恭喜您，您中了汽车大奖！活动主办方会通过您预留的手机号通知您领取奖品！
                </c:when>
                <c:otherwise>
                    您未中奖！
                </c:otherwise>
            </c:choose>
        </p>
        <br />
        <h5>原始股大奖</h5>
        <p>
            <c:choose>
                <c:when test="${requestScope.prized_stock >= 1}">
                    恭喜您，您中原始股奖了！活动主办方会通过您预留的手机号通知您领取奖品！
                </c:when>
                <c:otherwise>
                    您未中奖！
                </c:otherwise>
            </c:choose>
        </p>
    </div>
</div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
</html>
