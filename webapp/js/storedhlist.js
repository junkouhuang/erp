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
    // 1.初始化Table
    table = $('#dhtable')
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
                singleSelect: false, // 仅允许单选
                // search: true,
                showColumns: false,
                showRefresh: false,
                pagination: true,
                queryParamsType: 'undefined',
                queryParams: queryParams,
                responseHandler: rspHandler,
                clickToSelect: true,
                minimumCountColumns: 2,
                pageNumber: 1, // 初始化加载第一页，默认第一页
                pageSize: 10, // 每页的记录行数（*）
                pageList: [10, 20, 50, 100], // 可供选择的每页的行数（*）
                idField: "id",
                // uniqueId: "id", //每一行的唯一标识，一般为主键列
                showExport: true,
                exportDataType: 'all',
                columns: [{
                    checkbox: true
                }, {
                    field: 'id',
                    title: 'ID',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'ordercode',
                    title: '单号',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'fstorecode',
                    title: '调出店号',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fstorename',
                    title: '调出店名',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }, {
                    field: 'tstorecode',
                    title: '调入门店',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tstorename',
                    title: '调入店名',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'tmdlx',
                    title: '调入店类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0') {
                           return "加盟店";
                        } else if(value == '3'){
                            return "直营店";
                        }
                        return "未知";
                    }
                }, {
                    field: 'fmdlx',
                    title: '调出店类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0') {
                            return "加盟店";
                        } else if(value == '3'){
                            return "直营店";
                        }
                        return "未知";
                    }
                }, {
                    field: 'createtime',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'submittime',
                    title: '提交时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'confirmtime',
                    title: '确认时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'fhtime',
                    title: '发货时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'shtime',
                    title: '收货时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'status',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == '0')
                            return "新建";
                        if (value == '1')
                            return "提交";
                        if (value == '2')
                            return "确认";
                        if (value == '3')
                            return "发货";
                        if (value == '4')
                            return "收货";
                        return "错误";
                    }
                }, {
                    field: 'bz',
                    title: '备注',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'createaudit',
                    title: '客服审核',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == true){
                            return "是";
                        }else{
                            return "否";
                        }
                    }
                }, {
                    field: 'createaudittime',
                    title: '客服审核时间',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'finance',
                    title: '财务审核',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == true){
                            return "是";
                        }else{
                            return "否";
                        }
                    }
                }, {
                    field: 'financetime',
                    title: '财务审核时间',
                    align: 'center',
                    valign: 'middle'
                }]
            });

    $('#dhprint')
        .click(
            function () {
                var selectContent = table
                    .bootstrapTable('getSelections')[0];
                if (typeof (selectContent) == 'undefined') {
                    swal({
                        title: "警告",
                        text: "未选择任何调货单，请谨慎操作！",
                        type: "warning",
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "确认",
                        closeOnConfirm: false
                    });
                } else {
                    var index = parent.layer
                        .open({
                            type: 2,
                            content: "${pageContext.request.contextPath}/storedh/printStoreReport?dhid="
                            + selectContent.id,
                            area: ['300px', '195px'],
                            maxmin: true
                        });
                    parent.layer.full(index);

                }
            });

    laydate.render({
        elem: '#time',
        range: true
    });

});
var table = null;

function queryParams(params) {
    var storelxObj = document.getElementsByName('storelx');
    var storelx = '';
    for (var i = 0; i < storelxObj.length; i++) {
        if (storelxObj[i].checked) {
            storelx += storelxObj[i].value + ',';
        }
    }
    var storeid = $("#storeid").val();
    var time = $("#time").val();
    var temp = { // 这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        pageNumber: params.pageNumber, //页码
        storelxBuff: storelx,
        time: time,
        storeid: storeid
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

function LoadingDataListOrderRealItems() {
    $("#dhtable").bootstrapTable('refresh', {"url": pageContext + "/storedhController/getStoredhList"});
}

function printStoreReport() {
    var obj = $('#dhtable').bootstrapTable('getSelections')[0];
    if (obj != null && obj != '') {
        layer.open({
            type: 2,
            title: '打印调货清单',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['893px', '600px'],
            content: pageContext + "/storedhController/printStoreReport?dhid=" + obj.id
        });
    } else {
        layer.msg("请选择需要打印预览的调货单！！", function () {
        });
    }
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


// 客服审核
function createAudit(){
    //获取当前表格
    var thisTable = $('#dhtable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中调货单");
        return false;
    }
    // 判断是否能进行客服审核
    if(2 != thisTable.status){
        layer.msg("只有确认状态下的才能客服审核");
        return false;
    }
    // 判断是否已经客服审核
    if(1 == thisTable.createaudit){
        layer.msg("已经客服审核");
        return false;
    }

    // 获取门店退货单id
    var id = thisTable.id;

    // 打财务审核窗口
    layer.open({
        type: 2,
        title: '客服审核',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['800px', '580px'],
        content: "storedhAudit?id="+id
    });
}


// 财务审核
function financeAudit(){
    //获取当前表格
    var thisTable = $('#dhtable').bootstrapTable("getSelections")[0];
    //判断是否选中表格某项
    if(thisTable == null || thisTable == '' || thisTable == undefined){
        layer.msg("请选中调货单");
        return false;
    }
    // 判断是否能进行财务审核
    if(1 != thisTable.createaudit){
        layer.msg("客服审核后才能财务审核");
        return false;
    }
    // 判断是否已经财务审核
    if(1 == thisTable.finance){
        layer.msg("已经财务审核");
        return false;
    }

    // 获取门店退货单id
    var id = thisTable.id;

    // 打财务审核窗口
    layer.open({
        type: 2,
        title: '财务审核',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['800px', '580px'],
        content: "storedhFinance?id="+id
    });
}


// 导出Excel表格
var exportExcel = function () {
    //获取当前表格
    var selections = $('#dhtable').bootstrapTable("getSelections");
    //判断是否选中表格某项
    if(selections.length < 1){
        layer.msg("请至少选中一条调货单进行该操作！");
        return false;
    }
    var idbuf = "";
    for(var i in selections){
        idbuf += selections[i].id + "-";
    }
    window.location.href= pageContext + "/reportController/exportStoreDHExcelByidList/" + idbuf
}