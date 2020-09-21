<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2016/6/17
  Time: 19:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>每日领红包</title>
    <%@include file="../CommonHeader.jsp"%>
</head>
<body>


<div class="page-group">
    <div class="page">
        <header class="bar bar-nav">
            <h1 class="title">每日领红包</h1>
        </header>
        <div class="content">
            <div class="content-padded">
                <h3>${tip}</h3>
            </div>
        </div>
    </div>
</div>

<script>$.init()</script>

</body>
</html>
