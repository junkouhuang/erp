//加载类别
$(function () {
    loadWhsinfo();
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected">选择门店</option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value=" + data[i].id + ">" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
    fhgrid = $('#fhtable').datagrid({
        url: pageContext + "/fhOrdersController/getFhorderWithTotalDataGridForBind",
        fit: true,
        fitColumns: true,
        border: true,
        idField: 'id',
        checkOnSelect: true,
        selectOnCheck: true,
        showColumns: true, //是否显示所有的列
        nowrap: false,
        rownumbers: true,
        method: 'POST',
        singleSelect: false,
        title: '待绑',
        columns: [[{
            field: 'id',
            title: 'ID',
            width: 150,
            checkbox: true
        }, {
            field: 'ordercode',
            title: '单号',
            width: 350
        }, {
            field: 'mdcode',
            title: '店号',
            width: 150
        }, {
            field: 'fhtotal',
            title: '发货数量',
            width: 150
        }, {
            field: 'totalamount',
            title: '总金额',
            width: 200
        }, {
            field: 'fhtotalbagsl',
            title: '发货袋数',
            width: 100
        }, {
            field: 'whsname',
            title: '仓库',
            width: 150
        }, {
            field: 'wlgs',
            title: '物流公司',
            width: 200
        }]]
    });

    var toolbar = [{
        text: '移除',
        iconCls: 'icon-cut',
        handler: removetempBind
    }];
    //
    bindgrid = $('#bindtable').datagrid({
        fit: true,
        fitColumns: true,
        border: true,
        idField: 'id',
        checkOnSelect: true,
        selectOnCheck: true,
        nowrap: false,
        rownumbers: true,
        toolbar: toolbar,
        title: '待绑',
        singleSelect: false,
        columns: [[{
            field: 'id',
            title: 'ID',
            width: 150,
            checkbox: true
        }, {
            field: 'ordercode',
            title: '单号',
            width: 300
        }, {
            field: 'mdcode',
            title: '店号',
            width: 200
        }, {
            field: 'fhtotal',
            title: '发货数量',
            width: 200
        }, {
            field: 'totalamount',
            title: '总金额',
            width: 200
        }, {
            field: 'fhtotalbagsl',
            title: '发货袋数',
            width: 200
        }, {
            field: 'wlgs',
            title: '物流公司',
            width: 200
        }]]
    });
});


//添加要绑定的发货单
function tempBind() {
    var selections = fhgrid.datagrid('getSelections');
    if (selections) {
        var rows = bindgrid.datagrid('getRows');
        for(var j in selections){
            var flag = true;
            for (var i = 0, item; item = rows[i++];) {
                if (item.id === selections[j].id) {
                    flag = false;
                   break;
                }
            }
            if(flag){
                bindgrid.datagrid('appendRow', selections[j]);
            }
        }
    }

}

//移除选择的发货单
function removetempBind() {
    var rows = bindgrid.datagrid('getSelections');
    if (rows) {
        for(var i in rows){
            var index = bindgrid.datagrid('getRowIndex', rows[i]);
            bindgrid.datagrid('deleteRow', index);
        }
    }
}
var storeid = "";
//门店combobx value 改变时
function selectOnchang(obj) {
    var data = obj.options[obj.selectedIndex];
    var value = data.value;
    console.log("storeid:  "+storeid +" value: "+value);
    if(storeid != value){
        storeid = value;
        fhgrid.datagrid({
            queryParams: {
                storeid: value,
                whsid:whsid
            }
        });
    }
}
var whsid = "";
function selectWhsOnChang(obj) {
    var data = obj.options[obj.selectedIndex];
    var value = data.value;
    console.log("whsid:  "+whsid +" value: "+value);
    if(whsid != value){
        whsid = value;
        fhgrid.datagrid({
            queryParams: {
                whsid: value,
                storeid:storeid
            }
        });
    }
}

//获取要提交的数据
var formData = function () {
    var rows = bindgrid.datagrid('getRows');
    if (rows && rows.length > 0) {
        var data = $("#fhorderbindform").serializeJSON();
        if ($.trim(data.wlgs) == '') {
            layer.msg("未指定物流公司");
            return;
        }
        data['fhorderlist'] = rows;
        return data;
    } else {
        layer.msg("未选择任何发货单进行绑定");
        return;
    }
    var fhbatchno = $('#fhbatchno').val();
    if (fhbatchno != '') {
        layer.msg("未指定任何发货批号");
        return;
    }

};

//获取发货批号
function getBatchno() {
    $.ajax({
        url: pageContext + "/fhbatchController/getFhbatch",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if (data.success) {
                $('#fhbatchno').val(data.obj);
            } else {
                layer.msg(data.msg);
            }
        }
    });
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