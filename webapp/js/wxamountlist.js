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
            url: pageContext + "/wxOrderBatchController/getWxAmountCTOPageList", //请求后台的url
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
            pageList: [10, 20, 50, 100, 500],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            rowStyle: function (row, index) {
                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
                var strclass = "";
                if (row.status == "1") {
                    strclass = 'btn-primary';
                } else if (row.status == "3") {
                    strclass = 'btn-danger';
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
                    title: '绑定id',
                    align: 'center',
                    valign: 'middle'
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
                    field: 'wxamountcode',
                    title: '催款单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bindtime',
                    title: '制单时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "綁定";
                        if (value == '1')
                            return "客服审核";
                        if (value == '3')
                            return "财务审核";
                        return "错误";
                    }
                }, {
                    field: 'paystatus',
                    title: '支付状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "默认";
                        if (value == '3')
                            return "已支付";
                        return "错误";
                    }
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
    var wxamountcode = $("#wxamountcode").val();
    // 获取门店名称
    var storeid = $("#store").val();
    // 获取状态
    var status = $("#status").val();

    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        wxamountcode: wxamountcode,
        storeid: storeid,
        status: status
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

// 财务审核
function cwAuditWxAmount() {
    var selections = $('#table').bootstrapTable("getSelections");         //获取当前表格
    if (selections.length < 1) {
        layer.msg("请选择一条催款单进行财务审核操作！！", function () {
        });
        return;
    }
    if (selections[0].status != 1) {
        layer.msg("只有客服审核状态才能进行财务审核操作！！", function () {
        });
        return;
    }
    layer.confirm('确认要财务审核？', {
        btn: ['确定', '取消']
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderBatchController/cwAuditWxAmount/" + selections[0].id,
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                layer.msg(data.msg);
                if (data.success) {
                    layer.close(index);
                    search();
                }
            }
        })
    });

}

// 客服审核
function cusAuditWxAmount() {
    var selections = $('#table').bootstrapTable("getSelections");         //获取当前表格
    if (selections.length < 1) {
        layer.msg("请选择一条催款单进行客服审核操作！！", function () {
        });
        return;
    }
    if (selections[0].status != 0) {
        layer.msg("只有待处理状态才能进行客服审核操作！！", function () {
        });
        return;
    }
    layer.confirm('确认要客服审核？', {
        btn: ['确定', '取消']
    }, function (index) {
        $.ajax({
            url: pageContext + "/wxOrderBatchController/cusAuditWxAmount/" + selections[0].id,
            type: "POST",
            async: false,
            dataType: "json",
            success: function (data) {
                layer.msg(data.msg);
                if (data.success) {
                    layer.close(index);
                    search();
                }
            }
        })
    });

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

/**
 * @Description 导出网络发货单-下单数据与拣货数据的对比文件
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-02-05 13:05
 **/
function exportContrastExcel() {
    var rows = $('#table').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        window.location.href=pageContext+"/wxOrderBatchController/exportWxAmountInfo/"+obj.id;
    } else {
        layer.msg("请选择一条要导出下单信息的催款单！！", function () {});
        return;
    }
}