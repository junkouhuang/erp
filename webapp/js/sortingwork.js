$(function () {
    loadYgxx();
    loadTime();
    var cgsendetails = window.parent.getCgsenddetails();
    var itemno = cgsendetails.itemno;
    //获取cgfj ordercode
    loadCgfjOrdercodeByItemno(itemno);
    $("#sorting-tb").datagrid("appendRow", {
        top:1,
        itemno:cgsendetails.itemno,
        cpmc:cgsendetails.cpmc,
        cgsl:cgsendetails.cpsl,
        nowds:cgsendetails.nowds,
        recvds:cgsendetails.recvds,
        kw:cgsendetails.kw
    });
})
function loadTime() {
    var curr_time = new Date();
    var strDate = curr_time.getFullYear() + "-";
    strDate += curr_time.getMonth() + 1 + "-";
    strDate += curr_time.getDate() + "-";
    strDate += " " + curr_time.getHours() + ":";
    strDate += curr_time.getMinutes() + ":";
    strDate += curr_time.getSeconds();
    $("#fjsj").datetimebox("setValue", strDate);
}
function loadCgfjOrdercodeByItemno(itemno) {
    console.log(itemno);
    $.ajax({
        url: pageContext + "/cgfjController/getCgfjOrderCodeByItemno/"+itemno,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                $("#ordercode").textbox("setValue",data.obj);
            }
        }
    });
}
function loadYgxx() {
    $.ajax({
        url: pageContext + "/cgdetailController/getYgxxList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var ygxxContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                if(data[i].ygcode != null){
                    ygxxContent += "<option value=" + data[i].id + ">" + data[i].ygcode +'_'+data[i].ygxm +"</option>";
                }else{
                    ygxxContent += "<option value=" + data[i].id + ">" +data[i].ygxm +"</option>";
                }

            }
            $('#ygxxid').append(ygxxContent);
        }
    });
    $('#ygxxid').combobox();
}
var editIndex = undefined;

function endEditing() {//该方法用于关闭上一个焦点的editing状态
    if (editIndex == undefined) {
        return true
    }
    if ($('#sorting-tb').datagrid('validateRow', editIndex)) {
        $('#sorting-tb').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

//点击单元格事件：
function onClickCell(index, field, value) {
    if (endEditing()) {
        if (field == "fjds") {
            $(this).datagrid('beginEdit', index);
            var ed = $(this).datagrid('getEditor', {index: index, field: field});
            $(ed.target).focus();
        }
        editIndex = index;
    }
    $('#sorting-tb').datagrid('onClickRow')
}

function formData() {
    $('#sorting-tb').datagrid('endEdit', editIndex);
    var selectData = $('#sorting-tb').datagrid('getData');
    var ordercode = $("#ordercode").textbox("getValue");
    var fjsj = $("#fjsj").textbox("getValue");
    var fjfzrid = $("#ygxxid").textbox("getValue");
    var fjfzr = $("#ygxxid").textbox("getText");
    var bz = $("#bz").textbox("getValue");
    return {"cpmc":selectData.rows[0].cpmc,
            "itemno":selectData.rows[0].itemno,
            "ordercode":ordercode,
            "fjds":selectData.rows[0].fjds,
            "fjTime":fjsj,
            "fjfzr":fjfzr,
            "fjfzrid":fjfzrid,
            "bz":bz};
}