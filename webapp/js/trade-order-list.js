//初始化bootstrap Table
$(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
    loadTradeinfo();
});


var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#table').bootstrapTable({  //表格ID
            method: 'GET',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/tradeOrderController/getOrderList", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: false,//是否显示刷新按钮
            pagination: true,//是否显示分页（*）
            queryParamsType: 'undefined',
            queryParams: queryParams,//传递参数（*）
            responseHandler: rspHandler,
            clickToSelect: true,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            rowStyle: function (row, index) {
                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
                var strclass = "";
                if (row.status == "0") {
                    strclass = 'btn-warning';//还有一个active
                }
                else if (row.status == "1") {
                    strclass = 'btn-success';
                }
                else if (row.status == "2") {
                    strclass = 'btn-primary';
                }
                else if (row.status == "3") {
                    strclass = 'btn-danger';
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
                    title: '单号id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tradeordercode',
                    title: '调货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0') {
                            return '新增';
                        } else if (value == '1') {
                            return '扫描上传';
                        } else if (value == '2') {
                            return '扫描确认';
                        } else if (value == '3') {
                            return '确认收货';
                        } else {
                            return '错误';
                        }
                    }
                }, {
                    field: 'outName',
                    title: '卖方品牌商',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'intName',
                    title: '买方品牌商',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'orderamount',
                    title: '订单金额',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ordersl',
                    title: '订单数量',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'forwardmdcode',
                    title: '转发门店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'forwardmdmc',
                    title: '转发门店名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'scantime',
                    title: '扫描时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'rateamount',
                    title: '折扣金额',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'rate',
                    title: '折扣',
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
    ;
}

var table = null;

function queryParams(params) {
    var ordercode = $("#tradeordercode").val();
    var status = $("#status").val();
    var startTime = "";
    var endTime = "";
    var createtime = $("#createtime").val();
    if (createtime != "") {
        var timeArray = createtime.split(" - ");
        startTime = timeArray[0];
        endTime = timeArray[1];
    }
    var scanStartTime = "";
    var scanEndTime = "";
    var scantime = $("#scantime").val();
    if (scantime != "") {
        var timeArray = scantime.split(" - ");
        scanStartTime = timeArray[0];
        scanEndTime = timeArray[1];
    }
    var outtraderid = $("#outtraderid").val();
    var inttraderid = $("#inttraderid").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        ordercode: ordercode,
        status: status,
        startTime: startTime,
        endTime: endTime,
        scanStartTime: scanStartTime,
        scanEndTime: scanEndTime,
        outtraderid: outtraderid,
        inttraderid: inttraderid
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
    elem: '#createtime',
    range: true
});

laydate.render({
    elem: '#scantime',
    range: true
});


// 搜索
function search() {
    $("#table").bootstrapTable('refresh', queryParams);
}

// 新增品牌调货单
function newTradeOrder() {
    // 打门店退货详细页
    layer.open({
        type: 2,
        title: '新增品牌调货单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['800px', '320px'],
        content: "trade-order-new"
    });
}

// 扫描确认
function scanConfirm() {
    // 获取当前表格
    var thisRow = $('#table').bootstrapTable("getSelections")[0];
    // 判断是否选中表格某项
    if (thisRow == null || thisRow == '' || thisRow == undefined) {
        layer.msg("请选中品牌调货单");
        return false
    }

    var id = thisRow.id;

    layer.confirm('确定要扫描确认吗？', {
        btn: ['确认', '取消'],
        shade: false,
        btn1: function (index) {
            $.ajax({
                url: pageContext + "/tradeOrderController/scanConfirm/" + id,
                type: "POST",
                async: false,
                dataType: "JSON",
                success: function (req) {
                    if (req.success) {
                        alert(req.msg);
                        window.location.reload();
                    } else {
                        layer.close(index);
                        layer.msg(req.msg);
                    }
                }
            });
        }
    });
}

function loadTradeinfo() {
    $.ajax({
        url: pageContext + "/tradeinfoController/getTradeinfoPageList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
            }
            $('#outtraderid').append(tradeContent);
            $('#inttraderid').append(tradeContent);
        }
    });
    $('#outtraderid').combobox();
    $('#inttraderid').combobox();
}

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#table").bootstrapTable('refresh', queryParams);
        }
    });
});

function exportTradeOrder() {
    var ordercode = $("#tradeordercode").val();
    var status = $("#status").val();
    var startTime = "";
    var endTime = "";
    var createtime = $("#createtime").val();
    if (createtime != "") {
        var timeArray = createtime.split(" - ");
        startTime = timeArray[0];
        endTime = timeArray[1];
    }
    var scanStartTime = "";
    var scanEndTime = "";
    var scantime = $("#scantime").val();
    if (scantime != "") {
        var timeArray = scantime.split(" - ");
        scanStartTime = timeArray[0];
        scanEndTime = timeArray[1];
    }
    var outtraderid = $("#outtraderid").val();
    var inttraderid = $("#inttraderid").val();
    window.location.href = pageContext + "/tradeOrderController/exportTradeOrderDetailByidList?ordercode=" + ordercode
    +"&status="+status +"&startTime="+startTime+"&endTime="+endTime+"&scanStartTime="+scanStartTime+"&scanEndTime="+scanEndTime
        +"&outtraderid="+outtraderid+"&inttraderid="+inttraderid
}