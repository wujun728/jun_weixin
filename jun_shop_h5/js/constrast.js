$("body").append('<style>\
.constrast-layer { padding:10px;overflow:auto;/*-webkit-overflow-scrolling:touch;*/width:280px;height:300px;}\
.constrast-layer h4 { background:#f3f3f3;padding:5px 10px;font-size:12px;color:#999;font-weight:normal;}\
.constrast-layer dl { overflow:hidden;height:60px;padding:10px 0;border-bottom:solid 1px #e3e3e3;}\
.constrast-layer dl dt { float:left;}\
.constrast-layer dl dd {margin-left:10px;height:60px;line-height:60px;}\
.constrast-layer dl dd a { padding:10px;color:#f44623;}\
.add-product { display:block;text-align:center;height:40px;line-height:40px;color:#45a1de;}\
.constrast-brand { padding:10px;overflow:auto;-webkit-overflow-scrolling:touch;width:280px;height:300px;}\
.constrast-brand ul li { height:40px;line-height:40px;border-bottom:solid 1px #e3e3e3;}\
.constrast-brand ul li a { display:block;padding:0 10px;color:#45a1de;}\
.constrast-product {padding:10px;overflow:auto;-webkit-overflow-scrolling:touch;width:280px;height:300px; }\
.constrast-product dl { height:60px;padding:10px 0;border-bottom:solid 1px #e3e3e3;}\
.constrast-product dl dt { width:60px;height:60px;float:left;}\
.constrast-product dl dd { margin-left:70px;}\
.constrast-product dl dd h4 { height:22px;overflow:hidden;}\
.constrast-product dl dd p { color:#f44623;}\
</style>\
<script type="text/html" id="constrastLayerTmpl">\
    <div class="constrast-layer">\
        <h4>最多支持同时对比四款商品</h4>\
{{each}}\
<dl>\
    <dt><img src="{{$value.img}}" width="60" height="60" /></dt>\
    <dd class="left" style="width:130px;word-break: break-all;overflow:hidden;">{{$value.name}}</dd>\
    <dd class="right"><a href="javascript:;" onclick="constrast.remove({{$value.id}})">移除</a></dd>\
</dl>\
{{/each}}\
<a href="javascript:;" class="add-product" onclick="constrast.selectBrand(constrast.cid)">+添加商品</a>\
</div>\
</script>\
<script type="text/html" id="constrastBrandTmpl">\
    <div class="constrast-brand">\
        <ul>\
            {{each}}\
            <li><a href="javascript:;" onclick="constrast.getProductByBrand({{$value.Id}})">{{$value.Name}}</a></li>\
            {{/each}}\
        </ul>\
    </div>\
</script>\
<script type="text/html" id="constrastProductTmpl">\
    <div class="constrast-product">\
        {{each}}\
        <dl onclick="constrast.addProduct({{$value.id}},\'{{$value.name}}\',\'{{$value.img}}\',\'{{$value.cid}}\')">\
            <dt><img src="{{$value.img}}" width="60" height="60" /></dt>\
            <dd>\
                <h4>{{$value.name}}</h4>\
                <p>￥{{$value.price}}</p>\
            </dd>\
        </dl>\
    {{/each}}\
</div>\
</script>');

function GetProductList() {
    var cookiestr = /*Cookie.Get("constrastproduct");*/localStorage.getItem("constrastproduct");
    if (cookiestr) {
        var json = JSON.parse(cookiestr);
        if (typeof json == 'object')
            return json;
        return JSON.parse(json);
    }
    return [];
}

