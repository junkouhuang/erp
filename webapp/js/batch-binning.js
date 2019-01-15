$(function(){
    var iCount = window.setInterval(function(){
        var batchid = $("#batchid").val();
        var spbatchopno = $("#opno").val();
        if ((batchid != null && batchid != undefined && batchid != '')
            && (opno != null && opno != undefined && opno != '')){
            initLeftTable(batchid, spbatchopno);        // 加载左表格
            initRightTable(batchid, spbatchopno);       // 加载右表格
            checkType(batchid);
            clearInterval(iCount);
        }
    }, 100);
});


var initLeftTable = function(batchid, spbatchopno){
    $("#left-table").datagrid({
        url:pageContext + "/spBatchController/getSpBatchOpSpmx",// 加载的URL
        method: 'POST',
        queryParams: {'batchid' : batchid, 'spbatchopno' : spbatchopno},
        rownumbers:true,             // 序列号，显示在第一列
        pagination:false,            // 分页条
        pageSize: 10,
        pageList: [10, 20, 50, 100, 150, 200],
        fitColumns: true,
        singleSelect: false,
        nowrap: true,
        autoRowHeight: false,
        showFooter: true,
        loadMsg: "加载中......",
        loadFilter: function(data){
            return data.obj;
        },
        columns:[[
            {field:'mxcode',title:'商品编码',width:100,align:'center'},
            {field:'spmc',title:'商品名称',width:150,align:'center'},
            {field:'ys',title:'颜色',width:50,align:'center'},
            {field:'cm',title:'尺码',width:70,align:'center'},
            {field:'gpsl',title:'数量',width:70,align:'center',
                formatter:function(value,row,index){
                    if (value == null || value == undefined || value == ""){
                        return 0;
                    } else {
                        return value;
                    }
            }}
        ]],

        onLoadSuccess: function (data) {
            var total = 0;
            $.each(data.rows, function(index, item){
                var gpsl = item.gpsl;
                var mxcode = item.mxcode;
                if (gpsl == 0 || gpsl == null || gpsl == undefined){
                    layer.msg("商品编码为" + mxcode + "的商品数量为0，无法进行分箱或单件包装！", {time:5000});
                    hiddenButton(true);
                    $(".content").append("<div>" +
                        "<p style='font-size: 15px; color: red; text-align: center;'>" +
                        "提示信息：商品编码为" + mxcode + "的商品数量为0，无法进行分箱或单件包装" +
                        "</p>" +
                        "</div>");
                    return false;
                }
                total += item.gpsl;
            });
            $('#left-table').datagrid('reloadFooter',[
                {gpsl: "合计：" + total},
            ]);
        },
    });
}
var editIndex = undefined;
var pkgType = undefined;
var initRightTable = function(batchid, spbatchopno){
    $("#right-table").datagrid({
        url:pageContext + "/spBatchController/getSpBatchDetail",// 加载的URL
        method: 'POST',
        queryParams: {'batchid' : batchid, 'spbatchopno' : spbatchopno},
        rownumbers:true,             // 序列号，显示在第一列
        pagination:false,            // 分页条
        pageSize: 10,
        pageList: [10, 20, 50, 100, 150, 200],
        fitColumns: true,
        singleSelect: true,
        nowrap: true,
        autoRowHeight: false,
        showFooter: true,
        loadMsg: "加载中......",
        loadFilter: function(data){
            pkgType = data.obj.pkgType;
            return data.obj.list;
        },
        columns:[[
            {field:'batchys',title:'颜色',width:50,align:'center'},
            {field:'batchcm',title:'尺码',width:70,align:'center'},
            {field:'total',title:'总数',width:70,align:'center',
                formatter:function(value,row,index){
                    if (value == null || value == undefined || value == ""){
                        return 0;
                    } else {
                        return value;
                    }
                }
            },
            {field:'mfsl',title:'每箱数量',width:70,align:'center',
                editor:{
                    type:'numberbox'
                },
                styler: function(value, row, index){
                    var total = row.total;
                    var binning = row.binning;
                    if (Object.getOwnPropertyNames(row).length <= 1){           // 统计行不选要样式
                        return false;
                    }
                    if (pkgType == 1){                                          // 如果是单件包装类型的，默认就显示绿色框样式
                        return 'border: 1px solid #18a689;';
                    }
                    if ((value == "" || value == null || value == undefined) && total != 0 && (binning == null || binning == false)){
                        return 'border: 1px solid red;';
                    }else if(binning == true){
                        return 'border: 1px solid #FFD54B;';
                    }else{
                        return 'border: 1px solid #18a689;';
                    }
                }
            },
            {field:'fxfs',title:'箱数',width:70,align:'center'}
        ]],
        onLoadSuccess: function (data) {
            var sum = 0;
            $.each(data.rows, function(index, item){
                sum += item.total;
                var mfsl = item.mfsl;
                var total = item.total;

                if (pkgType == 1){                                      // 如果是单件包装类型，每份数量默认显示1
                    var result = Math.ceil(total / 1);
                    $("#right-table").datagrid('updateRow',{
                        index: index,
                        row: {
                            mfsl: 1,
                            fxfs: result,
                        }
                    });
                    return true;                                        // 直接结束本次循环
                }

                if (mfsl != 0 && mfsl != null && mfsl != undefined){
                    var result = Math.ceil(total / mfsl);
                    $("#right-table").datagrid('updateRow',{
                        index: index,
                        row: {
                            fxfs: result,
                        }
                    });
                }
            });
            $('#right-table').datagrid('reloadFooter',[
                {total: "合计：" + sum},
            ]);
        },

        onClickCell : function(rowIndex, field, value){
            if (field != "mfsl"){
                $("#right-table").datagrid('endEdit', editIndex);
                editIndex = undefined;
                return false;
            }
            if (endEditing()){
                $("#right-table").datagrid('selectRow', rowIndex).datagrid('beginEdit', rowIndex);
                editIndex = rowIndex;
            } else {
                $("#right-table").datagrid('selectRow', editIndex);
            }
        },

        onBeforeEdit : function (rowIndex, rowData){
            var total = rowData.total;
            var binning = rowData.binning;
            if ((total == 0 || total == null || total == undefined) || binning == true || pkgType == 1){
                return false;
            }
        },
        onAfterEdit : function (rowIndex, rowData, changes){
            var mfsl = rowData.mfsl;
            var total = rowData.total;
            if (mfsl == "" || mfsl == 0 || mfsl > total || mfsl == null || mfsl == undefined){
                $("#right-table").datagrid('updateRow',{
                    index: rowIndex,
                    row: {
                        mfsl: "",
                        fxfs: ""
                    }
                });
                return false;
            }
            var result = Math.ceil(total / mfsl);
            $("#right-table").datagrid('updateRow',{
                    index: rowIndex,
                    row: {
                        fxfs: result,
                    }
            });
        }
    });
}

