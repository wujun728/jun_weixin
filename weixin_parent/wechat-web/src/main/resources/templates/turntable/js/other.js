$(document).ready(function(){

    //禁止屏幕的自动滑动
   /* document.addEventListener("touchmove", function (e) {
        e.preventDefault();
    }, false);*/

    //旋屏提示
    if (window.navigator.userAgent.match(/linux|android/i) != null) {
        /*横屏检测*/
        window.addEventListener('orientationchange', landscapeListener);
        function landscapeListener() {
            if (window["orientation"] == 90 || window["orientation"] == -90) {
                alert("为了最佳体验，请使用竖屏浏览！");
            }
        }
    } else {
        OrientationTip = new WxMoment.OrientationTip();
    }
    ;

    function scalePage(e) {
        if (window.innerHeight < 1040 || e != null) {
            $(".scaleBox").animate({scale: window.innerHeight / 1040}, 0);

            var sNum=window.innerHeight/1040;
            if((window.innerHeight<1040&&window.innerHeight>700)){
                $(".scaleCon").animate({scale: sNum,top:"0px"}, 0);

            }else if(window.innerHeight<700) {
                $(".scaleCon").animate({scale: "1",top:"-400px"}, 0);
            }else{
                $(".scaleCon").animate({scale: "1",top:"0px"}, 0);
            }
        } else {

        }
    }
    scalePage();
    //为了防止input布局错乱，缩放页面
    $(window).on("resize", scalePage);
});