var constrast = {
    cid: 0,
    productList: GetProductList(),
    addProduct: function (id, name, img, cid) {
        layer.closeAll();
        if (this.productList.length>0&&this.productList[0].cid != cid) {
            this.productList = [];
        }
        if (this.productList.length >= 4) {
            alert("对比栏中已有4件商品，请先移除后再添加。");
        } else {
            var IsRepeat = false;
            for (var i = 0; i < this.productList.length; i++) {
                if (!IsRepeat && this.productList[i].id == id)
                    IsRepeat = true;
            }
            if (!IsRepeat)
                this.productList.push({ id: id, name: name, img: img, cid: cid });

            this.cid = this.productList[0].cid;
            //Cookie.Set("constrastproduct", JSON.stringify(this.productList), 24 * 3);//对比栏商品存3天
            localStorage.setItem("constrastproduct", JSON.stringify(this.productList));
        }
        var pro = this.productList;
        layer.open({
            type: 1,
            title: "商品对比栏",
            content: template('constrastLayerTmpl', this.productList),
            btn: ['开始对比'],
            shadeClose: false,
            yes: function () {
                var ppids = [];
                for (var i = 0; i < pro.length; i++) {
                    ppids.push(pro[i].id);
                }
                window.location.href = "/contrast.aspx?priIds=" + ppids.join(",");
            }
        });
    },
    remove: function (id) {
        var pl = this.productList;
        if (pl.length < 2) {
            this.productList = [];
            layer.closeAll();
        }
        for (var i = 0; i < pl.length; i++) {
            if (pl[i].id == id) {
                this.productList.splice(i, 1);
            }
        }
        //Cookie.Set("constrastproduct", JSON.stringify(this.productList), 24 * 3);//对比栏商品存3天
        localStorage.setItem("constrastproduct", JSON.stringify(this.productList));
        var pro = this.productList;
        layer.closeAll();
        layer.open({
            type: 1,
            title: "商品对比栏",
            content: template('constrastLayerTmpl', this.productList),
            btn: ['开始对比'],
            shadeClose: false,
            anim: false,
            yes: function () {
                var ppids = [];
                for (var i = 0; i < pro.length; i++) {
                    ppids.push(pro[i].id);
                }
                window.location.href = "/contrast.aspx?priIds=" + ppids.join(",");
            }
        });
    },
    deletePro: function (id) {
        layer.open({
            type: 3,
            title: "移除商品",
            content: "是否确定移除此商品？",
            btn: ["确定", "取消"],
            shadeClose: false,
            yes: function () {
                var pl = constrast.productList;
                if (pl.length <= 1) {
                    layer.open({
                        type: 3,
                        title: "移除商品",
                        btn: ["确定"],
                        shadeClose: false,
                        content: "不能移除商品！"
                    });
                    return;
                }
                for (var i = 0; i < pl.length; i++) {
                    if (pl[i].id == id) {
                        constrast.productList.splice(i, 1);
                    }
                }
                //Cookie.Set("constrastproduct", JSON.stringify(constrast.productList), 24 * 3);//对比栏商品存3天
                localStorage.setItem("constrastproduct", JSON.stringify(constrast.productList));
                var pro = constrast.productList;
                var ppids = [];
                for (var j = 0; j < pro.length; j++) {
                    ppids.push(pro[j].id);
                }
                window.location.href = "/contrast.aspx?priIds=" + ppids.join(",");
            },
            cancel: function () { layer.closeAll(); }
        });
    },
    selectBrand: function (cid) {
        layer.open({ type: 2, content: "加载中..." });
        $.get("/contrast.aspx", { act: "loadBrandByCid", cid: cid }, function (res) {
            //var res = { status: 1, msg: "", result: [{ id: 1, name: "苹果" }, { id: 1, name: "苹果" }, { id: 1, name: "苹果" }] };
            layer.closeAll();
            if (res.status == 1) {
                constrast.cid = cid;
                layer.open({
                    type: 1,
                    title: "请选择品牌",
                    content: template('constrastBrandTmpl', res.result),
                    shadeClose: false
                });
            } else {
                layer.open({ type: 3, content: res.msg, shadeClose: false,time:1.5 });
            }
        }, "json");
    },
    getProductByBrand: function (brandid) {
        layer.open({ type: 2, content: "加载中..." });
        $.get("/contrast.aspx", { act: "loadProBrand", brandId: brandid, cid: constrast.cid }, function (res) {
            //var res = { status: 1, msg: "", result: [{ id: 1, name: "iPhone 6s", price: "2400.00", img: "http://img2.ch999img.com/pic/product/160x160/20140910095153973.jpg" }, { id: 2, name: "苹果", price: "2400.00", img: "http://img2.ch999img.com/pic/product/160x160/20140910095153973.jpg" }, { id: 3, name: "苹果", price: "2400.00", img: "http://img2.ch999img.com/pic/product/160x160/20140910095153973.jpg" }] };
            layer.closeAll();
            if (res.status == 1) {
                layer.open({
                    type: 1,
                    title: "请选择对比商品",
                    content: template('constrastProductTmpl', res.result),
                    shadeClose: false
                });
            } else {
                layer.open({ type: 3, content: "获取商品失败！", shadeClose: false, time: 1.5 });
            }
        }, "json");
    }
}
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}