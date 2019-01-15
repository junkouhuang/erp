var fhid = "";
//初始化bootstrap Table
$(function () {
    fhid = getQueryString("fhid");
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
    // 加载门店的下拉框
    loadStore();
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
            url: pageContext + "/wxOrderController/getWxOrderListPage", //请求后台的url
            singleSelect: false, //仅允许单选
            //search: true,
            showColumns: false, //是否显示所有的列
            showRefresh: false,//是否显示刷新按钮
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
            rowStyle: function (row, index) {
                var strclass = "";
                if (row.status == "-1") {
                    strclass = 'color-gold';
                }
                else if (row.status == "0") {
                    strclass = 'color-666';
                }
                else if (row.status == "1") {
                    strclass = 'color-blue';
                }
                else if (row.status == "2") {
                    strclass = 'color-333';
                }
                else if (row.status == "3") {
                    strclass = 'color-111';
                }
                else if (row.status == "4") {
                    strclass = 'color-777';
                }
                else {
                    strclass = '';
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
                    title: '单号id',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ordercode',
                    title: '订单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fhordercode',
                    title: '发货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdcode',
                    title: '门店编号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'mdmc',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'ordertype',
                    title: '订单类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '1')
                            return "不配货";
                        return "错误";
                    }
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "新增";
                        if (value == '3')
                            return "导入";
                        if (value == '4')
                            return "客服审核";
                        if (value == '5')
                            return "财务审核";
                        if (value == '6')
                            return "已生成发货单";
                        if (value == '9')
                            return "已撤单";
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
                        if (value == '5')
                            return "已支付";
                        return "错误";
                    }
                }, {
                    field: 'jhprint',
                    title: '拣货单打印状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value)
                            return "已打印";
                        else{
                            return "未打印";
                        }
                        return "错误";
                    }
                }, {
                    field: 'orderamount',
                    title: '金额',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
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
    var ordercode = $("#ordercode").val();
    // 获取门店名称
    var storeid = $("#store").val();
    // 获取状态
    var jhprint = $("#jhprint").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize, // 页面大小
        page: params.pageNumber, // 页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        ordercode: ordercode,
        storeid: storeid,
        jhprint: jhprint,
        fhid:fhid
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
function formData() {
    var selections = $('#table').bootstrapTable("getSelections");
    if(selections.length <= 0 ){
        layer.msg("请选择要打印的网络订单！！",function(){});
        return;
    }
    var idBuff = "";
    for(var i in selections){
        idBuff += selections[i].id +",";
    }
    return idBuff;
}