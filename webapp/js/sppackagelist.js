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
        $('#sppackage_table').bootstrapTable({  //表格ID
            method: 'POST',//请求方式（*）
            dataType: 'json',//获取的数据类型
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/bigpkgController/getSppackageList", //请求后台的url
            singleSelect: false, //仅允许单选
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
            pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
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
                    field: 'packagecode',
                    title: '包号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                },
                {
                    field: 'batchcode',
                    title: '批次号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return '空箱';
                        } else if (value == 1) {
                            return '已装箱';
                        } else if (value == 2) {
                            return '已上架';
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    field: 'bpkgtype',
                    title: '包类型',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return '批次包';
                        } else if (value == 2) {
                            return '退货包';
                        } else {
                            return '-';
                        }
                    }
                }, {
                    field: 'ownerid',
                    title: '分配',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return '默认';
                        } else if (value == 1) {
                            return '已分配';
                        } else {
                            return '-';
                        }
                    }
                },
                {
                    field: 'spsl',
                    title: '商品数量',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.spsl;
                        });
                        return total;
                    }
                },
                {
                    field: 'tradename',
                    title: '品牌商',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'whsname',
                    title: '仓库',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'zxsj',
                    title: '装箱时间',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                },
                {
                    field: 'sjsj',
                    title: '上架时间',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'kw',
                    title: '库位',
                    align: 'center',
                    valign: 'middle',
                    sortable: true

                }, {
                    field: 'kwloccode',
                    title: '区号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true

                }, {
                    field: 'dq',
                    title: '地域属性',
                    align: 'center',
                    valign: 'middle',
                    sortable: true

                },]
        });
    };
    laydate.render({
        elem: '#zxsj',
        range: true,
        type: 'datetime'
    });
    laydate.render({
        elem: '#sjsj',
        range: true,
        type: 'datetime'
    });
    return oTableInit;
}
var table = null;

function queryParams(params) {
    var postdata = $('#sppackageForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
}

function LoadingDataList() {
    $("#sppackage_table").bootstrapTable('refresh', queryParams);
}

function onExpandRow(index, row, $detail) {
    InitSubTable(index, row, $detail);
}

function InitSubTable(index, row, $detail) {
    var cur_table = $detail.html('<table data-side-pagination="server" style="color: #7aba7b"></table>').find('table');
    var subTableInit = new Object();
    subTableInit = $(cur_table).bootstrapTable({
        method: "post", //请求方法
        striped: true, //是否显示行间隔色
        sortable: true, //是否启用排序
        sortOrder: "asc",  //排序方式
        url: pageContext + "/bigpkgController/getSppkdetailInfosByPackageid/" + row.id,
        dataType: "json",
        pagination: true,    // 显示页码等信息
        showColumns: false,  // 选择显示的列
        clickToSelect: false, //在点击行时，自动选择rediobox 和 checkbox
        pageNumber: 1,         //首页页码
        pageSize: 10000,           // 当前分页值
        pageList: [10000],  // 分页选页
        queryParams: queryParamschild,//传递参数（*）
        sidePagination: 'server',   // //分页方式：client 客户端分页，server 服务端分页
        cache: false, // 不缓存
        responseHandler: rspHandler,//格式化数据
        columns: [
            {
                field: 'spmc',
                title: '商品名称',
                align: 'center',
                valign: 'middle',
                sortable: true
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
                sortable: true
            }
        ]
    });
    //得到查询的参数
    oTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset
        };
        return temp;
    };
    return subTableInit;
};

function queryParamschild(params) {
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order //排序方式
    };
    console.log(temp);
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
            $("#sppackage_table").bootstrapTable('refresh', queryParams);
        }
    });
});

function sppackageEmpty() {
    var selections = $('#sppackage_table').bootstrapTable("getSelections");
    var packageidList = new Array();
    if (selections.length <= 0) {
        layer.msg("请选择你要进行清空重扫操作的包号！", function () {
        });
        return;
    }
    for (var i in selections) {
        if (selections[i].status != 1 || selections[i].ownerid != 0) {
            layer.msg("包号：" + selections[i].packagecode + "不满足清空条件！", function () {
            });
            return;
        }
        packageidList.push(selections[i].id);
    }
    layer.confirm('确定对这' + selections.length + '个包进行清空重扫操作？', {
        btn: ["确定", "取消"]
        , yes: function (index) {
            $.ajax({
                url: pageContext + "/bigpkgController/sppackageEmpty",
                data: JSON.stringify(packageidList),
                contentType: 'application/json;charset=utf-8',
                type: "post",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if (data.success) {
                        LoadingDataList();
                        layer.close(index);
                    } else {
                        layer.msg(data.msg);
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
            $('#bpkgtradeid').append(tradeContent);
        }
    });
    $('#bpkgtradeid').combobox();
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
            $('#bpkgwhsid').append(tradeContent);
        }
    });
    $('#bpkgwhsid').combobox();
}

function exportSppackageInfo() {
    var packagecode = $("#packagecode").val();
    var batchcode = $("#batchcode").val();
    var zxsj = $("#zxsj").val();
    var sjsj = $("#sjsj").val();
    var kw = $("#kw").val();
    var kwloccode = $("#kwloccode").val();
    var status = $("#status").val();
    var ownerid = $("#ownerid").val();
    var bpkgtype = $("#bpkgtype").val();
    var bpkgwhsid = $("#bpkgwhsid").val();
    var bpkgtradeid = $("#bpkgtradeid").val();
    var onkw = $("#onkw").val();
    window.location.href = pageContext + "/bigpkgController/exportSppackageInfo?packagecode=" + packagecode
        + "&batchcode=" + batchcode
        + "&zxsj=" + zxsj
        + "&sjsj=" + sjsj
        + "&kw=" + kw
        + "&kwloccode=" + kwloccode
        + "&status=" + status
        + "&ownerid=" + ownerid
        + "&bpkgtype=" + bpkgtype
        + "&bpkgwhsid=" + bpkgwhsid
        + "&bpkgtradeid=" + bpkgtradeid
        + "&onkw=" + onkw;
}