$(function(){
    // 报废单id
    var id = getQueryVariable("id");

    // 初始化Table
    var oTable=new TableInit();
    oTable.Init(id);
})

// 当前行数据
var thisRow;
// 当前行号
var thisRowNum;

var TableInit=function(){
    var oTableInit=new Object();
    oTableInit.Init=function (id) {
        //1.初始化Table
        $('#table').bootstrapTable({  //表格ID
            method:'GET',//请求方式（*）
            dataType:'json',//获取的数据类型
            toolbar:"#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url:pageContext+"/spBFDanController/getBfSp", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            showColumns:false, //是否显示所有的列
            showRefresh:true,//是否显示刷新按钮
            showFooter:true,
            pagination:false,//是否显示分页（*）
            queryParamsType: 'json',
            queryParams : {'id' : id},//传递参数（*）
            responseHandler:rspHandler,
            clickToSelect: true,
            minimumCountColumns:2,//最少允许的列数
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [7, 10, 20, 50, 100],        //可供选择的每页的行数（*）
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
                    field : 'spid',
                    title : '商品id',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'spcode',
                    title : '商品编码',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        return "汇总：";
                    }
                }, {
                    field : 'spmc',
                    title : '商品名称',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'mxcode',
                    title : '吊牌条码',
                    align : 'center',
                    valign : 'middle'/*,
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total ++;
                        });
                        return total;
                    }*/
                }, {
                    field : 'qty',
                    title : '数量',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.qty;
                        });
                        return total;
                    }
                }, {
                    field : 'sellprice',
                    title : '销售金额',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'priceamount',
                    title : '总金额',
                    align : 'center',
                    valign : 'middle',
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.priceamount;
                        });
                        return total;
                    }
                }]
        });

        $('#table').bootstrapTable('hideColumn', 'spid');

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
    var id = getQueryVariable("id");

    // 判断是否有商品
    var isDate = $('#table').bootstrapTable('getData', true);
    if(isDate == null || isDate == "" || isDate.length == 0 || isDate == undefined){
        layer.msg("没有需要出库的商品，无法出库");
        return false;
    }

    layer.confirm('确认出库？', {
        btn: ["确定", "取消"]
        ,yes: function(index){
            requestBackEndConfirm(id);
            layer.close(index);
        }
    });
}

// 请求后台进行确认
function requestBackEndConfirm(id){
    $.ajax({
        url:pageContext+"/stockController/spbfStockOut",
        dataType:"json",
        async:false,
        data:{"id" : id},
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
	
