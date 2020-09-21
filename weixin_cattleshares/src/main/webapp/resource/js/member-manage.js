var Config = {
		data:100,
		isClick:false
}
$(function() {

	$("#txtBeginDate").calendar({
		controlId: "divDate", // 弹出的日期控件ID，默认: $(this).attr("id") + "Calendar"
		speed: 200, // 三种预定速度之一的字符串("slow", "normal", or "fast")或表示动画时长的毫秒数值(如：1000),默认：200
		complement: true, // 是否显示日期或年空白处的前后月的补充,默认：true
		readonly: true, // 目标对象是否设为只读，默认：true
		upperLimit: new Date(), // 日期上限，默认：NaN(不限制)
		lowerLimit: new Date("2011/01/01"), // 日期下限，默认：NaN(不限制)
		callback: function() { // 点击选择日期后的回调函数
		}
	});
	$("#txtEndDate").calendar();
});


$('.close').click(function() {
		$('.money-operate').slideUp();
		$('.back').fadeOut();
	})
	
$('.close').click(function() {
	$('.change-umessage').slideUp();
	$('.back').fadeOut();
})


$('.close').click(function() {
	$('.member-delay').slideUp();
	$('.back').fadeOut();
})
$(document).ready(function() {
	getUserList(1);
	currentPage = 1;
	$("#jqueryPage").pagination({
		count: Config.data, //总数
		size: 2, //每页数量
		index: 1, //当前页
		lrCount: 3, //当前页左右最多显示的数量
		lCount: 1, //最开始预留的数量
		rCount: 1, //最后预留的数量
		callback: function(options) {
			if(isClick) {
				currentPage = options.index;
				selectByCommand();
			} else {
				getUserList(options.index);
			}

			//options.count = 300;
			//return options;
		},
		beforeRender: function(jA) {}
	});
});
//获取用户列表
function getUserList(current) {
	$.ajax({
		type: "get",
		url: "http://localhost:8080/CattleShares/userManager/getUserList",
		data: {
			current: current
		},
		async: false,
		success: function(data) {
			if(data.success) {
				alert(data.obj.records.length);
				Config.data = data.obj.total;
				xunhuan(data);
			} else {
				alert("数据显示失败~请刷新");
				return;
			}
		},
		error: function() {
			alert('信息加载失败~');
			return;
		}
	});
}

//获取用户资金
function getCurrentUserCapital(obj) {
	$('.money-operate').slideDown();
	$('.back').fadeIn();
	$('#hiddenData1').val($(obj).parent().siblings()[2].innerText);
	var acceptId = $(obj).parent().siblings()[2].innerText;
	$.ajax({
		type: "get",
		url: "http://localhost:8080/CattleShares/userManager/getCapital",
		async: true,
		data: {
			acceptId: acceptId,

		},
		success: function(data) {
			if(data.success) {
				$("#gold").text(data.obj.gold);
				$("#mark").text(data.obj.mark);
			}
		},
		error: function() {
			alert('信息加载失败~');
			return;
		}
	});
}


function xunhuan(data){
	var str = "";
	$('#list').html("");
	for(var i = 0; i < data.obj.records.length; i++) {
		str += '<tr><td style="display: table-cell;vertical-align: middle;"><label class="checkbox checkbox-inline" for="checkbox2">' +
			'<input type="checkbox" id="checkbox2" data-toggle="checkbox" name="test" value="' + data.obj.records[i].inviAcceptuserid + '"></label></td>' +
			'<input type="hidden" id="hiddenGrade" value="' + data.obj.records[i].grade + '"/>'+
//			'<input type="hidden" id="hiddenVipStatus" value="' + data.obj.records[i].vipStatus + '"/>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].inviAcceptuserid + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].inviAcceptuser + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].inviAcceptmobile + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].inviRegisttime + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].userName + '</td>';
		
		if(data.obj.records[i].grade == 0) {
			var grade = "普通用户";
		} else if(data.obj.records[i].grade == 1) {
			var grade = "普通会员";
		} else {
			var grade = "合作用户";
		}
		
		str += '<td style="display: table-cell;vertical-align: middle;">' + grade + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].endVipTime + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].inviGold + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].inviMark + '</td>' +
			'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].count + '</td>' +
			'<td class="member-operation"><input class="" type="button" name="" id="money-manage" value="资金管理" onclick="getCurrentUserCapital(this)"/>' +
			'<input type="button" name="" id="mamber-delay" value="会员延期" onclick=VIP_Info(this)><br />' +
			'<input type="button" name="" id="user_message" value="用户信息" onclick="setUserInfo(this)"/></td></tr>';
	}
	
	$("#list").append(str);
}




