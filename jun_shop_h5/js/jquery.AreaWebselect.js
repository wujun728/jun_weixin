/*
areaweb后台专用

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
nodata:无数据状态
required:必选项

-------此页面只用于投诉页面-----
------------------------------ */
(function () {
    $.fn.citySelect = function (settings) {
        if (this.length < 1) { return; };

        // 默认值

        settings = $.extend({
            url: "/js/oaArea.ashx",
            pid: null,
            cid: null,
            did: null,
            nodata: null,
            required: false,
            provice_json: [{ "p": "=请选择=", "pid": 0 }, { "p": "云南", "pid": 53 }, { "p": "贵州", "pid": 52 }, { "p": "四川", "pid": 51 }, { "p": "重庆", "pid": 50 }, { "p": "辽宁", "pid": 10 }]
        }, settings);

        var box_obj = this;
        var prov_obj = box_obj.find(".prov");
        var city_obj = box_obj.find(".city");
        var dist_obj = box_obj.find(".dist");
        var select_prehtml = (settings.required) ? "" : "<option value=''>全区</option>";
        var city_json;

        // 赋值市级函数
        var cityStart = function () {
            var prov_id = prov_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
            };
            city_obj.empty().prop("disabled", "disabled");
            dist_obj.empty().prop("disabled", "disabled");

            if (prov_id < 0) {
                if (settings.nodata == "none") {
                    city_obj.css("display", "none");
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    city_obj.css("visibility", "hidden");
                    dist_obj.css("visibility", "hidden");
                };
                return;
            };
            function hasShop(areas) {
                for (var i = 0; i < areas.length; i++) {
                    if (areas[i].iskc) return true;
                }
                return false;
            }
            // 遍历赋值市级下拉列表
            temp_html = select_prehtml;
            var datas = city_json.result;
            $.each(city_json.result, function (i, city) {
                if (city.pid == prov_obj.get(0).value) {
                    if (hasShop(city.items)) {
                        temp_html += "<option value='" + city.id + "'>" + city.name + "</option>";
                    }
                }
            });
            if (temp_html.trim().length == 0) {
                city_obj.css("display", "none");
            }
            city_obj.html(temp_html).removeAttr("disabled").css({ "display": "", "visibility": "" });
            distStart();
        };

        // 赋值地区（县）函数
        var distStart = function () {
            var prov_id = prov_obj.get(0).selectedIndex;
            var city_id = city_obj.get(0).selectedIndex;
            if (!settings.required) {
                prov_id--;
                city_id--;
            };
            dist_obj.empty().attr("disabled", true);

            if (prov_id < 0 || city_id < 0) {
                if (settings.nodata == "none") {
                    dist_obj.css("display", "none");
                } else if (settings.nodata == "hidden") {
                    dist_obj.css("visibility", "hidden");
                };
                return;
                
            };

            // 遍历赋值市级下拉列表
            var count = "";
            temp_html = select_prehtml;
            $.each(city_json.result, function (i, city) {
                if (city.id == city_obj.get(0).value) {
                    $.each(city.items, function (i, item) {
                        if (item.iskc == true) {
                            temp_html += '<option value="' + item.id + '">' + item.name + '</option>';
                            //count = ;
                        }
                    });
                }
            });
            dist_obj.html(temp_html).removeAttr("disabled").css({ "display": "", "visibility": "" });

            $(dist_obj).trigger("onchange");
        };

        var init = function () {
            // 遍历赋值省份下拉列表
            temp_html = select_prehtml;
            $.each(settings.provice_json, function (i, prov) {
                temp_html += "<option value='" + prov.pid + "'>" + prov.p + "</option>";
            });
            prov_obj.html(temp_html);

            // 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
            setTimeout(function () {
                if (settings.pid != null) {
                    prov_obj.val(settings.pid);
                    cityStart();
                    setTimeout(function () {
                        if (settings.cid != null) {
                            city_obj.val(settings.cid);
                            distStart();
                            setTimeout(function () {
                                if (settings.did != null) {
                                    dist_obj.val(settings.did);
                                };
                            }, 1);
                        };
                    }, 1);
                };
            }, 1);

            // 选择省份时发生事件
            prov_obj.bind("change", function () {
                cityStart();
            });

            // 选择市级时发生事件
            city_obj.bind("change", function () {
                distStart();
            });
        };

        // 设置省市json数据
        if (typeof (settings.url) == "string") {
            $.getJSON(settings.url, function (json) {
                city_json = json;
                init();
            });
        } else {
            city_json = settings.url;
            init();
        };
    };
})();

$(function () {
    //省市区
    obj_t = $(".areaweb");
    if (obj_t.length > 0) {
        $.each(obj_t, function (i, obj) {
            $(obj).citySelect({
                pid: $(obj).find(".prov").attr("title"),
                cid: $(obj).find(".city").attr("title"),
                did: $(obj).find(".dist").attr("title"),
                required: true,
                nodata: "none"
            });
        });
    }

  
});