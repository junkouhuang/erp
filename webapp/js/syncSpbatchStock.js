function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function () {
    var batchid = getQueryString("batchid");
    $.ajax({
        url: pageContext + "/spBatchController/getSpbatchdetailByBatchid/"+batchid,
        dataType: "json",
        async: true,
        type: "POST",   //请求方式
        success: function (data) {
            if (data.success) {
                for(var i=0;i<data.obj.length;i++){
                    $("#syncinfo-tb").datagrid("appendRow", {
                        top:i+1,
                        id:data.obj[i].id,
                        batchcm:data.obj[i].batchcm,
                        batchys:data.obj[i].batchys,
                        orderfs:data.obj[i].orderfs,
                        syfs:data.obj[i].syfs
                    });
                }
            }else{
                alert(data.msg);
                window.parent.location.reload();
            }
        }, error: function () {
        }
    });
})
var editIndex = undefined;

function endEditing() {//该方法用于关闭上一个焦点的editing状态
    if (editIndex == undefined) {
        return true
    }
    if ($('#syncinfo-tb').datagrid('validateRow', editIndex)) {
        $('#syncinfo-tb').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

//点击单元格事件：
function onClickCell(index, field, value) {
    if (endEditing()) {
        if (field == "syfs") {
            $(this).datagrid('beginEdit', index);
            var ed = $(this).datagrid('getEditor', {index: index, field: field});
            $(ed.target).focus();
        }
        editIndex = index;
    }
    $('#syncinfo-tb').datagrid('onClickRow')
}

function formData() {
    var spbatchdetails = new Array();
    var selectData = $('#syncinfo-tb').datagrid('getData');
    for (var i = 0; i < selectData.total; i++) {
        spbatchdetails.push({"id":selectData.rows[i].id,"syfs":selectData.rows[i].syfs,"orderfs":selectData.rows[i].orderfs});
    }
    return spbatchdetails;
}