//资金操作事件
function Capital_Operation() {
	var userId = $('#hiddenData1').val();
	var operId = $("input[name='money-opera']:checked").val();
	var capiId = $("input[name='money-type']:checked").val();
	var money = $('#recharge-input').val().trim();
	if(money == "") {
		alert("未输入金额（积分）");
		return;
	}
	var remark = $('#remark').val();
	if(remark == "") {
		alert("未填写备注信息！");
		return;
	}
	if(operId == 1) {
		if(capiId == 0) {
			var currentGold = $("#gold").text();
			if(currentGold < money) {
				alert("所扣金币大于当前用户所拥有金币！");
				return;
			}
		}
		if(capiId == 1) {
			var currentMark = $("#mark").text();
			if(currentMark < money) {
				alert("所扣积分大于当前用户所拥有积分！");
				return;
			}
		}
	}
	$.ajax({
		type: "post",
		url: "http://localhost:8080/CattleShares/userManager/capital_Operation",
		async: true,
		data: {
			userId: userId,
			operId: operId,
			capiId: capiId,
			money: money,
			remark: remark
		},
		success: function(data) {
			if(data.success) {
				alert("操作成功~");
				$('.money-operate').slideUp();
				$('.back').fadeOut();
				$('#recharge-input').val("");
				$('#remark').val("");
				getUserList(1);
			}
		},
		error: function() {
			alert('操作失败，请耐心重试~');
			return;
		}
	});
}

//获取待修改用户信息
function setUserInfo(obj) {
	$('.change-umessage').slideDown();
	$('.back').fadeIn();
	$("#userName").text($(obj).parent().siblings()[3].innerText);
	$("#userId").text($(obj).parent().siblings()[2].innerText);
	$("#phone").val($(obj).parent().siblings()[4].innerText);
	var acceptId = $(obj).parent().siblings()[2].innerText;
	$.ajax({
		type: "get",
		url: "http://localhost:8080/CattleShares/userManager/getCapital",
		async: true,
		data: {
			acceptId: acceptId
		},
		success: function(data) {
			if(data.success) {
				var hiddenGrade = data.obj.grade;
				if(hiddenGrade == 0) {
					document.getElementById("selectGrade").value = hiddenGrade;
				} else if(hiddenGrade == 1) {
					document.getElementById("selectGrade").value = hiddenGrade;
				} else {
					document.getElementById("selectGrade").value = hiddenGrade;
				}
				var hiddenVipStatus = data.obj.vipStatus;
				if(hiddenVipStatus == 0) {
					document.getElementById("selectVipStatus").value = hiddenVipStatus;
				} else if(hiddenVipStatus == 1) {
					document.getElementById("selectVipStatus").value = hiddenVipStatus;
				} else {
					document.getElementById("selectVipStatus").value = hiddenVipStatus;
				}
			}
		},
		error: function() {
			alert('信息加载失败~');
			return;
		}
	});
}

//修改事件
function Update_UserInfo() {
	var userId = $("#userId").text();
	var userName = $("#userName").text();
	var phone = $("#phone").val();
	var grade = $("#selectGrade").val();
	var vipStatus = $("#selectVipStatus").val();
	alert(userId+" "+userName+" "+phone+" "+grade+" "+vipStatus);
	$.ajax({
		type: "post",
		url: "http://localhost:8080/CattleShares/userManager/update_UserInfo",
		async: true,
		data: {
			userId: userId,
			userName:userName,
			phone: phone,
			grade: grade,
			vipStatus: vipStatus
		},
		success: function(data) {
			if(data.success) {
				alert("修改成功~");
				$('.change-umessage').slideUp();
				$('.back').fadeOut();
				getUserList(1);
			}
		},
		error: function() {
			alert('修改失败~');
			return;
		}
	});
}

