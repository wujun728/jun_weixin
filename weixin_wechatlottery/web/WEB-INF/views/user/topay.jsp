<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
    <title>活动支付</title>
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
        <p>您的幸运数字和对应的金额如下</p>
        <table class="table">
            <tr><td>幸运数字</td><td>金额</td></tr>
        <c:forEach items="${requestScope.money_array }" var="money" varStatus="status">
            <tr>
                <td>${requestScope.number_array[status.index ]}</td>
                <td>${money }元<br /></td>
            </tr>

        </c:forEach>
        </table>
        <p>一共需要支付：${requestScope.total_fee_yuan }元</p>
    </div>
</div>
<div class="row none-box">
    <a class="btn btn-primary btn-lg col-xs-12" href="<%=path %>/pay/pay?fee=${requestScope.total_fee}&count=${fn:length(requestScope.money_array )}">确认付款</a>
</div>
<div class="row none-box">
    <div class="col-xs-12">
        <h4>活动说明</h4>
        <p>1、选取幸运数字，支付一定的金额，抽取汽车大奖及原始股票！</p>
    </div>
</div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
</html>
