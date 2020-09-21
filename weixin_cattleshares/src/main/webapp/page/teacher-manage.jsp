<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<meta charset="UTF-8">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resource/js/bootstrap/css/bootstrap.min.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resource/js/bootstrap/css/bootstrap-theme.min.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resource/fonts/font-awesome.min.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resource/css/my.css" />
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/resource/css/teacher-manage.css" />
<title>老师管理</title>
</head>

<body>
	<div class="manage-content">

		<table class="table border">
		
			<thead>
				<tr class="firstline">
					<th></th>
					<th>老师</th>
					<th>头像</th>
					<th>职称</th>
					<th>小标</th>
					<th>简介</th>
					<th>擅长</th>
					<th>资格证</th>
					<th>从业年限</th>
					<th>操作</th>
				</tr>
			</thead>
			
			<tbody id="demo">
			
			
			</tbody>


			<%-- 
			<tr>
				<td style="display: table-cell; vertical-align: middle;"><label
					class="checkbox checkbox-inline" for="checkbox2"> <input
						type="checkbox" value="2" id="checkbox2" name="test"
						data-toggle="checkbox">
				</label></td>
				<td style="display: table-cell; vertical-align: middle;">123456</td>
				<td style="display: table-cell; vertical-align: middle;"><img
					src="${pageContext.request.contextPath}/resource/img/myimg/teacher-head.png" />
				</td>
				<td style="display: table-cell; vertical-align: middle;">12:12</td>
				<td style="display: table-cell; vertical-align: middle;">
					<p class="title">股神</p>
				</td>
				<td style="display: table-cell; vertical-align: middle;">
					<div class="introduce" style="">
						速度快解放和看到回复可是对方看手机方式老师客服开始的减肥开始对房价看到</div>
				</td>
				<td style="display: table-cell; vertical-align: middle;">
					<p class="goodat">短线操作</p>
				</td>
				<td style="display: table-cell; vertical-align: middle;">2016-10-10</td>
				<td style="display: table-cell; vertical-align: middle;">rgergre</td>
				<td style="display: table-cell; vertical-align: middle;"><i
					class="small-icon small-change" onclick="updateTeacherInfo()"></i>
					<i class="small-icon small-deleteline"></i></td>
			</tr>
 --%>
			<tr>
				<td><label class="checkbox checkbox-inline" for="checkbox"
					style="margin-top: 7px;"> <input type="checkbox" value=""
						id="checkbox" data-toggle="checkbox">
				</label></td>
				<td class="all" style="padding-top: 14px; border-top: none;">全选</td>
				<td class="btn-focus" colspan="10"
					style="height: 45px; text-align: right;">
					<button class="btn btn-color" id="addTeacher">
						<i class="small-icon small-add"></i> 新增
					</button>
					<button class="btn btn-red" style="margin-right: 5px;"
						id="deleteAllTech">
						<i class="small-icon small-delete"></i> 删除
					</button>

				</td>

			</tr>
		</table>
	</div>
	<div class="content-fade" style="display: none;">
		<div class="fade-top">
			<p>新增/修改</p>
			<i class="small-icon small-close close"></i>
		</div>
		<div class="fade-content">
			<div class="fade-addmessage">
				<p>老师：</p>
				<input class="input-style" type="text" name="" id="techNick"
					value="" />
			</div>
			<div class="fade-addmessage" id="show">
				<p>选择头像：</p>
				<form>
					<div
						style="display: table-cell; vertical-align: middle; text-align: center; width: 90px; height: 110px; overflow: hidden; border: 1px solid red;"
						id="up" onclick="upload(this)">
						<img class="mark"
							src="${pageContext.request.contextPath}/resource/img/add.png"
							style="max-width: 90px;" />
					</div>
				</form>
			</div>
			<div class="fade-addmessage">
				<p>职称：</p>
				<input class="input-style" type="text" name="" id="techTitle"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>选择小标：</p>
				<select id="techLabel">
					<option>股神</option>
				</select>
			</div>
			<div class="fade-addmessage">
				<p>擅长：</p>
				<input class="input-style" type="text" name="" id="techSpecialty"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>所属机构：</p>
				<input class="input-style" type="text" name="" id="techMechanism"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>资格证：</p>
				<input class="input-style" type="text" name="" id="tchCertificate"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>从业年限：</p>
				<input class="input-style" type="text" name="" id="techWorkage"
					value="" />
			</div>
			<div class="fade-addmessage fade-addmessage-intraduce">
				<p>简介：</p>
				<textarea class="input-style" cols="24" rows="4" id="techIntro"></textarea>
			</div>

			<button class="btn btn-color btn-addconfirm" onclick="addTeacher()">
				<i class="small-icon small-ok"></i> 确定
			</button>
		</div>
	</div>
	
	<div class="content-fade2" style="display: none;">
		<div class="fade-top">
			<p>新增/修改</p>
			<i class="small-icon small-close close"></i>
		</div>
		<div class="fade-content">
			<input class="input-style" type="hidden" name="" id="techid" value="" />
		
			<div class="fade-addmessage">
				<p>老师：</p>
				<input class="input-style" type="text" name="" id="techNick2"
					value="" />
			</div>
			<div class="fade-addmessage" id="show2">
				<p>选择头像：</p>
				<form>
					<div
						style="display: table-cell; vertical-align: middle; text-align: center; width: 90px; height: 110px; overflow: hidden; border: 1px solid red;"
						id="up2" onclick="upload2(this)">
						<img class="mark2"
							src="${pageContext.request.contextPath}/resource/img/add.png"
							style="max-width: 90px;" />
					</div>
				</form>
			</div>
			<div class="fade-addmessage">
				<p>职称：</p>
				<input class="input-style" type="text" name="" id="techTitle2"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>选择小标：</p>
				<select id="techLabel2">
					<option>股神</option>
				</select>
			</div>
			<div class="fade-addmessage">
				<p>擅长：</p>
				<input class="input-style" type="text" name="" id="techSpecialty2"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>所属机构：</p>
				<input class="input-style" type="text" name="" id="techMechanism2"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>资格证：</p>
				<input class="input-style" type="text" name="" id="tchCertificate2"
					value="" />
			</div>
			<div class="fade-addmessage">
				<p>从业年限：</p>
				<input class="input-style" type="text" name="" id="techWorkage2"
					value="" />
			</div>
			<div class="fade-addmessage fade-addmessage-intraduce">
				<p>简介：</p>
				<textarea class="input-style" cols="24" rows="4" id="techIntro2"></textarea>
			</div>

			<button class="btn btn-color btn-addconfirm" onclick="updateTeacherInfo()">
				<i class="small-icon small-ok"></i> 修改
			</button>
		</div>
	</div>
	<div class="back"></div>

	<script
		src="${pageContext.request.contextPath}/resource/js/bootstrap/js/bootstrap.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resource/js/jquery/jquery-3.0.0.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resource/js/bootstrap/js/webuploader.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resource/js/teacher_manage.js"></script>
	<script
		src="${pageContext.request.contextPath}/resource/js/bootstrap/js/plupload.full.min.js"></script>
	<script
		src="${pageContext.request.contextPath}/resource/js/bootstrap/js/global.js"></script>
	<script
		src="${pageContext.request.contextPath}/resource/js/bootstrap/js/qiniu.min.js"></script>


</body>

</html>