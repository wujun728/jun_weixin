$.fn.noop = function () { };
function removeProduct(basketID, callback) {
    if (!confirm("确定要移除此商品吗？")) return;
    layer.open({ type: 2, shadeClose: false });
    sendPostRequest("/ajax/cartHandler.aspx?act=delCar", { id: basketID }, function () {
        layer.closeAll();
        $(".cart_one").has("input[value='" + basketID + "']").remove();
        CalcAmount();
    }, $.noop);
}
function clearCart() {
    if (!confirm("确定要清空购物车吗？")) return;
    layer.open({ type: 2, shadeClose: false });
    sendPostRequest("/ajax/cartHandler.aspx?act=clearCart", {}, function () { layer.closeAll(); $(".cart_one").remove(); CalcAmount(); }, $.noop);
}
function setProductNumber(productId, num) {
    layer.open({ type: 2, shadeClose: false });
    sendPostRequest("/ajax/cartHandler.aspx?act=updateCarNum", { id: productId, num: num }, function () { layer.closeAll(); CalcAmount(); }, $.noop);
}
function BindEvent(product) {
    var productId = $("[name='basket_id']", product).val();
    bindRemoveEvent($(".cart_del", product));
    var countTrigger = $(".cart_plus", product);
    var productCount = 1;
    if (countTrigger.size() > 0) {
        var countInputer = $("input", countTrigger);
        productCount = parseInt(countInputer.val());
        bindCountTrigger(countTrigger.find("a").first(), -1, countInputer);
        bindCountTrigger(countTrigger.find("a").last(), 1, countInputer);
        bindInput(countInputer);
    }

    function bindInput(inputer) {
        inputer.keyup(function () {
            var value = $(this).val();
            if (!/^\d+$/.test(value)) {
                $(this).val(productCount);
                return false;
            }
            setProductNumber(productId, parseInt(value));
        });
    }

    function bindCountTrigger(btn, toBe, inputer) {
        btn.click(function () {
            productCount += toBe;
            if (productCount < 1) productCount = 1;
            inputer.val(productCount);
            setProductNumber(productId, productCount);
        });
    }

    function bindRemoveEvent(btn) {
        btn.click(function () {
            removeProduct(productId, function () { product.remove(); });
        });
    }
}

function CalcAmount() {
    var totalAmount = 0;
    var productCount = 0;
    var hasCount = 0;
    $(".cart_one").each(function (index, item) {
        hasCount++;
        var curProBox = $(this);
        if (curProBox.find("input[name = 'basketid']").prop("checked") == true) {
            var curProPrice = curProBox.find("input[type='hidden'][name='price']");

            var inputer = curProBox.find(".cart_plus input");
            var unitPrice = parseFloat(curProPrice.val());

            if (inputer.size() > 0) {
                var productPrice = unitPrice * parseInt(inputer.val());
                productCount += parseInt(inputer.val());
                totalAmount += productPrice;
                curProBox.find(".price span").text(productPrice.toFixed(2));
            } else {
                totalAmount += unitPrice;
                productCount++;
            }
            $(".cart_other input[name='price']", item).each(function () {
                totalAmount += parseInt($(this).val());
            });
        }
    });
    var data = { cartCount: hasCount, checkedCount: productCount, cartPrice: totalAmount.toFixed(2) };
    $(".cart-status").html(template("cartTotalTmpl",data));
    /*$("#lbTotalAmount").text(totalAmount.toFixed(2));
    $("#lbTotalCount").text(productCount);*/
}



$(function () {
    CalcAmount();
});