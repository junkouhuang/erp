$(function(){
    var spid = getQueryVariable("spID");
    getBatch(spid);
});

// 请求后台获取批次
var getBatch = function (spid) {
    $.getJSON(pageContext+"/spManageController/getBatchInfo",
        {"spID" : spid},
        function(json){
            padding(json);
    });
}

// 获取url中的参数的函数
var getQueryVariable = function(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

// 填充数据
var padding = function(data){
    var content = "";
    $.each(data, function (index, item) {
        var code = item.batchcode == "" || item.batchcode == null || item.batchcode == undefined ? "" : item.batchcode;
        var name = item.batchname == "" || item.batchname == null || item.batchname == undefined ? "" : item.batchname;
        var time = item.createtime == "" || item.createtime == null || item.createtime == undefined ? "" : item.createtime;
        content += "<button class='col-sm-2 widget style1 yellow-bg' style='width: 300px; padding: 0px; margin: 10px;' onclick='openWindown(this)' code="+code+">" +
            "批次编码：" + code + "<br/>"+
            "批次名称：" + name + "<br/>" +
            "创建时间：" + time + "<br/>" +
            "</button>";
    });
    $("#content").html(content == "" ?
        "<div style='text-align:center; font-size: 50px;'>没有批次</div>"
        : content);
}


// 打开批次列表窗口
var openWindown = function(th){
    var code = $(th).attr("code");
    window.parent.openBatchList(code);
}