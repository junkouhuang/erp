$(function () {
    loadTradeinfo();
    loadWhsinfo();
    var oTable = new TableInit();
    oTable.Init();
})


var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#spmxkw_table').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/spmxkwController/getSpmxkwPageList", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            showFooter: true,
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
            pageList: [10, 20, 50, 100, 1000],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            detailView: true,//父子表
            onExpandRow: onExpandRow,
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
                    field: 'pkgid',
                    title: 'pkgid',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spmc',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                }, {
                    field: 'mxcode',
                    title: '条码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spcode',
                    title: '款号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'loccode',
                    title: '区号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'batchcodes',
                    title: '批次号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'itemno',
                    title: '采购编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'kw',
                    title: '库位',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sl',
                    title: '数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.sl;
                        });
                        return total;
                    }
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return '默认';
                        } else if (value == 1) {
                            return '配货锁定';
                        } else if (value == 2) {
                            return '异常锁定';
                        } else {
                            return '-';
                        }
                    }
                }, {
                    field: 'sellprice',
                    title: '价格',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '上架时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'onkw',
                    title: '在库',
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
                    field: 'kwpkgtype',
                    title: '库位类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return '打包';
                        } else if (value == 1) {
                            return '单件';
                        } else {
                            return '-';
                        }
                    }
                }, {
                    field: 'whsbz',
                    title: '仓库',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tradename',
                    title: '品牌商',
                    align: 'center',
                    valign: 'middle'
                }]
        });
        $('#spmxkw_table').bootstrapTable('hideColumn', 'id');  //隐藏指定要隐藏的列
        $('#spmxkw_table').bootstrapTable('hideColumn', 'pkgid');  //隐藏指定要隐藏的列
    };
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset
        };
        return temp;
    };
    $('#kwpkgtype').combobox();
    $('#parentid').combobox();
    $('#status').combobox();
    $('#onkw').combobox();
    //执行一个laydate实例
    laydate.render({
        elem: '#time',
        range: true
    });
    return oTableInit;
}

var table = null;

function queryParams(params) {
    var postdata = $('#spmxkwFrom').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
}

// 搜索
function search() {
    $("#spmxkw_table").bootstrapTable('refresh', queryParams);
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

/**
 * @Description导出spmxkw信息
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/5/16 9:20
 **/
function exportSpmxkw() {
    var mxcode = $("#mxcode").val();
    var spcode = $("#spcode").val();
    var spmc = $("#spmc").val();
    var itemno = $("#itemno").val();
    var whsid = $("#whsid").val();
    var kwtraderid = $("#kwtraderid").val();
    var kwpkgtype = $("#kwpkgtype").val();
    var onkw = $("#onkw").val();
    var loccode = $("#loccode").val();
    var status = $("#status").val();
    var time = $("#time").val();
    var parentid = $("#parentid").val();
    var imports = $("#imports").val();
    window.location.href = pageContext + "/spmxkwController/exportSpmxkwToExcel?mxcode=" + mxcode
        + "&spcode=" + spcode
        + "&spmc=" + spmc
        + "&itemno=" + itemno
        + "&whsid=" + whsid
        + "&kwtraderid=" + kwtraderid
        + "&kwpkgtype=" + kwpkgtype
        + "&onkw=" + onkw
        + "&loccode=" + loccode
        + "&status=" + status
        + "&time=" + time
        + "&parentid=" + parentid
        + "&imports=" + imports;
}

var selection;

//拆包
function sppackagePacket() {
    var selections = $('#spmxkw_table').bootstrapTable("getSelections");
    if (selections.length != 1) {
        layer.msg("请选择你要拆包的信息！", function () {
        });
        return;
    }
    if (!selections[0].onkw) {
        layer.msg("该包号不在库！", function () {
        });
        return;
    }
    if (selections[0].status != 0) {
        layer.msg("该包号状态不是默认！", function () {
        });
        return;
    }
    selection = selections[0];
    layer.open({
        type: 2,
        title: '订单详情',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['80%', '80%'],
        content: "sppackage-packet"
    });
}

function getSppackageInfo() {
    return selection;
}

//父子表
function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

InitSubTable = function (index, row, $detail) {
    if (row.kwpkgtype != 0) {
        return;
    }
    var cur_table = $detail.html('<table style="color: #7aba7b"></table>').find('table');
    $(cur_table).bootstrapTable({
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/spmxkwController/getSpmxPageListBySpmxkwid/" + row.id,
        showFooter: true,
        showColumns: false, //是否显示所有的列
        pagination: true,//是否显示分页（*）
        queryParamsType: 'undefined',
        queryParams: queryParamschild,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 5,                       //每页的记录行数（*）
        pageList: [5, 50, 100],        //可供选择的每页的行数（*）
        showExport: true,
        exportDataType: 'all',
        columns: [
            {
                field: 'spmc',
                title: '商品名称',
                align: 'center',
                valign: 'middle',
                sortable: true,
                footerFormatter: function (value) {
                    return "当前页统计:";
                }
            }, {
                field: 'spcode',
                title: '商品编码',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'mxcode',
                title: '商品条码',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'ys',
                title: '颜色',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'cm',
                title: '尺码',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sellprice',
                title: '价格',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sl',
                title: '数量',
                align: 'center',
                valign: 'middle',
                sortable: true,
                footerFormatter: function (value) {
                    var total = 0;
                    $.each(value, function (index, item) {
                        total += item.sl;
                    });
                    return total;
                }
            }
        ]
    });
};

function queryParamschild(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order //排序方式
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

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#spmxkw_table").bootstrapTable('refresh', queryParams);
        }
    });
});
