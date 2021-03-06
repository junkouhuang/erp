var spbatchdetailIndex = 0;
var mxlist;
$(function () {
    $("#spbfdan-tb").datagrid({
        columns:[[
            {field:'id',title:'',width:80,align:'center',hidden:'true'},
            {field:'top',title:'',width:80,align:'center',hidden:'true'},
            {field:'createtime',title:'创建时间',width:300,align:'center'},
            {field:'addusername',title:'创建人',width:200,align:'center'},
            {field:'status',title:'状态',width:250,align:'center',
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '新建';
                    } else if (value == '1') {
                        return '扫描';
                    } else if (value == '2') {
                        return '确认';
                    } else if (value == '3') {
                        return '老货翻新';
                    } else if (value == '4') {
                        return '报废';
                    } else if (value == '5') {
                        return '老货重发';
                    } else {
                        return '错误';
                    }
                }
            },
            {field:'bz',title:'备注',width:570,align:'center'},
        ]]
    });
})
var spbfdancode = "";
function getSpBfdanInfo(){
    var code = $("#spbfdancode").val();
    if(code == "" || code == null || code == undefined){
        return;
    }
    spbfdancode = code;
    $('#spbfdan-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/spBFDanController/getSpBfdanInfoByOrdercode/"+spbfdancode,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                $("#spbfdan-tb").datagrid("appendRow",{
                    id: data.obj.id,
                    top: ++spbatchdetailIndex,
                    createtime: data.obj.createtime,
                    addusername: data.obj.addusername,
                    status: data.obj.status,
                    bz: data.obj.bz
                });
                loadInferiorSpmxInfo();
            }else{
                layer.msg(data.msg);
            }
        }
    });
}
function loadInferiorSpmxInfo() {
    inferiorspmxTable = $('#inferiorspmx-table').datagrid({
        url: pageContext + "/inferiorController/getInferiorSpmxInfo/"+spbfdancode,
        fit: true,
        fitColumns: true,
        border: true,
        showColumns: true, //是否显示所有的列
        nowrap: false,
        rownumbers: true,
        method: 'POST',
        pageList : [ 8 ],// 可以设置每页记录条数的列表
        pageSize : 8,// 每页显示的记录条数，默认为10
        loadMsg : '正在加载数据，请稍后...',
        pagination : true, // 分页工具栏
        singleSelect: false,
        title: '在库数据',
        queryParams:queryParams(),
        columns: [[{
            field: 'id',
            title: 'ID',
            checkbox: true
        }, {
            field: 'mxcode',
            title: '条码',
            align:'center',
            width:'120px'
        }, {
            field: 'spcode',
            title: '款号',
            align:'center',
            width:'108px'
        }, {
            field: 'spmc',
            title: '商品名称',
            align:'center',
            width:'200px'
        }, {
            field: 'sl',
            title: '剩余数量',
            align:'center',
            width:'100px',
            editor:'numberbox'
        }, {
            field: 'selective',
            title: '已勾',
            align:'center',
            width:'51px'
        }]]
    });
    $("#selectForm").show();
    $("#optButton").show();
    selectTable = $('#select-inferiorspmx-table').datagrid({
        url: '',
        fit: true,
        fitColumns: true,
        border: true,
        showColumns: true, //是否显示所有的列
        nowrap: false,
        rownumbers: true,
        method: 'POST',
        singleSelect: false,
        title: '已选数据',
        columns: [[{
            field: 'id',
            title: 'ID',
            checkbox: true
        }, {
            field: 'mxcode',
            title: '条码',
            align:'center',
            width:'110px'
        }, {
            field: 'spcode',
            title: '款号',
            align:'center',
            width:'108px'
        }, {
            field: 'spmc',
            title: '商品名称',
            align:'center',
            width:'200px'
        }, {
            field: 'maxsl',
            title: '限量',
            align:'center',
            width:'60px'
        }, {
            field: 'sl',
            title: '退货数量',
            align:'center',
            width:'100px',
            editor:'numberbox'
        }]]
    });
}

function queryParams() {
    var postdata = $('#inferiorspmxForm').serializeJSON();
    postdata["pageSize"] = 8;
    return postdata;
}
var editIndex = undefined;
function onClickRow(index){
    if (editIndex != index){
        if (endEditing()){
            $('#select-inferiorspmx-table').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#select-inferiorspmx-table').datagrid('selectRow', editIndex);
        }
    }else{
        editIndex = undefined;
        $('#select-inferiorspmx-table').datagrid('endEdit', editIndex);
    }
}
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#select-inferiorspmx-table').datagrid('validateRow', editIndex)){
        $('#select-inferiorspmx-table').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function tempBind() {
    var selections = inferiorspmxTable.datagrid('getSelections');
    for (var j = 0, selectobj; selectobj = selections[j++];) {
        if (selectobj) {
            var flag = true;
            var rows = selectTable.datagrid('getRows');
            for (var i = 0, item; item = rows[i++];) {
                if (item.id === selectobj.id) {
                    flag = false;
                    break;
                }
            }
            if(flag){
                var index = inferiorspmxTable.datagrid('getRowIndex', selectobj);
                $('#inferiorspmx-table').datagrid('updateRow', {
                    index: index,
                    row: {
                        selective: '√'
                    }
                });
                selectTable.datagrid('appendRow',{
                    "id":selectobj.id,
                    "mxcode":selectobj.mxcode,
                    "spcode":selectobj.spcode,
                    "spmc":selectobj.spmc,
                    "maxsl":selectobj.sl,
                    "sl":selectobj.sl
                });
            }
        }
    }
}
function tempRemove() {
    var selections = selectTable.datagrid('getSelections');
    for (var j = 0, selectobj; selectobj = selections[j++];) {
        if (selectobj) {
            var rows = inferiorspmxTable.datagrid('getRows');
            for (var i = 0, item; item = rows[i++];) {
                if (item.id === selectobj.id) {
                    var index = inferiorspmxTable.datagrid('getRowIndex',item);
                    $('#inferiorspmx-table').datagrid('updateRow',{
                        index: index,
                        row: {
                            selective: ''
                        }
                    });
                    break;
                }
            }
            var index = selectTable.datagrid('getRowIndex', selectobj);
            selectTable.datagrid('deleteRow',index);
        }
    }
}

function queryInferiorspmxTable() {
    var postdata = $('#inferiorspmxForm').serializeJSON();
    postdata["pageSize"] = 8;
    inferiorspmxTable.datagrid({
        queryParams: postdata,
        onLoadSuccess: function (data) {
            var selections = selectTable.datagrid('getRows');
            var rows = inferiorspmxTable.datagrid('getRows');
            for (var j = 0, selectobj; selectobj = selections[j++];) {
                if (selectobj) {
                    for (var i = 0, item; item = rows[i++];) {
                        if (item.id === selectobj.id) {
                            var index = inferiorspmxTable.datagrid('getRowIndex',item);
                            $('#inferiorspmx-table').datagrid('updateRow',{
                                index: index,
                                row: {
                                    selective: '√'
                                }
                            });
                            break;
                        }
                    }
                }
            }
        }
    });
}

function formData(){
    $('#select-inferiorspmx-table').datagrid('endEdit', editIndex);
   return {
       spbfdancode :spbfdancode,
       rows :selectTable.datagrid('getRows')
   };
}