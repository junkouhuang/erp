var auto_input_package = function (jqe) {					// 自动封装HTML页面的input对象
    var obj = {};
    var inputs = $(jqe).find("input[type='text']");
    $.each(inputs, function (index, item) {
        var name = $(item).attr("id");
        if (name == null || name == undefined || name == ""){
            console.error("input标签的id属性未指定");
            obj = null;
            return false;
        }
        var value = $(item).val();
        obj[name] = value;
    });
    var selects = $(jqe).find("select");
    $.each(selects, function (index, item) {
        var name = $(item).attr("id");
        if (name == null || name == undefined || name == ""){
            console.error("select标签的id属性未指定");
            obj = null;
            return false;
        }
        var value = $(item).val();
        obj[name] = value;
    });
    return obj;
};

var v_empty = function (v, e) {								// 判断是否为空，为空返回true。e参数为是否排除数字0
    if (e == 0){
        if (v === "" || v == undefined || v == null || v.length == 0){
            return true;
        }else {
            false;
        }
    }else {
        if (v === "" || v == undefined || v == null || v.length == 0 ||  v == 0){
            return true;
        }else {
            false;
        }
    }
};

var getQueryVariable = function (variable){					// 获取url中的参数
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}