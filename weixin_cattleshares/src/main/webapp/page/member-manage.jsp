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
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/css/member-manage.css" />
		<link rel="stylesheet" href="${pageContext.request.contextPath}/resource/js/bootstrap/js/My97DatePickerBeta/My97DatePicker/skin/WdatePicker.css" />
		<title>会员管理</title>
		<style>
.pager{height:30px;line-height:30px;font-size: 12px;margin: 25px 0px;text-align: center;color: #2E6AB1;overflow: hidden;}
.pager a{border:1px solid #9AAFE5;color:#2E6AB1;margin:0px 5px;padding:5px 8px;text-decoration: none;}
.pager a.hover,.pager a.active{background-color:#2E6AB1;border-color:#000080;color:#FFF;}
.pager a.disabled{color:#C8CDD2;cursor:auto;}
</style>

	</head>

	<body>
		<div class="manage-content">
			<form id="qqq">
			<div class="search-top">
				ID：<input class="usermessage" type="" name="inviAcceptuserid" id="selectId" value="" /> 
				用户名：<input class="usermessage" type="" name="inviAcceptuser" id="selectName" value="" /> 
				手机号：<input class="usermessage" type="" name="inviAcceptmobile" id="selectPhone" value="" />
				会员级别：
				<select class="member-select select" name="grade" id="selectGrade2">
					<option value="0">普通用户</option>
					<option value="1">普通会员</option>
					<option value="2">合作用户</option>
				</select>
				注册时间：
				<!--<input id="txtBeginDate" type="" name="" value="" readonly />—
				<input id="txtEndDate" type="" name="" value="" />-->
				<input class="Wdate" type="text" name="inviRegisttime" id="startTime" value="" onclick="WdatePicker()" />&nbsp;-
				<input class="Wdate" type="text" name="" id="endTime" value="" onclick="WdatePicker()" />
				<button id="search" class="btn btn-color" onclick="selectByCommand()">
								<i class="small-icon small-search"></i>
								查询</button>
			</div>
			</form>
			
			<table class="table border" id="tb">
			<thead>
				<tr class="firstline">
					<th></th>
					<th>ID</th>
					<th>用户名</th>
					<th>手机号</th>
					<th>注册时间</th>
					<th>邀请人</th>
					<th>会员级别</th>
					<th>到期时间</th>
					<th>金币</th>
					<th>积分</th>
					<th>邀请人数</th>
					<th>操作</th>
				</tr>
				</thead>
				<tbody id="list">
					
				</tbody>
				<tr>
					<td>
						<label class="checkbox checkbox-inline" for="checkbox" style="margin-top: 7px;">
                        		<input type="checkbox" value="" id="checkbox" data-toggle="checkbox" >
							</label>
					</td>
					
					<td class="all" style="padding-top: 14px;border-top: none;">全选</td>
					
					<td class="btn-focus" colspan="10" style="height: 45px;text-align: right;">
						<button class="btn btn-color" onclick="AutomateWPS('tb')">
								<i class="small-icon small-export"></i>
								导出</button>
						<button class="btn btn-red" style="margin-right: 5px;" onclick="deleteAllUser()">
									<img src="${pageContext.request.contextPath}/resource/img/myimg/delete-btn.png"/>
								删除</button>

					</td>

				</tr>
				<tr>
					<td colspan="12">
						<div class="jqueryPage" id="jqueryPage" style="float: right;">
							
						</div>						
					</td>
				</tr>
			</table>
		</div>
		<div class="content-fade money-operate">
			
			<div class="fade-top">
				<p>资金操作</p>
				<i class="small-icon small-close close"></i>
			</div>
			<div class="fade-content">
				<input type="hidden" id="hiddenData1" value=""/>
				<div>
					<p>资金操作：</p>
					<input type="radio" name="money-opera" id="recharge" value="0" checked="checked"/>
					<label class="label-recharge" for="recharge">充值</label>
					<input type="radio" name="money-opera" id="chargebacks" value="1" />
					<label for="chargebacks">扣款</label>
				</div>
				<div>
					<p>账户余额：</p>
					<span id="gold">0.00</span>金币
					<span id="mark">0.00</span>积分
				</div>
				<div>
					<p>资金类型：</p>
					<input type="radio" name="money-type" id="money" value="0" checked="checked"/>
					<label class="label-recharge" for="money">金币</label>
					<input type="radio" name="money-type" id="integration-radio" value="1" />
					<label for="integration-radio">积分</label>
				</div>
				<div>
					<p>充值金额：</p>
					<input class="input-style" type="text" name="" id="recharge-input" onkeyup="if(isNaN(value))execCommand('undo')"/>
				</div>
				<div class="remark">
					<p>备注：</p>
					<textarea class="input-style" cols="30" rows="3" id="remark" class=""></textarea>
				</div>
				<button class="btn btn-color btn-addconfirm" onclick="Capital_Operation()">
					<i class="small-icon small-ok"></i>
				确定</button>
			</div>
		</div>

		<div class="content-fade change-umessage">
			<div class="fade-top">
				<p>修改用户信息</p>
				<i class="small-icon small-close close"></i>
			</div>
			<div class="fade-content">
				<div>
					<p>用户名：</p>
					<span id="userName">sldf</span>
				</div>
				<div>
					<p>账户ID：</p>
					<span id="userId">1223545</span>
				</div>
				<div>
					<p>手机号码：</p>
					<input class="input-style" type="text" name="" id="phone" value="" />
				</div>
				<div>
					<p>会员级别：</p>
					<select class="select" id="selectGrade">
						<option value="0">普通用户</option>
						<option value="1">普通会员</option>
						<option value="2">合作用户</option>
					</select>
				</div>
				<div>
					<p>注册状态：</p>
					<select class="select" id="selectVipStatus">
						<option value="0">未开通</option>
						<option value="1">已开通</option>
						<option value="2">已过期</option>
					</select>
				</div>
				<button class="btn btn-color btn-addconfirm" onclick="Update_UserInfo()">
					<i class="small-icon small-ok"></i>
				确定</button>
			</div>
		</div>

		<div class="content-fade member-delay">
			<div class="fade-top">
				<p>会员延期</p>
				<i class="small-icon small-close close"></i>
			</div>
			<div class="fade-content">
				<input type="hidden" id="hiddenData2" value=""/>
				<div class="date-time">
					<p style="width: 110px;">当前用户到期时间：</p>
					<span id="endVipTime">2016-10-10</span>
				</div>
				<div>
					<p>会员延期：</p>
					<select class="select" id="selectData">
						<option value="1">一天</option>
						<option value="2">二天</option>
						<option value="3">三天</option>
						<option value="4">四天</option>
						<option value="5">五天</option>
						<option value="6">六天</option>
						<option value="7">七天</option>
						<option value="8">八天</option>
						<option value="9">九天</option>
						<option value="10">十天</option>
						<option value="11">十一天</option>
						<option value="12">十二天</option>
						<option value="13">十三天</option>
						<option value="14">十四天</option>
						<option value="15">十五天</option>
						<option value="16">十六天</option>
						<option value="17">十七天</option>
						<option value="18">十八天</option>
						<option value="19">十九天</option>
						<option value="20">二十天</option>
						<option value="21">二十一天</option>
						<option value="22">二十二天</option>
						<option value="23">二十三天</option>
						<option value="24">二十四天</option>
						<option value="25">二十五天</option>
						<option value="26">二十六天</option>
						<option value="27">二十七天</option>
						<option value="28">二十八天</option>
						<option value="29">二十九天</option>
						<option value="30">三十天</option>
					</select>
				</div>
				<button class="btn btn-color btn-addconfirm" onclick="VIP_Delay()">
					<i class="small-icon small-ok" ></i>
				确定</button>
			</div>
		</div>
		<div class="back"></div>
		<script src="${pageContext.request.contextPath}/resource/js/bootstrap/js/bootstrap.min.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/jquery/jquery-3.0.0.min.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/bootstrap/js/My97DatePickerBeta/My97DatePicker/WdatePicker.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/member-manage.js"></script>
		<script src="${pageContext.request.contextPath}/resource/js/bootstrap/jqueryPage.js"></script>
	</body>

</html>