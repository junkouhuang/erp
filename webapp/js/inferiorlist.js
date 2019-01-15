//初始化bootstrap Table
var mdContent;
$(function () {
    loadTradeinfo();
    loadWhsinfo();
    loadGysxx();
    //初始化Table
    var oTable = new TableInit();
    oTable.Init();
})


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
            url: pageContext + "/inferiorController/getInferiorSpmxPageList", //请求后台的url
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
                    field: 'spmc',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tradename',
                    title: '品牌商',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'whsname',
                    title: '仓库',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'sl',
                    title: '库存',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'gysmc',
                    title: '供应商名称',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'historycode',
                    title: '历史采购编码',
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
    var postdata = $('#inferiorlistForm').serializeJSON();
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
                tradeContent += "<option value='" + data[i].id + "' tradecode='" + data[i].tradecode + "'>" + data[i].tradecode + "_" + data[i].tradename + "</option>";
            }
            $('#traderid').append(tradeContent);
        }
    });
    $('#traderid').combobox();
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
 * @Description新增次品条目
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-06-25 11:58
 **/
function addInferior() {
    layer.open({
        type: 2,
        title: '次品入库界面',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['375px', '600px'],
        content: "inferior-add",
        btn: ['保存', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var mxcode = posData["mxcode"];
            var sl = posData["sl"];
            var opttype = posData["opttype"];
            var whsid = posData["whsid"];
            var tradeid = posData["tradeid"];
            var kwcode = posData["kwcode"];
            var historycode = posData["historycode"];
            if(opttype == "" || opttype == null || opttype == undefined){
                layer.msg("操作类型不能为空！！",function(){});return;
            }
            if(opttype != 7 && (mxcode == "" || mxcode == null || mxcode == undefined)){
                layer.msg("条码不能为空！！",function(){});return;
            }else if(opttype == 7 && (historycode == "" || historycode == null || historycode == undefined)){
                layer.msg("历史采购编码不能为空！！",function(){});return;
            }
            if(sl == "" || sl == null || sl == undefined){
                layer.msg("数量不能为空！！",function(){});return;
            }
            if(whsid == "" || whsid == null || whsid == undefined){
                layer.msg("仓库不能为空！！",function(){});return;
            }
            if(tradeid == "" || tradeid == null || tradeid == undefined){
                layer.msg("品牌商不能为空！！",function(){});return;
            }
            if(opttype == 1 && (kwcode == "" || kwcode == null || kwcode == undefined)){
                layer.msg("已上架-入库，库位必填！！",function(){});return;
            }
            $.ajax({
                url: pageContext + "/inferiorController/addInferiorSpmxInfo",
                data:JSON.stringify(posData),
                contentType:'application/json;charset=utf-8',
                type: "post",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if(data.success){
                        search();
                        layer.close(index);
                    }else{
                        layer.msg(data.msg);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}
/**
 * @Description次品操作日志
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-06-25 16:42
 **/
function inferiorOptLog() {
    var mxcode = "";
    var tradeid = "";
    var whsid = "";
    var historycode = "";
    var rows = $("#table").bootstrapTable("getSelections");
    if(rows.length > 1){
        layer.msg("请选择一条次品记录进行操作日志查看！！",function(){});
        return;
    }else if(rows.length == 1){
        mxcode = rows[0].mxcode;
        tradeid = rows[0].tradeid;
        whsid = rows[0].whsid;
        historycode = rows[0].historycode;
    }
    layer.open({
        type: 2,
        title: '次品操作日志',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: "inferior-optlog?mxcode="+mxcode+"&whsid="+whsid+"&tradeid="+tradeid+"&historycode="+historycode,
        btn: ['取消'], //可以无限个按钮
        yes: function (index, layero) {
            layer.close(index);
        }, error: function (index) {
            layer.close(index);
        }
    });
}

//次品退货
function inferiorReturn() {
    layer.open({
        type: 2,
        title: '次品退货操作界面',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: "inferior-return-opt",
        btn: ['确认','取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var rows = posData["rows"];
            var list = new Array();
            var ordercode = posData["ordercode"];
            if(ordercode == "" || ordercode == undefined || ordercode == null){
                layer.msg("采购退货单单号不能为空！！",function(){});
                return;
            }
            if(rows.length <= 0){
                layer.msg("已选数据列表不能为空！！",function(){});
                return;
            }
            for(var i in rows){
                if(rows[i].maxsl < rows[i].sl){
                    layer.msg("已选数据，条码："+rows[i].mxcode+"，退货数量超过限量！！",function(){});
                    return;
                }
                if(rows[i].sl < 1){
                    layer.msg("已选数据，条码："+rows[i].mxcode+"，退货数量至少为1 ！！",function(){});
                    return;
                }
                list.push({"mxcode":rows[i].mxcode,"sl":rows[i].sl});
            }
            $.ajax({
                url: pageContext + "/cgReturnOrderController/addCgReturnDetailByOrderCode/"+ordercode,
                data:JSON.stringify(list),
                contentType:'application/json;charset=utf-8',
                type: "post",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if(data.success){
                        search();
                    }
                    layer.alert(data.msg);
                    layer.close(index);
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
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

//次品报废
function inferiorBf() {
    layer.open({
        type: 2,
        title: '次品报废操作界面',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: "inferior-bf",
        btn: ['确认','取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var rows = posData["rows"];
            var list = new Array();
            var spbfdancode = posData["spbfdancode"];
            if(spbfdancode == "" || spbfdancode == undefined || spbfdancode == null){
                layer.msg("报废单单号不能为空！！",function(){});
                return;
            }
            if(rows.length <= 0){
                layer.msg("已选数据列表不能为空！！",function(){});
                return;
            }
            for(var i in rows){
                if(rows[i].maxsl < rows[i].sl){
                    layer.msg("已选数据，条码："+rows[i].mxcode+"，退货数量超过限量！！",function(){});
                    return;
                }
                if(rows[i].sl < 1){
                    layer.msg("已选数据，条码："+rows[i].mxcode+"，退货数量至少为1 ！！",function(){});
                    return;
                }
                list.push({"mxcode":rows[i].mxcode,"qty":rows[i].sl});
            }
            $.ajax({
                url: pageContext + "/spBFDanController/saveSpbfScanInfo/"+spbfdancode,
                data:JSON.stringify(list),
                contentType:'application/json;charset=utf-8',
                type: "post",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if(data.success){
                        search();
                        layer.close(index);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}