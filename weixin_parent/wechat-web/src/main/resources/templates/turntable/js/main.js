var pageSlider, isShare, inputNameArr, inputArr, page1Scroll, isSavingData = false,
	isBegin = false,
	curPrizeNum;
//var isExPrize = false;
var app = {
	$loader_txt: $('.loader_txt'),
	$p1RollFingerBox: $('#p1RollFingerBox'),
	$p1Btn: $('#goBtn'),
	$code_input: $('#code_input'),
	$tel_input: $('#tel_input'),
	$submBtn: $('#submBtn'),
	$failPage: $('#failPage'),
	$failPage1: $('#failPage1'),
	$failTxt: $('#sorryTipsTxt'),
	$failTxt1: $('#sorryTipsTxt1'),
	$prizeImg: $('#prizeImg'),
	$failBackBtn: $('#failBackBtn'),
	$failBackBtn1: $('#failBackBtn1'),
	$shareTipsPage: $('#shareTipsPage'),
	$succeedPage: $('#succeedPage'),
	$inputPage: $('#inputPage'),
	$qrPage: $('.qrPage'),

};
var DataList=['旗舰手机 ','200元购机优惠券','运动蓝牙耳机','免费贴膜服务','充电宝','Wi-Fi上门检测'];
$(document).ready(function() {
	allFrames = [
		'img/bg.jpg',
//		'img/banner.png',
		'img/btnBg.png',
		'img/closeBtn.png',
		'img/cryFace.png',
		'img/fire.png',
//		'img/inputBg.png',
		'img/light.png',
		'img/prRoll.png',
		'img/rotateFinger.png',
//		'img/ruleFooter.png',
		'img/ruleTitle.png',
		'img/shareTips.png',

		'img/successTitle.png',

//		'img/isSubscribeQR.png',
		'img/link.png',
		'img/logo.png',
		'img/myPrizeTitle.png',
		'img/p1Bg.png',
	];
	var loaded = 0;
	for(var i = 0, j = allFrames.length; i < j; i++) {
		var img = new Image;
		img.onload = update;
		img.src = basePath + allFrames[i];
	}
	var percentNum;

	function update() {
		loaded += 1;
		percentNum = Math.ceil((loaded / allFrames.length) * 100);
		//console.log("load: "+percentNum);
		app.$loader_txt.text("loading..." + percentNum + "%");
		if(percentNum == 100) {
			$('.loading-box').animate({
				opacity: "0"
			}, 1200, function(e) {
				$('.loading-box').remove();
			});
		};
	};

	//失败页面 返回btn
	app.$failBackBtn.on("click", function() {
		if(isShare == "share") { //分享按钮
			if(app.$shareTipsPage.hasClass("shareTipsPageMoveIn") == false || app.$shareTipsPage.hasClass("shareTipsPageMoveOut") == true) {
				app.$shareTipsPage.removeClass("shareTipsPageMoveOut").addClass("shareTipsPageMoveIn");
			}
		} else { //返回按钮
			app.$failPage.removeClass("failPageMoveIn").addClass("failPageMoveOut");
		}
	});
	//关闭 分享 提示
	app.$shareTipsPage.on("click", function() {
		app.$shareTipsPage.removeClass("shareTipsPageMoveIn");
	});

	//首页"开始抽奖 go"
	app.$p1Btn.on("click", function() {
		//按钮同一时间只能点击一次。
		if(isBegin) return;
		if(isBegin == false) {
			isBegin = true;
			starGetPrizeFun();
		};
	});
});

//抽奖回调函数
function rotateRollEvent(jsonObj, num) {
	var angelData = [
		0, 60, 120, 180, 240, 300
	];
	data = num;
	var angelNum = Number(angelData[data-1]);

	app.$p1RollFingerBox.css("-webkit-transform", "rotateZ(0deg)");
	console.log("中奖了  prizeId=" + data);
	rotateFunc(jsonObj, data, angelNum);
};

//抽奖返回  回调函数  开始转动转盘
function startGetPrizeCallBackFun(obj) {
	rotateRollEvent(obj, Number(obj.prizeId));
};

//旋转转盘
rotateFunc = function(jsonObj, awards, angle) { //awards:奖项，angle:奖项对应的角度
	app.$p1RollFingerBox.animate({
		rotateZ: (Number(angle) + 1800) + 'deg'
	}, 3000, 'ease-in-out', function() {
		//旋转完毕
		setTimeout(function(e) {
			//已填写资料，显示中奖礼品
			if(userData.isPhone=="true"){//已绑定手机号码
				showSucceedPage(awards);
			}else{
				//弹出资料框
				app.$inputPage.addClass("inputPageMoveIn");
			}
		}, 1000);
	});
};

//错误提示
function showFailTipsEvent(msg, str) {
	isShare = str;
	app.$failTxt.html(msg);
	if(app.$failPage.hasClass("failPageMoveIn") == false || app.$failPage.hasClass("failPageMoveOut") == true) {
		app.$failPage.removeClass("failPageMoveOut").addClass("failPageMoveIn");
	}
	app.$failBackBtn.addClass(str);
};
//错误提示
function showFailTipsEvent1(msg, str) {
	isShare = str;
	app.$failTxt1.html(msg);
	if(app.$failPage1.hasClass("failPageMoveIn") == false || app.$failPage1.hasClass("failPageMoveOut") == true) {
		app.$failPage1.removeClass("failPageMoveOut").addClass("failPageMoveIn");
	}
	app.$failBackBtn1.addClass(str);
};

//提交成功页 显示中奖礼品图片
function showSucceedPage(awards) {
	if(app.$succeedPage.hasClass("succeedPageMoveIn") == false || app.$inputPage.hasClass("succeedPageMoveOut") == true) {
		app.$succeedPage.removeClass("succeedPageMoveOut").addClass("succeedPageMoveIn");
	}
	$(".prizeImg").addClass("prizeImg_" + awards); //显示中奖图片
};


$(function() {
	//弹窗关闭按钮
	$("#succeedCloseBtn").on("click", function() {

		$("#succeedPage").removeClass("succeedPageMoveIn").addClass("succeedPageMoveOut");
	});
	$("#failCloseBtn").on("click", function() {
		$("#failPage").removeClass("failPageMoveIn").addClass("failPageMoveOut");
	});
	$("#failCloseBtn1").on("click", function() {
		$("#failPage1").removeClass("failPageMoveIn").addClass("failPageMoveOut");
	});
	$("#inputPageCloseBtn").on("click", function() {
		$("#inputPage").removeClass("inputPageMoveIn").addClass("inputPageMoveOut");
	});

	$("#ruleCloseBtn").on("click", function() {

		$("#rulePage").removeClass("rulePageMoveIn").addClass("rulePageMoveOut");
	});
	$("#recevieBackBtn").on("click", function() {

		$("#receivePrizePage").removeClass("receivePrizePageMoveIn").addClass("receivePrizePageMoveOut");
	});
	$("#myPrizeBackBtn").on("click", function() {

		$("#myPrizePage").removeClass("myPrizePageMoveIn").addClass("myPrizePageMoveOut");
	});
	$("#ruleBtn").on("click", function() {
		$("#rulePage").removeClass("rulePageMoveOut").addClass("rulePageMoveIn");
	});
});

