var issj = false;
$(function () {
    $("#splx").combobox();
    loadWhsinfo();
    loadTradeinfo();
    //spid get spmx
    var selectionspxx = window.parent.getSelectionSpxx();
    $("#spcode").textbox('setValue', selectionspxx.spcode);
    $("#spmc").textbox('setValue', selectionspxx.spmc);
    loadTime();
    $.ajax({
        url: pageContext + "/spxxController/getSpmxListBySpid/" + selectionspxx.id,
        type: "POST",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.success) {
                for (var i = 0; i < data.obj.length; i++) {
                    $("#cgdetail-tb").datagrid('appendRow', {
                        id: data.obj[i].id,
                        ysid: data.obj[i].ysid,
                        ys: data.obj[i].ys,
                        cmcode: data.obj[i].cmcode,
                        cm: data.obj[i].cm,
                        jdsl: data.obj[i].jdsl,
                        gpsl: data.obj[i].jdsl
                    });
                }
            } else {
                layer.alert(data.msg);
            }
        }
    });
    openEdtiorCgdetail_tb();
})

function loadTime() {
    var curr_time = new Date();
    var strDate = curr_time.getFullYear() + "-";
    strDate += curr_time.getMonth() + 1 + "-";
    strDate += curr_time.getDate() + "-";
    strDate += " " + curr_time.getHours() + ":";
    strDate += curr_time.getMinutes() + ":";
    strDate += curr_time.getSeconds();
    $("#starttime").datetimebox("setValue", strDate);
    $("#endtime").datetimebox("setValue", strDate);
}

var editIndex = undefined;
function formData() {
    //$('#cgdetail-tb').datagrid('endEdit', editIndex);
    closeEditorCgdetail_tb();
    var spcode = $("#spcode").val();
    var spmc = $("#spmc").val();
    var fjdanhao = $("#fjdanhao").val();
    var starttime = $("#starttime").val();
    var endtime = $("#endtime").val();
    var kpiList = new Array();
    var selectData = $('#ygxxselect-tb').datagrid('getData');
    for (var i = 0; i < selectData.total; i++) {
        kpiList.push({
            "empid": selectData.rows[i].id,
            "gpsl": selectData.rows[i].fjsl
        })
    }
    var infos = $("#cgdetail-tb").datagrid("getRows");
    var mxlist = new Array();
    for (var i = 0; i < infos.length; i++) {
        if(issj){
            if (infos[i].gpsl != "" && infos[i].gpsl != undefined && infos[i].gpsl > 0
                && infos[i].kw !='' && infos[i].kw != null && infos[i].kw != undefined) {
                mxlist.push({"id": infos[i].id, "gpsl": infos[i].gpsl,"kw":infos[i].kw});
            }
        }else{
            if (infos[i].gpsl != "" && infos[i].gpsl != undefined && infos[i].gpsl > 0) {
                mxlist.push({"id": infos[i].id, "gpsl": infos[i].gpsl});
            }
        }

    }
    var splx = $("#splx").val();
    var whsid = $("#whsid").val();
    var tradeid = $("#tradeid").val();
    var obj = {
        "spcode": spcode,
        "spmc": spmc,
        "fjdanhao": fjdanhao,
        "startTimeStr": starttime,
        "endTimeStr": endtime,
        "kpiList": kpiList,
        "mxlist": mxlist,
        "splx": splx,
        "tradeid": tradeid,
        "whsid": whsid,
        "issj":issj
    }
    return obj;
}

var selectindex = 0;

function choice() {
    var row = $('#ygxx-tb').datagrid('getSelected');
    if (row) {
        $('#ygxx-tb').datagrid('endEdit', editIndexs);
        var row = $('#ygxx-tb').datagrid('getSelected');
        if (row) {
            var selections = $('#ygxxselect-tb').datagrid('getRows');//获得所有行
            for(var i in selections){
                if(selections[i].id == row.id){
                    layer.msg("员工："+row.ygxm+"，已经添加！！",function(){});
                    return;
                }
            }
            if(row.fjsl == "" || row.fjsl == null || row.fjsl == undefined){
                layer.msg("分拣数量不能为空！！",function(){});
                return;
            }
            if(row.fjsl < 1){
                layer.msg("分拣数量最低为1",function () {});
                return;
            }
            var rowIndex = $('#ygxx-tb').datagrid('getRowIndex', row);
            $('#ygxx-tb').datagrid('deleteRow', rowIndex);
            $("#ygxxselect-tb").datagrid("appendRow", {
                id:row.id,
                top: ++selectindex,
                ygxm: row.ygxm,
                ygcode: row.ygcode,
                zw: row.zw,
                fjsl:row.fjsl
            });
        }
        $("#ygxx-tb").datagrid('hideColumn', 'id');
    }
    $("#ygxx-tb").datagrid('hideColumn', 'id');
}