//会员信息渲染
function VIP_Info(obj, endVipTime) {
	$('.member-delay').slideDown();
	$('.back').fadeIn();
	$('#hiddenData2').val($(obj).parent().siblings()[2].innerText)
	$('#endVipTime').text(endVipTime);
	var acceptId = $(obj).parent().siblings()[2].innerText;
	$.ajax({
		type: "get",
		url: "http://localhost:8080/CattleShares/userManager/getCapital",
		async: false,
		data: {
			acceptId: acceptId
		},
		success: function(data) {
			if(data.success) {
				$('#endVipTime').text(data.obj.endVipTime);
			}
		},
		error: function() {
			alert('信息加载失败~');
			return;
		}
	});
}

//会员延期事件
function VIP_Delay() {
	var userId = $('#hiddenData2').val();
	var delay_time = $('#selectData').val();
	$.ajax({
		type: "post",
		url: "http://localhost:8080/CattleShares/userManager/vip_Delay",
		async: true,
		data: {
			userId: userId,
			delay_time: delay_time
		},
		success: function(data) {
			if(data.success) {
				alert("延期成功~");
				$('.member-delay').slideUp();
				$('.back').fadeOut();
				getUserList(1);
				return;
			} else {
				alert("莫名错误，请刷新重试！");
				return;
			}
		},
		error: function() {
			alert('延期失败,请重试~');
			return;
		}
	});
}

$("#checkbox").click(function() {
	if($('#checkbox').is(':checked')) {
		$("input[name='test']").attr("checked", true);
	}
	if(!$('#checkbox').is(':checked')) {
		$("input[name='test']").removeAttr("checked");
	}
})

//删除会员
function deleteAllUser() {
	var chk_value = [];
	$('input[name="test"]:checked').each(function() {
		
		chk_value.push($(this).val());
	});
	if(chk_value.length == 0) {
		alert("您没有选中内容！");
		return;
	}
	alert(chk_value);
	$.ajax({
		type: "post",
		url: "http://localhost:8080/CattleShares/userManager/deleteAllUser",
		async: true,
		data: {
			idList: chk_value.join(",")
		},
		success: function(data) {
			if(data.success) {
				alert("删除成功~");
				getUserList(1);
				return;
			}
		},
		error: function() {
			alert("删除失败,请耐心重试~");
			return;
		}
	});
}

function selectByCommand() {

	var selectId = $("#selectId").val();
	var selectName = $("#selectName").val();
	var selectPhone = $("#selectPhone").val();
	var selectGrade2 = $("#selectGrade2").val();
	var startTime = $("#startTime").val();
	var endTime = $("#endTime").val();
	if(endTime == "") {
		//根据会员状态查询
		if(selectId == "" && selectName == "" && selectPhone == "" && startTime == "") {
			Config.isClick = true;
			$.ajax({
				type: "get",
				url: "http://localhost:8080/CattleShares/userManager/getSelectUserSatate",
				async: true,
				data: {
					userState: selectGrade2,
					current: currentPage
				},
				success: function(data) {
					if(data.success) {
						Config.data = data.obj.total;
						xunhuan(data);
					} else {
						alert("数据显示失败~请刷新");
						return;
					}
				},
				error: function() {
					alert("请求失败,请耐心重试~");
					return;
				}
			});
		} else {
			alert(currentPage);
			Config.isClick = true;
			alert();
			$.ajax({
				type: "get",
				url: "http://localhost:8080/CattleShares/userManager/selectByCommand",
				async: false,
				data: {
					inviAcceptmobile:selectPhone,
					inviAcceptuserid:selectId,
					inviAcceptuser:selectName,
					//vipManage: $("#qqq").serialize(),
					current: currentPage
				},
				success: function(data) {
					if(data.success) {
						Config.data = data.obj.total;
						xunhuan(data);
					} else {
						alert("数据显示失败~请刷新");
						return;
					}
				},
				error: function() {
					alert("查询失败,请耐心重试~");
					return;
				}
			});
		}
	}

	//根据时间间隔查询用户

	if(startTime != "" && endTime != "") {
		Config.isClick = true;
		$.ajax({
			type: "get",
			url: "http://localhost:8080/CattleShares/userManager/getSelectTime",
			async: true,
			data: {
				firstTime: startTime,
				lastTime: endTime,
				current: currentPage
			},
			success: function(data) {
				if(data.success) {
					Config.data = data.obj.total;
					xunhuan(data);
				} else {
					alert("数据显示失败~请刷新");
					return;
				}
			},
			error: function() {
				alert("请求失败,请耐心重试~");
				return;
			}
		});
	}

}