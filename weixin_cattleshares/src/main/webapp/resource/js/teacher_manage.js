
$(document).ready(function() {
	selectTechList();
})

function selectTechList() {
	$('#demo').html("");
	$.ajax({
		type: "get",
		url: "http://localhost:8080/CattleShares/teacher/selectTechList?current=1",
		async: true,
		success: function(data) {
			if(data.success) {
				for(var i = 0; i < data.obj.records.length; i++) {
					var str = "";
					str += '<tr><td style="display: table-cell;vertical-align: middle;"><label class="checkbox checkbox-inline" for="checkbox2">' +
						'<input type="checkbox" value="' + data.obj.records[i].techId + '" id="checkbox2" name="test" data-toggle="checkbox"></label></td>' +
						'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].techNick + '</td>' +
						'<td style="display: table-cell;vertical-align: middle;"><img class="teach-img" src="' + data.obj.records[i].techHead + '" /></td>' +
						'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].techTitle + '</td>' +
						'<td style="display: table-cell;vertical-align: middle;"><p class="title">' + data.obj.records[i].techLabel + '</p></td>' +
						'<td style="display: table-cell;vertical-align: middle;"><div class="introduce" style="">' + data.obj.records[i].techIntro + '</td>' +
						'<td style="display: table-cell;vertical-align: middle;"><p class="goodat">' + data.obj.records[i].techSpecialty + '</p></td>' +
						'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].tchCertificate + '</td>' +
						'<td style="display: table-cell;vertical-align: middle;">' + data.obj.records[i].techWorkage + '</td>' +
						'<td style="display: table-cell;vertical-align: middle;"><i class="small-icon small-change" onclick="getTeacherInfo(' + data.obj.records[i].techId + ')"></i>' +
						'<i class="small-icon small-deleteline" onclick="deleteTeacher(' + data.obj.records[i].techId + ')"></i></td></tr>';
					
					$("#demo").append(str);
				}
			} else {
				alert("加载信息失败，请重新操作~");
				return;
			}
		},
		error: function() {
			alert('请求失败，请重试~');
		}
	});
}

function deleteTeacher(id) {
	$.ajax({
		type: "post",
		url: "http://localhost:8080/CattleShares/teacher/deleteTeacher",
		async: true,
		data: {
			id: id
		}, //注意格式
		success: function(data) {
			if(data.success) {
				alert("删除成功~");
				selectTechList();
			} else {
				alert("删除失败！");
				return;
			}
		},
		error: function() {
			alert('信息提交失败~');
		}
	});
}

function updateTeacherInfo() {
	var id=$("#techid").val();
	var techNick = $("#techNick2").val();
	var techHead = $(".mark2").attr('src');
	var techTitle = $("#techTitle2").val();
	var techSpecialty = $("#techSpecialty2").val();
	var techMechanism = $("#techMechanism2").val();
	var tchCertificate = $("#tchCertificate2").val();
	var techWorkage = $("#techWorkage2").val();
	var techIntro = $("#techIntro2").val();
	var techLabel = $("#techLabel2").val();
	var infos = [techNick, techHead, techTitle, techLabel, techIntro, techMechanism, tchCertificate, techWorkage, techSpecialty];
	var isNull = checkNull(infos);
	if(!isNull) {
		alert("请填写完整信息~");
		return;
	}
	$.ajax({
		type: "post",
		url: "http://localhost:8080/CattleShares/teacher/updateTeacherInfo",
		async: true,
		data: {
			id:id,
			techNick:techNick,
			techHead:techHead,
			techTitle:techTitle,
			techLabel:techLabel,
			techIntro:techIntro,
			techMechanism:techMechanism,
			tchCertificate:tchCertificate,
			techWorkage:techWorkage,
			techSpecialty:techSpecialty
		},//注意格式
		success: function(data) {
			if(data.success) {
				alert("修改成功~");
				$('.content-fade2').slideUp();
				$('.back').fadeOut();
				selectTechList();
			} else {
				alert("修改失败！");
				return;
			}
		},
		error: function() {
			alert('信息提交失败~');
			return;
		}
	});
}

function getTeacherInfo(id) {
	$.ajax({
		type: "get",
		url: "http://localhost:8080/CattleShares/teacher/getTeacherInfo",
		async: true,
		data: {
			id: id
		},
		success: function(data) {
			if(data.success) {
				$('.content-fade2').slideDown();
				$('.back').fadeIn();
				$("#techid").val(data.obj.techId);
				$("#techNick2").val(data.obj.techNick);
				$('.mark2').attr('src', data.obj.techHead);
				$("#techTitle2").val(data.obj.techTitle);
				$("#techSpecialty2").val(data.obj.techSpecialty);
				$("#techMechanism2").val(data.obj.techMechanism);
				$("#tchCertificate2").val(data.obj.tchCertificate);
				$("#techWorkage2").val(data.obj.techWorkage);
				$("#techIntro2").val(data.obj.techIntro);
				$("#techLabel2").val(data.obj.techLabel);
			} else {
				alert("加载信息失败，请重新操作~");
				return;
			}
		},
		error: function() {
			alert('信息加载失败~');
		}
	});
}

