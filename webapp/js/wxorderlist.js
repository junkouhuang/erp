//初始化bootstrap Table
var mdContent;
$(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();

    // 加载门店的下拉框
    loadStore();
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
            url: pageContext + "/wxOrderController/getWxOrderListPage", //请求后台的url
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
                if (row.status == "4") {
                    strclass = 'btn-success';
                } else if (row.status == "5") {
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
                    title: '单号id',
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
                    field: 'ordertype',
                    title: '订单类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 2) {
                            str = '赠品';
                        } else {
                            str = '正常';
                        }
                        return str;
                    }
                }, {
                    field: 'batchcode',
                    title: '批次号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchname',
                    title: '批次名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchlx',
                    title: '批次类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 0) {
                            str = '新货';
                        } else if(value == 1){
                            str = '老货';
                        } else if(value == 2){
                            str = '订货';
                        }else {
                            str = '未知';
                        }
                        return str;
                    }
                }, {
                    field: 'baudied',
                    title: '是否完工',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 1) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'fhordercode',
                    title: '发货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'total',
                    title: '下单数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.total;
                        });
                        return total;
                    }
                }, {
                    field: 'jhtotal',
                    title: '拣货数量',
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
                    field: 'orderamount',
                    title: '金额',
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
                    field: 'mdcode',
                    title: '门店编号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdmc',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle'
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
                    field: 'preparetype',
                    title: '配货类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "默认";
                        if (value == '1')
                            return "首次配货";
                        if (value == '2')
                            return "补货配货";
                        return "错误";
                    }
                }, {
                    field: 'status',
                    title: '状态',
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
                    field: 'paystatus',
                    title: '是否支付',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 3) {
                            str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                        } else {
                            str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                        }
                        return str;
                    }
                }, {
                    field: 'refundstatus',
                    title: '退款状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "待结算";
                        if (value == '1')
                            return "待退全款";
                        if (value == '2')
                            return "待退部分款";
                        if (value == '3')
                            return "已结清";
                        return "错误";
                    }
                }, {
                    field: 'refundtime',
                    title: '退款时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'jhprinttime',
                    title: '拣货单打印时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'jhprintname',
                    title: '拣货单打印人',
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
}

var table = null;

function queryParams(params) {
    // 获取单号
    var ordercode = $("#ordercode").val();
    // 获取门店名称
    var storeid = $("#store").val();
    // 获取状态
    var status = $("#status").val();
    //批次号
    var batchcode = $("#batchcode").val();
    //是否完工
    var baudied = $("#baudied").val();
    //配货状态
    var preparestatus = $("#preparestatus").val();
    //退款状态
    var refundstatus = $("#refundstatus").val();
    //配货类型
    var preparetype = $("#preparetype").val();
    //发货单号
    var fhordercode = $("#fhordercode").val();
    //是否合成发货单
    var iscreateFhorder = $("#iscreateFhorder").val();
    var batchname = $("#batchname").val();
    var time = $("#time").val();
    var refundtime = $("#refundtime").val();
    var jhprinttime = $("#jhprinttime").val();
    var ordertype = $("#ordertype").val();
    var angle = $("#angle").val();
    var batchtype = $("#batchtype").val();
    var fblx = $("#fblx").val();
    var replenish = $("#replenish").val();
    var batchlx = $("#batchlx").val();

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        ordercode: ordercode,
        storeid: storeid,
        status: status,
        batchcode: batchcode,
        baudied: baudied,
        preparestatus: preparestatus,
        refundstatus: refundstatus,
        preparetype: preparetype,
        fhordercode: fhordercode,
        iscreateFhorder: iscreateFhorder,
        time: time,
        batchname: batchname,
        refundtime: refundtime,
        jhprinttime: jhprinttime,
        ordertype: ordertype,
        angle: angle,
        batchtype: batchtype,
        fblx: fblx,
        replenish: replenish,
        batchlx: batchlx
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

//执行一个laydate实例
laydate.render({
    elem: '#refundtime',
    range: true
});
//执行一个laydate实例
laydate.render({
    elem: '#jhprinttime',
    range: true,
    type: 'datetime'
});

// 搜索
function search() {
    $("#table").bootstrapTable('refresh', queryParams);
}

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
            $('#store').append(mdContent);
        }
    });
    $('#store').combobox();
}

