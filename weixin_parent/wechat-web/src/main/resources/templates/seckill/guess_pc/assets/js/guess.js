/**
 * Created by lfl on 2018/2/1.
 */
var totalPage = 1;
var curPage = 0;
var list=[];
var countDownInited=false;

var leftHtml1='<div class="un-guess-item-left"> <p class="un-guess-item-left-text1">客观话题</p> <p class="un-guess-item-left-text1">竞猜</p> <div class="un-guess-item-left-line"></div> <p class="un-guess-item-left-text2">活动结束后人工开奖，中奖后根据赔率获得相应的抵扣券金额。</p> </div>';
var leftHtml2='<div class="un-guess-item-left"> <p class="un-guess-item-left-text1"> 主观话题</p> <p class="un-guess-item-left-text1">竞猜</p> <div class="un-guess-item-left-line"></div> <p class="un-guess-item-left-text2">活动结束后由系统自动开奖，默认押注额最少的一方中奖，中奖者根据押注金额比例瓜分总押注额</p> </div>';
var lowright='<div class="un-guess-bet-block"><div class="left"><p class="un-guess-bet-text1">我要投注的积分数：</p><div class="un-guess-bet-tools clearfix"><span class="un-guess-bet-add bet-add"></span><input type="text" class="un-guess-bet-input" disabled><span class="un-guess-bet-reduce bet-reduce"></span></div></div><div class="left"><p class="un-guess-bet-text1" style="min-height: 18px "></p><button class="un-guess-bet-btn">下注</button></div></div>';
var lowright_end='<div class="un-guess-bet-block"><div class="left"><p class="un-guess-bet-text1">我要投注的积分数：</p><div class="un-guess-bet-tools clearfix"><span class="un-guess-bet-add"></span><input type="text" class="un-guess-bet-input" disabled><span class="un-guess-bet-reduce"></span></div></div><div class="left"><p class="un-guess-bet-text1" style="min-height: 18px"></p><button class="un-guess-beted-btn">已结束</button></div></div>';

function scrollTop(){
    return Math.max(
        //chrome
        document.body.scrollTop,
        //firefox/IE
        document.documentElement.scrollTop);
}
function documentHeight(){
    //现代浏览器（IE9+和其他浏览器）和IE8的document.body.scrollHeight和document.documentElement.scrollHeight都可以
    return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);
}
function windowHeight(){
    return (document.compatMode == "CSS1Compat")?
        document.documentElement.clientHeight:
        document.body.clientHeight;
}

function pop(msg,autoclose) {
    autoclose=(autoclose == null ? true : autoclose);
    $(".un-modal-content-text").html(msg);
    $('.un-mask').show();
    if(autoclose){
        setTimeout(function () {
            $('.un-mask').hide();
        },3000)
    }

}

//补0
function pad(num, n) {
    num=num+"";
    if(num.length>=2){
        return num;
    }
    return Array(n - num.length + 1).join(0) + num;
}

//倒计时
function countDown(endTime,cdid) {
    //获取当前时间
    var date = new Date();
    var now = date.getTime();
    //设置截止时间
    endTime = endTime.split("-").join("/");
    var endDate = new Date(endTime);
    var end = endDate.getTime();

    //时间差
    var leftTime = end - now;
    //定义变量 d,h,m,s保存倒计时的时间
    var d, h, m, s;
    var c;
    if(leftTime >= 0) {
       // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
        h = Math.floor(leftTime / 1000 / 60 / 60 );
        m = Math.floor(leftTime / 1000 / 60 % 60);
        s = Math.floor(leftTime / 1000 % 60);
        c=pad(h, 2) + ":" + pad(m, 2) + ":" + pad(s, 2);
        var ch= '<span class="un-guess-item-right-tip">竞猜结束还剩：</span>' +
            '<div class="un-guess-item-time-block"><span class="un-guess-item-time-bg">'+c+'</span></div>';
        return {end:false,html:ch};
    }
    if(cdid){
        var li=$("#"+cdid).closest("li");
        li.find("input").attr("disabled",true);
        li.find("button").attr("disabled",true);
        li.find(".bet-add").removeClass("bet-add");
        li.find(".bet-reduce").removeClass("bet-reduce");
        li.find("button").html("已结束").removeClass("un-guess-bet-btn").addClass("un-guess-beted-btn");
    }

    return {html:'<span class="un-guess-item-right-tip">竞猜已结束</span>',end:true};
}


