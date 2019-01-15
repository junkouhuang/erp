//初始化bootstrap Table
var mdContent;
$(function () {
    //执行一个laydate实例
    laydate.render({
        elem: '#createStr',
        range: true,
        type: 'datetime'
    });
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
})


var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#table').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/subContract/getSubContractPageList", //请求后台的url
            singleSelect: true, //仅允许单选
            showFooter: true,
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
                },
                //动态创建列名
                {
                    field: 'id',
                    title: '单号id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bigcode',
                    title: '商品包号',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                }, {
                    field: 'sl',
                    title: '件数',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.sl;
                        });
                        return total;
                    }
                }, {
                    field: 'amount',
                    title: '金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.amount;
                        });
                        return total;
                    }
                }, {
                    field: 'rateamount',
                    title: '折后金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.rateamount;
                        });
                        return total;
                    }
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'adduname',
                    title: '创建人',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '批次发布类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "默认";
                        if (value == '1')
                            return "已打印";
                        return "未知";
                    }
                }, {
                    field: 'sex',
                    title: '性别',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "男";
                        } else if (value == 2) {
                            return "女";
                        } else {
                            return "默认";
                        }
                    }
                }]
        });
        $('#table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
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
    var postdata = $('#subContractForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
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

// 搜索
function search() {
    $("#table").bootstrapTable('refresh', queryParams);
}

function exportSubContract() {
    var selections = $('#table').bootstrapTable("getSelections");
    if (selections.length != 1) {
        layer.msg("请选择一条商品包进行导出操作！", function () {});
        return;
    }
    window.location.href = pageContext + "/subContract/exportSubcontractByBigCode/" + selections[0].bigcode;

}