var batchid;
var selectionIndex = -1;
var edtindex = -1;
var cmmapIndex = -1;
var pkgtype;
var firstPkgType = "";
$(function () {
    batchid = getQueryString("batchid");
    pkgtype = getQueryString("pkgtype");
    $("input[name='pkgtype'][value="+pkgtype+"]").attr("checked",true);
    if(pkgtype ==0) $("label[for='rad']").addClass("on");else $("label[for='rad2']").addClass("on");
    $.ajax({
        url: pageContext + "/spBatchController/getBatchFxedInfoByBatchid/" + batchid,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if (data.success) {
                loadBatchCmInfo(pkgtype);
                firstPkgType = pkgtype;
                selectionIndex = -1;
                edtindex = -1;
                if (pkgtype == 0) {
                    for(var i in data.obj){
                        $("#select-tb").datagrid("appendRow", {
                            top: ++selectionIndex,
                            id: data.obj[i].id,
                            batchys: data.obj[i].batchys,
                            mfsl: data.obj[i].mfsl,
                            fxfs: data.obj[i].fxfs,
                            batchcm: data.obj[i].batchcm,
                            opt: '<a href="javascript:void(0)"  onclick="removeSelection(' + selectionIndex + ')" class="mr-20 glyphicon glyphicon-remove">移除</a>'
                        });
                    }
                } else {
                    for(var i in data.obj){
                        $("#select-tb").datagrid("appendRow", {
                            id: data.obj[i].spbatchdetailid,
                            mxid: data.obj[i].mxid,
                            top: ++selectionIndex,
                            spcode: data.obj[i].spcode,
                            mxcode: data.obj[i].mxcode,
                            spmc: data.obj[i].spmc,
                            batchys: data.obj[i].ys,
                            batchcm: data.obj[i].cm,
                            fxfs: data.obj[i].gpsl,
                            mfsl: data.obj[i].mfsl,
                            opt: '<a href="javascript:void(0)"  onclick="removeSelection(' + selectionIndex + ')" class="mr-20 glyphicon glyphicon-remove">移除</a>'
                        });
                    }
                }
                fistLoadCmInfo();
            } else {
                layer.msg(data.msg);
            }
        },
        error: function () {
            alert("error");
        }
    });
});

function loadCmInfo() {
    $.ajax({
        url: pageContext + "/spxxController/getBatchCmInfobyBatchid/" + batchid + "/" + pkgtype,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if (data.success) {
                loadBatchCmInfo(pkgtype);
                $('#batchcminfo-tb').datagrid('loadData', {total: 0, rows: []});
                $('#select-tb').datagrid('loadData', {total: 0, rows: []});
                $('#cmmap-tb').datagrid('loadData', {total: 0, rows: []});
                selectionIndex = -1;
                edtindex = -1;
                if (pkgtype == 0) {
                    $("#add-BtnDiv").show();
                    for (var i in data.obj) {
                        $("#batchcminfo-tb").datagrid("appendRow", {
                            spcode: data.obj[i].spcode,
                            mxcode: data.obj[i].mxcode,
                            spmc: data.obj[i].spmc,
                            ys: data.obj[i].ys,
                            cm: data.obj[i].cm,
                            gpsl: data.obj[i].gpsl
                        });
                    }
                    var cmmap = JSON.parse(data.msg);
                    for (var key in cmmap) {
                        var keyArr = key.split("_");
                        $("#cmmap-tb").datagrid("appendRow", {
                            ys: keyArr[1],
                            top: ++cmmapIndex,
                            cm: keyArr[0],
                            gpsl: cmmap[key],
                            opt: '<a href="javascript:void(0)"  onclick="cmmapAppend(' + cmmapIndex + ')" class="mr-20 glyphicon glyphicon-floppy-open">添加</a>'
                        });
                    }
                } else {
                    $("#add-BtnDiv").hide();
                    for (var i in data.obj) {
                        $("#batchcminfo-tb").datagrid("appendRow", {
                            id: data.obj[i].mxid,
                            top: ++edtindex,
                            spcode: data.obj[i].spcode,
                            mxcode: data.obj[i].mxcode,
                            spmc: data.obj[i].spmc,
                            ys: data.obj[i].ys,
                            cm: data.obj[i].cm,
                            gpsl: data.obj[i].gpsl,
                            opt: '<a href="javascript:void(0)"  onclick="appendRelation(' + edtindex + ')" class="mr-20 glyphicon glyphicon-floppy-open">添加</a>'
                        });
                    }
                }
            } else {
                $("input[name='pkgtype'][value="+pkgtype+"]").attr("checked",false);
                pkgtype = pkgtype == 0 ? 1 : 0;
                $("input[name='pkgtype'][value="+pkgtype+"]").attr("checked",true);
                if(pkgtype ==0){
                    $("label[for='rad']").addClass("on");
                    $("label[for='rad2']").removeClass("on");
                } else{
                    $("label[for='rad']").removeClass("on");
                    $("label[for='rad2']").addClass("on");
                }
                if(firstPkgType == ""){
                    loadCmInfo();
                }
                layer.msg(data.msg);
            }
        }
    });
}

