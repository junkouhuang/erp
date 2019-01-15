var fhid = "";
//初始化bootstrap Table
$(function () {
    fhid = getQueryVariable("fhid");
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();

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
            url: pageContext + "/wxOrderBatchController/getWxOrderDetailByfhid/" + fhid, //请求后台的url
            singleSelect: false, //仅允许单选
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: false,//是否显示刷新按钮
            showFooter: true,
            pagination: false,//是否显示分页（*）
            queryParamsType: 'json',
            queryParams: {'orderid': id},//传递参数（*）
            responseHandler: rspHandler,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 1,                       //每页的记录行数（*）
            pageList: [7, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            columns: [
                //动态创建列名
                {
                    field: 'ordercode',
                    title: '网络订单号',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return "汇总：";
                    }
                }, {
                    field: 'batchcode',
                    title: '批次编码',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var payAmount = 0;
                        $.each(value, function (index, item) {
                            if(item.paystatus == 3){
                                payAmount += (item.sl * item.mfsl * item.price);
                            }
                        });
                        return "已支付："+payAmount;
                    }
                }, {
                    field: 'batchname',
                    title: '批次名称',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var notPayAmount = 0;
                        $.each(value, function (index, item) {
                            if(item.paystatus != 3){
                                notPayAmount += (item.sl * item.mfsl * item.price);
                            }
                        });
                        return "未支付："+notPayAmount;
                    }
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
                    field: 'paystatus',
                    title: '支付',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == '3') {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'rate',
                    title: '折扣',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'price',
                    title: '單價',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mfsl',
                    title: '每份数量',
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
                            totalSl += item.sl * item.mfsl;
                        });
                        return totalSl;
                    }
                }, {
                    field: 'amount',
                    title: '总金额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value / row.rate;
                    },
                    footerFormatter: function (value) {
                        var totalAmount = 0;
                        $.each(value, function (index, item) {
                            totalAmount += (item.sl * item.mfsl * item.price);
                        });
                        return totalAmount;
                    }
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