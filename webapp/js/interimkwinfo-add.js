var spbatchdetailIndex = 0;
var mxlist;
function loadSpbatchetailinfo(){
    var batchcode = $("#batchcode").val();
    $('#batchcm-tb').datagrid('loadData',{total:0,rows:[]});
    $.ajax({
        url: pageContext + "/spBatchController/getSpbatchdetailListByBatchCode/"+batchcode,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                var spbatchdetails = data.obj;
                $("#batchcm-tb").datagrid({
                    columns:[[
                        {field:'id',title:'',width:80,align:'center',hidden:'true'},
                        {field:'top',title:'',width:80,align:'center',hidden:'true'},
                        {field:'batchcm',title:'尺码',width:110,align:'center'},
                        {field:'bdmxcode',title:'条码',width:110,align:'center'},
                        {field:'mfsl',title:'每份数量',width:110,align:'center'},
                        {field:'batchys',title:'颜色',width:110,align:'center'},
                        {field:'sl',title:'数量',width:200,align:'center',editor:'text'},
                        {field:'kw',title:'库位',width:260,align:'center',editor:'text'},
                        {field:'opt',title:'保存',width:150,align:'center'}
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
                        opt:'<a href="javascript:void(0)"  onclick="save('+i+')" class="glyphicon glyphicon-floppy-open">保存</a>'
                    });
                }
                loadInterimKwInfo();
            }else{
                layer.msg(data.msg);
            }
        }
    });
}
function loadInterimKwInfo() {
    $('#batchcm-tbmx').datagrid('loadData',{total:0,rows:[]});
    var batchcode = $("#batchcode").val();
    $.ajax({
        url: pageContext + "/interimKwInfoController/getInterimKwInfoByBatchcode/"+batchcode,
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            mxlist = data;
            $("#batchcm-tbmx").datagrid({
                columns:[[
                    {field:'id',title:'',width:80,align:'center',hidden:'true'},
                    {field:'top',title:'',width:80,align:'center',hidden:'true'},
                    {field:'batchcm',title:'尺码',width:110,align:'center'},
                    {field:'batchys',title:'颜色',width:110,align:'center'},
                    {field:'kw',title:'库位',width:300,align:'center'},
                    {field:'sl',title:'数量',width:110,align:'center'},
                    {field:'adduname',title:'操作人',width:110,align:'center'},
                    {field:'createtime',title:'操作时间',width:310,align:'center'},
                ]]
            });
            var row;
            if(editIndex != undefined){
                var rows = $('#batchcm-tb').datagrid('getRows');//获得所有行
                row = rows[editIndex];//根据index获得其中一行。
            }
            for (var i = 0; i < data.length; i++) {
                var flag = false;
                if(editIndex == undefined) {
                    flag = true;
                }else if (row.id == mxlist[i].spbatchdeatilid){
                    flag = true;
                }
                if(flag){
                    $("#batchcm-tbmx").datagrid("appendRow", {
                        id: data[i].id,
                        top: ++spbatchdetailIndex,
                        batchcm: data[i].batchcm,
                        batchys: data[i].batchys,
                        kw: data[i].kw,
                        sl: data[i].sl,
                        adduname: data[i].adduname,
                        createtime: data[i].createtime
                    });
                }
            }
        }
    });
}

function save(index) {
    $('#batchcm-tb').datagrid('endEdit', editIndex);
    var rows = $('#batchcm-tb').datagrid('getRows');//获得所有行
    var row = rows[index];//根据index获得其中一行。
    if(row.kw == '' || row.kw == undefined || row.kw == null){
        $('#batchcm-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
        layer.msg("库位不能为空！！",function(){});return;
    }
    if(row.sl == '' || row.sl == undefined || row.sl == null){
        $('#batchcm-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
        layer.msg("数量不能为空！！",function(){});return;
    }
    $.ajax({
        url: pageContext + "/interimKwInfoController/addInterimKwInfo",
        data:JSON.stringify({"spbatchdeatilid":row.id,"kw":row.kw,"sl":row.sl}),
        contentType:'application/json;charset=utf-8',
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            if(data.success){
                $('#batchcm-tb').datagrid('updateRow',{
                    index: index,
                    row: {
                        kw: '',
                        sl: ''
                    }
                });
                $('#batchcm-tb').datagrid('selectRow', index).datagrid('beginEdit', index);
                loadInterimKwInfo();
            }else{
                layer.alert(data.msg);
            }
        }
    });
}
function onClickRow(index){
    if (editIndex != index){
        if (endEditing()){
            var rows = $('#batchcm-tb').datagrid('getRows');//获得所有行
            var row = rows[index];//根据index获得其中一行。
            $('#batchcm-tbmx').datagrid('loadData',{total:0,rows:[]});
            spbatchdetailIndex =0;
            for (var i = 0; i < mxlist.length; i++) {
            	if(row.id == mxlist[i].spbatchdeatilid){
                    $("#batchcm-tbmx").datagrid("appendRow",{
                        id: mxlist[i].id,
                        top: ++spbatchdetailIndex,
                        batchcm: mxlist[i].batchcm,
                        batchys: mxlist[i].batchys,
                        kw: mxlist[i].kw,
                        sl: mxlist[i].sl,
                        adduname: mxlist[i].adduname,
                        createtime: mxlist[i].createtime
                    });
				}
            }
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