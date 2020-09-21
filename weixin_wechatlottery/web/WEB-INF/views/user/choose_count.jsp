<%--
  Created by IntelliJ IDEA.
  User: Wang Genshen
  Date: 2017-07-04
  Time: 19:46
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
    <title>中奖次数</title>
    <link href="<%=path %>/plugins/bootstrap/bootstrap.min.css" rel="stylesheet"/>
    <link href="<%=path %>/plugins/sweet-alert/sweet-alert.css" rel="stylesheet"/>
    <link href="<%=path %>/plugins/icheck/skins/line/orange.css" rel="stylesheet"/>
    <link href="<%=path %>/css/main.css" rel="stylesheet" />
    <style>
        .my_div div {
            margin-bottom:5px;
        }
    </style>
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
    </div>
</div>
<div class="row none-box my_div">
    <h4>请选择您的幸运数字，最多选择6个幸运数字，每一个幸运数字需要支付一小笔随机金额，随机金额在0.01-100元间不等</h4>
    <form id="form" action="<%=path %>/user/topay" method="post" onsubmit="return toPay();">
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number0" type="checkbox" name="number" value="1">
            <label id="label0">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number1" type="checkbox" name="number" value="1">
            <label id="label1">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number2" type="checkbox" name="number" value="1">
            <label id="label2">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number3" type="checkbox" name="number" value="1">
            <label id="label3">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number4" type="checkbox" name="number" value="1">
            <label id="label4">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number5" type="checkbox" name="number" value="1">
            <label id="label5">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number6" type="checkbox" name="number" value="1">
            <label id="label6">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number7" type="checkbox" name="number" value="1">
            <label id="label7">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number8" type="checkbox" name="number" value="1">
            <label id="label8">1</label>
        </div>
        <div class="col-xs-4 col-xs-offset-1">
            <input id="number9" type="checkbox" name="number" value="1">
            <label id="label9">1</label>
        </div>
        <button class="btn btn-primary btn-lg col-xs-12">确认幸运数字!</button>
    </form>

</div>
</body>
<script src="<%=path %>/plugins/jquery-3.2.1.min.js"></script>
<script src="<%=path %>/plugins/bootstrap/bootstrap.min.js"></script>
<script src="<%=path %>/plugins/sweet-alert/sweet-alert.min.js"></script>
<script src="<%=path %>/plugins/icheck/icheck.js"></script>
<script>

    function rd(n,m){
        var c = m-n+1;
        return Math.floor(Math.random() * c + n);
    }

    var number = 0;
    $(function() {

        for (var i = 0; i < 10; i++) {
            var value = rd(1, 100);
            $("#number" + i).val(value);
            $("#label" + i).text(value);
        }

        $('input').each(function(){
            var self = $(this),
                label = self.next(),
                label_text = label.text();

            label.remove();
            self.iCheck({
                checkboxClass: 'icheckbox_line-orange',
                radioClass: 'iradio_line-orange',
                insert: '<div class="icheck_line-icon"></div>' + label_text
            });
        });

        $('input').on('ifChecked', function(event){
            number++;
            if (number > 6) {
                swal("您最多可以选取6个幸运数字！", "", "error");
            }
        });

        $('input').on('ifUnchecked', function(event){
            number--;
        });

    });

    function toPay() {
        if (number > 6) {
            swal("您最多可以选取6个幸运数字！", "", "error");
            return false;
        } else if (number <= 0) {
            swal("您最少需要选取1个幸运数字！", "", "error");
            return false;
        }
        return true;
    }
</script>
</html>
