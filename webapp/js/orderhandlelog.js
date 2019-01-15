//初始化bootstrap Table
$(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
    loadStore();
});


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
            url: pageContext + "/orderHandleLogController/getOrderHandleLogPageList", //请求后台的url
            singleSelect: false, //仅允许单选
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
            rowStyle: function (row, index) {
            //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
            var strclass = "";
            if(row.status == "4"){
                strclass = 'btn-success';
            }else if (row.status == "5") {
                strclass = 'btn-danger';
            } else if (row.status == "9") {
                strclass = 'btn-info';
            } else {
                strclass = 'btn-warning';
            }
            return {classes: strclass}
            },
            columns: [
                {
                    checkbox: true
                },
                //动态创建列名
                {
                    field: 'id',
                    title: '',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ordercode',
                    title: '订单号',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                }, {
                    field: 'batchcode',
                    title: '批次号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchtype',
                    title: '产品类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "服装";
                        if (value == '2')
                            return "童装";
                        if (value == '3')
                            return "鞋子";
                        if (value == '4')
                            return "辅料";
                        return "默认";
                    }
                }, {
                    field: 'batchname',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fhordercode',
                    title: '发货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'orderamount',
                    title: '订单金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var amount = 0;
                        $.each(value, function (index, item) {
                            amount += item.orderamount;
                        });
                        return amount;
                    }
                }, {
                    field: 'ordertotal',
                    title: '下单件数',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var ordertotal = 0;
                        $.each(value, function (index, item) {
                            ordertotal += item.ordertotal;
                        });
                        return ordertotal;
                    }
                }, {
                    field: 'jhtotal',
                    title: '拣货件数',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var jhtotal = 0;
                        $.each(value, function (index, item) {
                            jhtotal += item.jhtotal;
                        });
                        return jhtotal;
                    }
                }, {
                    field: 'mdcode',
                    title: '店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdmc',
                    title: '店名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '订单状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '3')
                            return "待发货";
                        if (value == '4')
                            return "备货";
                        if (value == '5')
                            return "已发货";
                        if (value == '9')
                            return "已撤销";
                        return "默认";
                    }
                }, {
                    field: 'preparelx',
                    title: '配货类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "默认";
                        if (value == '1')
                            return "首批配货";
                        if (value == '2')
                            return "补货配货";
                        return "错误";
                    }
                }, {
                    field: 'preparestatus',
                    title: '配货状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "默认";
                        if (value == '1')
                            return "配货中";
                        if (value == '2')
                            return "拣货中";
                        if (value == '3')
                            return "拣货完成";
                        return "错误";
                    }
                }, {
                    field: 'jhprinttime',
                    title: '拣货打印时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'handlelx',
                    title: '处理类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "待处理";
                        if (value == '5')
                            return "入仓";
                        if (value == '9')
                            return "无货";
                        return "错误";
                    }
                }, {
                    field: 'handletime',
                    title: '处理时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'handleuname',
                    title: '处理人',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '订单创建时间',
                    align: 'center',
                    valign: 'middle'
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
}

var table = null;

function queryParams(params) {
    var postdata = $('#orderhandlelogForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    console.log(postdata);
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


laydate.render({
    elem: '#ordercreatetime',
    range: true,
    type:'datetime'
});
laydate.render({
    elem: '#handletime',
    range: true,
    type:'datetime'
});
laydate.render({
    elem: '#jhprinttime',
    range: true,
    type:'datetime'
});
// 搜索
function search() {
    $("#table").bootstrapTable('refresh', queryParams);
}

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#table").bootstrapTable('refresh', queryParams);
        }
    });
});


// 加载门店
function loadStore() {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value='" + data[i].id + "' mdcode='" + data[i].mdcode + "'>" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
}