function appendRelation(index) {
    var rows = $('#batchcminfo-tb').datagrid('getRows');//获得所有行
    var lesslen = -1;
    for (var i in rows) {
        if (rows[i].top <= index) {
            ++lesslen;
        }
    }
    if (lesslen == -1) lesslen = 0;
    var row = rows[lesslen];//根据index获得其中一行。
    var selections = $('#select-tb').datagrid('getRows');//获得所有行
    for(var i in selections){
        if(row.ys == selections[i].batchys && row.cm == selections[i].batchcm){
            layer.msg("颜色："+row.ys+"，尺码："+row.cm+"，在选中界面已存在！！",function(){});
            return;
        }
    }
    $("#select-tb").datagrid("appendRow", {
        mxid: row.id,
        top: ++selectionIndex,
        spcode: row.spcode,
        mxcode: row.mxcode,
        spmc: row.spmc,
        batchys: row.ys,
        batchcm: row.cm,
        fxfs: row.gpsl,
        gpsl: row.gpsl,
        mfsl: 1,
        opt: '<a href="javascript:void(0)"  onclick="removeRelation(' + selectionIndex + ')" class="mr-20 glyphicon glyphicon-remove">移除</a>'
    });
    $("#batchcminfo-tb").datagrid("deleteRow", lesslen);
}

function removeRelation(index) {
    var rows = $('#select-tb').datagrid('getRows');//获得所有行
    var lesslen = -1;
    for (var i in rows) {
        if (rows[i].top <= index) {
            ++lesslen;
        }
    }
    if (lesslen == -1) lesslen = 0;
    var row = rows[lesslen];//根据index获得其中一行。
    console.log(row);
    $("#batchcminfo-tb").datagrid("appendRow", {
        top: ++edtindex,
        spcode: row.spcode,
        mxcode: row.mxcode,
        spmc: row.spmc,
        ys: row.batchys,
        cm: row.batchcm,
        gpsl: row.gpsl,
        opt: '<a href="javascript:void(0)"  onclick="appendRelation(' + edtindex + ')" class="mr-20 glyphicon glyphicon-floppy-open">添加</a>'
    });
    $("#select-tb").datagrid("deleteRow", lesslen);
}

function appendSelection() {
    $("#select-tb").datagrid("appendRow", {
        top: ++selectionIndex,
        batchys: '均色',
        mfsl: 1,
        opt: '<a href="javascript:void(0)"  onclick="removeSelection(' + selectionIndex + ')" class="mr-20 glyphicon glyphicon-remove">移除</a>'
    });
}

function removeSelection(index) {
    var rows = $('#select-tb').datagrid('getRows');//获得所有行
    var lesslen = -1;
    for (var i in rows) {
        if (rows[i].top <= index) {
            ++lesslen;
        }
    }
    if (lesslen == -1) lesslen = 0;
    $("#select-tb").datagrid("deleteRow", lesslen);
}

function cmmapAppend(index) {
    var rows = $('#cmmap-tb').datagrid('getRows');//获得所有行
    var lesslen = -1;
    for (var i in rows) {
        if (rows[i].top <= index) {
            ++lesslen;
        }
    }
    if (lesslen == -1) lesslen = 0;
    var row = rows[lesslen];//根据index获得其中一行。
    var selectRows = $('#select-tb').datagrid('getRows');//获得所有行
    for(var i in selectRows){
        if(selectRows[i].batchcm == row.cm && selectRows[i].batchys == row.ys){
            layer.msg("已存在尺码："+row.cm+"，颜色："+row.ys,function(){});
            return;
        }
    }
    $("#select-tb").datagrid("appendRow", {
        top: ++selectionIndex,
        batchys: row.ys,
        batchcm: row.cm,
        mfsl: 1,
        fxfs: row.gpsl,
        gpsl: row.gpsl,
        opt: '<a href="javascript:void(0)"  onclick="selectRemoveCmmap(' + selectionIndex + ')" class="mr-20 glyphicon glyphicon-remove">移除</a>'
    });
    $("#cmmap-tb").datagrid("deleteRow", lesslen);
}