function initCountDown() {
    //console.debug("inited="+countDownInited);
    if(countDownInited){
        return;
    }
    countDownInited=true;
    setInterval(function () {
        $.each(list,function (i, item) {
            var t=countDown(item.end_time,item.cdid);
            $("#"+item.cdid).html(t.html);
        })
    },1000);

}

function openResult(rs) {
    var lhtml='';
    var rhtml='';
    var t=0;

    $.each(rs,function (i, item) {
        t+=parseInt(item.attend_user_num);
    });

    $.each(rs,function (i, item) {
        var percent=t==0?0:item.attend_user_num/t;

        var bclass='un-guess-bet-bar';
        if(item.is_win==1){
            bclass='un-guess-bet-bar-result';
        }
        lhtml+='<div class="un-guess-bet-over-text1">'+item.option+'</div>';
        rhtml+='<div class="un-guess-bet-over-row"><div class="'+bclass+'" style="width:'+parseInt(percent*400)+'px;"></div> <span class="un-guess-bet-bar-aside">'+(100*percent).toFixed(2)+'%</span> </div>';
    });

    var html='<div class="un-guess-bet-over-block"><p class="">已有<span class="un-guess-highlight-text">'+t+'</span>人参与</p><div class="clearfix">'+
        '<div class="un-guess-bet-over-left">'+ lhtml+'</div>'+ '<div class="un-guess-bet-over-right">'+
        rhtml+'</div></div></div>';

    return html;
}


function loadMore() {
    if(curPage>=totalPage){
        return;
    }

    req(url.guessUrl, {type: 'pc',pageNum:curPage+1,pageSize:4}, function (resp) {

        if (resp.code == '1') {
            var data = resp.data.data;
            var gHtml = "";
            var totalCount=resp.data.totalCount;
            if(totalCount==0){
                $("ul").html("<div style='text-align: center'>暂无活动.</div>");
                return;
            }
            $.each(data, function (i, obj) {
                var totalPeople = 0;
                var caseHtml = '';
                var gid=obj._id;
                list.push({cdid:'cd_'+gid,end_time:obj.end_time});

                $.each(obj.guessRecords, function (j, obj2) {
                    totalPeople += obj2.attend_user_num;
                    var result='';
                    if(obj.status==2&&obj2.is_win==1){
                        result='<div class="un-guess-checked-result">答案</div>';
                    }
                    caseHtml += '<div class="un-guess-checked-item">' +
                        '<input type="radio"  name="case' + gid + '" id="case_' + obj2._id + '" class="un-guess-checked-input" data-id="' + obj2._id + '" data-high_chip="' + (obj2.high_chip||'') + '" data-low_chip="' + (obj2.low_chip||'') + '" data-odd="'+obj2.odd+'">' +
                        '<label for="case_' + obj2._id + '" class="un-guess-checked" >' +result+
                        '<p class="un-guess-checked-text1'+(obj.type==1?'':'-center')+'">' + obj2.option + '</p>' +
                        '<p class="un-guess-checked-text2">' + obj2.odd + '</p>' +
                        '</label></div>';

                });

                var countdown=countDown(obj.end_time);
                var end=countdown.end;

                gHtml += '<li class="un-guess-item clearfix un-guess-item-left-style'+obj.type+'" data-gid="'+gid+'" data-type="'+obj.type+'">'+(obj.type==1?leftHtml1:leftHtml2)+

                    '<div class="un-guess-item-right"><div class="clearfix">' +
                    '<img src="'+fileServer+obj.pic+'" class="un-guess-item-right-img"><div class="un-guess-item-right-info">' +
                    '<p class="un-guess-item-right-title">' + obj.name + '</p><div class="clearfix" id="cd_'+gid+'">' +countdown.html

                    +'</div></div></div>' +
                    '<div class="un-guess-checked-block clearfix">' + caseHtml + '</div>' +
                    (obj.status==2?openResult(obj.guessRecords):end?lowright_end:lowright)+'</div></li>';


            });
            $("ul").append(gHtml);
            curPage=resp.data.pageNum;
            totalPage=resp.data.totalPage;
            initCountDown();

        }
    }, "json")

}


