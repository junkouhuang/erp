$(function () {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected">所有门店</option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value=" + data[i].id + ">" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();

    //初始化Table
    var oTable=new TableInit();
    oTable.Init();
});

var TableInit=function(){
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#table').bootstrapTable({
            method:'GET',//请求方式（*）
            dataType:'json',//获取的数据类型
            toolbar:"#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url:pageContext+"/wxOrderController/getPrepareGoodsCount", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            clickToSelect:true,
            showColumns:false, //是否显示所有的列
            showRefresh:false, //是否显示刷新按钮
            pagination:true,  //是否显示分页（*）
            queryParamsType: 'undefined',
            queryParams : queryParams,//传递参数（*）
            responseHandler:rspHandler,
            minimumCountColumns:2,//最少允许的列数
            pageNumber:1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                        //每页的记录行数（*）
            pageList: [10, 20, 50, 100],         //可供选择的每页的行数（*）
            idField :"id",
            showExport: true,
            exportDataType: 'all',
            columns: [
                {
                    field : 'mdcode',
                    title : '店号',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'mdmc',
                    title : '店名',
                    align : 'center',
                    valign : 'middle'
                }, {
                    field : 'total',
                    title : '数量',
                    align : 'center',
                    valign : 'middle'
                }]
        });
    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset:params.offset
        };
        return temp;
    };
    return oTableInit;
}

function queryParams(params) {
    var storeid = $("#storeid").val();
    var order = $('input:radio:checked').val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder:params.order, //排序方式
        storeid:storeid,
        order:order
    };
    return temp;
}
//得到查询的参数
function rspHandler (res) {
    if (res) {
        return {
            "rows" : res.list,
            "total" : res.total
        };
    } else {
        return {
            "rows" : [],
            "total" : 0
        };
    }
};

/**
 * 导出Excel报表
 * @author 郑学亮
 * @date   2018/5/5 11:25
 **/
var exportExcel = function () {
    var storeid = $("#storeid").val();
    var order = $('input:radio:checked').val();

    window.location.href="reportController/exportPrepareGoodsCount?"
        + "storeid="+storeid
        + "&order="+order;
}

/**
 * 搜索
 * @author 郑学亮
 * @date   2018/5/5 14:12
 **/
var search = function () {
    $("#table").bootstrapTable('refresh', queryParams);
}