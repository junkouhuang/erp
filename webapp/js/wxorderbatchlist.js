//初始化bootstrap Table
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
            url: pageContext + "/wxOrderBatchController/selectWxOrderBatchPageInfo", //请求后台的url
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
            pageList: [10, 50, 100, 500, 1000],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            rowStyle: function (row, index) {
                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
                var strclass = "";
                if (row.status == "1") {
                    strclass = 'btn-danger';
                }
                else if (row.status == "2") {
                    strclass = 'btn-primary';
                }
                else if (row.status == "3") {
                    strclass = 'btn-MediumPurple';
                } else if (row.status == "9") {
                    strclass = 'btn-info';
                } else {
                    strclass = 'btn-success';
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
                    field: 'wxorders.ordercode',
                    title: '订单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'wxamountcode',
                    title: '催款单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'total',
                    title: '数量',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'amount',
                    title: '金额',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'wxorders.fhordercode',
                    title: '发货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fbcode',
                    title: '发布号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'startdate',
                    title: '发布时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'wxorders.mdcode',
                    title: '门店编号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'wxorders.mdmc',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle'
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
                    field: 'baudied',
                    title: '完工',
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
                    field: 'wxorders.ordertype',
                    title: '订单类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "不配货";
                        return "错误";
                    }
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "待处理";
                        if (value == '1')
                            return "已生成发货单";
                        if (value == '2')
                            return "客服审核";
                        if (value == '3')
                            return "财务审核";
                        if (value == '9')
                            return "已撤销";
                        return "错误";
                    }
                }, {
                    field: 'wxorders.paystatus',
                    title: '支付状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "未支付";
                        if (value == '3')
                            return "已支付";
                        return "错误";
                    }
                }, {
                    field: 'wxorders.createtime',
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
    // 获取单号
    var ordercode = $("#ordercode").val();
    // 获取门店名称
    var storeid = $("#store").val();
    // 获取状态
    var status = $("#status").val();
    var baudied = $("#baudied").val();
    var batchcode = $("#batchcode").val();
    var fbcode = $("#fbcode").val();
    var wxamountcode = $("#wxamountcode").val();
    var paystatus = $("#paystatus").val();
    var isamount = $("#isamount").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        ordercode: ordercode,
        storeid: storeid,
        status: status,
        baudied: baudied,
        batchcode: batchcode,
        fbcode: fbcode,
        wxamountcode:wxamountcode,
        paystatus:paystatus,
        isamount:isamount
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
            var mdContent = '<option value="" selected="selected"></option>';
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

function addWxNoOrderFhorder() {
    var optionSelections = $('#table').bootstrapTable("getSelections");
    if (optionSelections.length <= 0) {
        layer.msg("请选择要合成发货单的订单批次信息！！", function () {
        });
        return;
    }
    var wxorderidList = new Array();
    var noHlist = "";
    for (var i = 0; i < optionSelections.length; i++) {
        if (optionSelections[0].fhid != null) {
            layer.msg("存有明细已合成发货单！！", function () {});
            return;
        } else if (optionSelections[0].status != 0) {
            layer.msg("只有默认状态的才能合成发货单！！", function () {});
            return;
        }
        if(optionSelections[0].wxorders.paystatus != 3){
            layer.msg("只有支付状态的订单批次才能合成发货单！！", function () {});
            return;
        }
        if (i != 0) {
            if (optionSelections[i].storeid != optionSelections[i - 1].storeid) {
                layer.msg("门店不一致！！", function () {});
                return;
            }
        }
        if (optionSelections[i].baudied != 1) {
            noHlist += optionSelections[i].batchcode + ',';
        }
        wxorderidList.push(optionSelections[i].id);
    }
    if (noHlist != "") {
        alert(noHlist + "批次没货！！");
        return;
    }
    layer.confirm('确定要生成发货单？没完工的批次会自动剔除..', {
        btn: ['确定', '取消']
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderBatchController/createFhorder",
            type: "post",
            data: JSON.stringify(wxorderidList),
            contentType: 'application/json;charset=UTF-8',
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                if (data.success) {
                    alert(data.msg);
                    layer.close(index);
                    search();
                } else {
                    layer.msg(data.msg);
                }
            },
            error: function () {
                alert("error");
            }
        });
    });
}

var tell = function (ok, status) {
    if (ok.length == 0 || ok == null || ok == undefined || ok == "") {
        return false;
    }
    if (status == null || status == ndefined || status == "") {
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


/**
 * @Description 撤销订单批次
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-02-23 09:20
 **/
function revokeWxOrderBatch() {
    var selections = $('#table').bootstrapTable("getSelections");         //获取当前表格
    if (selections.length < 1) {
        layer.msg("请选中一行！！", function () {});
        return;
    }
    var wxorderidList = new Array();
    for (var i = 0; i < selections.length; i++) {
        if (selections[i].status > 1) {
            layer.msg("只有未客服审核的订单批次才能撤销，订单号：" + selections[i].wxorders.ordercode + ",批次号："
                + selections[i].batchcode + " 不符合要求！！", function () {
            });
            return;
        }
        wxorderidList.push(selections[i].id);
    }
    $.ajax({
        url: pageContext + "/wxOrderBatchController/revokeWxOrderBatchs/0",
        type: "post",
        data: JSON.stringify(wxorderidList),
        contentType: 'application/json;charset=UTF-8',
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            alert(data.msg);
            if (data.success) {
                search();
                layer.close(index);
            }
        },
        error: function () {
            alert("error");
        }
    });
}


/**
 * @Description 绑定
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/1/25 22:57
 **/
function bindWxAmount() {
    var selections = $('#table').bootstrapTable("getSelections");
    if (selections.length < 1) {
        layer.msg("请至少选择一行！！", function () {
        });
        return;
    }

    for (var i in selections) {
        if (selections[i].status != 0) {
            layer.msg("只有待处理状态才能进行该操作！！", function () {});
            return;
        }
        if (selections[i].wxamountcode != undefined && selections[i].wxamountcode != null && selections[i].wxamountcode != "") {
            layer.msg("有批次已生成催款单号！！", function () {});
            return;
        }
    }
    var idList = new Array();
    for (var i in selections) {
        idList.push(selections[i].id);
    }
    layer.confirm('确认要合成催款单？', {
        btn: ['确定', '取消']
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderBatchController/bindWxAmount",
            type: "post",
            data: JSON.stringify(idList),
            contentType: 'application/json;charset=UTF-8',
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                alert(data.msg);
                if (data.success) {
                    layer.close(index);
                }
            },
            error: function () {
                alert("error");
            }
        });
    });
}
