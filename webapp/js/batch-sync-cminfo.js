var spbatchdetailIndex = 0;
$(function () {
    var spbatchdetails = window.parent.getSpbatchdetails();
    console.log(spbatchdetails);
    $("#batchcm-tb").datagrid({
        columns:[[
            {field:'id',title:'',width:80,align:'center',hidden:'true'},
            {field:'top',title:'',width:80,align:'center',hidden:'true'},
            {field:'batchcm',title:'尺码',width:110,align:'center',editor:'text'},
            {field:'bdmxcode',title:'条码',width:110,align:'center',editor:'text'},
            {field:'mfsl',title:'每份数量',width:110,align:'center',editor:'numberbox'},
            {field:'batchys',title:'颜色',width:110,align:'center',editor:'text'},
            {field:'opt',title:'操作',width:300,align:'center'}
        ]]
    });
    for (var i = 0; i < spbatchdetails.length; i++) {
        $("#batchcm-tb").datagrid("appendRow",{
            id: spbatchdetails[i].id,
            top: ++spbatchdetailIndex,
            batchcm: spbatchdetails[i].batchcm,
            bdmxcode: spbatchdetails[i].bdmxcode,
            mfsl: spbatchdetails[i].mfsl,
            batchys: spbatchdetails[i].batchys,
            opt:'cannot be modified..'
        });
    }
})
function onClickRow(index){
    if (editIndex != index){
        if (endEditing()){
            $('#batchcm-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
            editIndex = index;
        } else {
            $('#batchcm-tb').datagrid('selectRow', editIndex);
        }
    }
}
var editIndex = undefined;
function endEditing(){
    if (editIndex == undefined){return true}
    if ($('#batchcm-tb').datagrid('validateRow', editIndex)){
        var ed = $('#batchcm-tb').datagrid('getEditor', {index:editIndex,field:'productid'});
        $('#batchcm-tb').datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

function append() {
    var index = $('#batchcm-tb').datagrid('getData').rows.length;
    $("#batchcm-tb").datagrid('appendRow', {
        top: ++spbatchdetailIndex,
        batchcm: '',
        bdmxcode:'',
        mfsl: '',
        batchys: '',
        opt:'<a href="javascript:void(0)"  onclick="removeit('+index+')" class="mr-20 glyphicon glyphicon-remove">移除</a>'
    });
}

function removeit(index){
    $("#batchcm-tb").datagrid('deleteRow',index);
}

function formData() {
    $('#batchcm-tb').datagrid('endEdit', editIndex);
    var rows = $('#batchcm-tb').datagrid('getData').rows;
    return rows;
}