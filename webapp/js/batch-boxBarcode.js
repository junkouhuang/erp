function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function () {
    loadsppackageInfo();
});
function loadsppackageInfo(){
    var spBatchId = getSpBatchId();
    $.ajax({
        url: pageContext + "/spBatchController/getSpBatchInBoxBarcode", //请求后台的url
        type: "post",
        data: {"spBatchId": spBatchId,"packagecode":$("#packagecode").val()},
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            $('#package-tb').datagrid('loadData',{total:0,rows:[]});
            $("#total").html("总包数:"+data.length);
            for (var i in data) {
                $("#package-tb").datagrid("appendRow", {
                    id: data[i].id,
                    packagecode: data[i].packagecode
                })
            }
        }
    });
}

//增加箱数
function addBoxNumber() {
    var spBatchId = getSpBatchId();
    layer.open({
        type: 1,
        title: '新增箱数',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["确定", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">增加的量：</td><td class="pb-10"><input  id="addsl" type="text" placeholder="请输入增加的量" class="form-control"></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var boxNumber = $("#addsl").val();
            if(boxNumber == "" || boxNumber == null || boxNumber == undefined){
                layer.msg("请输入要增加的量！！",function(){});
                return;
            }
            $.ajax({
                url:pageContext+"/spBatchController/spBatchAddBoxNumber",
                type:'post',
                dataType:'json',
                data:{'spBatchId' : spBatchId, 'boxNumber': boxNumber},
                async:false,
                success:function(data){
                    layer.msg(data.msg);
                    if(data.success){
                        loadsppackageInfo();
                        layer.close(index);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}


//打印箱条码
function printBoxBracode() {
    //请求后台打印
    requestBackEndPrintBoxBracode();
}

function requestBackEndPrintBoxBracode() {
    var packageIdList = new Array();
    //获取批次id
    var batchId = getSpBatchId();
    //获取箱id的集合
    var selections = $("#package-tb").datagrid('getSelections');
    if(selections.length > 0 ){
        for(var i in selections){
            packageIdList.push(selections[i].id);
        }
    }else{
        var rows = $("#package-tb").datagrid('getRows');
        for(var i in rows){
            packageIdList.push(rows[i].id);
        }
    }
    layer.open({
        type: 2,
        title: '箱条码打印界面',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['100%', '100%'],
        content: pageContext + "/spBatchController/printBoxBracode?batchId=" + batchId + "&packageId=" + packageIdList
    });
}


//获取商品批次id
function getSpBatchId() {
    return getQueryString("batchid");
}

//关闭窗口
function offWindows() {
    var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

$(function () {
    $("#packagecode").keydown(function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            loadsppackageInfo();
        }
    });
});
