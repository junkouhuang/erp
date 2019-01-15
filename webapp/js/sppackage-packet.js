var topIndex = 0;
var selection;
$(function () {
    $("#sppkdetails-tb").datagrid({
        columns: [[
            {field: 'id', title: '', width: 80, align: 'center', hidden: 'true'},
            {field: 'top', title: '', width: 80, align: 'center', hidden: 'true'},
            {field: 'spmc', title: '名称', width: 260, align: 'center'},
            {field: 'spcode', title: '款号', width: 150, align: 'center'},
            {field: 'mxcode', title: '条码', width: 150, align: 'center'},
            {field: 'sellprice', title: '价格', width: 80, align: 'center'},
            {field: 'cm', title: '尺码', width: 80, align: 'center'},
            {field: 'ys', title: '颜色', width: 80, align: 'center'},
            {field: 'sl', title: '数量', width: 80, align: 'center'},
            {field: 'opt', title: '操作', width: 150, align: 'center'}
        ]]
    });
    selection = window.parent.getSppackageInfo();
    loadSppkdetailTableInfo();
});

function loadSppkdetailTableInfo() {
    $('#sppkdetails-tb').datagrid('loadData', {total: 0, rows: []});
    $.ajax({
        url: pageContext + "/bigpkgController/getSppkdetailListByPackageid/" + selection.pkgid,
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            console.log(data);
            if (data.success) {
                for (var i in data.obj) {
                    $("#sppkdetails-tb").datagrid("appendRow", {
                        id: data.obj[i].id,
                        top: ++topIndex,
                        spmc: data.obj[i].spmc,
                        spcode: data.obj[i].spcode,
                        mxcode: data.obj[i].mxcode,
                        sellprice: data.obj[i].sellprice,
                        cm: data.obj[i].cm,
                        ys: data.obj[i].ys,
                        sl: data.obj[i].sl,
                        opt: '<a href="javascript:void(0)"  onclick="removeSeletion(' + data.obj[i].id + ')" class="mr-20 glyphicon glyphicon-remove">移除</a>' +
                        '<a href="javascript:void(0)"  onclick="updateSelection(' + data.obj[i].id + ')" class="mr-20 glyphicon glyphicon-edit">修改</a>'
                    });
                }
            }
        }
    });
}

function removeSeletion(pkdid) {
    $.ajax({
        url: pageContext + "/bigpkgController/removeRelationSppkdetailInfo/" + pkdid,
        dataType: "json",
        async: true,
        type: "POST",   //请求方式
        success: function (data) {
            if (data.success) {
                loadSppkdetailTableInfo();
            } else {
                layer.alert(data.msg);
            }
        }, error: function () {
        }
    });
}

function updateSelection(pkdid) {
    var selectRows = $('#sppkdetails-tb').datagrid('getRows');//获得所有行
    var selectRow = "";
    for(var i in selectRows){
        if(pkdid = selectRows[i].id){
            selectRow = selectRows[i];
        }
    }
    layer.open({
        type: 1,
        title: '请填写你要修改的信息',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["保存", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">条码：</td><td  class="pb-10"><input value="'+selectRow.mxcode+'" disabled="disabled" id="updmxcode" type="text" class="form-control"></td></tr>' +
        '<tr><td>数量：</td><td><input id="updsl" type="text" class="form-control" value='+selectRow.sl+'></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var mxcode = $("#updmxcode").val();
            var sl = $("#updsl").val();
            if (sl == '' || sl <= 0) {
                layer.msg("数量不能小于零！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/bigpkgController/updSppkdetailByPackageid/" + pkdid,
                data: JSON.stringify({"mxcode": mxcode, "sl": sl}),
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    if (data.success) {
                        loadSppkdetailTableInfo();
                        layer.close(index);
                    } else {
                        layer.alert(data.msg);
                    }
                }, error: function () {
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}

function addSppkdetailInfo() {
    layer.open({
        type: 1,
        title: '请填写加入的条码信息',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["保存", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">条码：</td><td  class="pb-10"><input id="sppkdetail_mxcode" type="text" class="form-control"></td></tr>' +
        '<tr><td>数量：</td><td><input id="sppkdetail_sl" type="text" class="form-control" value="1"/></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var mxcode = $("#sppkdetail_mxcode").val();
            var sl = $("#sppkdetail_sl").val();
            if (mxcode == '') {
                layer.msg("条码不能为空！", function () {
                });
                return;
            }
            if (sl == '' || sl <= 0) {
                layer.msg("数量不能小于零！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/bigpkgController/addSppkdetailByPackageid/" + selection.pkgid,
                data: JSON.stringify({"mxcode": mxcode, "sl": sl}),
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    if (data.success) {
                        loadSppkdetailTableInfo();
                        layer.close(index);
                    } else {
                        layer.alert(data.msg);
                    }
                }, error: function () {
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}