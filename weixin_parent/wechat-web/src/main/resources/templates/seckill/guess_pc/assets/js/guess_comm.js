/**
 * Created by lfl on 2018/2/2.
 */
//var _path = location.protocol + "//" + location.host;
var fileServer="";
var ad={pic:'',link:'',name:''};
var channel="01";
var url = {
    "guessUrl": _path + "/act/guess/guesslist",
    "ruleUrl": _path + "/act/guess/getrule",
    "orderUrl": _path + "/act/guess/orderList",
    "lotteryUrl": _path + "/act/guess/lottery",
    "ruleView": _view_path + "/guess_pc/rule.html",
    "hisView": _view_path + "/guess_pc/history.html",
    "guessView": _view_path + "/guess_pc/index.html",
    "userPoint": _path + "/act/guess/getUserPoint",
    "geturl": _path + "/login/geturl",
    "ad":_path+"/act/guess/getadv"

};


var getFS= $.get(url.ad,{type:"pc",position:'2'},function (resp) {
    if(resp.code==1){
        fileServer=resp.fileServer;
        if(resp&&resp.list&&resp.list[0]&&resp.list[0]){
            var list_0=resp&&resp.list&&resp.list[0]&&resp.list[0];
            ad.pic=list_0.pic;
            ad.link=list_0.link;
            ad.name=list_0.name;
        }
        var img=$(".un-guess-img");
        if(ad.pic){
            img.css("background-image",'url('+fileServer+ad.pic+')');
        }
        if(ad.link){
            img.closest("a").attr("href",ad.link);
            img.closest("a").attr("title",ad.name||'');
        }


    }
},"json")



function initComm() {

    $.get(url.userPoint,{}, function (resp) {
        $(".un-hader-right-text").html('积分:<span id="points">'+ resp+'</span>' );
    });

}


$(function () {
    $(".un-guess-menu-item").on("click", function () {
        var activeClass = "un-guess-menu-item-active";
        var i = $(this).index();
        if ($(this).hasClass(activeClass)) {
            return;
        }
        if (i == 0) {
            window.location.href = url.guessView;
        }
        if (i == 1) {
            window.location.href = url.hisView;
        }
        if (i == 2) {
            window.location.href = url.ruleView;
        }
    });
    //回到顶部
    $('#scrollTop').on('click', function () {
        $(window).scrollTop(0)
    })

})




