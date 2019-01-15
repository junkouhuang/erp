//初始化bootstrap Table
$(function () {
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
});

var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#scrapOrderTable').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/spBFDanController/getSpBFDanInfo", //请求后台的url
            singleSelect: false, //仅允许单选
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: true,  //是否显示刷新按钮
            pagination: true,   //是否显示分页（*）
            clickToSelect: true,
            queryParamsType: 'undefined',
            queryParams: queryParams,//传递参数（*）
            responseHandler: rspHandler,
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
                    title: '报废单id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ordercode',
                    title: '报废单号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'createtime',
                    title: '生成时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'addusername',
                    title: '创建人',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0') {
                            return '新建';
                        } else if (value == '1') {
                            return '扫描';
                        } else if (value == '2') {
                            return '确认';
                        } else if (value == '3') {
                            return '老货翻新';
                        } else if (value == '4') {
                            return '报废';
                        } else if (value == '5') {
                            return '老货重发';
                        } else {
                            return '错误';
                        }
                    }
                }, {
                    field: 'costje',
                    title: '成本',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sellje',
                    title: '货值',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bz',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                }],
            onClickRow: function (row, $element) {
                //$element.find("input").prop("checked",true).parents("tr").siblings().find("input").prop("checked",false);
            }
        });

        $('#scrapOrderTable').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
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
};

var table = null;

function queryParams(params) {
    getPageParam();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        start: start,
        end: end,
        orderCode: orderCode
        //searchText:params.search,   //搜索框参数
        //searchText:params.search,   //搜索框参数
    };
    return temp;
}

//得到查询的参数
function rspHandler(res) {
    if (res) {

        /*//循环确认每个批次的状态
        $.each(res.list, function(index, item){
            item.status = confirmScrapOrderStatus(item.status);
        });*/

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
    elem: '#createOrderTime',
    range: true
});


// 起始时间
var start;
// 结束时间
var end;
// 报废单号
var orderCode;

// 搜索功能
function searchBtn() {
    // 获取页面搜索框的参数
    getPageParam();

    // 判断是否能进行搜索
    if (paramIsEmpty()) {
        // 初始化表格
        $("#scrapOrderTable").bootstrapTable('refresh', queryParams);
    } else {
        layer.msg("请输入条件进行搜索", function () {
        });
    }

}


// 获取页面参数
function getPageParam() {
    // 获取页面时间段
    var time = $("#createOrderTime").val();
    if (time == null || time == "" || time == undefined) {
        start = "";
        end = "";
    } else {
        var timeArray = time.split(" - ");
        start = timeArray[0];
        end = timeArray[1];
    }

    // 获取报废单号
    orderCode = $("#scrapOrderCode").val();
}


// 判断搜索条件是否为空
function paramIsEmpty() {
    if ((start == "" || start == undefined || start == null)
        && (end == "" || end == undefined || end == null)
        && (orderCode == "" || orderCode == undefined || orderCode == null)) {
        return false;
    } else {
        return true;
    }
}


// 确认报废单状态
function confirmScrapOrderStatus(thisStatus) {
    var status;
    $.each(scrapOrder_status, function (index, item) {
        if (thisStatus == item.status) {
            status = item.text;
            return false;
        }
    });
    return status;
}


// 显示添加商品报废单区域
var isSpread = true;

function shwoAdd() {
    if (isSpread) {
        $("#remarkRegion").slideToggle("slow");
        $("#shwoBtn").text("取消");
        $("#saveBtn").slideToggle("slow");
        isSpread = false;
    } else {
        $("#remarkRegion").slideToggle("slow");
        $("#shwoBtn").text("新增");
        $("#saveBtn").slideToggle("slow");
        isSpread = true;
    }
}


// 请求后台保存商品报废单
function saveSPBFDan() {
    // 获取备注信息
    var remark = $("#remarkInfo").val();
    $.ajax({
        url: pageContext + "/spBFDanController/saveASpBFDan",
        type: 'post',
        dataType: 'json',
        data: {'remark': remark},
        async: false,
        success: function (data) {
            if (data.success) {
                shwoAdd();
                $("#remarkInfo").val("");
                $("#scrapOrderTable").bootstrapTable('refresh', queryParams);
            } else {
                shwoAdd();
                $("#remarkInfo").val("");
            }
        }
    });
}


// 确认商品报废单
function confirmSPBFDan() {
    // 获取当前
    var thisObj = $('#scrapOrderTable').bootstrapTable("getSelections")[0];
    //判断是否选中批次
    if (!isSelected(thisObj)) {
        layer.msg("请选中报废单", function () {
        });
        return false
    }

    // 判断是否能进行确认状态
    if (thisObj.status != "扫描") {
        layer.msg("只有扫描状态的报废单能进行确认");
        return false;
    }

    layer.msg("确定要进行确认吗？", {
            time: 0, btn: ['确定', '取消'],
            btn1: function () {
                // 请求后台进行商品报废单确认
                requestBackEndSPBFDanConfirmStatus(thisObj.id);
            }
        }
    );

}


// 判断是否选中当前表格
function isSelected(thisObj) {
    var isSelect = false;
    if (thisObj != null && thisObj != '') {
        isSelect = true;
    }
    return isSelect;
}


// 请求后台进行商品报废单确认
function requestBackEndSPBFDanConfirmStatus(id) {
    $.ajax({
        url: pageContext + "/spBFDanController/sPBFdanConfirm",
        type: 'post',
        dataType: 'json',
        data: {'id': id},
        async: false,
        success: function (data) {
            if (data.success) {
                $("#scrapOrderTable").bootstrapTable('refresh', queryParams);
            } else {
                layer.msg(data.msg);
            }
        }
    });
};


// 出库
var stockOut = function () {
    // 获取当前
    var thisObj = $('#scrapOrderTable').bootstrapTable("getSelections")[0];

    // 判断是否选中
    if (thisObj == null || thisObj == '' || thisObj == undefined) {
        layer.msg("请选中报废单", function () {
        });
        return false;
    }
    console.info(thisObj.status);

    if (thisObj.status != 3) {
        layer.msg("只有在老货翻新状态下才能出库", function () {
        });
        return false;
    }


    // 打开报废出库窗口
    layer.open({
        type: 2,
        title: '报废出库',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['800px', '610px'],
        content: "scrap_order_stockOut?id=" + thisObj.id
    });
}

function printSpBfDan() {
    var selections = $('#scrapOrderTable').bootstrapTable("getSelections");
    if (selections.length < 1) {
        layer.msg("请选择你要打印的报废单！", function () {
        })
        return;
    }
    var idstr = "";
    for (var i in selections) {
        idstr += selections[i].id + ",";
    }
    layer.open({
        type: 2,
        title: '报废单打印界面',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['100%', '100%'],
        content: "spBFDanController/printSpBfDanInfoByidList/" + idstr
    });
}

function printSpBfDanInfos() {
    var selections = $('#scrapOrderTable').bootstrapTable("getSelections");
    if (selections.length < 1) {
        layer.msg("请选择你要打印的报废单！", function () {
        })
        return;
    }
    var idstr = "";
    for (var i in selections) {
        idstr += selections[i].id + ",";
    }
    layer.open({
        type: 2,
        title: '报废单打印界面',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['100%', '100%'],
        content: "spBFDanController/printSpBfDanInfos/" + idstr
    });
}