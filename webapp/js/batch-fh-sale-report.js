//初始化bootstrap Table
var mdContent;
$(function () {
    //执行一个laydate实例
    laydate.render({
        elem: '#time',
        range: true
    });
    laydate.render({
        elem: '#batchfbtimeStr',
        range: true
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
            url: pageContext + "/reportController/getBatchFhSaleReportInfos", //请求后台的url
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
                    field: 'batchcode',
                    title: '批次号',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                }, {
                    field: 'batchname',
                    title: '批次名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchlbmc',
                    title: '类别',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spprice',
                    title: '单价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'imports',
                    title: '导入小程序',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'replenish',
                    title: '会补货',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'fblx',
                    title: '批次发布类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "默认";
                        if (value == '1')
                            return "订货会";
                        return "未知";
                    }
                }, {
                    field: 'baudied',
                    title: '在库状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "入库验收";
                        } else if (value == 2) {
                            return "取消";
                        } else {
                            return "默认";
                        }
                    }
                }, {
                    field: 'pkgtype',
                    title: '打包类型',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 0) {
                            return '打包';
                        } else if (value == 1) {
                            return '单件';
                        }
                        return str;
                    }
                }, {
                    field: 'batchlx',
                    title: '批次类型',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 0) {
                            return '新货';
                        } else if (value == 1) {
                            return '老货';
                        } else if (value == 2) {
                            return '订货';
                        } else {
                            return '未知';
                        }
                        return str;
                    }
                }, {
                    field: 'batchfbtime',
                    title: '批次发布时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fhsl',
                    title: '发货数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.fhsl;
                        });
                        return total;
                    }
                }, {
                    field: 'fhamount',
                    title: '发货金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.fhamount;
                        });
                        return total;
                    }
                }, {
                    field: 'salesl',
                    title: '销售数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.salesl;
                        });
                        return total;
                    }
                }, {
                    field: 'saleamount',
                    title: '销售金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.saleamount;
                        });
                        return total;
                    }
                }, {
                    field: 'cpmcStr',
                    title: '产品名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'gysmcStr',
                    title: '供应商',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }]
        });

        $('#table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
        $('#table').bootstrapTable('hideColumn', 'storeid');  //隐藏指定要隐藏的列
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
    var postdata = $('#interimkwinfoForm').serializeJSON();
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

function exportBatchFhSaleReportInfos() {
    var batchcode = $("#batchcode").val();
    var batchname = $("#batchname").val();
    var imports = $("#imports").val();
    var replenish = $("#replenish").val();
    var batchlx = $("#batchlx").val();
    var pkgtype = $("#pkgtype").val();
    var fblx = $("#fblx").val();
    var baudied = $("#baudied").val();
    var time = $("#time").val();
    var batchfbtimeStr = $("#batchfbtimeStr").val();
    window.location.href = pageContext + "/reportController/exportBatchFhSaleReportInfos?batchcode=" + batchcode
        + "&batchname=" + batchname
        + "&imports=" + imports
        + "&replenish=" + replenish
        + "&batchlx=" + batchlx
        + "&pkgtype=" + pkgtype
        + "&fblx=" + fblx
        + "&baudied=" + baudied
        + "&time=" + time
        + "&batchfbtimeStr=" + batchfbtimeStr
}