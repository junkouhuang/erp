$(function(){
    // 获取商品id
    var spid = getQueryVariable("spid");

    //初始化Table
    var oTable=new TableInit();
    oTable.Init(spid);
})

// 当前行数据
var thisRow;
// 当前行号
var thisRowNum;

var TableInit=function(){
    var oTableInit=new Object();
    oTableInit.Init=function (spid) {
        //1.初始化Table
        $('#table').bootstrapTable({  //表格ID
            method:'POST',//请求方式（*）
            dataType:'json',//获取的数据类型
            toolbar:"#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url:pageContext+"/spManageController/getSpMX", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            showColumns:false, //是否显示所有的列
            showRefresh:true,//是否显示刷新按钮
            showFooter:true,
            pagination:false,//是否显示分页（*）
            queryParamsType: 'json',
            queryParams : {'spID' : spid},//传递参数（*）
            responseHandler:rspHandler,
            clickToSelect: true,
            minimumCountColumns:2,//最少允许的列数
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 7,                       //每页的记录行数（*）
            pageList: [7, 20, 50, 100],        //可供选择的每页的行数（*）
            idField :"id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            onClickRow: function (row, $element, field) {
                thisRow = row;
                thisRowNum = $element.data('index');
            },
            columns: [
                //动态创建列名
                {
                    field : 'id',
                    title : '明细id',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'mxcode',
                    title : '明细编码',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total ++;
                        });
                        return "汇总："+total;
                    }
                }, {
                    field : 'ys',
                    title : '颜色',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'cm',
                    title : '尺码',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'gpsl',
                    title : '待入库数量',
                    align : 'center',
                    valign : 'middle',
                    formatter: slInput,
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.gpsl;
                        });
                        return total;
                    }
                }, {
                    field : 'temporary',
                    title : '库位',
                    align : 'center',
                    valign : 'middle',
                    width : 200,
                    formatter: kwInput
                    /*,
                    editable: {
                        type: 'text',
                        title: '请输入库位',
                        emptytext: "点击输入库位",
                        mode: "popup",              // popup inline
                        validate: function (v) {
                            /!*!// 判断输入的数字是否超过999999(九十万)
                            if(String(v).length > 6){
                                layer.msg("输入数字不能超过999999");
                                $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
                                return false;
                            }*!/
                            // 判断是否有修改
                            if(v == thisRow.auditsl){
                                return false;
                            }
                            // 发送请求进行修改数量
                            // requestModifyNum(v);
                        }
                    }*/
                }]
        });

        $('#table').bootstrapTable('hideColumn', 'id');

    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset:params.offset
        };
        return temp;
    };
    return oTableInit;;
}

var table = null;
function queryParams(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder:params.order //排序方式
        //searchText:params.search,   //搜索框参数
        //searchText:params.search,   //搜索框参数
    };
    return temp;
}

function rspHandler (res) {
    if (res) {
        return {
            "rows" : res,
            "total" : res.size
        };
    } else {
        return {
            "rows" : [],
            "total" : 0
        };
    }
};


// 请求后台修改数量
function requestModifyNum(num){
    var isSuccess = false;
    $.ajax({
        url:pageContext+"/storeReturnController/modifyNum",
        dataType:"json",
        async:false,
        data:{"id":thisRow.id, "num":num},
        type:"POST",
        success:function(data){
            if(data.success){
                console.info("R_Modify_S");
                isSuccess = true;
            }else{
                layer.msg(data.msg);
                isSuccess = false;
            }
        }
    });
    if(!isSuccess){
        $('#table').bootstrapTable('updateRow', {index: thisRowNum, row: thisRow});
    }
}

// 确认
function confirm(){
    // 获取商品id
    var spid = getQueryVariable("spid");

    // 判断是否有商品
    var isDate = $('#table').bootstrapTable('getData', true);
    if(isDate == null || isDate == "" || isDate.length == 0 || isDate == undefined){
        layer.msg("没有需要入库的商品，无法入库");
        return false;
    }

    var map = new Object();
    map["spid"] = spid;
    var slArr = getIDAndSL();
    var kwArr = getIDAndKW();

    var arr = new Array();
    var isSuccess = false;
    $.each(slArr, function(index1, item1){
        /*if(item1 == 0){
            layer.msg("有待入库数量为0的商品无法入库");
            isSuccess = true;
            return false;
        }*/
        $.each(kwArr, function(index2, item2){
            if(index1 == index2){
                var obj = new Object();
                obj.mxid = index1;
                obj.sl = item1;
                obj.kw = item2;
                arr.push(obj);
            }
        });
    });
    if(isSuccess){return false;}

    var obj = {};
    obj["list"] = arr;
    obj["spid"] = spid;
    layer.confirm('确认入库？', {
        btn: ["确定", "取消"]
        ,yes: function(index){
            requestBackEndConfirm(obj);
            layer.close(index);
        }
    });
}