// 详情
var details = function () {
    var thisTable = $('#table').bootstrapTable("getSelections");
    if (thisTable == null || thisTable.length == 0 || thisTable == undefined) {
        layer.msg("请选中单号");
        return false;
    }

    if (thisTable.length > 1) {
        layer.msg("不支持多行操作！");
        return false;
    }

    var id = thisTable[0].id;  // 获取id
    layer.open({
        type: 2,
        title: '订单详情',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['800px', '580px'],
        content: "wxorderdetails?id=" + id
    });
}

/**
 * @Description 撤销网络订单
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-01-24 14:43
 **/
function revokeWxOrder() {
    var rows = $('#table').bootstrapTable("getSelections");         //获取当前表格
    if (rows.length < 1) {
        layer.msg("请至少选中一行！！", function () {
        });
        return;
    }
    var idbuff = "";
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != 3) {
            layer.msg("只有待发货状态才能进行该操作！！", function () {
            });
            return;
        }
        if (rows[i].refundstatus != 0 && rows[i].refundstatus != 1) {
            layer.msg("请注意订单：" + rows[i].ordercode + "当前退款状态，已不支持撤单操作！！", function () {
            });
            return;
        }
        if (rows[i].preparestatus > 1 && rows[i].preparestatus != 3) {
            layer.msg("订单" + rows[i].ordercode + "不满足撤单条件！！");
            return;
        }
        idbuff += rows[i].id + ",";
    }

    layer.confirm('确认要撤销' + rows.length + '个订单？', {
        btn: ['确定', '取消']
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderController/revokeWxOrderByidbuff/" + idbuff,
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    alert(data.msg);
                    search();
                    layer.close(index);
                } else {
                    layer.msg(data.msg);
                }
            }
        })
    });
}

var tell = function (ok, status) {
    if (ok.length == 0 || ok == null || ok == undefined || ok == "") {
        return false;
    }
    if (status == null || status == undefined || status == "") {
        return false;
    }

    for (var i = 0; i < ok.length; i++) {
        if (status == ok[i]) {
            return true;
            break;
        }
    }
    return false;
}

var getRowsObj = function (arr) {
    var list = new Array();
    if (arr == null || arr == undefined) {
        return false;
    }
    $.each(arr, function (index, item) {
        var obj = new Object();
        obj.id = item.id;
        obj.ordercode = item.ordercode;
        list.push(obj);
    });
    return list;
}

var checkFinancial = function (arr) {
    if (arr == null || arr == undefined) {
        return "请选中一行！";
    }
    var v = true;
    var msg = true;
    $.each(arr, function (index, item) {
        if (item.status != 4) {
            msg = "订单号：" + item.ordercode + "不是客服审核状态，无法财务审核";
            v = false;
        }
        return v;
    });
    return msg;
}


/**
 * @Description补货配貨操作
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/4/17 16:47
 **/
function bhprepare() {
    var rows = $('#table').bootstrapTable("getSelections");
    if (rows.length < 1) {
        layer.msg("请选中一个批次进行补货配货操作", function () {
        });
        return false
    }
    var orderidbuff = "";
    for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].baudied != 1) {
            layer.msg("订单：" + rows[i].ordercode + "下的批次尚未完工，不能进行补货配货操作！！", function () {
            });
            return;
        }
        if (rows[i].status != 3) {
            layer.msg("订单：" + rows[i].ordercode + "不为待发货状态，不能进行补货配货操作！！", function () {
            });
            return;
        }
        if (rows[i].preparestatus != 0 || rows[i].preparetype != 0) {
            layer.msg("订单：" + rows[i].ordercode + "配货状态或配货类型不为默认，不能进行补货配货操作！！", function () {
            });
            return;
        }
        orderidbuff += rows[i].id + ',';
    }
    layer.confirm('确定对' + rows.length + "个网络订单进行补货配货操作?",
        {btn: ['确认', '取消']},
        function (index) {
            $.ajax({
                url: pageContext + "/wxOrderController/bhprepare/" + orderidbuff,
                type: 'POST',
                async: false,
                dataType: 'json',
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        search();
                    }
                }
            });
            layer.close(index);
        });
}


