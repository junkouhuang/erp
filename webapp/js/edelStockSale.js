$(function () {
    // 1.初始化Table
    table = $('#tempspstocks_table')
        .bootstrapTable(
            {
                method: 'POST',
                dataType: 'json',
                toolbar: "#exampleTableEventsToolbar",
                contentType: "application/x-www-form-urlencoded",
                cache: false,
                striped: true,// 是否显示行间隔色
                sidePagination: "server",// 分页方式：client客户端分页，server服务端分页（*）
                url: "",
                singleSelect: true, // 仅允许单选
                // search: true,
                showColumns: false,
                showRefresh: true,
                showFooter:true,
                pagination: false,
                detailView:true,
                detailFormatter: showPicture,
                queryParamsType: 'undefined',
                queryParams: queryParams,
                responseHandler: rspHandler,
                minimumCountColumns: 2,
                page: 1, // 初始化加载第一页，默认第一页
                pageSize: 10, // 每页的记录行数（*）
                pageList: [9, 10, 20, 50, 100], // 可供选择的每页的行数（*）
                idField: "id",
                // uniqueId: "id", //每一行的唯一标识，一般为主键列
                showExport: false,
                exportDataType: 'all',
                columns: [{
                    field: 'spcode',
                    title: '款号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    footerFormatter	: function (value) {
                        return "汇总：";
                    }
                }, {
                    field: 'spmc',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle',
                    sortable: true,
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += 1;
                        });
                        return total;
                    }
                }, {
                    field: 'cm',
                    title: '尺码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ys',
                    title: '颜色',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'createtime',
                    title: '建档时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sellprice',
                    title: '销售价',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.sellprice;
                        });
                        return total;
                    }
                }, {
                    field: 'costprice',
                    title: '采购单价',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter	: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.costprice;
                        });
                        return total;
                    }
                }, {
                    field: 'mxcode',
                    title: '吊牌条码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sl',
                    title: '库存数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter	: function (value) {
                        var totalSl = 0;
                        $.each(value, function (index, item) {
                            totalSl += item.sl;
                        });
                        return totalSl;
                    }
                }, {
                    field: 'kw',
                    title: '库位',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'cpmc',
                    title: '供货编码',
                    align: 'center',
                    valign: 'middle'
                }/*, {
                    field: 'kwsl',
                    title: '上架数量',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sl',
                    title: '理论库存数量',
                    align: 'center',
                    valign: 'middle'
                }*/]
            });
});
var table = null;

function queryParams(params) {
    var postdata = $('#tempspstocksForm').serializeJSON();
    postdata['pageSize'] = params.pageSize;
    postdata['page'] = params.pageNumber;
    postdata['sortname'] = params.sort; // 排序列名
    postdata['sortorder'] = params.order; // 排序方式
    return postdata;
}

// 得到查询的参数
function rspHandler(res) {
    if (res) {
        return {
            "rows": res,
            "total": res.size
        };
    } else {
        return {
            "rows": [],
            "total": 0
        };
    }
};

function LoadingDataListOrderRealItems() {
    //$("#tempspstocks_table").bootstrapTable('refresh', {"url": pageContext + "/spxxController/selectEdelSlaeListPage"});
    //$("#tempspstocks_table").bootstrapTable('refresh', {"url": pageContext + "/stockController/getBgStock"});
    $("#tempspstocks_table").bootstrapTable('refresh', {"url": pageContext + "/stockController/getBgStockAll"});
}

function printStoreReport() {
    var postdata = $('#tempspstocksForm').serializeJSON();
    //window.location.href=pageContext+"/reportController/exprotTempSpStocksExcel?spcode="+postdata.spcode+"&mxcode="+postdata.mxcode+"&spmc="+postdata.spmc;
    window.location.href=pageContext+"/reportController/exportBgStockExcel?spcode="+postdata.spcode+"&mxcode="+postdata.mxcode+"&spmc="+postdata.spmc;
}

//新增调货单
function addDL() {
    layer.open({
        type: 2,
        title: '新增调货单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['893px', '600px'],
        content: 'flgys-add'
    });
}

// 显示图片
var showPicture = function (index, row) {
    return contHtml(row.spid);
}

// 内容
var contHtml = function (spid){
    var arr = getPicUrl(spid);
    var cont = "<div style='width: 1125px;'>";


    if(arr == null || arr == undefined || arr.length == 0){
        return "<p style='font-size: 30px; margin-left: 450px;'>没有图片</p>";
    }

    $.each(arr, function(index, item){
        cont += "" +
            "<div style='float: left; width: 180px; height: 200px; margin: 20px;'>" +
            "<img style='border:3px solid black; width:180px; height: 200px;' " +
            "src='http://119.23.48.31/" + item.path + "'/>" +
            "</div>";
    });

    return cont += "</div>";
}

// 获取图片url
var getPicUrl = function(spid){
    var arr;
    $.ajax({
        url:pageContext + "/imageController/spImageBrowse",
        type:"GET",
        async:false,
        dataType:"json",
        data:{"spID":spid},
        success:function (req) {
            arr = req;
        }
    });
    return arr;
}
