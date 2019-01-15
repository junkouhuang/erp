//初始化bootstrap Table
$(function () {
    //获取id
    var id = getQueryVariable("id");

    //初始化Table
    var oTable = new TableInit();
    oTable.Init(id);

})

var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function (id) {
        //1.初始化Table
        $('#table').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/wxOrderController/getWxOrderDetail", //请求后台的url
            singleSelect: false, //仅允许单选
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: true,//是否显示刷新按钮
            showFooter: true,
            pagination: false,//是否显示分页（*）
            queryParamsType: 'json',
            queryParams: {'orderid': id},//传递参数（*）
            responseHandler: rspHandler,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 7,                       //每页的记录行数（*）
            pageList: [7, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            columns: [
                //动态创建列名
                {
                    field: 'batchcode',
                    title: '批次编码',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return "汇总：";
                    }
                }, {
                    field: 'batchname',
                    title: '批次名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cm',
                    title: '尺码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ys',
                    title: '颜色',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'price',
                    title: '金额',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sl',
                    title: '数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var totalSl = 0;
                        $.each(value, function (index, item) {
                            totalSl += item.sl;
                        });
                        return totalSl;
                    }
                }, {
                    field: 'amount',
                    title: '总金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var totalAmount = 0;
                        $.each(value, function (index, item) {
                            totalAmount += item.amount;
                        });
                        return totalAmount;
                    }
                }, {
                    field: 'mfsl',
                    title: '每份数量',
                    align: 'center',
                    valign: 'middle'
                }]
        });
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
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order //排序方式
    };
    return temp;
}

function rspHandler(res) {
    if (res) {
        return {
            "rows": res,
            "total": res.size
        };
    } else {
        return {
            "rows": [],
            "total": 0
        };
    }
};

//获取url中的参数的函数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (false);
}
	
