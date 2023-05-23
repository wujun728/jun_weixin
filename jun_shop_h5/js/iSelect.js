
function iSelect(slt1, slt2, slt3, data, callFun) {
    var sltstr = '';
    for (var n = 0; n < data.length; n++) {
        var item = data[n];
        sltstr += '<option value="' + item.id + '">' + item.name + '</option>';
    }

    function getCityName() {
        var cityName = "";
        if ($(slt3).val() != 0 && $(slt3).val() != undefined) {
            cityName = $(slt1).find("option:selected").text() + '&nbsp;' + $(slt2).find("option:selected").text() + '&nbsp;' + $(slt3).find("option:selected").text();
        }
        else if ($(slt2).val() != 0) {
            cityName = $(slt1).find("option:selected").text() + '&nbsp;' + $(slt2).find("option:selected").text();
        }
        else if ($(slt1).val() != 0) {
            cityName = $(slt1).find("option:selected").text();
        }
        if (typeof (callFun) == 'function') callFun(cityName)
    }

    $(slt1).append(sltstr).change(function () {
        var val = this.value;
        if (val == 0) {
            $(slt2).hide().html('');
            $(slt3).hide().html('');
        } else {
            sltstr = "";
            for (var n = 0; n < AreaData.length; n++) {
                if (val == data[n].id) {
                    $(slt2).data('sltdata', data[n].items)
                    for (var i = 0; i < data[n].items.length; i++) {
                        var item = data[n].items[i];
                        sltstr += '<option value="' + item.id + '">' + item.name + '</option>';
                    }
                    $(slt2).html(sltstr).show().trigger('change');
                    getCityName();
                    return;
                }
            }
        }
    });
    $(slt2).change(function () {
        var val = this.value;
        if (val == 0) { $(slt3).hide().html(''); return; }
        var data = $(this).data('sltdata');
        var sltstr = "";
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.id == val) {
                for (var j = 0; j < item.items.length; j++) {
                    var city = item.items[j];
                    sltstr += '<option value="' + city.id + '">' + city.name + '</option>';
                }
                $(slt3).html(sltstr).show();
                getCityName();
                return;
            }
        }
    });

    $(slt3).change(function () {
        getCityName();
    });

    return { set: function (pid, zid, did) {
        $(slt1).val(pid).trigger('change');
        setTimeout(function () {
            $(slt2).val(zid).trigger('change')
            setTimeout(function () {
                $(slt3).val(did).trigger('change')
            }, 100)
        }, 100);
    }
    }
}