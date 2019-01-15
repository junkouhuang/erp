var formData = function () {
    return $("#flwlform").serializeJSON();
}

// 请求后台获取物流信息
$(function () {
    $.ajax({
        url: pageContext + "/logisticsController/getLogisticsInfo",
        type: "get",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.success) {
                // 加载数据到页面
                loadData(data.obj);
            } else {
                layer.msg(data.msg);
            }
        }
    });
})

// 加载数据
function loadData(data) {
    var content = "";
    // 遍历数据
    $.each(data, function (index, item) {
        content += packagingData(item);
    });
    $("#wlgs").html(content);
    var loadWlgs = $("#loadWlgs").val();
    $("input[value="+loadWlgs+"]").attr("checked",true);
    $("input[type='radio']").click(function(){
    	$("#wldh").focus();
    })
}

// 组装数据
function packagingData(data) {
    var content = "<span class='radio-box' style='width:100px;display: inline-block;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;'>" + "<input type='radio' id='" + data.id + "' name='wlgs' tel='" + data.tel + "' code='" + data.code + "' value=" + data.name + " class='posit3'>" + "<label  for=" + data.id + " class='ml-5'>" + data.name + "</label>" + "</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    return content;
}

//
$(function () {
    $("#wldh").keydown(function (e) {
        if (e.keyCode == 13) {

            e.preventDefault();
            var flfhid = getQueryString("flfhid");
            $.ajax({
                url: pageContext + "/flFhorderController/updateReceiptInfo?id=" + flfhid,
                data: $("#flwlform").serializeJSON(),
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    if(data.success){
                        window.parent.LoadingDataListOrderRealItems();
                        var index = parent.layer.getFrameIndex(window.name);
                        parent.layer.close(index);
                    }else{
                        layer.alert(data.msg);
                    }
                }, error: function () {
                }
            });
        }
    });
})

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};