function endEditing(){
    if (editIndex == undefined){return true}
    if ($("#right-table").datagrid('validateRow', editIndex)){
        $("#right-table").datagrid('endEdit', editIndex);
        editIndex = undefined;
        return true;
    } else {
        return false;
    }
}

/**
 * 判断是是分箱还是单件包装
 * @author 郑学亮
 * @date   2018/2/12 9:06
 **/
var checkType = function(batchid){
    if (batchid == "" ||batchid == null || batchid == undefined){
        typeError();
        return false;
    }
    $.ajax({
        url : pageContext + "/spBatchController/checkBatchType/" + batchid,
        type: "POST",
        async : false,
        dataType : "JSON",
        success : function(req){
            if (req.success){
                if (req.obj == 0){
                    changeTile("分箱");
                    hiddenSingle(true);
                }else if (req.obj == 1){
                    changeTile("单件包装");
                    hiddenBinning(true);
                }else{
                    typeError();
                }
            }else {
                typeError();
            }
        }
    });
}


/**
 * 无法确定错误信息
 * @author 郑学亮
 * @date   2018/2/12 9:19
 **/
var typeError = function(){
    layer.msg("无法确定批次类型，无法分箱或单件包装！", {time:5000});
    hiddenButton(true);
    $(".content").append("<div>" +
        "<p style='font-size: 15px; color: red; text-align: center;'>" +
        "提示信息：无法确定批次类型，无法分箱或单件包装！" +
        "</p>" +
        "</div>");
}


