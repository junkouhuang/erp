var bpkgspmc;
var minBpkgprice;
var maxBpkgprice;
$(function () {
    //1.初始化Table
    table = $('#bigpkinventory_table').bootstrapTable({  //表格ID
        method: 'POST',
        dataType: 'json',
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: false,
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: "",
        singleSelect: true, //仅允许单选
        //search: true,
        showColumns: true,
        showRefresh: true,
        pagination: true,
        queryParamsType: 'undefined',
        queryParams: queryParams,
        responseHandler: rspHandler,
        minimumCountColumns: 2,
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        idField: "id",
        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showExport: true,
        exportDataType: 'all',
        columns: [
            //动态创建列名
            {
                field: 'id',
                title: 'ID',
                align: 'center',
                valign: 'middle',
                display: 'hidden',
                sortable: true
            },
            {
                field: 'sppackage.packagecode',
                title: '包号',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sppackage.kw',
                title: '库位',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'sppackage.zxsj',
                title: '装箱时间',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sppackage.sjsj',
                title: '上架时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'sppackage.bpkgspmc',
                title: '品类名',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'sppackage.bpkgprice',
                title: '价格',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'spmc',
                title: '商品名称',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'mxcode',
                title: '商品明细编码',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'sl',
                title: '数量',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'sppackage.status',
                title: '状态',
                align: 'center',
                valign: 'middle'
            }]
    });
    $('#bigpkinventory_table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
});
var table = null;

function printSppackage() {
    if((bpkgspmc == undefined || bpkgspmc == '' ) && (minBpkgprice == undefined || minBpkgprice == '') && (maxBpkgprice ==undefined || maxBpkgprice == '') ){
        layer.msg("导出大包库存表必须限定条件导出！！",function(){});
        return;
    }
    window.location.href = pageContext + "/bigpkgController/printSppackage?bpkgspmc=" + bpkgspmc + "&minBpkgprice=" + minBpkgprice + "&maxBpkgprice=" + maxBpkgprice;
}

function queryParams(params) {
    bpkgspmc = $("#bpkgspmc").val();
    minBpkgprice = $("#minBpkgprice").val();
    maxBpkgprice = $("#maxBpkgprice").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        bpkgspmc: bpkgspmc,
        minBpkgprice: minBpkgprice,
        maxBpkgprice: maxBpkgprice
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

//搜索功能
function LoadingDataListOrderRealItems() {
    $("#bigpkinventory_table").bootstrapTable('refresh', {"url": pageContext + "/bigpkgController/getSppackageListPage"});
};

//价格输入正则表达式校验
$(function () {
    var reg = /([1-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])/;
    $("#minBpkgprice").keyup(function () {
        if (reg.test($(this).val())) {

        } else {
            $("#minBpkgprice").val("")
        }
    })

    $("#maxBpkgprice").keyup(function () {
        if (reg.test($(this).val())) {

        } else {
            $("#maxBpkgprice").val("")
        }
    })
})

	