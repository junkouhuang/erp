var spbatchdetailIndex = 0;
var mxlist;
$(function () {
    $("#cgreturn-tb").datagrid({
        columns:[[
            {field:'id',title:'',width:80,align:'center',hidden:'true'},
            {field:'top',title:'',width:80,align:'center',hidden:'true'},
            {field:'gysmc',title:'供应商',width:300,align:'center'},
            {field:'whsname',title:'仓库',width:110,align:'center'},
            {field:'tradename',title:'品牌商',width:200,align:'center'},
            {field:'status',title:'状态',width:100,align:'center',formatter : function(value, row, index) {
                if (value == 0) {
                    return '默认';
                }else {
                    return '未知';
                }
            }},
            {field:'adduname',title:'添加者',width:110,align:'center'},
            {field:'createtime',title:'创建时间',width:250,align:'center',editor:'text'},
            {field:'bz',title:'备注',width:250,align:'center'}
        ]]
    });
})
var returncode = "";
function loadSpbatchetailinfo(){
    var code = $("#returncode").val();
    if(code == "" || code == null || code == undefined){
        return;
    }
    returncode = code;
    $('#cgreturn-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/cgReturnOrderController/getCgReturnInfoByOrderCode/"+returncode,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                if(data.obj.status == 0){
                    $("#cgreturn-tb").datagrid("appendRow",{
                        id: data.obj.id,
                        top: ++spbatchdetailIndex,
                        gysmc: data.obj.gysmc,
                        whsname: data.obj.whsname,
                        tradename: data.obj.tradename,
                        status: data.obj.status,
                        adduname: data.obj.adduname,
                        createtime: data.obj.createtime,
                        bz: data.obj.bz
                    });
                    loadInferiorSpmxInfo();
                }else{
                   layer.msg("采购退货单："+returncode+",状态不是默认！！",function(){});
                }
            }else{
                layer.msg(data.msg);
            }
        }
    });
}
function loadInferiorSpmxInfo() {
    var inferiorindexList = new Array();
    inferiorspmxTable = $('#inferiorspmx-table').datagrid({
        url: pageContext + "/inferiorController/getInferiorSpmxBySelective/"+returncode,
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
    var ordercode = $("#returncode").val();
    $('#select-inferiorspmx-table').datagrid('endEdit', editIndex);
   return {
       ordercode :ordercode,
       rows :selectTable.datagrid('getRows')
   };
}