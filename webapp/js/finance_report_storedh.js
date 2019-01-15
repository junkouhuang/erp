$(function () {
    var oTable = new TableInit();
    oTable.Init();

    loadStore();
});

var TableInit = function () {
    var oTableInit = new Object();
    oTableInit.Init = function () {
        //1.初始化Table
        $('#table').bootstrapTable({  //表格ID
            method: 'GET',
            dataType: 'json',
            toolbar: "#exampleTableEventsToolbar",
            contentType: "application/x-www-form-urlencoded",
            cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            striped: true,//是否显示行间隔色
            sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
            url: "", //请求后台的url
            singleSelect: true, //仅允许单选
            //search: true,
            showFooter:true,
            showColumns: false, //是否显示所有的列
            showRefresh: false,//是否显示刷新按钮
            pagination: true,//是否显示分页（*）
            queryParamsType: 'undefined',
            queryParams: queryParams,
            responseHandler: rspHandler,
            minimumCountColumns: 2,//最少允许的列数
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数（*）
            pageList: [10, 20, 50, 100],        //可供选择的每页的行数（*）
            idField: "id",
            //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showExport: true,
            exportDataType: 'all',
            columns: [
                //动态创建列名
                {
                    field: 'createtime',
                    title: '调货时间',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        return '当前页统计';
                    }
                }, {
                    field: 'ordercode',
                    title: '调货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fcwcode',
                    title: '调出财务编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fstorecode',
                    title: '调出店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tstorecode',
                    title: '调入店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fmdlx',
                    title: '调出店铺类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0') {
                            return '加盟店';
                        } else {
                            return '直营店';
                        }
                    }
                }, {
                    field: 'fstorename',
                    title: '调出店名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tstorename',
                    title: '调入店名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spcode',
                    title: '款号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mxcode',
                    title: '条码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'itemno',
                    title: '自编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'spmc',
                    title: '品名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'price',
                    title: '吊牌价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'hagTagAmount',
                    title: '吊牌金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.hagTagAmount;
                        });
                        return total;
                    }
                }, {
                    field: 'fhje',
                    title: '调货金额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.fhje;
                        });
                        return total;
                    }
                }, {
                    field: 'fhsl',
                    title: '调出数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.fhsl;
                        });
                        return total;
                    }
                }, {
                    field: 'costprice',
                    title: '成本价',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'costTotalPrice',
                    title: '成本总额',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.costTotalPrice;
                        });
                        return total;
                    }
                }]
        });

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

//执行一个laydate实例
laydate.render({
    elem: '#time',
    range: true
});

function queryParams(params) {
    var time = $("#time").val();
    var fstoreid = $("#fstoreid").val();
    var tstoreid = $("#tstoreid").val();
    if (time == "") {
        startTime = "";
        endTime = "";
    } else {
        var timeArray = time.split(" - ");
        startTime = timeArray[0];
        endTime = timeArray[1];
    }
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小  
        pageNumber: params.pageNumber, //页码  
        startTime: startTime,
        endTime: endTime,
        tstoreid: tstoreid,
        fstoreid: fstoreid
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

function search() {
    $("#table").bootstrapTable('refresh', {url: pageContext + "/financeReportController/getStoredhList"});
}

function exportExcel() {
    var time = $("#time").val();
    var fstoreid = $("#fstoreid").val();
    var tstoreid = $("#tstoreid").val();
    if ((time == "")
        && (fstoreid == null || fstoreid == undefined || fstoreid == "")
        && (tstoreid == null || tstoreid == undefined || tstoreid == "")) {
        layer.msg("请选择查询条件！！",function(){});
        return;
    }
    var startTime ="";
    var endTime ="";
    if (time != "") {
        var timeArray = time.split(" - ");
        startTime = timeArray[0];
        endTime = timeArray[1];
    }
    window.location.href = "financeReportController/exportStoredhExcel?fstoreid=" + fstoreid
        + "&tstoreid=" + tstoreid
        + "&startTime=" + startTime
        + "&endTime=" + endTime;
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
            $('#tstoreid').append(mdContent);
            $('#fstoreid').append(mdContent);
        }
    });
    $('#tstoreid').combobox();
    $('#fstoreid').combobox();
}