$(function(){
    getOrderCode();
    loadTradeInfo();
    loadSourcetype();


});
function loadSourcetype() {
    $.ajax({
        url: pageContext + "/tradeOrderController/getTradeOrderSourcetypeMap",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var sourcetypeContent = '<option value="" selected="selected">请选择来源类型</option>';
            for(var key in data){
                sourcetypeContent += "<option value='" + key+ "'>" +data[key] + "</option>";
            }
            $("#tradeordertype").append(sourcetypeContent);
            $('#tradeordertype').combobox();
        }
    });
}

var exitWindows = function () {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
};

var save = function () {
    if (checkEmpty()){
        return false;
    }
    var obj = auto_input_package(".info");
    if (obj == null){
        layer.msg("保存批次信息失败！");
        return false;
    }
    if (obj.outtradeid == obj.intradeid){
        layer.msg("卖方品牌商与买方品牌商不能相同");
        return false;
    }
    var rate = obj.rate;
    if(isNaN(rate)){
        layer.msg("折扣只能输入数字！");
        return false;
    }
    $.ajax({
        url: pageContext + "/tradeOrderController/newTradeOrder",
        type: "POST",
        async: false,
        dataType: "json",
        data: obj,
        success: function (req) {
            if (req.success){
                alert("新增成功！");
                window.parent.location.reload();
            }else {
                layer.msg(req.msg);
            }
        }
    });
};

// 校验是否空
var checkEmpty = function(eArray){
    var flag = false;
    var inputs = $(".info").find("input[type='text']");
    for (var i = 0; i < inputs.length; i ++){
        var input = $(inputs).eq(i);
        var id = $(input).attr("id");
        if (!v_empty(eArray) && eArray.indexOf(id) != -1){
            continue;
        }
        if (v_empty($(input).val(), 0)){
            var name = $(input).parent().prev("td").html();
            var index = name.indexOf(":");
            layer.msg(name.substring(0, index) + "不能为空");
            flag = true;
            break;
        }
    }
    if (flag){
        return flag;
    }
    var selects = $(".info").find("select");
    for (var i = 0; i < selects.length; i ++){
        var select = $(selects).eq(i);
        var id = $(select).attr("id");
        if (!v_empty(eArray) && eArray.indexOf(id) != -1){
            continue;
        }
        if (v_empty($(select).val(), 0)){
            var name = $(select).parent().prev("td").html();
            var index = name.indexOf(":");
            layer.msg("请选择" + name.substring(0, index));
            flag = true;
            break;
        }
    }
    return flag;
};

/**
 * 加载品牌商信息
 * @author 郑学亮
 * @date   2018/5/25 11:02
 **/
var tradeInfoArr;
var loadTradeInfo = function(){
    $.ajax({
        url: pageContext + "/tradeOrderController/getAllTradeInfo",
        type: "GET",
        contentType : 'application/json;charset=utf-8',
        async: false,
        dataType: "json",
        success: function (req) {
            if (req.success){
                tradeInfoArr = req.obj;
                var cont = loadSelectHTML(tradeInfoArr);
                $("#outtradeid").append(cont);
                $("#intradeid").append(cont);
            }else {
                layer.msg(req.msg);
            }
        }
    });
}
var loadSelectHTML = function (arr) {
    var cont = "<option value=''></option>";
    $.each(arr, function (index, item) {
        var id = item.id;
        var name = item.tradename;
        cont += "<option value = '" + id + "'>" + name + "</option>";
    });
   return cont;
}


/**
 * 获取品牌调货单的单号
 * @author 郑学亮
 * @date   2018/5/25 11:02
 **/
var getOrderCode = function () {
    $.ajax({
        url: pageContext + "/tradeOrderController/getTradeOrderCode",
        type: "GET",
        contentType : 'application/json;charset=utf-8',
        async: false,
        dataType: "json",
        success: function (req) {
            if (req.success){
                $("#tradeordercode").val(req.obj);
            }else {
                layer.msg(req.msg);
                var index = parent.layer.getFrameIndex(window.name);
                parent.layer.close(index);
            }
        }
    });
}

/**
 * 限制只能输入数字和数字两位小数
 * @author 郑学亮
 * @date   2018/5/25 14:31
 **/
var clearNoNum = function (obj){
    obj.value = obj.value.replace(/[^\d.]/g,"");
    obj.value = obj.value.replace(/\.{2,}/g,".");
    obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
    if(obj.value.indexOf(".")< 0 && obj.value !=""){
        obj.value= parseFloat(obj.value);
    }
}