function remove() {
    var row = $('#ygxxselect-tb').datagrid('getSelected');
    if (row) {
        //删除右边菜单栏里面的信息
        var rowIndex = $('#ygxxselect-tb').datagrid('getRowIndex', row);
        $('#ygxxselect-tb').datagrid('deleteRow', rowIndex);
        //添加到左边菜单栏去
        $("#ygxx-tb").datagrid("appendRow", {
            ygxm: row.ygxm,
            zw: row.zw,
            ygcode: row.ygcode,
            id: row.id
        })
        var rows = $('#ygxxselect-tb').datagrid("getData");
        for (var i = 0; i < rows.total; i++) {
            $('#ygxxselect-tb').datagrid('updateRow', {
                index: i,
                row: {
                    top: i + 1
                }
            });
        }
        selectindex = rows.total;
    }
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};


function endEditing() {//该方法用于关闭上一个焦点的editing状态
    if (editIndex == undefined) {
        return true
    }
    if ($('#cgdetail-tb').datagrid('validateRow', editIndex)) {
        $('#cgdetail-tb').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function openEdtiorCgdetail_tb() {
    var dglen = $('#cgdetail-tb').datagrid('getRows').length;
    if(dglen > 0){
        for(var index = 0 ;index< dglen;index++){
            $('#cgdetail-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
        }
    }
}
function closeEditorCgdetail_tb() {
    var dglen = $('#cgdetail-tb').datagrid('getRows').length;
    if(dglen > 0){
        for(var index = 0 ;index< dglen;index++){
            $('#cgdetail-tb').datagrid('endEdit', index);
        }
    }
}

//点击单元格事件：
function onClickCell(index, field, value) {
    if (endEditing()) {
        if (field == "gpsl" || field == 'kw') {
            $(this).datagrid('beginEdit', index);
            var ed = $(this).datagrid('getEditor', {index: index, field: field});
            $(ed.target).focus();
        }
        editIndex = index;
    }
    $('#cgdetail-tb').datagrid('onClickRow')
}

function loadWhsinfo() {
    $.ajax({
        url: pageContext + "/whsController/getWhsinfoList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var whsContent = '<option value="" selected="selected">请选择仓库</option>';
            for (var i = 0; i < data.length; i++) {
                whsContent += "<option value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
            }
            $('#whsid').append(whsContent);
            $('#whsid').combobox();
        }
    });
}

function loadTradeinfo() {
    $.ajax({
        url: pageContext + "/tradeinfoController/getTradeinfoPageList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option value="" selected="selected">请选择品牌商</option>';
            for (var i = 0; i < data.length; i++) {
                tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
            }
            $('#tradeid').append(tradeContent);
        }
    });
    $('#tradeid').combobox();
}

function isSjFun(o) {
    if (!$(o).hasClass("checked")) {
        $(o).addClass("checked");
        issj = true;
        $('#cgdetail-tb').datagrid('showColumn', 'kw');
    } else {
        $(o).removeClass("checked");
        issj = false;
        $('#cgdetail-tb').datagrid('hideColumn', 'kw');
    }
}

function isSjClick() {
    var whsid = $("#whsid").val();
    var tradeid = $("#tradeid").val();
    if (whsid == 2) {
        $("#isSjDiv").show();
        $("#issjLable").show();
    } else {
        $("#isSjDiv").hide();
        $("#issjLable").hide();
        $('#cgdetail-tb').datagrid('hideColumn', 'kw');
    }
    $("#isSjDiv").removeClass("checked");
    issj = false;
}

var ygmc_code = "";
$(function () {
    loadYgxx();
    $("#ygmc_code").keydown(function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            loadYgxx();
        }
    });
});
function loadYgxx() {
    ygmc_code = $("#ygmc_code").val();
    $('#ygxx-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/cgdetailController/getYgxxListBySHZ",
        data: {"ygmc_code": ygmc_code},
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.length == 0){
                layer.msg("检索的员工信息不存在！！",function(){});
                return;
            }
            for (var i in data) {
                $("#ygxx-tb").datagrid("appendRow", {
                    id: data[i].id,
                    ygxm: data[i].ygxm,
                    ygcode: data[i].ygcode,
                    zw: data[i].zw
                });
            }
        }
    });
}
var editIndexs = undefined;
function onClickRow(index){
    if (editIndexs != index){
        if (endEditings()){
            $('#ygxx-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndexs = index;
        } else {
            $('#ygxx-tb').datagrid('selectRow', editIndexs);
        }
    }else{
        editIndexs = undefined;
        $('#ygxx-tb').datagrid('endEdit', editIndexs);
    }
}
function endEditings(){
    if (editIndexs == undefined){return true}
    if ($('#ygxx-tb').datagrid('validateRow', editIndexs)){
        $('#ygxx-tb').datagrid('endEdit', editIndexs);
        editIndexs = undefined;
        return true;
    } else {
        return false;
    }
}