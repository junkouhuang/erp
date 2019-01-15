var flfhid = '';

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
$(function () {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected"></option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value=" + data[i].id + ">" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
        }
    });
    $('#storeid').combobox();
    var origin = getQueryString("origin");
    if (origin == 1) {
        var storeid = getQueryString("storeid");
        $(".combobox ").val($("#storeid").find("option[value='" + storeid + "']").text());
        $("#storeid").find("option[value='" + storeid + "']").attr("selected", true);

    }
    $('#status').combobox();
    // 执行一个laydate实例
    laydate.render({
        elem: '#time',
        range: true,
        done: function (value, date, endDate) {
            time = value;
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
    // 1.初始化Table
    table = $('#flfhorder_table').bootstrapTable(
        { // 表格ID
            method: 'POST',
            dataType: 'json',
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,
            striped: true,// 是否显示行间隔色
            sidePagination: "server",// 分页方式：client客户端分页，server服务端分页（*）
            url: pageContext + "/flFhorderController/selectFlfhorderPageByCwAudit",
            singleSelect: true, // 仅允许单选
            // search: true,
            showColumns: true,
            showRefresh: true,
            showToggle: false,
            pagination: true,
            queryParamsType: 'undefined',
            clickToSelect: true,
            queryParams: queryParams,
            responseHandler: rspHandler,
            minimumCountColumns: 2,
            pageNumber: 1, // 初始化加载第一页，默认第一页
            pageSize: 10, // 每页的记录行数（*）
            pageList: [10, 20, 50, 100], // 可供选择的每页的行数（*）
            idField: "id",
            // uniqueId: "id", //每一行的唯一标识，一般为主键列
            showExport: true,
            rowStyle: function (row, index) {
                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
                var strclass = "";
                if (row.status == "6") {
                    strclass = 'btn-danger';//还有一个active
                }
                return {classes: strclass}
            },
            exportDataType: 'all',
            columns: [{
                checkbox: true
            },
                // 动态创建列名
                {
                    field: 'id',
                    title: 'ID',
                    align: 'center',
                    valign: 'middle',
                    display: 'hidden',
                    sortable: true
                }, {
                    field: 'flfhcode',
                    title: '发货单号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'flfhtotal',
                    title: '发货件数',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'mdcode',
                    title: '门店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdmc',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'lxdh',
                    title: '联系电话',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "<span class=' btn-primary p30'>新增<span>";
                        if (value == '1')
                            return "<span class=' btn-warning p30'>确认<span>";
                        if (value == '2')
                            return "<span class=' btn-primary p30'>配货<span>";
                        if (value == '3')
                            return "<span class=' btn-primary p30'>文件组审核<span>";
                        if (value == '4')
                            return "<span class=' btn-danger p30'>跟单审核<span>";
                        if (value == '5')
                            return "<span class=' btn-primary  p30'>审核<span>";
                        if (value == '6')
                            return "<span class=' btn-danger p30'>发货<span>";
                        if (value == '9')
                            return "<span class=' btn-warning p30'>撤单<span>";
                        return "错误";
                    }
                }, {
                    field: 'shrr',
                    title: '收货人',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'wlgs',
                    title: '物流公司',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'shdz',
                    title: '收货地址',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'wldh',
                    title: '物流单号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'jhprint',
                    title: '拣货单打印状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "已打印";
                        return "未打印";
                    }
                }, {
                    field: 'fhprint',
                    title: '发货单打印状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "已打印";
                        return "未打印";
                    }
                }, {
                    field: 'bz',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                },{
                    field: 'whsaudittime',
                    title: '文件组审核时间',
                    align: 'center',
                    valign: 'middle'
                }],
            onClickRow: function (row, $element) {
                flfhid = row.id;
            }, onCheck: function (row) {
            flfhid = row.id;
        }
        });
    $('#flfhorder_table').bootstrapTable('hideColumn', 'id'); // 隐藏指定要隐藏的列
});
var table = null;

var time = $("#time").val();

function queryParams(params) {
    var flfhcode = $("#flfhcode").val();
    var storeid = $("#storeid").val();
    var status = $("#status").val();
    var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort, // 排序列名
        sortOrder: params.order, // 排序方式
        time: time,
        flfhcode: flfhcode,
        storeid: storeid,
        status: 3
    };
    return temp;
}

// 得到查询的参数
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

// 搜索功能
function LoadingDataListOrderRealItems() {
    $("#flfhorder_table").bootstrapTable('refresh', queryParams);
}

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
    $("#flfhcode").keydown(function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            $("#flfhorder_table").bootstrapTable('refresh', queryParams);
        }
    });
    $("#storeid,#status").change(function () {
        $("#flfhorder_table").bootstrapTable('refresh', queryParams);
    });
});

//导出辅料发货件数统计报表
function exportFlFhshipmentsExcel() {
    var flfhcode = $("#flfhcode").val();
    var storeid = $("#storeid").val();
    var time = $("#time").val();
    if(time == null || time == undefined || time == '' ){
        layer.msg('请选择指定的时间导出！！',function(){});
        return;
    }
    var storeid = $("#storeid").val();
    window.location.href=pageContext+"/reportController/exportFlfhorderShipmentsExcel?time="+time+"&storeid="+storeid+"&flfhcode="+flfhcode;
}