/**
 * @Description 网络订单退款
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/4/14 10:58
 **/
function refundWxOrder() {
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows == null || rows.length > 1) {
        layer.msg("请选择一个订单号进行退款操作！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: rows[0].ordercode + '退款界面',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['560px', '260px'], // 宽高
        content: pageContext + "/wxOrderController/getRefundOrderByid/" + rows[0].id + "/0",
        btn: ['确认', '取消'], // 可以无限个按钮
        yes: function (index, layero) {
            if (rows[0].preparestatus == 2) {
                layer.msg("该订单正在拣货，请等待拣货数据上传再进行退款操作！！", function () {
                });
                return;
            }
            if (rows[0].refundstatus == 3) {
                layer.msg("该单已经结清，不存在首次退款操作！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/wxOrderController/refundOrderByid/" + rows[0].id + "/0",
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        $('#table').bootstrapTable('refresh', queryParams);
                    }
                }, error: function () {
                }
            });
        }
    });
}

function refundWxOrderLast() {
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows == null || rows.length > 1) {
        layer.msg("请选择一个订单号进行撤单操作！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: rows[0].ordercode + '拣货撤单退款\界面',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['560px', '260px'], // 宽高
        content: pageContext + "/wxOrderController/getRefundOrderByid/" + rows[0].id + "/1",
        btn: ['确认', '取消'], // 可以无限个按钮
        yes: function (index, layero) {
            if (rows[0].status == 5) {
                layer.msg("该订单已经发货，不能进行拣货撤单操作！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/wxOrderController/refundOrderByid/" + rows[0].id + "/1",
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        $('#table').bootstrapTable('refresh', queryParams);
                    }
                }, error: function () {
                }
            });
        }
    });
}