/**
 * 改变标题
 * @author 郑学亮
 * @date   2018/2/12 9:56
 **/
var changeTile = function(v){
    parent.$(".layui-layer-title").html(v);
}


/**
 * 分箱
 * @author 郑学亮
 * @date   2018/2/9 13:47
 **/
var binning = function(){
    var data = $("#right-table").datagrid('getData');
    var rows = data.rows;
    endAllRow(rows);
    var e = isEmpty(rows, "mfsl");
    if (e != false){layer.msg(e);return false;}

    var batchid = getBatchId();
    var opno = getOpNo();
    var list = getList(rows);
    layer.confirm('确定要进行分箱吗？', {
        btn: ['确认', '取消'],
        shade: 0.5
    }, function(index){
        $.ajax({
            url : pageContext + "/spBatchController/binning/" + batchid + "/" + opno ,
            contentType : "application/json;charset=utf-8",
            type : "POST",
            async : false,
            dataType : "json",
            data : JSON.stringify(list),
            success : function(req){
                if (req.success){
                    alert(req.msg);
                    window.parent.location.reload();
                }else {
                    alert(req.msg);
                    layer.close(index);
                }
            }
        });


        layer.close(index);
    });
}


/**
 * 单件包装
 * @author 郑学亮
 * @date   2018/2/12 11:27
 **/
var single = function(){
    var data = $("#left-table").datagrid('getData');
    var rows = data.rows;
    var batchid = getBatchId();
    var opno = getOpNo();
    //var list = getList(rows);
    layer.confirm('确定要进行单件包装吗？', {
        btn: ['确认', '取消'],
        shade: 0.5
    }, function(index){
        $.ajax({
            url : pageContext + "/spBatchController/single/" + batchid + "/" + opno ,
            contentType : "application/json;charset=utf-8",
            type : "POST",
            async : false,
            dataType : "json",
            //data : JSON.stringify(list),
            success : function(req){
                if (req.success){
                    alert(req.msg);
                    window.parent.location.reload();
                }else {
                    alert(req.msg);
                    layer.close(index);
                }
            }
        });
        layer.close(index);
    });
}


/**
 * 获取batchid
 * @author 郑学亮
 * @date   2018/2/9 13:54
 **/
var getBatchId = function(){
    return $("#batchid").val();
}

/**
 * 获取opno
 * @author 郑学亮
 * @date   2018/2/9 13:54
 **/
var getOpNo = function(){
    return $("#opno").val();
}

var getList = function (arr) {
    var list = new Array();
    $.each(arr, function(index, item){
        list.push(item)
    });
    return list;
}

var endAllRow = function (arr){
    $.each(arr, function(index, item){
        $("#right-table").datagrid('endEdit', index);
    });
}

var isEmpty  = function (arr, param){
    var e = false;
    console.info(arr);
    $.each(arr, function(index, item){
        var v = item[param];
        var total = item.total;
        var binning = item.binning;
        if ((v == "" || v == null || v == undefined) && total != 0 && (binning == null || binning == false)){
            e = "第" + (index + 1) + "行的每份数量不能为空！";
            return false;
        }
    });
    return e;
}

var hiddenButton = function(hidden){
    if (hidden){
        $(".button").css("display", "none");
    }else{
        $(".button").css("display", "block");
    }
}
var hiddenBinning = function(hidden){
    if (hidden){
        $(".button .binning").css("display", "none");
    }else{
        $(".button .binning").css("display", "block");
    }
}
var hiddenSingle = function(hidden){
    if (hidden){
        $(".button .single").css("display", "none");
    }else{
        $(".button .single").css("display", "block");
    }
}
var hiddenContent = function (hidden) {
    if (hidden){
        $(".content").css("display", "none");
    }else{
        $(".content").css("display", "block");
    }
}
