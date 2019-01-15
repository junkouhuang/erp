/**
 *
 * 作者:黄金高
 * 创建时间:2017-12-4 下午1:46:34
 * 模块名称:订单列表
 * 操作:表格数据加载
 *
 */
$(function () {
    loadTradeinfo();
    loadWhsinfo();
    $('#splx').combobox();
    // 执行一个laydate实例
    laydate.render({
        elem: '#time',
        range: true
    });
    //1.初始化Table
    table = $('#productstoragelog_table').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/productStorageLogController/getProductionStorageLogPageList", //请求后台的url
        singleSelect: true, //仅允许单选
        //search: true,
        showColumns: true, //是否显示所有的列
        showRefresh: true,//是否显示刷新按钮
        pagination: true,//是否显示分页（*）
        queryParamsType: 'undefined',
        clickToSelect: true,
        sortOrder: 'asc',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        idField: "id",
        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        detailView: true,//父子表
        showExport: true,
        exportDataType: 'all',
        onExpandRow: onExpandRow,
        columns: [
            {
                checkbox: true
            },
            //动态创建列名
            {
                field: 'spcode',
                title: '款号',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'spmc',
                title: '商品名称',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'price',
                title: '单价',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'cgOrderCode',
                title: '采购单号',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'cgitemno',
                title: '采购编码',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'optuname',
                title: '操作员',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'starttime',
                title: '开始时间',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'endtime',
                title: '结束时间',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'sl',
                title: '数量',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'whsname',
                title: '仓库',
                align: 'center',
                valign: 'middle',
                sortable: true

            }, {
                field: 'tradename',
                title: '品牌商',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'splx',
                title: '货品类型',
                align: 'center',
                valign: 'middle',
                sortable: true,
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == 0) {
                        str = '大货';
                    } else if (value == 1) {
                        str = '样板';
                    } else {
                        str = '未知';
                    }
                    return str;
                }

            }, {
                field: 'fjworkcode',
                title: '分拣工程单号',
                align: 'center',
                valign: 'middle',
                sortable: true
            }],
        onClickRow: function (row, $element) {
            $element.find("input").prop("checked", true).parents("tr").siblings().find("input").prop("checked", false);
        }
    });
});

//父子表
function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

InitSubTable = function (index, row, $detail) {
    var cur_table = $detail.html('<table style="color: #7aba7b"></table>').find('table');
    $(cur_table).bootstrapTable({
        method: "post", //请求方法
        striped: true, //是否显示行间隔色
        sortable: true, //是否启用排序
        sortOrder: "asc",  //排序方式
        url: pageContext + "/productStorageLogController/getProductionStorageLogMxShow/" + row.id,
        dataType: "json",
        pagination: false,    // 显示页码等信息
        showColumns: false,  // 选择显示的列
        clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
        pageNumber: 1,         //首页页码
        pageSize: 5,           // 当前分页值
        pageList: [5, 20],  // 分页选页
        queryParams: queryParamschild,//传递参数（*）
        sidePagination: 'server',   // //分页方式：client 客户端分页，server 服务端分页
        cache: false, // 不缓存
        responseHandler: rspHandler,//格式化数据
        columns: [
            {
                field: 'mxcode',
                title: '条码',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sl',
                title: '数量',
                align: 'center',
                valign: 'middle',
                sortable: true
            }
        ]
    });

};

// 搜索功能
function LoadingDataListOrderRealItems() {
    $("#productstoragelog_table").bootstrapTable('refresh', queryParams);
}

var table = null;

function queryParams(params) {
    var postdata = $('#orderlistForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
}

function queryParamschild(params) {
    var postdata = $('#orderlistForm').serializeJSON();
    postdata['pageSize'] = params.pageSize1;
    postdata['page'] = params.pageNumber1;
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
            $('#kwtraderid').append(tradeContent);
        }
    });
    $('#kwtraderid').combobox();
}

function loadWhsinfo() {
    $.ajax({
        url: pageContext + "/whsController/getWhsinfoList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var tradeContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                tradeContent += "<option value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
            }
            $('#whsid').append(tradeContent);
        }
    });
    $('#whsid').combobox();
}

function exportProductionStorageLogsToExcel() {
    var time = $("#time").val();
    var spcode = $("#spcode").val();
    var spmc = $("#spmc").val();
    var optuname = $("#optuname").val();
    var whsid = $("#whsid").val();
    var kwtraderid = $("#kwtraderid").val();
    var cgOrderCode = $("#cgOrderCode").val();
    var cgitemno = $("#cgitemno").val();
    var splx = $("#splx").val();
    window.location.href = pageContext + "/productStorageLogController/exportProductionStorageLogsToExcel?time=" + time +
        "&spcode=" + spcode +
        "&spmc=" + spmc +
        "&optuname=" + optuname +
        "&whsid=" + whsid +
        "&kwtraderid=" + kwtraderid +
        "&cgOrderCode=" + cgOrderCode +
        "&cgitemno=" + cgitemno +
        "&splx=" + splx
}

//删除生产入库记录
function deleteProductionStorageLogs() {
    //获取当前表格
    var selections = $('#productstoragelog_table').bootstrapTable("getSelections");
    //判断是否选中表格某项
    if(selections.length <= 0){
        layer.msg("请选择要删除的生产入库记录");
        return false
    }
    var optidList = new Array();
    for(var i in selections){
        optidList.push(selections[i].id);
    }
    layer.open({
        type: 1,
        title: '删除入库记录，请填写备注',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["确定", "取消"],
        content: '<form id="importBatchInfo" class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">备注：</td><td  class="pb-10"><input id="bz" type="text" class="form-control"></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var bz = $("#bz").val();
            if(bz == ''){
                layer.msg("备注信息不能为空！",function(){});
                return;
            }
            $.ajax({
                url: pageContext + "/productStorageLogController/deleteProductionStorageLogs/"+bz,
                data:JSON.stringify(optidList),
                type: "post",
                contentType: 'application/json;charset=UTF-8',
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if(data.success){
                        layer.close(index);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}