function selectRemoveCmmap(index) {
    var rows = $('#select-tb').datagrid('getRows');//获得所有行
    var lesslen = -1;
    for (var i in rows) {
        if (rows[i].top <= index) {
            ++lesslen;
        }
    }
    if (lesslen == -1) lesslen = 0;
    var row = rows[lesslen];//根据index获得其中一行。
    console.log(row);
    $("#cmmap-tb").datagrid("appendRow", {
        ys: row.batchys,
        top: ++cmmapIndex,
        cm: row.batchcm,
        gpsl: row.gpsl,
        opt: '<a href="javascript:void(0)"  onclick="cmmapAppend(' + cmmapIndex + ')" class="mr-20 glyphicon glyphicon-floppy-open">添加</a>'
    });
    $("#select-tb").datagrid("deleteRow", lesslen);
}

function loadBatchCmInfo(pkgtype) {
    if (pkgtype == 0) {
        $("#cmmapDiv").show();
        $("#batchcminfo-tb").datagrid({
            columns: [[
                {field: 'id', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'top', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'spcode', title: '款号', width: 150, align: 'center'},
                {field: 'mxcode', title: '条码', width: 150, align: 'center'},
                {field: 'spmc', title: '商品名称', width: 300, align: 'center'},
                {field: 'ys', title: '颜色', width: 120, align: 'center'},
                {field: 'cm', title: '尺码', width: 120, align: 'center'},
                {field: 'gpsl', title: '挂牌数量', width: 120, align: 'center'},
            ]]
        });
        $("#cmmap-tb").datagrid({
            columns: [[
                {field: 'id', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'top', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'ys', title: '颜色', width: 100, align: 'center'},
                {field: 'cm', title: '尺码', width: 100, align: 'center'},
                {field: 'gpsl', title: '挂牌数量', width: 100, align: 'center'},
                {field: 'opt', title: '操作', width: 120, align: 'center'}
            ]]
        });
        $("#select-tb").datagrid({
            columns: [[
                {field: 'top', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'spbatchdetailid', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'batchys', title: '颜色', width: 120, align: 'center', editor: 'text'},
                {field: 'batchcm', title: '尺码', width: 120, align: 'center', editor: 'text'},
                {field: 'fxfs', title: '分箱份数', width: 120, align: 'center', editor: 'numberbox'},
                {field: 'mfsl', title: '每份数量', width: 120, align: 'center', editor: 'numberbox'},
                {field: 'gpsl', title: '挂牌数量', width: 120, align: 'center', editor: 'numberbox', hidden: 'true'},
                {field: 'opt', title: '操作', width: 150, align: 'center'}
            ]]
        });
    } else {
        $("#cmmapDiv").hide();
        $("#batchcminfo-tb").datagrid({
            columns: [[
                {field: 'id', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'top', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'spcode', title: '款号', width: 120, align: 'center'},
                {field: 'mxcode', title: '条码', width: 120, align: 'center'},
                {field: 'spmc', title: '商品名称', width: 300, align: 'center'},
                {field: 'ys', title: '颜色', width: 120, align: 'center'},
                {field: 'cm', title: '尺码', width: 120, align: 'center'},
                {field: 'gpsl', title: '挂牌数量', width: 120, align: 'center'},
                {field: 'opt', title: '操作', width: 150, align: 'center'}
            ]]
        });
        $("#select-tb").datagrid({
            columns: [[
                {field: 'mxid', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'top', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'spbatchdetailid', title: '', width: 80, align: 'center', hidden: 'true'},
                {field: 'spcode', title: '款号', width: 120, align: 'center'},
                {field: 'mxcode', title: '条码', width: 120, align: 'center'},
                {field: 'spmc', title: '商品名称', width: 300, align: 'center'},
                {field: 'batchys', title: '颜色', width: 120, align: 'center'},
                {field: 'batchcm', title: '尺码', width: 120, align: 'center'},
                {field: 'fxfs', title: '分箱份数', width: 120, align: 'center', editor: 'numberbox'},
                {field: 'mfsl', title: '每份数量', width: 120, align: 'center', editor: 'numberbox'},
                {field: 'gpsl', title: '挂牌数量', width: 120, align: 'center', editor: 'numberbox', hidden: 'true'},
                {field: 'opt', title: '操作', width: 150, align: 'center'}
            ]]
        });
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

var editIndex = undefined;

function onClickRow(index) {
    if (editIndex != index) {
        if (endEditing()) {
            $('#select-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#select-tb').datagrid('selectRow', editIndex);
        }
    } else {
        editIndex = undefined;
        $('#select-tb').datagrid('endEdit', editIndex);
    }
}

function endEditing() {
    if (editIndex == undefined) {
        return true
    }
    if ($('#select-tb').datagrid('validateRow', editIndex)) {
        $('#select-tb').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}
$(document).ready(function () {
    $('input[type=radio][name=pkgtype]').change(function () {
        if (this.value != pkgtype) {
            pkgtype = this.value;
            loadCmInfo();
        }
    });
});

function fistLoadCmInfo() {
    $.ajax({
        url: pageContext + "/spxxController/getBatchCmInfobyBatchid/" + batchid + "/" + pkgtype,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if (data.success) {
                $('#batchcminfo-tb').datagrid('loadData', {total: 0, rows: []});
                $('#cmmap-tb').datagrid('loadData', {total: 0, rows: []});
                edtindex = -1;
                if (pkgtype == 0) {
                    $("#add-BtnDiv").show();
                    for (var i in data.obj) {
                        $("#batchcminfo-tb").datagrid("appendRow", {
                            spcode: data.obj[i].spcode,
                            mxcode: data.obj[i].mxcode,
                            spmc: data.obj[i].spmc,
                            ys: data.obj[i].ys,
                            cm: data.obj[i].cm,
                            gpsl: data.obj[i].gpsl
                        });
                    }
                    var cmmap = JSON.parse(data.msg);
                    for (var key in cmmap) {
                        var keyArr = key.split("_");
                        $("#cmmap-tb").datagrid("appendRow", {
                            ys: keyArr[1],
                            top: ++cmmapIndex,
                            cm: keyArr[0],
                            gpsl: cmmap[key],
                            opt: '<a href="javascript:void(0)"  onclick="cmmapAppend(' + cmmapIndex + ')" class="mr-20 glyphicon glyphicon-floppy-open">添加</a>'
                        });
                    }
                } else {
                    $("#add-BtnDiv").hide();
                    for (var i in data.obj) {
                        $("#batchcminfo-tb").datagrid("appendRow", {
                            id: data.obj[i].mxid,
                            top: ++edtindex,
                            spcode: data.obj[i].spcode,
                            mxcode: data.obj[i].mxcode,
                            spmc: data.obj[i].spmc,
                            ys: data.obj[i].ys,
                            cm: data.obj[i].cm,
                            gpsl: data.obj[i].gpsl,
                            opt: '<a href="javascript:void(0)"  onclick="appendRelation(' + edtindex + ')" class="mr-20 glyphicon glyphicon-floppy-open">添加</a>'
                        });
                    }
                }
            } else {
                layer.msg(data.msg);
            }
        }
    });
}



function formData() {
    $('#select-tb').datagrid('endEdit', editIndex);
    var fxinfos = $('#select-tb').datagrid('getRows');//获得所有行
    var spbatchdetails = new Array();
    for (var i in fxinfos) {
        if (pkgtype == 1) {
            spbatchdetails.push({
                "mxid": fxinfos[i].mxid,
                "batchid": batchid,
                "id":fxinfos[i].spbatchdetailid,
                "batchcm": fxinfos[i].batchcm,
                "batchys": fxinfos[i].batchys,
                "mfsl": fxinfos[i].mfsl,
                "fxfs": fxinfos[i].fxfs,
                "bdmxcode": fxinfos[i].mxcode
            });
        } else {
            spbatchdetails.push({
                "batchid": batchid,
                "id":fxinfos[i].id,
                "batchcm": fxinfos[i].batchcm,
                "batchys": fxinfos[i].batchys,
                "mfsl": fxinfos[i].mfsl,
                "fxfs": fxinfos[i].fxfs
            });
        }
    }
    return {"pkgtype": pkgtype, "spbatchdetails": spbatchdetails};
}