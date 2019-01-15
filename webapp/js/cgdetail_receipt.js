var selectindex = 0;
function loadTime() {
    var curr_time = new Date();
    var strDate = curr_time.getFullYear() + "-";
    strDate += curr_time.getMonth() + 1 + "-";
    strDate += curr_time.getDate() + "-";
    strDate += " " + curr_time.getHours() + ":";
    strDate += curr_time.getMinutes() + ":";
    strDate += curr_time.getSeconds();
    $("#takestarttime").datetimebox("setValue", strDate);
    $("#takeendtime").datetimebox("setValue", strDate);
}

function choice() {
    var row = $('#ygxx-tb').datagrid('getSelected');
    if (row) {
        var selections = $('#ygxxselect-tb').datagrid('getRows');//获得所有行
        for(var i in selections){
            if(selections[i].id == row.id){
                layer.msg("员工："+row.ygxm+"，已经添加！！",function(){});
                return;
            }
        }
        var rowIndex = $('#ygxx-tb').datagrid('getRowIndex', row);
        $('#ygxx-tb').datagrid('deleteRow', rowIndex);
        $("#ygxxselect-tb").datagrid("appendRow", {
            id:row.id,
            top: ++selectindex,
            ygxm: row.ygxm,
            ygcode: row.ygcode,
            zw: row.zw
        });
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

var cgdetailIndex = 0;
$(function () {
    var cgdetails = window.parent.getCgdetails();
    loadTime();
    for (var i = 0; i < cgdetails.length; i++) {
        $("#cgdetail-tb").datagrid("appendRow", {
            cgdetailid: cgdetails[i].id,
            top: ++cgdetailIndex,
            cgitemno: cgdetails[i].cgitemno,
            cpmc: cgdetails[i].cpmc,
            cpsl: cgdetails[i].cpsl
        })
    }
})
var editIndex = undefined;

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

//点击单元格事件：
function onClickCell(index, field, value) {
    if (endEditing()) {
        if (field == "recvds" || field == 'kw') {
            $(this).datagrid('beginEdit', index);
            var ed = $(this).datagrid('getEditor', {index: index, field: field});
            $(ed.target).focus();
        }
        editIndex = index;
    }
    $('#cgdetail-tb').datagrid('onClickRow')
}

function formData() {
    $('#cgdetail-tb').datagrid('endEdit', editIndex);
    var jbrmc = "";
    var jbrid = "";
    var selectData = $('#ygxxselect-tb').datagrid('getData');
    for (var i = 0; i < selectData.total; i++) {
        jbrmc += selectData.rows[i].ygxm + ",";
        jbrid += selectData.rows[i].id + ",";
    }
    var cgdetailArr = new Array();
    var cgdetails = $('#cgdetail-tb').datagrid('getData');
    for (var i = 0; i < cgdetails.total; i++) {
        cgdetailArr.push({
            "cgdetailid": cgdetails.rows[i].cgdetailid,
            "recvds": cgdetails.rows[i].recvds,
            "kw": cgdetails.rows[i].kw
        })
    }
    var takestarttime = $("#takestarttime").val();
    var takeendtime = $("#takeendtime").val();
    var recvmanage = $("#recvmanage").val();
    var driver = $("#driver").val();
    var license = $("#license").val();
    var drivertel = $("#drivertel").val();
    return {"jbrid":jbrid,
            "jbrmcs": jbrmc,
             "cgsenddetails": cgdetailArr,
             "takestarttimeStr": takestarttime,
             "takeendtimeStr": takeendtime,
             "recvmanages":recvmanage,
             "driver":driver,
             "license":license,
             "drivertel":drivertel
            };
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