// 请求后台进行确认
function requestBackEndConfirm(obj){
    $.ajax({
        url:pageContext+"/stockController/spStockIn",
        contentType:'application/json;charset=utf-8',
        dataType:"json",
        async:false,
        data:JSON.stringify(obj),
        type:"POST",
        success:function(data){
            if(data.success){
                alert(data.msg);
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);  // 关闭layer
            }else{
                alert(data.msg);
                var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
                parent.layer.close(index);  // 关闭layer

            }
        }
    });
}


// 获取url中的参数的函数
function getQueryVariable(variable){
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

var originV;   // 原值
// 数量框
var slInput = function(value, row, index){
    var spid = row.id;
    var content = "<input class='slCont' type='text' style='width: 50px; border:none;' value= "+value+" spid="+spid+">"
    return content;
}
$("#table").delegate("input[class='slCont']", "focus",function(){
    originV = $(this).val();               // 获取原值
});
$("#table").delegate("input[class='slCont']", "blur",function(){
    var v = $(this).val();                  // 获取当前值
    if (v == originV){                      // 没有修改
        return false;
    }
    var t_v = getTotalSL();                 // 获取所有数量
    setTotal(t_v);                          // 重新设置原总值
});
$("#table").delegate("input[class='slCont']", "keyup",function(){
    $(this).val($(this).val().replace(/[^\d]/g,""));
});


// 库位框
var kwInput = function(value, row, index){
    var spid = row.id;
    var content = "<input class='kwCont' type='text' style='width: 200px; border:none;' spid="+spid+">"
    return content;
}

// 获取总数量
var getTotal = function(){
    var originV = $(".fixed-table-footer").find("td").eq(3).find(".th-inner").html();
    return originV;
}

// 设置总数量
var setTotal = function(num){
    $(".fixed-table-footer").find("td").eq(3).find(".th-inner").html(num);
}

// 获取所有数量的input对象
var getAllSLInput = function () {
    var arr = $(".slCont");
    return arr;
}

// 获取所有数量的input标签
var getAllSLInputTag = function(){
    var objArr = getAllSLInput();
    var labelArr = new Array();
    $.each(objArr, function (index, item) {
        labelArr[index] = $(item);
    });
    return labelArr;
}

// 获取所有数量的input标签的总value值
var getTotalSL = function () {
    var total = 0;
    var labelArr = getAllSLInputTag();
    $.each(labelArr, function (index, item) {
        total += parseInt($(item).val());
    });
    return total;
}

// 获取id与对应的sl
var getIDAndSL = function(){
    var arr = new Object();
    var labelArr = getAllSLInputTag();
    $.each(labelArr, function (index, item) {
        arr[$(item).attr("spid")] = parseInt($(item).val());
    });
    return arr;
}

// 获取所有库位的input对象
var getAllKWInput = function () {
    var arr = $(".kwCont");
    return arr;
}

// 获取所有库位的input标签
var getAllKWInputTag = function(){
    var objArr = getAllKWInput();
    var labelArr = new Array();
    $.each(objArr, function (index, item) {
        labelArr[index] = $(item);
    });
    return labelArr;
}

// 获取所有库位的input标签的内容，返回数组
var getKWCont = function () {
    var contArr = new Array();
    var labelArr = getAllKWInputTag();
    $.each(labelArr, function (index, item) {
        contArr[index] = $(item).val();
    });
    return contArr;
}

// 获取id与对应的kw
var getIDAndKW = function(){
    var arr = new Object();
    var labelArr = getAllKWInput();
    $.each(labelArr, function (index, item) {
        arr[$(item).attr("spid")] = $(item).val();
    });
    return arr;
}
	
