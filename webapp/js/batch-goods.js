$(function() {
    var iCount = window.setInterval(function(){
        var batchid = $("#batchid").val();
        var opno = $("#opno").val();
        if ((batchid != null && batchid != undefined && batchid != '')
            && (opno != null && opno != undefined && opno != '')){
            initLeftTable(batchid, opno);                // 初始化左表格
            initRightTable();                            // 初始化右表格
            clearInterval(iCount);
        }
    }, 10);
});

var initLeftTable = function(batchid, opno){
    $("#l-table").datagrid({
        url:pageContext+"/spBatchController/getBatchBindSP",
        method: 'POST',
        queryParams: {'batchID' : batchid, 'opno' : opno},
        rownumbers:true,            // 序列号，显示在第一列
        pagination:false,           // 分页条
        pageSize: 10,
        pageList: [10, 20, 50, 100, 150, 200],
        fitColumns: true,	        // 列自适应?
        singleSelect: false,	    // 是否开启单选
        nowrap: true,
        showFooter: true,
        idField: "id",
        loadFilter: function(data){
            return data;
        },
        columns:[[
            {
                field : 'checkbox',
                checkbox: true
            },
            {field:'spcode',title:'商品编码',width:90,align:'center'},
            {field:'spmc',title:'商品名称',width:110,align:'center'}
        ]]
    });
}


var initRightTable = function(){
    $("#r-table").datagrid({
        url:"",
        method: 'POST',
        queryParams: {},
        rownumbers:true,
        pagination:false,
        pageSize: 10,
        pageList: [10, 20, 50, 100, 150, 200],
        fitColumns: true,
        singleSelect: false,
        nowrap: true,
        showFooter: true,
        idField: "id",
        loadMsg: "加载中......",
        autoRowHeight: false,
        loadFilter: function(data){
            return data.obj;
        },
        columns:[[
            {
                field : 'checkbox',
                checkbox: true,
            },
            {field:'spcode',title:'商品编码',width:90,align:'center'},
            {field:'spmc',title:'商品名称',width:110,align:'center'}
        ]],

        onLoadSuccess: function (data) {
            if (data.total == 0){
                $("#right")
                    .find(".datagrid-view2")
                    .find(".datagrid-body")
                    .html("<p style='color: red; text-align: center;'>没有数据~</p>");
            }
        }
    });
}

var search = function(){
    $("#r-table").datagrid('unselectAll');                          // 搜索前先把右表格选中的行全部取消
    var spcode = getSpCode();
    var spmc = getSpMc();
    var batchid = getBatchID();
    var data = $("#l-table").datagrid('getData');
    var str = getAllIDStr(data.rows);
    if ((spcode == null || spcode == "" || spcode == undefined)
        && (spmc == null || spmc == "" || spmc == undefined)){
        layer.msg("请输入搜索条件");
        return false;
    }
    $('#r-table').datagrid({url:pageContext+"/spBatchController/getSp",
        queryParams:{spcode : spcode,  spmc : spmc, batchid : batchid, str:str}
    })
}

var remove = function(){    // 移除
    var rows = $("#l-table").datagrid('getChecked');
    if (rows == null || rows == undefined || rows.length == 0){layer.msg("未选中商品"); return false;}
    var number = 0;
    var copyRows = [];
    $.each(rows, function(index, item){
        $("#r-table").datagrid('insertRow', {index: number ++, row: item});
        copyRows.push(item);
    });
    $.each(copyRows, function(index, item){
        var rowIndex = $('#l-table').datagrid('getRowIndex', item);
        $('#l-table').datagrid('deleteRow', rowIndex);
    });

    $("#r-table").datagrid('unselectAll');
    var rows = $("#l-table").datagrid('getChecked');
    if (rows.size == 0 || rows == "" || rows == null || rows == undefined){
        $("#l-table").datagrid('unselectAll');
    }
}

var relevance = function(){    // 关联
    var rows = $("#r-table").datagrid('getChecked');
    if (rows == null || rows == undefined || rows.length == 0){layer.msg("未选中商品"); return false;}
    var number = 0;
    var copyRows = [];
    $.each(rows, function(index, item){
        $("#l-table").datagrid('insertRow', {index: number ++, row: item});
        copyRows.push(item);
    });
    $.each(copyRows, function(index, item){
        var rowIndex = $('#r-table').datagrid('getRowIndex', item);
        $('#r-table').datagrid('deleteRow', rowIndex);
    });

    $("#l-table").datagrid('unselectAll');
    var rows = $("#r-table").datagrid('getChecked');
    if (rows.size == 0 || rows == "" || rows == null || rows == undefined){
        $("#r-table").datagrid('unselectAll');
    }
}

var isRepeat = function(s, obj){    // 判断是否重复
    var msg = true;
    $.each(s, function(index, item){
        if (obj.id == item.id){
            msg =  "商品编码为" + item.spcode + "的商品已存在!";
            return false;
        }
    });
    return msg;
}

var getSpCode = function(){     // 获取商品编码
    return $("#spcode").val();
}

var getSpMc = function(){       // 获取商品名称
    return $("#spmc").val();
}

var getBatchID = function() {
    return $("#batchid").val();
}

var getALLID = function(rows){      // 获取所有id
    var arr = new Array();
    if (rows == null || rows == undefined || rows.length == 0){return arr;}
    $.each(rows, function(index, item){
        arr[index] = item.id;
    });
    return arr;
}

var getAllIDStr = function(rows){      // 获取所有id
    if (rows == null || rows == undefined || rows.length == 0){return "";}
    var str = "";
    $.each(rows, function(index, item){
        str += item.id
        if (rows.length != index + 1){
            str += ",";
        }
    });
    return str;
}

var getAllIDList = function(rows){      // 获取所有id
    var arr = new Array();
    if (rows == null || rows == undefined || rows.length == 0){return arr;}
    $.each(rows, function(index, item){
        arr.push(item.id);
    });
    return arr;
}

var getAllSpxxList = function(rows){
    var arr = new Array();
    if (rows == null || rows == undefined || rows.length == 0){return arr;}
    $.each(rows, function(index, item){
        arr.push({id : item.id, spcode : item.spcode});
    });
    return arr;
}

var save = function(){
    var rows = $("#l-table").datagrid('getRows');
    var list = getAllSpxxList(rows);        // 获取要关联的商品信息
    var batchid = $("#batchid").val();      // 获取batchid
    layer.confirm('确认关联？', {
        btn: ['确认','取消'],
        shade: false
    }, function(index){
        $.ajax({
            url:pageContext+"/spBatchController/bindingSP/" + batchid,
            contentType : 'application/json;charset=utf-8',
            type:"POST",
            async:true,
            dataType:"json",
            data: JSON.stringify(list),
            success:function(req){
                if (req.success){
                    alert("关联成功！");
                    //var i = parent.layer.getFrameIndex(window.name);
                    //parent.layer.close(i);
                    window.parent.location.reload();
                }else {
                    layer.close(index);
                    alert(req.msg);
                }

            }
        });
    });
}