function printBhJhOrder() {
    var idbuff = "";
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows.length < 1) {
        layer.msg("至少选择一个网络订单进行补货打印操作！！", function () {
        });
        return;
    }
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].preparetype != 2) {
            layer.msg("只有是进行补货配货的订单才能进行该操作！！", function () {
            });
            return;
        }
        idbuff += rows[i].id + ",";
    }
    layer.open({
        type: 2,
        title: '补货订单打印拣货单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        anim: 3,
        area: ['100%', '100%'],
        btn: ['确认', '关闭'], //可以无限个按钮
        content: pageContext + "/wxOrderController/printJhOrderByidList/" + idbuff,
        yes: function (index, layero) {
            $.ajax({
                url: pageContext + "/wxOrderController/bhPrintConfirm/" + idbuff,
                contentType: 'application/json;charset=UTF-8',
                type: "POST",
                dataType: "json",
                async: false,
                success: function (data) {
                    if (data.success) {
                        layer.close(index);
                        search();
                    } else {
                        layer.alert(data.msg);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 * @Description得到网络订单拣货明细
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/5/2 13:18
 **/
function getJhDetail() {
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows.length > 1) {
        layer.msg("请选择一条网络订单进行查看！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: rows[0].ordercode + "拣货明细",
        shade: [0.8, '#393D49'], //遮罩层
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],//显示弹出框的宽高
        content: "wxorder-jhdetail?wxorderid=" + rows[0].id,
    });
}

function exportNotFhinfo() {
    layer.open({
        type: 1,
        title: '导出门店未发货数据为EXCEL',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["确定", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">店号：</td><td class="pb-10"><input  id="export_mdcode" type="text" placeholder="请输入店号" class="form-control"></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var mdcode = $("#export_mdcode").val();
            if (mdcode == "" || mdcode == null || mdcode == undefined) {
                layer.msg("请输入要导出未发货数据的门店号！！", function () {
                });
                return;
            }
            window.location.href = "reportController/exportNotFhinfo/" + mdcode
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 * @Description无货标识
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-06-19 10:52
 **/
function maxmaraIdentifier() {
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows.length < 1) {
        layer.msg("请选择一条网络订单进行查看！！", function () {
        });
        return;
    }
    //status = 3 and refundstatus = 0 and preparestatus = 2
    var idlist = new Array();
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != 3) {
            layer.msg("只有待发货状态才能进行该操作！！", function () {
            });
            return;
        }
        if (rows[i].refundstatus != 0) {
            layer.msg("请注意订单：" + rows[i].ordercode + "当前退款状态，不支持标识操作！！", function () {
            });
            return;
        }
        if (rows[i].preparestatus != 2) {
            layer.msg("订单" + rows[i].ordercode + "不属于拣货中,不满足标识条件！！")
        }
        idlist.push(rows[i].id);
    }
    layer.confirm('确定对' + idlist.length + '个订单进行无货标识操作？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderController/wxOrdersMaxmaraIdentifier",
            contentType: 'application/json;charset=utf-8',
            type: "POST",
            dataType: "json",
            async: true,
            data: JSON.stringify(idlist),
            success: function (data) {
                layer.alert(data.msg);
                if (data.success) {
                    layer.close(index);
                    search();
                }
            }
        });
        layer.close(index);
    }, function (index) {
        layer.close(index);
    });
}

/**
 * @Description拣货重扫
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/7/17 17:29
 **/
function restartpicking() {
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows.length < 1) {
        layer.msg("请至少选择一条网络订单进行拣货重扫操作！！", function () {
        });
        return;
    }
    var orderidList = new Array();
    for (var i in rows) {
        if (rows[i].status != 4) {
            layer.msg("订单：" + rows[i].ordercode + "状态不满足条件！！", function () {
            });
            return;
        }
        if (rows[i].refundstatus == 3) {
            layer.msg("订单：" + rows[i].ordercode + "退款状态为已结清，不支持重扫操作！！", function () {
            });
            return;
        }
        if (rows[i].fhordercode != null && rows[i].fhordercode != "" && rows[i].fhordercode != undefined) {
            layer.msg("订单：" + rows[i].ordercode + "已经合成发货单，不支持重扫操作！！", function () {
            });
            return;
        }
        orderidList.push(rows[i].id);
    }
    layer.confirm('确定对' + orderidList.length + '个订单进行拣货重扫操作？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderController/restartPicking",
            contentType: 'application/json;charset=utf-8',
            type: "POST",
            dataType: "json",
            async: true,
            data: JSON.stringify(orderidList),
            success: function (data) {
                layer.alert(data.msg);
                if (data.success) {
                    layer.close(index);
                    search();
                }
            }
        });
        layer.close(index);
    }, function (index) {
        layer.close(index);
    });
}

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#table").bootstrapTable('refresh', queryParams);
        }
    });
});

//订单重配
function restartPrePare() {
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows.length < 1) {
        layer.msg("请至少选择一条网络订单进行订单重配操作！！", function () {
        });
        return;
    }
    var orderidList = new Array();
    for (var i in rows) {
        if (rows[i].status != 3) {
            layer.msg("订单：" + rows[i].ordercode + "状态不满足条件！！", function () {
            });
            return;
        }
        if (rows[i].refundstatus != 0) {
            layer.msg("订单：" + rows[i].ordercode + "退款状态不为默认，不支持订单重配操作！！", function () {
            });
            return;
        }
        if (rows[i].preparestatus != 2) {
            layer.msg("订单：" + rows[i].ordercode + "配货状态不为拣货中，不支持订单重配！！", function () {
            });
            return;
        }
        orderidList.push(rows[i].id);
    }
    layer.confirm('确定对' + orderidList.length + '个订单进行订单重配操作？', {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderController/wxOrdersRestartPrepareByidList",
            contentType: 'application/json;charset=utf-8',
            type: "POST",
            dataType: "json",
            async: true,
            data: JSON.stringify(orderidList),
            success: function (data) {
                layer.alert(data.msg);
                if (data.success) {
                    layer.close(index);
                    search();
                }
            }
        });
        layer.close(index);
    }, function (index) {
        layer.close(index);
    });
}