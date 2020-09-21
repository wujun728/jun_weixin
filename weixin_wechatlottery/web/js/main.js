var contextPath = "/WechatLottery";
function updatePhone() {
    if (checkPhone()) {
        $.post(contextPath + "/user/update_phone",
            $("#updatePhoneForm").serialize(),
            function (data) {
                if (data.result == "success") {
                    swal(data.message, "", "success");
                    setTimeout("toHomePage()", 3000);
                } else {
                    swal("绑定手机号失败", "", "error");
                }
            },'json');
    } else {
        swal("请输入正确的手机号", "", "error");
    }
}

function checkPhone(){
    var phone = $("#phone").val();
    if(!(/^1[34578]\d{9}$/.test(phone))){
        return false;
    } else {
        return true;
    }
}

function toHomePage() {
    window.location.href = contextPath + '/user/home';
}

function payFail() {
    swal("微信支付服务有问题，请稍候再试", "", "error");
    payFailResult();
}

function cancelPay() {
    swal("取消支付", "", "warning");
    cancelPayResult();
}

function paySuccess() {
    swal("支付成功", "", "success");
    setTimeout("toHomePage()", 3000);
}

function payTimeout() {
    swal("指定时间内未支付，您的支付被取消！", "", "warning");
}

function payFailResult() {
    swal("微信支付未响应，支付失败", "", "success");
    setTimeout("toHomePage()", 3000);
}

function cancelPayResult() {
    swal("取消支付", "", "success");
    setTimeout("toHomePage()", 3000);
}

function checkFile(name, index, type, size) {
    var file = document.getElementsByName(name)[index].files[0];
    if (file != undefined) {
        var fileName = file.name;
        var fileType = fileName.substring(fileName.lastIndexOf('.'), fileName.length);
        var maxSize = size * 1024 * 1024;
        if (file.size >= maxSize) {
            swal("文件大小最大为" + size + "MB", "", "warning");
            return false;
        }
        if (type.indexOf(fileType.toLocaleLowerCase()) < 0) {
            swal("文件后缀只能为" + type, "", "warning");
            return false;
        }
    }
    return true;
}

function pay() {
    var q = $("#quantity").val();
    if (q.trim() == "") {
        swal("请输入购买票数！", "", "error");
        return false;
    }
    return true;
}