$("#addTeacher").click(function() {
	$('.content-fade').slideDown();
	$('.back').fadeIn();
});
$(".close").click(function() {
	$('.content-fade').slideUp();
	$('.content-fade2').slideUp();
	$('.back').fadeOut();
})
//全选


$("#checkbox").click(function() {
	if($('#checkbox').is(':checked')){
		$("input[name='test']").attr("checked",true);
	}
	if(!$('#checkbox').is(':checked')){
		$("input[name='test']").removeAttr("checked");
	}
})


$("#deleteAllTech").click(function() {
	var chk_value =[]; 
	$('input[name="test"]:checked').each(function() {
		chk_value.push($(this).val());
	});
	if(chk_value.length==0){
		alert("您没有选中内容！");
		return;
	}
	$.ajax({
		type:"post",
		url:"http://localhost:8080/CattleShares/teacher/deleteAllTech",
		async:true,
		data: {
			idList:chk_value.join(",")
		},
		success: function(data) {
			if(data.success) {
				alert("删除成功!");
				selectTechList();
			} else {
				alert('删除失败~');
				return;
			}
		},
		error: function() {
			alert('删除失败~');
			return;
		}
	});
	
	
	
	
});

function addTeacher() {
	var techNick = $("#techNick").val();
	var techHead = $(".mark").attr('src');
	if(techHead == "/CattleShares/resource/img/add.png") {
		alert("请上传头像");
		return;
	}
	var techTitle = $("#techTitle").val();
	var techSpecialty = $("#techSpecialty").val();
	var techMechanism = $("#techMechanism").val();
	var tchCertificate = $("#tchCertificate").val();
	var techWorkage = $("#techWorkage").val();
	var techIntro = $("#techIntro").val();
	var techLabel = $("#techLabel").val();
	var infos = [techNick, techHead, techTitle, techLabel, techIntro, techMechanism, tchCertificate, techWorkage, techSpecialty];
	var isNull = checkNull(infos);
	if(!isNull) {
		alert("请填写完整信息~");
		return;
	}
	$.ajax({
		type: "post",
		url: "http://localhost:8080/CattleShares/teacher/addTeacher",
		async: true,
		data: {
			techNick:techNick,
			techHead:techHead,
			techTitle:techTitle,
			techLabel:techLabel,
			techIntro:techIntro,
			techMechanism:techMechanism,
			tchCertificate:tchCertificate,
			techWorkage:techWorkage,
			techSpecialty:techSpecialty
		},
		success: function(data) {
			if(data.success) {
				alert("添加成功!");
				$('.content-fade2').slideUp();
				$('.back').fadeOut();
				selectTechList();
			} else {
				alert('添加失败~');
			}
		},
		error: function() {
			alert('添加失败~');
		}
	});
}

function checkNull(infos) {
	for(var i = 0; i < infos.length; i++) {
		if(infos[i] == "") {
			return false;
		}
	}
	return true;
}

function upload(id) {
	var a = id.id;
	var itemUrl5Opt = getItemUrl5Option(a);
	var itemUrl5Btn = id.id;
	itemUrl5Opt.browse_button = itemUrl5Btn;
	new QiniuJsSDK().uploader(itemUrl5Opt);
}


function getItemUrl5Option(id) {
	var option = uploadOption();
	option.domain = 'http://jzniu-test.jzniu.cn';
	option.uptoken = 'XMk-ueUhwy6WOTkUp8swshoNTWKxSiC_bW_jMXVM:z26HiikmLsFYWyHpTJ1QqjUN4t0=:eyJzY29wZSI6Imp6bml1LXRlc3QiLCJpbnNlcnRPbmx5IjoxLCJmc2l6ZUxpbWl0IjoyMDk3MTUyLCJtaW1lTGltaXQiOiJpbWFnZS8qIiwiZGVhZGxpbmUiOjI5NTYzMjc4MDl9';
	option.browse_button = id;
	option.max_retries = 0;

	option.init = {
		'FileUploaded': function(up, file, info) {
			var res = $.parseJSON(info);
			var imgUrl = up.getOption('domain') + '/' + res.key;
			$('.mark').attr('src', imgUrl);

		},
		'Error': function(up, err, errTip) {
			alert('上传失败！');
		}
	};

	return option;
}

