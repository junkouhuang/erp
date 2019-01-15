//初始化bootstrap Table
var mdContent;
$(function () {
    loadWhsinfo();
    loadTradeinfo();
    loadGysxx();
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
})
$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#table").bootstrapTable('refresh', queryParams);
        }
    });
});

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
            url: pageContext + "/cgReturnOrderController/getCgReturnOrderPageList", //请求后台的url
            singleSelect: true, //仅允许单选
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
            rowStyle: function (row, index) {
                //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
                var strclass = "";
                if(row.status == "1"){
                    strclass = 'btn-success';
                }else {
                    strclass = 'btn-warning';
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
                    title: '采购退货单号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'gysmc',
                    title: '供应商名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'whsname',
                    title: '仓库',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tradename',
                    title: '品牌商名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var str = '';
                        if (value == 0) {
                            str = '默认';
                        }else if(value == 1){
                            str = '扫描';
                        }
                        return str;
                    }

                }, {
                    field: 'adduname',
                    title: '新增者',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'returnsl',
                    title: '退款数量',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'returnamount',
                    title: '退款金额',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createtime',
                    title: '创建时间',
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
    var postdata = $('#cgreturnorderForm').serializeJSON();
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

// 搜索
function search() {
    $("#table").bootstrapTable('refresh', queryParams);
}

function addCgReturnOrder() {
    layer.open({
        type: 2,
        title: '新增采购退货单',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['375px', '500px'],
        content: "CgReturnOrder-add",
        btn: ['保存', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var gysid = posData["gysid"];
            var gysmc = posData["gysmc"];
            var whsid = posData["whsid"];
            var tradeid = posData["tradeid"];
            var ordercode = posData["ordercode"];
            if(gysid == "" || gysid == null || gysid == undefined){
                layer.msg("供应商信息不能为空！！",function(){});
                return;
            }
            if(gysmc == "" || gysmc == null || gysmc == undefined){
                layer.msg("供应商信息不能为空！！",function(){});
                return;
            }
            if(whsid == "" || whsid == null || whsid == undefined){
                layer.msg("仓库不能为空！！",function(){});
                return;
            }
            if(tradeid == "" || tradeid == null || tradeid == undefined){
                layer.msg("品牌商不能为空！！",function(){});
                return;
            }
            if(ordercode == "" || ordercode == null || ordercode == undefined){
                layer.msg("退货单号不能为空！！",function(){});
                return;
            }
            $.ajax({
                url: pageContext + "/cgReturnOrderController/addCgReturnOrderInfo",
                data:JSON.stringify(posData),
                contentType:'application/json;charset=utf-8',
                type: "POST",
                dataType: "json",
                async: false,
                success: function (data) {
                    if(data.success){
                        search();
                        layer.close(index);
                    }else{
                        layer.alert(data.msg);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
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
                tradeContent += "<option value='" + data[i].id + "' whscode='" + data[i].whscode + "'>" + data[i].whscode + "_" + data[i].whsbz + "</option>";
            }
            $('#whsid').append(tradeContent);
        }
    });
    $('#whsid').combobox();
}


function loadGysxx() {
    $.ajax({
        url: pageContext + "/gysxxController/getGysxxList",
        dataType: "json",
        async: true,
        type: "POST",   //请求方式
        success: function (data) {
            var content = "";
            content += "<option></option>";
            for (var i = 0; i < data.length; i++) {
                content += "<option value=" + data[i].id + ">" + data[i].gysmc + "</option>";
            }
            $("#gysid").append(content);
            $('#gysid').combobox();
        }, error: function () {
        }
    });
}