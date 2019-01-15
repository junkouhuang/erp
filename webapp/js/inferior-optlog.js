//初始化bootstrap Table
var tradeid;
var whsid;
var mxcode;
var historycode;
$(function () {
    mxcode =getQueryString("mxcode");
    if(mxcode != 'null' && mxcode != '' && mxcode != undefined){
        $("#mxcode").val(mxcode);
    }
    historycode =getQueryString("historycode");
    if(historycode != 'null' && historycode != '' && historycode != undefined){
        $("#historycode").val(historycode);
    }
    whsid =getQueryString("whsid");
    tradeid =getQueryString("tradeid");
    loadTradeinfo();
    loadWhsinfo();
    loadInferiorOptTypeMap();
    loadStore();
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
})

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};

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
            url: pageContext + "/inferiorController/getInferiorOptLogPageList", //请求后台的url
            singleSelect: false, //仅允许单选
            showFooter: true,
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
                    title: '单号id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'inferiorSpmx.mxcode',
                    title: '条码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'inferiorSpmx.whsname',
                    title: '仓库',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'inferiorSpmx.tradename',
                    title: '品牌商',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'optname',
                    title: '操作人',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'opttype',
                    title: '操作类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 1) {
                            str = '已上架-入库';
                        } else if (value == 2) {
                            str = '未上架-入库';
                        } else if (value == 3) {
                            str = '退货区-入库';
                        } else if (value == 4) {
                            str = '发货-出库';
                        } else if (value == 5) {
                            str = '退货-出库';
                        } else if (value == 6) {
                            str = '报废-出库';
                        } else if (value == 7) {
                            str = '原始物料-入库';
                        }
                        return str;
                    },
                    footerFormatter: function (value) {
                        return '当前页操作总量';
                    }
                }, {
                    field: 'optsl',
                    title: '操作数量',
                    align: 'center',
                    valign: 'middle',
                    footerFormatter: function (value) {
                        var total = 0;
                        $.each(value, function (index, item) {
                            total += item.optsl;
                        });
                        return total;
                    }
                }, {
                    field: 'opttime',
                    title: '操作时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdcode',
                    title: '店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdmc',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'inferiorSpmx.historycode',
                    title: '历史编码',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'bz',
                    title: '备注',
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
    var postdata = $('#inferioroptlogForm').serializeJSON();
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

//执行一个laydate实例
laydate.render({
    elem: '#time',
    range: true
});


//执行一个laydate实例
laydate.render({
    elem: '#refundtime',
    range: true
});
//执行一个laydate实例
laydate.render({
    elem: '#jhprinttime',
    range: true
});

// 搜索
function search() {
    $("#table").bootstrapTable('refresh', queryParams);
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
                if(tradeid == data[i].id){
                    tradeContent += "<option selected value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }else{
                    tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
                }
            }
            $('#tradeid').append(tradeContent);
        }
    });
    $('#tradeid').combobox();
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
                if(whsid == data[i].id){
                    tradeContent += "<option selected value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
                }else{
                    tradeContent += "<option value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
                }
            }
            $('#whsid').append(tradeContent);
        }
    });
    $('#whsid').combobox();
}
function loadInferiorOptTypeMap() {
    $.ajax({
        url: pageContext + "/inferiorController/getInferiorOptTypeMap",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var opttypeContent = '<option value="" selected="selected">请选择操作类型</option>';
            for(var key in data){
                opttypeContent += "<option value='" + key+ "'>" +data[key] + "</option>";
            }
            $('#opttype').append(opttypeContent);
        }
    });
    $('#opttype').combobox();
}

function loadStore() {
    $.ajax({
        url: pageContext + "/storeController/getStoreList",
        type: "post",
        dataType: "json",
        async: false,
        cache: false,
        success: function (data) {
            var mdContent = '<option value="" selected="selected">请选择门店</option>';
            for (var i = 0; i < data.length; i++) {
                mdContent += "<option value='" + data[i].id + "' mdcode='" + data[i].mdcode + "'>" + data[i].mdcode + "_" + data[i].mdmc + "</option>";
            }
            $('#storeid').append(mdContent);
            $('#storeid').combobox();
        }
    });
}