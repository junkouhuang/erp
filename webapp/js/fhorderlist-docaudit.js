function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};
var rowid = 0;
var idbuff= "";
$(function () {
    idbuff = getQueryString("idbuff");
    //1.初始化Table
    table = $('#fhorderlisttable_table').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: true,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: true,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/fhOrdersController/getFhSpdetailsByIdBuff/"+idbuff, //请求后台的url
        singleSelect: false, //仅允许单选
        sortable: true,  //是否启动排序
        showColumns: true, //是否显示所有的列
        showRefresh: true,//是否显示刷新按钮
        pagination: true,//是否显示分页（*）， 显示页码等信息
        queryParamsType: 'undefined',
        clickToSelect: true,//在点击行时，自动选择rediobox 和 checkbox
        sidePagination: 'server',//分页方式：client 客户端分页，server 服务端分页
        sortOrder: 'asc',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        minimumCountColumns: 2,//最少允许的列数
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
        idField: "id",
        showExport: true,
        exportDataType: 'all',
        columns: [
            {
                field: 'ordercode',
                title: '發貨單号',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'batchcode',
                title: '批次号',
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
            },
            {
                field: 'spcode',
                title: '款号',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'spmc',
                title: '品名',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
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
                footerFormatter: function (value) {
                    var count = 0;
                    for (var i in value) {
                        count += value[i].sl;
                    }
                    return count;
                }
            },
            {
                field: 'sellprice',
                title: '售价',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'sellje',
                title: '金额',
                align: 'center',
                valign: 'middle',
                footerFormatter: function (value) {
                    var count = 0;
                    for (var i in value) {
                        count += value[i].sellje;
                    }
                    return count;
                }
            }, {
                field: 'ys',
                title: '颜色',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cm',
                title: '尺码',
                align: 'center',
                valign: 'middle'
            }
        ],
        onClickRow: function (row, $element) {
            rowid = row.id;
        },
        onCheck: function (row) {
            rowid = row.id;
        }
    });
});

var table = null;

function queryParams(params) {
    var postdata = $('#cgdetaillistFrom').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
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

//搜索功能
function LoadingDataListOrderRealItems() {
    $("#fhorderlisttable_table").bootstrapTable('refresh', queryParams);
}