function uploadOption() {
	return {
		runtimes: 'html5,flash,html4', //上传模式,依次退化
		browse_button: 'btnPickfiles', //上传选择的点选按钮ID，**必需**
		unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
		// save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
		domain: '', //bucket 域名，下载资源时用到，**必需**
		container: 'show', //上传区域DOM ID，默认是browser_button的父元素，
		max_file_size: '2mb', //最大文件体积限制
		flash_swf_url: '/js/bootstrap/js/Moxie.swf', //引入flash,相对路径
		max_retries: 1, //上传失败最大重试次数
		dragdrop: true, //开启可拖曳上传
		drop_element: 'show', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		chunk_size: '4mb', //分块上传时，每片的体积
		auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
		multi_selection: false,
		filters: {
			mime_types: [{
				title: 'Image files',
				extensions: 'jpg,gif,png'
			}],
			max_file_size: "1mb",
			prevent_duplicates: true
		},
		init: {
			'FilesAdded': function(up, files) {
				plupload.each(files, function(file) {
					var progress = new FileProgress(file, 'fsUploadProgress');
					progress.setStatus("等待...");
				});
				// plupload.each(files, function(file) {
				//  // 文件添加进队列后,处理相关的事情
				// });
			},
			'BeforeUpload': function(up, file) {
				//alert("BeforeUpload");
				// 每个文件上传前,处理相关的事情
				// return confim('确定要上传图片');
			},
			'UploadProgress': function(up, file) {
				// 每个文件上传时,处理相关的事情，转菊花、显示进度等
				//alert("UploadProgress");
			},
			'FileUploaded': function(up, file, info) {
				//alert("FileUploaded");
			},
			'Error': function(up, err, errTip) {
				//上传出错时,处理相关的事情
				alert('上传失败！');
			},
			'UploadComplete': function() {
				//队列文件处理完毕后,处理相关的事情
			},
			'Key': function(up, file) {
				// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
				// 该配置必须要在 unique_names: false , save_key: false 时才生效

				var key = "";
				// do something with key here
				return key;
			}
		}
	};
};

function upload2(id) {
	var a = id.id;
	var itemUrl5Opt = getItemUrl5Option2(a);
	var itemUrl5Btn = id.id;
	itemUrl5Opt.browse_button = itemUrl5Btn;
	new QiniuJsSDK().uploader(itemUrl5Opt);
}


function getItemUrl5Option2(id) {
	var option = uploadOption2();
	option.domain = 'http://jzniu-test.jzniu.cn';
	option.uptoken = 'XMk-ueUhwy6WOTkUp8swshoNTWKxSiC_bW_jMXVM:z26HiikmLsFYWyHpTJ1QqjUN4t0=:eyJzY29wZSI6Imp6bml1LXRlc3QiLCJpbnNlcnRPbmx5IjoxLCJmc2l6ZUxpbWl0IjoyMDk3MTUyLCJtaW1lTGltaXQiOiJpbWFnZS8qIiwiZGVhZGxpbmUiOjI5NTYzMjc4MDl9';
	option.browse_button = id;
	option.max_retries = 0;

	option.init = {
		'FileUploaded': function(up, file, info) {
			var res = $.parseJSON(info);
			var imgUrl = up.getOption('domain') + '/' + res.key;
			$('.mark2').attr('src', imgUrl);

		},
		'Error': function(up, err, errTip) {
			alert('上传失败！');
		}
	};

	return option;
}

function uploadOption2() {
	return {
		runtimes: 'html5,flash,html4', //上传模式,依次退化
		browse_button: 'btnPickfiles', //上传选择的点选按钮ID，**必需**
		unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
		// save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
		domain: '', //bucket 域名，下载资源时用到，**必需**
		container: 'show', //上传区域DOM ID，默认是browser_button的父元素，
		max_file_size: '2mb', //最大文件体积限制
		flash_swf_url: '/js/bootstrap/js/Moxie.swf', //引入flash,相对路径
		max_retries: 1, //上传失败最大重试次数
		dragdrop: true, //开启可拖曳上传
		drop_element: 'show', //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
		chunk_size: '4mb', //分块上传时，每片的体积
		auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
		multi_selection: false,
		filters: {
			mime_types: [{
				title: 'Image files',
				extensions: 'jpg,gif,png'
			}],
			max_file_size: "1mb",
			prevent_duplicates: true
		},
		init: {
			'FilesAdded': function(up, files) {
				plupload.each(files, function(file) {
					var progress = new FileProgress(file, 'fsUploadProgress');
					progress.setStatus("等待...");
				});
				// plupload.each(files, function(file) {
				//  // 文件添加进队列后,处理相关的事情
				// });
			},
			'BeforeUpload': function(up, file) {
				//alert("BeforeUpload");
				// 每个文件上传前,处理相关的事情
				// return confim('确定要上传图片');
			},
			'UploadProgress': function(up, file) {
				// 每个文件上传时,处理相关的事情，转菊花、显示进度等
				//alert("UploadProgress");
			},
			'FileUploaded': function(up, file, info) {
				//alert("FileUploaded");
			},
			'Error': function(up, err, errTip) {
				//上传出错时,处理相关的事情
				alert('上传失败！');
			},
			'UploadComplete': function() {
				//队列文件处理完毕后,处理相关的事情
			},
			'Key': function(up, file) {
				// 若想在前端对每个文件的key进行个性化处理，可以配置该函数
				// 该配置必须要在 unique_names: false , save_key: false 时才生效

				var key = "";
				// do something with key here
				return key;
			}
		}
	};
};

