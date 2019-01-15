//初始化bootstrap Table
$(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
})


var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#loginfolist_table').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/loginfoController/getLoginfoPageList", //请求后台的url
            singleSelect: false, //仅允许单选
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: true,//是否显示刷新按钮
            pagination: true,//是否显示分页（*）
            queryParamsType: 'undefined',
            queryParams: queryParams,//传递参数（*）
            responseHandler: rspHandler,
            clickToSelect: true,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [7, 10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            columns: [
                {
                    checkbox: true
                }, {
                    field: 'id',
                    title: '单号id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'optname',
                    title: '业务名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'username',
                    title: '操作用户',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'opttime',
                    title: '操作时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'type',
                    title: '操作类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "新增";
                        if (value == '2')
                            return "删除";
                        if (value == '3')
                            return "修改";
                        if (value == '4')
                            return "查询";
                        return "未知";
                    }
                }, {
                    field: 'params',
                    title: '参数',
                    align: 'center',
                    valign: 'middle'
                }]
        });
        $('#loginfolist_table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset
        };
        return temp;
    };
    return oTableInit;
    ;
}

var table = null;

function queryParams(params) {
    //用户名称
    var username = $("#username").val();
    //操作名称
    var optname = $("#optname").val();
    //操作时间
    var time = $("#time").val();
    //操作类型
    var type = $("#type").val();
    //记录值
    var paramsinfo = $("#params").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        username: username,
        optname: optname,
        time: time,
        type:type,
        params:paramsinfo
    };
    return temp;
}

//得到查询的参数
function rspHandler(res) {
    if (res) {

        return {
            "rows": res.list,
            "total": res.total
        };
    } else {
        return {
            "rows": [],
            "total": 0
        };
    }
};

//执行一个laydate实例
laydate.render({
    elem: '#time',
    range: true
});

// 搜索
function search() {
    $("#loginfolist_table").bootstrapTable('refresh', queryParams);
}