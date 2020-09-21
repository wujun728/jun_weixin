/**
 * Created by lfl on 2018/2/2.
 */

/**
 * 分页插件
 divid	页码条元素的id
 count	总页数
 num	当前页
 methodName	回调函数名
 total	总条目数
 s		分页数
 */
var initPage = function(divid, count, num, methodName, total, s) {
    var paging = $('#' + divid);
    // if(count <= 1){ paging.css("display", "none"); return; }
    var pageSize = 5;
    paging.hide();
    if (undefined == count || '' == count) return;
    if (methodName == null) methodName = 'toPage';
    var prevP = Number(num) - 1;
    prevP = prevP < 1 ? 1 : prevP;

    var nextP = Number(num) + 1;
    nextP = nextP > count ? count : nextP;

    var html = "", classname = num <= 1 ? "disabled" : "";

    if (count > 0) {
        var begin = 1;
        var end = count;
        if (count < pageSize) { begin = 1; end = count; }
        else {
            if (num <= Math.floor(pageSize / 2) + 1) { begin = 1; end = pageSize; }
            else {
                begin = num - Math.floor(pageSize / 2);
                end = Number(num) + Math.floor(pageSize / 2);
                if (end >= count) { end = count; begin = count - pageSize + 1; }
            }
        }
        var pli = '';
        for (var i = begin; i <= end; i++) {
            var aclass = i == num ? 'active' : '';
            pli += '<li class="' + aclass + '"><a onclick="return ' + methodName + '(' + i + ');" href="javascript:;">' + i + '</a></li>'; // 页码
        }
        classname = num == count ? "disabled" : "";
        var pevt = num == count ? '' : "onclick='return " + methodName + "(1);'";
        var nevt = num == count ? '' : "onclick='return " + methodName + "(" + prevP + ");'";

        html += '<div class="un-navigation-bar clearfix right" style="margin-top:30px;">'+
            '<span class="un-navigation-text left">共' + total + '条记录</span>'+
            '<nav aria-label="Page navigation" class="left"><ul class="pagination mrg0A">'+
            '<li class="' + classname + '"><a href="javascript:;" ' + pevt + ' aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>'+ pli +
            '<li class="' + classname + '"><a href="javascript:;" ' + nevt + ' aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li></ul></nav>'+

            ''+
            '<div class="left" style="margin:0 16px;width:100px;"><select class="selectpicker js-example-basic-single pagesize">'+
            '<option value="10">10页/条</option><option value="20">20页/条</option><option value="50">50页/条</option><option value="100">100页/条</option></select></div>'+

            '<span class="left" style="line-height: 32px;">跳至</span>'+
            '<input type="text" name="pageNum" maxlength="8" value="" class="form-control pageNum left" style=" width: 42px;margin: 0 10px;" onkeyup="return RepNumber(this);" onafterpaste="return RepNumber(this);">'+
            '<span class="left" style="line-height: 32px;">页</span>'+
            '</div>';
        paging.show();
    }
    paging.html(html);
    paging.find('.pageNum').on('keydown', function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode==13) {var p=$(this).val();if(p) {var func = eval(methodName); func($(this).val());} }
    });
    paging.find('.pagesize').on('change', function(e){
        var func = eval(methodName); func(1, 0, $(this).val());
    });
    paging.find('.pagesize').val(s || 10);
    paging.find('.selectpicker').selectpicker('refresh');
};

function RepNumber(obj) {
    var reg = /^[\d]+$/g;
    if (!reg.test(obj.value)) {
        var txt = obj.value;
        txt.replace(/[^0-9]+/, function (char, index, val) {//匹配第一次非数字字符
            obj.value = val.replace(/\D/g, "");//将非数字字符替换成""
            if(obj.value.length > 6){ obj.value = obj.value.substring(0, 6); }
            var rtextRange = null;
            if (obj.setSelectionRange) {
                obj.setSelectionRange(index, index);
            } else {//支持ie
                rtextRange = obj.createTextRange();
                rtextRange.moveStart('character', index);
                rtextRange.collapse(true);
                rtextRange.select();
            }
        })
    }
}


function toPage(p,type,s) {
    if(!s){
        s=$("#pageBar .pagesize").val();
    }
    var query={
        pageNum:p,
        pageSize:s
    }
    req(url.orderUrl,query,function (resp) {
        if(resp.code==1){
            var his='';
            var data=resp.data.data;
            var totalCount=resp.data.totalCount;
            if(totalCount==0){
                $(".un-guess-history").html("<div style='text-align: center'>暂无更多记录.</div>");
                return;
            }
            $.each(data,function (i, item) {
                his+='<li class="un-guess-history-item clearfix">'+
                    '<img src="'+fileServer+(item.guessInfo&&item.guessInfo.pic)+'" alt="" class="un-guess-history-img"><div class="un-guess-history-info">'+
                    '<p class="un-guess-history-info-title">'+item.act_name+'</p><div class="clearfix">'+
                    '<div class="un-guess-history-info-aside">消耗:'+item.user_price+'积分</div>'+
                    '<div class="un-guess-history-info-aside">投:'+item.rinfo+'</div>'+
                    '<div class="un-guess-history-info-aside">正确答案:'+(item.wininfo||'')+'</div></div>'+
                    '<p class="un-guess-history-status1">'+(item.status==0?'无效订单':(item.status==1?'待开奖':(item.is_win==1?"中奖":"未中奖")))+'</p></div>'+
                    '<span class="un-guess-history-time">'+item.order_time+'</span></li>';
            });
            // console.log(his);
            $("ul.un-guess-history").html(his);
            initPage("pageBar",resp.data.totalPage,resp.data.pageNum,"toPage",resp.data.totalCount,resp.data.pageSize);


        }
    },"json")
}


function init() {
    initComm();
 toPage(1,1,10);
}

//init();

$.when(getFS).done(init);