$("ul").on("click","[type='radio']",function () {
    var $this=$(this);
    var li = $this.closest("li");
    var itemid = $this.data("id");
    var current_id = li.data("current_id");
    if (itemid == current_id) {
        return;
    }else {
        li.data("current_id",itemid);
        li.find(".un-guess-bet-input").val($this.data("low_chip"));
        changeView(li,$this.data("low_chip"),$this.data("odd"));

    }

});


function changeView(li, bet, odd) {
    var type=li.data("type");
    if(type==2){
        return;
    }
    bet=bet?parseInt(bet):0;
    li.find(".un-guess-bet-text1").eq(1).html('投注<span class="un-guess-bet-red">'+bet+'</span>积分，猜中可得<span class="un-guess-bet-red">'+bet*parseFloat(odd)+'</span>券').show();
}


//加减筹码
$("ul").on("click", ".bet-add,.bet-reduce", function () {
    var $this=$(this);
    var isAdd=$this.hasClass("un-guess-bet-add");
    var li=$this.closest("li");
    var checkedItem=li.find(":checked");
    if(checkedItem.length==0){
        pop("请选择要竞猜的选项!");
        return;
    }
    var input = $this.siblings("input");
    var bet = input.val().trim();
    var high_chip = checkedItem.data("high_chip");
    var low_chip = checkedItem.data("low_chip");
    var odd = checkedItem.data("odd");
    var points=$("#points").text();
    points=points?parseInt(points):0;
    high_chip=high_chip?parseInt(high_chip):Infinity;
    low_chip=low_chip?parseInt(low_chip):1;
    bet=bet?parseInt(bet):0;
    if(isAdd){
        if (bet == ""||bet==0) {
            bet=low_chip;
            input.val(bet);
        } else {
            bet = parseInt(bet) + low_chip;
            if (high_chip&&(bet > high_chip)) {
                pop("超过最高押注");//
                return;
            }
            if(bet>points){
                pop("积分不足");//
                return;
            }
            input.val(bet);


        }
    }else { //减小
        if (bet == "") {
            return;
        } else {
            bet = parseInt(bet) - low_chip;
            if (low_chip&&(bet < low_chip)) {
                pop("小于最小押注!");
                return;
            } else {
                input.val(bet);
            }

        }
    }
    changeView(li,bet,odd);

});

//直接输入下注
$("ul").on("blur",".un-guess-bet-input",function () {
    var $this=$(this);
    var li=$this.closest("li");
    var checkedItem=li.find(":checked");
    if(checkedItem.length==0){
        return;
    }
    var odd=checkedItem.data("odd");
    var bet=$this.val().trim();
    changeView(li,bet,odd);
});


//下注
$("ul").on("click",".un-guess-bet-btn",function () {

    var $this=$(this);
    var li=$this.closest("li");
    var checkedItem=li.find(":checked");
    if(checkedItem.length==0){
        pop("请选择要下注的竞猜项!");
        return;
    }
    var input = li.find(".un-guess-bet-input");
    var bet = input.val().trim();
    var gid=li.data("gid");
    var high_chip = checkedItem.data("high_chip");
    var low_chip = checkedItem.data("low_chip");
    var itemId=checkedItem.data("id");
    high_chip=high_chip?parseInt(high_chip):Infinity;
    low_chip=low_chip?parseInt(low_chip):1;
    if(!bet){
        return;
    }
    bet=parseInt(bet);
    if(high_chip&&(bet > parseInt(high_chip))){
        pop("超过最高押注");//
        return;
    }
    if(low_chip&&(bet < parseInt(low_chip))){
        pop("小于最小押注!");
        return;
    }
    var points=$("#points").text();
    if(points<bet){
        pop("积分不足!");
        return;
    }
    var data={
        type:"pc",
        chip:bet,
        id:gid,
        rid:itemId
    };

    req(url.lotteryUrl,data,function (resp) {
        if(resp.code==1){
            var button=$('li[data-gid="'+gid+'"]').find("button");
            button.attr("disabled","disabled").addClass("un-guess-beted-btn").html("已下注");
            pop(resp.errmsg,false);
        }else {
            pop(resp.errmsg,false);
        }
    },"json");

});


$(window).on('scroll',function(){
    if(scrollTop() + windowHeight() >= documentHeight()){
        loadMore();

    }
});


$('.un-modal-close').on('click', function () {
    $('.un-mask').hide();
});

//loadMore();

function init() {
    initComm();
    loadMore();
}

$.when(getFS).done(init);





