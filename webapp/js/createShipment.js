var ordercodeBuf = '';
var fhid;
//初始化bootstrap Table
$(function () {
    loadTradeinfo();
    //1.初始化Table
    table = $('#tbody').bootstrapTable({  //表格ID
        method: 'POST',//请求方式（*）
        dataType: 'json',//获取的数据类型
        toolbar: "#exampleTableEventsToolbar",
        contentType: "application/x-www-form-urlencoded",
        cache: false,// //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        striped: false,//是否显示行间隔色
        sidePagination: "server",//分页方式：client客户端分页，server服务端分页（*）
        url: pageContext + "/fhOrdersController/getFhorderListPageInfo", //请求后台的url
        singleSelect: false, //仅允许单选
        //search: true,
        showColumns: true, //是否显示所有的列
        showRefresh: true,//是否显示刷新按钮
        pagination: true,//是否显示分页（*）
        queryParamsType: 'undefined',
        queryParams: queryParams,//传递参数（*）
        responseHandler: rspHandler,
        smartDisplay: true,
        showToggle: true,
        clickToSelect: true,
        showFooter: true,
        minimumCountColumns: 2,//最少允许的列数$("input[type='checkbox']").is(':checked')
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 100, 500, 1000],        //可供选择的每页的行数（*）
        idField: "id",
        //uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showExport: true,
        //exportDataType: 'all',
        rowStyle: function (row, index) {
            //这里有5个取值代表5中颜色['active', 'success', 'info', 'warning', 'danger'];   if (value == '0') {
            var strclass = "";
            if (row.status == "0") {
                strclass = 'btn-warning';//还有一个active
            }
            else if (row.status == "1") {
                strclass = 'btn-success';
            }
            else if (row.status == "2") {
                strclass = 'btn-primary';
            }
            else if (row.status == "3") {
                strclass = 'btn-danger';
            }
            else if (row.status == "4") {
                strclass = 'btn-info';
            }
            else if (row.status == "5") {
                strclass = 'btn-MediumPurple';
            }
            else {
                strclass = 'btn-danger';
            }
            return {classes: strclass}
        },
        columns: [
            {
                checkbox: true
            }, //动态创建列名
            {
                field: 'ordercode',
                title: '发货单号',
                align: 'center',
                valign: 'middle',
                footerFormatter: function (value) {
                    return '当前页统计';
                }
            }, {
                field: 'bz',
                title: '备注',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'wlgs',
                title: '物流公司',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'fhbatchno',
                title: '发货批号',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'batchcode',
                title: '批次号',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'fhtotal',
                title: '发货数量',
                align: 'center',
                valign: 'middle',
                sortable: true,
                footerFormatter: function (value) {
                    var total = 0;
                    $.each(value, function (index, item) {
                        total += item.fhtotal;
                    });
                    return total;
                }
            },
            {
                field: 'fhje',
                title: '金额',
                align: 'center',
                valign: 'middle',
                sortable: true,
                footerFormatter: function (value) {
                    var amount = 0;
                    $.each(value, function (index, item) {
                        amount += item.fhje;
                    });
                    return amount;
                }
            },
            {
                field: 'fhrateje',
                title: '折后金额',
                align: 'center',
                valign: 'middle',
                sortable: true,
                footerFormatter: function (value) {
                    var amount = 0;
                    $.each(value, function (index, item) {
                        amount += item.fhrateje;
                    });
                    return amount;
                }
            },
            {
                field: 'mdcode',
                title: '店号',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'tradename',
                title: '品牌商',
                align: 'center',
                valign: 'middle',
                sortable: true
            },
            {
                field: 'owntradername',
                title: '货主品牌商',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'whsname',
                title: '仓库',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'sourcetype',
                title: '发货单来源',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '2') {
                        return "网络订单";
                    } else if (value == '3') {
                        return "退货";
                    } else if (value == '4') {
                        return "新品未上架";
                    } else if (value == '5') {
                        return "新品可挑上架";
                    } else if (value == '6') {
                        return "特殊类型";
                    }
                    return str;
                }
            }, {
                field: 'wxversion',
                title: '新版本',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'wxjhprint',
                title: '网络拣货打印',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value) {
                        str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'store.cwcode',
                title: '财务编码',
                align: 'center',
                valign: 'middle'
            },
            {
                field: 'mdmc',
                title: '店名',
                align: 'center',
                valign: 'middle',
                sortable: true
            }, {
                field: 'createtime',
                title: '制单时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'status',
                title: '单据状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == '0') {
                        return '待处理';
                    } else if (value == '1') {
                        return '打印分拣';
                    } else if (value == '2') {
                        return '财务审核';
                    } else if (value == '3') {
                        return '物流发货';
                    } else if (value == '4') {
                        return '门店收货';
                    } else if (value == '5') {
                        return '总部撤单';
                    } else {
                        return '错误';
                    }
                }
            }, {
                field: 'printstatus',
                title: '打印状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == '1') {
                        return '已打印';
                    } else {
                        return '未打印';
                    }
                }
            }, {
                field: 'hasgoods',
                title: '拣货状态',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    if (value == '1') {
                        return '<label class="btn-danger p31">已拣货</label>';
                    } else {
                        return '待拣货';
                    }
                }
            }, {
                field: 'docaudit',
                title: '文件组审核',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-primary"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'docaudittime',
                title: '文件组审核时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cusaudit',
                title: '催款确认',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-danger"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'cusaudittime',
                title: '催款确认时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'cusbind',
                title: '批号绑定',
                align: 'center',
                valign: 'middle',
                formatter: function (value, row, index) {
                    var str = '';
                    if (value == '1') {
                        str = '<div class="checkbox checkbox-warning"><input type="checkbox"  class="styled" checked><label></label></div>';
                    } else {
                        str = '<div class="checkbox"><input type="checkbox" class="styled"><label></label></div>';
                    }
                    return str;
                }
            }, {
                field: 'cusbindtime',
                title: '批号绑定时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'audittime',
                title: '财务审核时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'printtime',
                title: '打印时间',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'store.gdy',
                title: '客服',
                align: 'center',
                valign: 'middle'
            }, {
                field: 'wldh',
                title: '物流单号',
                align: 'center',
                valign: 'middle'
            }],
        onClickRow: function (row, $element) {
            fhid = row.id;
        },
        onCheck: function (row, $element) {
            fhid = row.id;
        }
    });
    $('#dhprint').click(function () { //打印机事件
        var selectContent = table.bootstrapTable('getSelections')[0];
        if (typeof(selectContent) == 'undefined') {
            swal({
                title: "警告",
                text: "未选择任何调货单，请谨慎操作！",
                type: "warning",
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "确认",
                closeOnConfirm: false
            });
        } else {
            var index = parent.layer.open({
                type: 2,
                shade: [0.8, '#393D49'],
                content: pageContext + "/storedh/printStoreReport?dhid=" + selectContent.id,
                area: ['300px', '195px'],
                maxmin: true
            });
            parent.layer.full(index);
        }
    });
});
var table = null;
var zdstatrtTime = $("#zdstatrtTime").val();
var zdendTime = $("#zdendTime").val();
var auditstartTime = $("#auditstartTime").val();
var auditendTime = $("#auditendTime").val();
var printstartTime = $("#printstartTime").val();
var printendTime = $("#printendTime").val();

function queryParams(params) {
    var status = '';
    var statusobj = document.getElementById("status");
    for (i = 0; i < statusobj.length; i++) {//下拉框的长度就是它的选项数.
        if (statusobj[i].selected == true) {
            status = statusobj[i].value;//获取当前选择项的值 .
        }
    }
    var hasgoods = '';
    var hasgoodsobj = document.getElementById("hasgoods");
    for (i = 0; i < hasgoodsobj.length; i++) {//下拉框的长度就是它的选项数.
        if (hasgoodsobj[i].selected == true) {
            hasgoods = hasgoodsobj[i].value;//获取当前选择项的值 .
        }
    }

    var printstatus = '';
    var printstatusobj = document.getElementById("printstatus");
    for (i = 0; i < printstatusobj.length; i++) {//下拉框的长度就是它的选项数.
        if (printstatusobj[i].selected == true) {
            printstatus = printstatusobj[i].value;//获取当前选择项的值 .
        }
    }
    var docaudit = '';
    var docauditobj = document.getElementById("docaudit");
    for (i = 0; i < docauditobj.length; i++) {//下拉框的长度就是它的选项数.
        if (docauditobj[i].selected == true) {
            docaudit = docauditobj[i].value;//获取当前选择项的值 .
        }
    }
    var cusaudit = '';
    var cusauditobj = document.getElementById("cusaudit");
    for (i = 0; i < cusauditobj.length; i++) {//下拉框的长度就是它的选项数.
        if (cusauditobj[i].selected == true) {
            cusaudit = cusauditobj[i].value;//获取当前选择项的值 .
        }
    }
    var cusbind = '';
    var cusbindobj = document.getElementById("cusbind");
    for (i = 0; i < cusbindobj.length; i++) {//下拉框的长度就是它的选项数.
        if (cusbindobj[i].selected == true) {
            cusbind = cusbindobj[i].value;//获取当前选择项的值 .
        }
    }

    var mdmc = $("#mdmc").val();
    var mdcode = $("#mdcode").val();
    var ordercode = $("#ordercode").val();
    var fhbatchno = $("#fhbatchno").val();
    var batchcode = $("#batchcode").val();
    var sourcetype = $("#sourcetype option:selected").val();
    var wxjhprint = $("#wxjhprint option:selected").val();
    var bz = $("#bz").val();
    var whsid = $("#whsid").val();
    var traderid = $("#traderid").val();
    var angle = $("#angle").val();
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize: params.pageSize,   //页面大小
        page: params.pageNumber, //页码
        sortName: params.sort,  //排序列名
        sortOrder: params.order, //排序方式
        zdstatrtTime: zdstatrtTime,
        zdendTime: zdendTime,
        auditstartTime: auditstartTime,
        auditendTime: auditendTime,
        printstartTime: printstartTime,
        printendTime: printendTime,
        mdmc: mdmc,
        mdcode: mdcode,
        ordercode: ordercode,
        fhbatchno: fhbatchno,
        status: status,
        hasgoods: hasgoods,
        printstatus: printstatus,
        ordercodeBuf: ordercodeBuf,
        docaudit: docaudit,
        cusaudit: cusaudit,
        cusbind: cusbind,
        sourcetype: sourcetype,
        wxjhprint: wxjhprint,
        batchcode: batchcode,
        bz: bz,
        whsid: whsid,
        fhtradeid: traderid,
        angle: angle
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
    elem: '#zdstatrtTime',
    type: 'datetime',
    done: function (value, date, endDate) {
        zdstatrtTime = value;
        $("#tbody").bootstrapTable('refresh', queryParams);
    }
});
laydate.render({
    elem: '#zdendTime',
    type: 'datetime',
    done: function (value, date, endDate) {
        zdendTime = value;
        $("#tbody").bootstrapTable('refresh', queryParams);
    }
});
laydate.render({
    elem: '#auditstartTime',
    type: 'datetime',
    done: function (value, date, endDate) {
        auditstartTime = value;
        $("#tbody").bootstrapTable('refresh', queryParams);
    }
});
laydate.render({
    elem: '#auditendTime',
    type: 'datetime',
    done: function (value, date, endDate) {
        auditendTime = value;
        $("#tbody").bootstrapTable('refresh', queryParams);
    }
});
laydate.render({
    elem: '#printendTime',
    type: 'datetime',
    done: function (value, date, endDate) {
        printendTime = value;
        $("#tbody").bootstrapTable('refresh', queryParams);
    }
});
laydate.render({
    elem: '#printstartTime',
    type: 'datetime',
    done: function (value, date, endDate) {
        printstartTime = value;
        $("#tbody").bootstrapTable('refresh', queryParams);
    }
});

//查看发货单明细
function showfhmx() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        layer.open({
            type: 2,
            title: '查看',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['700px', '450px'], //宽高
            content: pageContext + "/fhOrdersController/showfhmx?fhid=" + obj.id,
            btn: ['修改', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow.formData();
                posData["id"] = obj.id;
                //发送修改请求
                $.ajax({
                    url: pageContext + "/fhOrdersController/showfhmx",
                    data: posData,
                    dataType: "json",
                    async: true,
                    type: "POST",   //请求方式
                    success: function (data) {
                        if (data.success) {
                            layer.close(index);
                            $('#tbody').bootstrapTable('refresh', queryParams);
                        } else {
                            layer.msg(data.msg);
                        }

                    }, error: function () {
                    }
                });
                //按钮【修改】的回调
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
            , cancel: function () {
                //return false; //开启该代码可禁止点击该按钮关闭
            }
        });
    } else {
        layer.msg("请选择一条需要查看明细的发货单！！", function () {
        });
        return;
    }
}

//修改发货单收货信息
function edtfhinfo() {
    var idBuff = "";
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length > 0) {
        for (var k = 0, length = rows.length; k < length; k++) {
            if (rows[0].mdcode != rows[k].mdcode) {
                layer.msg("发货门店不一致！！", function () {
                });
                return;
            }
            idBuff += rows[k].id + ",";
        }
        layer.open({
            type: 2,
            title: '修改',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['800px', '605px'], //宽高
            content: pageContext + "/fhOrdersController/toFhShinfo?fhidArr=" + idBuff,
            btn: ['修改', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow.formData();
                posData["idBuff"] = idBuff;
                //发送修改请求
                $.ajax({
                    url: pageContext + "/fhOrdersController/edtFhShinfo",
                    data: posData,
                    dataType: "json",
                    async: true,
                    type: "POST",   //请求方式
                    success: function (data) {
                        if (data.success) {
                            layer.close(index);
                            $('#tbody').bootstrapTable('refresh', queryParams);
                        } else {
                            layer.msg(data.msg);
                        }

                    }, error: function () {
                    }
                });
                //按钮【修改】的回调
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
            , cancel: function () {
                //return false; //开启该代码可禁止点击该按钮关闭
            }
        });
    } else {
        layer.msg("请至少选择一条需要修改收货信息的发货单！！", function () {
        });
        return;
    }
}

//发货单打印（首批货）
function printFhOrderReport() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        if (obj.status < 2) {
            layer.msg("财务审核过后才能打印首批货！！", function () {
            });
            return;
        }
        layer.open({
            type: 2,
            title: '打印发货单(首批货)',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['100%', '100%'],
            btn: ["确认打印", "取消"],
            content: pageContext + "/fhOrdersController/printfhorder?id=" + obj.id,
            yes: function (index, layero) {
                $(function () {
                    $.ajax({
                        url: pageContext + "/fhOrdersController/printConfirm",
                        data: {"idArr": obj.id},
                        dataType: "json",
                        async: true,
                        type: "POST",   //请求方式
                        success: function (data) {
                            alert(data.msg);
                        }, error: function () {
                            layer.close(index);
                        }
                    });
                });
                layer.close(index);
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
        });
    } else {
        layer.msg("请选择一条需要确认打印的发货单！！", function () {
        });
        return;
    }
}

//发货单打印（基本）
function printFhOrderReportBase() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        if (obj.status < 2) {
            layer.msg("财务审核过后才能打印发货单！！", function () {
            });
            return;
        }
        layer.open({
            type: 2,
            title: '打印发货单',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            anim: 3,
            area: ['100%', '100%'],
            content: pageContext + "/fhOrdersController/printfhorderbase?id=" + obj.id
        });
    } else {
        layer.msg("请选择一条需要确认打印的发货单！！", function () {
        });
        return;
    }
}

//发货单打印确认
function printConfirm() {
    var idArr = '';
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null) {
        for (var k = 0, length = rows.length; k < length; k++) {
            if (rows[k].printstatus == 1) {
                layer.msg("存在已经确认过的发货单！！", function () {
                });
                return;
            } else if (rows[k].status < 2) {
                layer.msg("财务审核过后才能进行打印确认操作！！", function () {
                });
                return;
            }
            idArr += rows[k].id + ",";
        }
        layer.confirm('确定修改？',
            {btn: ['确认', '取消']},
            function (index) {
                $(function () {
                    $.ajax({
                        url: pageContext + "/fhOrdersController/printConfirm",
                        data: {"idArr": idArr},
                        dataType: "json",
                        async: true,
                        type: "POST",   //请求方式
                        success: function (data) {
                            alert(data.msg);
                            layer.close(index);
                            if (data.success) {
                                $('#tbody').bootstrapTable('refresh', queryParams);
                            }
                        }, error: function () {
                            layer.close(index);
                        }
                    });
                });
            }
        );
    } else {
        layer.msg("请至少选择一条需要确认打印的发货单！！", function () {
        });
        return;
    }
}

function LoadingFhordersList() {
    ordercodeBuf = '';
    $("#tbody").bootstrapTable('refresh', queryParams);
}

$(function () {
    $(document).keydown(function (e) {
        // 回车键事件
        if (e.which == 13) {
            $("#tbody").bootstrapTable('refresh', queryParams);
        }
    });
    $("#ordercode,#mdmc,#fhbatchno,#mdcode").keydown(function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            $("#tbody").bootstrapTable('refresh', queryParams);
        }
    });
    $("#status,#hasgoods,#docaudit,#cusaudit,#cusbind,#printstatus,#sourcetype,#wxjhprint").change(function () {
        $("#tbody").bootstrapTable('refresh', queryParams);
    });
});

//包装明细
function packingDetail() {
    var row = $('#tbody').bootstrapTable('getSelections')[0];
    layer.open({
        type: 2,
        title: "包装明细",
        shade: [0.8, '#393D49'], //遮罩层
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],//显示弹出框的宽高
        content: "packingDetail?fhid=" + fhid + "&ordercode=" + row.ordercode,
    });
}

//拣货单打印预览
function printPicking() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        /*  if (obj.status >= 2) {
              layer.msg("打印拣货单只能在财务审核之前！！", function () {});
              return;
          }*/
        if (obj.status >= 1) {
            layer.open({
                type: 2,
                title: '打印拣货单',
                shade: [0.8, '#393D49'],
                maxmin: true, //开启最大化最小化按钮
                anim: 3,
                area: ['100%', '100%'],
                content: pageContext + "/fhOrdersController/printPicking?id=" + obj.id
            });
        } else {
            layer.confirm('确定要打印拣货单？此操作将会修改打印状态..', {btn: ['确认', '取消']},
                function (index) {
                    layer.open({
                        type: 2,
                        title: '打印拣货单',
                        shade: [0.8, '#393D49'],
                        maxmin: true, //开启最大化最小化按钮
                        anim: 3,
                        area: ['100%', '100%'],
                        content: pageContext + "/fhOrdersController/printPicking?id=" + obj.id
                    });
                }
            );
        }
    } else {
        layer.msg("请选择一条需要打印拣货单的发货单！！", function () {
        });
        return;
    }
}

// 审核
function reviewfh() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        if (obj.status != 1) {
            layer.msg("只有打印分拣后的发货单能进行财务审核！！", {time: 6000}, function () {
            });
            return;
        }
        layer.open({
            type: 2,
            title: '审核',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['700px', '450px'], //宽高
            content: pageContext + "/fhOrdersController/showfhmx?fhid=" + obj.id,
            btn: ['确认审核', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow.formData();
                // 请求后台进行审核
                $.ajax({
                    url: pageContext + "/fhOrdersController/reviewFhOrder",
                    type: "POST",
                    dataType: "json",
                    async: false,
                    data: posData,
                    success: function (data) {
                        if (data.success) {
                            $('#tbody').bootstrapTable('refresh', queryParams);
                        } else {
                            layer.msg(data.msg);
                        }
                    }
                });
                layer.close(index);
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
            , cancel: function () {
                //return false; //开启该代码可禁止点击该按钮关闭
            }
        });
    } else {
        layer.msg("请选择一条需要审核的发货单！！", function () {
        });
        return;
    }
}

// 选择物流公司
function selectLogistics() {
    // 获取当前发货单
    var thisObj = $('#tbody').bootstrapTable("getSelections")[0];
    // 判断是否选中发货单
    if (thisObj == null || thisObj == '' || thisObj == undefined) {
        layer.msg("请选中发货单", function () {
        });
        return;
    }

    var thisObj1 = $('#tbody').bootstrapTable("getSelections")[1];
    if (thisObj1 != null && thisObj1 != '' && thisObj1 != undefined) {
        layer.msg("只能选中一条发货单", function () {
        });
        return false;
    }

    // 打开物流公司选择窗口
    openLogisticeWindow(thisObj.id);
}

// 打开物流公司选择窗口
function openLogisticeWindow(fhid) {
    layer.open({
        type: 2,
        title: '选择物流方式',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        anim: 3,
        area: ['700px', '550px'], //宽高
        content: "fhorder-logistics?fhid=" + fhid,
    });
}

//打开无订单发货窗口
function openAddNoOrderFhorder() {
    layer.open({
        type: 2,
        title: '无订单信息完善界面',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['400px', '550px'],
        content: "notOrderConfirm",
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var bz = posData["bz"];
            var whsid = posData["whsid"];
            var storeid = posData["storeid"];
            var sourcetype = posData["sourcetype"];
            //var owntraderid = posData["owntraderid"];
            if (whsid == null || whsid == undefined || whsid == "") {
                layer.msg("请选定仓库！！", function () {
                });
                return;
            }
            if (storeid == null || storeid == undefined || storeid == "") {
                layer.msg("请选择门店！！", function () {
                });
                return;
            }
            /*if (owntraderid == null || owntraderid == undefined || owntraderid == "") {
                layer.msg("请选择货物所属货主！！", function () {
                });
                return;
            }*/
            if (sourcetype == null || sourcetype == undefined || sourcetype == "") {
                layer.msg("请选择发货单类型！！", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/fhOrdersController/addNoOrderFhOrder",
                type: "post",
                data: {
                    'storeid': storeid,
                    'bz': bz,
                    'whsid': whsid,
                    'sourcetype': sourcetype
                    //,'owntraderid': owntraderid
                },
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if (data.success) {
                        window.location.reload();
                    } else {
                        layer.msg(data.msg);
                    }

                },
                error: function () {
                    alert("error");
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 * 查询包号去向
 * @author 肖亮亮
 * @date 2017-11-15 13:34
 * @param  * @param null
 * @return
 **/
function selectSppackage() {
    layer.prompt({title: '请输入要查询去向的包号！！', formType: 0}, function (value, index, elem) {
        if (value != '') {
            $.ajax({
                url: pageContext + "/bigpkgController/selectSpPackage",
                type: "post",
                data: {'packagecode': value},
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    if (data.success) {
                        layer.close(index);
                        ordercodeBuf = data.obj;
                        $('#tbody').bootstrapTable('refresh', queryParams);
                    } else {
                        layer.msg(data.msg);
                    }

                },
                error: function () {
                    layer.alert("请求失败！！");
                }
            });
        }
    });
}

/**
 * 查询大包明细
 * @author 肖亮亮
 * @date 2017-11-15 16:04
 * @param  * @param null
 * @return
 **/
function selectFhmxOddByBigpackagecode() {
    layer.prompt({title: '请输入要查询的大包号！！', formType: 0}, function (value, index, elem) {
        if (value != '') {
            layer.open({
                type: 2,
                title: "包装明细",
                shade: [0.8, '#393D49'], // 遮罩层
                maxmin: true, // 开启最大化最小化按钮
                area: ['100%', '100%'],// 显示弹出框的宽高
                content: "packingDetail?bigpackagecode=" + value,
            });
        }
    });
}

//文件审核
function docAudit() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        layer.open({
            type: 2,
            title: '文件组审核',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['850px', '450px'], //宽高
            content: pageContext + "/fhOrdersController/toFhorderDocaudit?fhid=" + obj.id,
            btn: ['确认审核', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                var posData = {};
                posData["id"] = obj.id;
                //发送修改请求
                $.ajax({
                    url: pageContext + "/fhOrdersController/docAudit",
                    data: posData,
                    dataType: "json",
                    async: true,
                    type: "POST",   //请求方式
                    success: function (data) {
                        if (data.success) {
                            layer.close(index);
                            $('#tbody').bootstrapTable('refresh', queryParams);
                        } else {
                            layer.msg(data.msg);
                        }

                    }, error: function () {
                    }
                });
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
            , cancel: function () {
                //开启该代码可禁止点击该按钮关闭
                //return false;
            }
        });
    } else {
        layer.msg("请选择一条要文件审核的发货单！！", function () {
        });
        return;
    }
}


//客服审核
function cusAudit() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        layer.open({
            type: 2,
            title: '催款确认',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['850px', '490px'], //宽高
            content: pageContext + "/fhOrdersController/toFhorderCusaudit?fhid=" + obj.id,
            btn: ['确认已催款', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                var posData = $(layero).find("iframe")[0].contentWindow.formData();
                posData['id'] = obj.id;
                //发送修改请求
                $.ajax({
                    url: pageContext + "/fhOrdersController/cusAudit",
                    data: posData,
                    dataType: "json",
                    async: true,
                    type: "POST",   //请求方式
                    success: function (data) {
                        if (data.success) {
                            layer.close(index);
                            $('#tbody').bootstrapTable('refresh', queryParams);
                        } else {
                            layer.msg(data.msg);
                        }

                    }, error: function () {
                    }
                });
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
            , cancel: function () {
                //开启该代码可禁止点击该按钮关闭
                //return false;
            }
        });
    } else {
        layer.msg("请选择一条要文件审核的发货单！！", function () {
        });
        return;
    }
}

//发货批号绑定
function fhbatchBind() {
    layer.open({
        type: 2,
        title: '发货批号绑定',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['1000px', '500px'], //宽高
        content: pageContext + "/fhOrdersController/toFhorderCusbind",
        btn: ['确认绑定', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            console.log(posData);
            var fhorderlist = posData["fhorderlist"];
            var fhidlist = new Array();
            for (var i in fhorderlist) {
                fhidlist.push(fhorderlist[i].id);
            }
            $.ajax({
                url: pageContext + "/flFhorderController/getNotGdanAuditFlfhorder",
                data: JSON.stringify(fhidlist),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    if (!data.success) {
                        layer.confirm(data.msg + ",确认要继续吗？",
                            {btn: ['确认', '取消']},
                            function (index) {
                                layer.close(index);
                                $.ajax({
                                    url: pageContext + "/fhOrdersController/bindForders",
                                    data: JSON.stringify(posData),
                                    dataType: "json",
                                    contentType: "application/json; charset=utf-8",
                                    async: true,
                                    type: "POST",   //请求方式
                                    success: function (data) {
                                        if (data.success) {
                                            layer.close(index);
                                            $('#tbody').bootstrapTable('refresh', queryParams);
                                        } else {
                                            layer.msg(data.msg);
                                        }
                                    }, error: function () {
                                    }
                                });
                            });
                    } else {
                        $.ajax({
                            url: pageContext + "/fhOrdersController/bindForders",
                            data: JSON.stringify(posData),
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            async: true,
                            type: "POST",   //请求方式
                            success: function (data) {
                                if (data.success) {
                                    layer.close(index);
                                    $('#tbody').bootstrapTable('refresh', queryParams);
                                } else {
                                    layer.msg(data.msg);
                                }

                            }, error: function () {
                            }
                        });
                    }
                }, error: function () {
                }
            });
            //发送修改请求
        }
        , btn2: function (index, layero) {
            //按钮【取消】的回调

            layer.close(index);
        }
        , cancel: function () {
            //开启该代码可禁止点击该按钮关闭
            //return false;
        }
    });
}

// 登记物流
function registerLogistics() {
    // 获取当前发货单
    var objArray = $('#tbody').bootstrapTable("getSelections");

    // 判断是否选中发货单
    if (objArray.length == null || objArray.length == 0 || objArray.length == undefined) {
        layer.msg("请选中发货单", function () {
        });
        return;
    }

    var isReg = true;
    var arr = new Array();
    $.each(objArray, function (index, item) {
        console.log("hasgoods:  " + item.hasgoods);
        // 判断物流单是否是财务审核
        if (!item.hasgoods) {
            isReg = false;
            layer.msg("发货单" + item.ordercode + "还未拣货上传，不能进行登记物流操作！！", function () {
            });
            return;
        } else if (!item.docaudit) {
            isReg = false;
            layer.msg("发货单" + item.ordercode + "还未文件组审核，不能进行登记物流操作！！", function () {
            });
            return;
        } else if (item.status == 3) {
            isReg = false;
            layer.msg("发货单" + item.ordercode + "已登记物流，不能再进行登记物流操作！！", function () {
            });
            return;
        }
        arr[index] = item.id;
    });
    if (isReg) {
        openRegLogistice(arr);
    }
}

// 登记物流窗口
function openRegisterLogisticeWindow(fhid) {
    layer.open({
        type: 2,
        title: '登记物流',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        anim: 3,
        area: ['700px', '500px'], //宽高
        content: "fhorder-registerLogistics?fhid=" + fhid,
    })
}

// 登记物流窗口 2017年12月30日10:33:19
var openRegLogistice = function (arr) {
    layer.open({
        type: 2,
        title: '登记物流',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        anim: 3,
        area: ['700px', '500px'], //宽高
        content: "fhorder-regLogistics?arr=" + arr,
    })
}


//温馨提示
function openFlfhorder() {
    var row = $('#tbody').bootstrapTable('getSelections')[0];
    var str = '<a href="javascript:;" class="active J_menuTab" data-id="flfhorder">辅料发货单 <i class="fa fa-times-circle"></i></a>';
    $("body", parent.document).find('.J_menuTab').removeClass('active');
    // 添加选项卡对应的iframe
    var str1 = '<iframe class="J_iframe" name="iframe0" width="100%" height="100%" src="' + pageContext + '/flfhorder?origin=1&storeid=' + row.storeid + '" frameborder="0" data-id="flfhorder" seamless></iframe>';
    $("body", parent.document).find('.J_mainContent').find('iframe.J_iframe').hide().parents('.J_mainContent').append(str1);
    $("body", parent.document).find('.J_menuTabs .page-tabs-content').append(str);
    scrollToTab($('.J_menuTab.active'));
}


// 出库
var stockOut = function () {
    // 获取当前
    var thisObj = $('#tbody').bootstrapTable("getSelections")[0];
    // 判断是否选中
    if (thisObj == null || thisObj == '' || thisObj == undefined) {
        layer.msg("请选中发货单", function () {
        });
        return false
    }

    var thisObj1 = $('#tbody').bootstrapTable("getSelections")[1];
    if (thisObj1 != null && thisObj1 != '' && thisObj1 != undefined) {
        layer.msg("只能选中一条发货单", function () {
        });
        return false;
    }

    if (thisObj.status < 3) {
        layer.msg("只有物流发货状态才能出库", function () {
        });
        return false
    }

    // 打开发货出库窗口
    layer.open({
        type: 2,
        title: '发货出库',
        shade: [0.8, '#393D49'],
        maxmin: true,
        area: ['800px', '610px'],
        content: "fhStockOut?fhid=" + thisObj.id
    });
}

// 客服登记物流公司
function cusLogistice() {
    // 获取当前
    var rows = $('#tbody').bootstrapTable("getSelections");
    // 判断是否选中
    if (rows == null || rows == '' || rows == undefined) {
        layer.msg("请选中发货单", function () {
        });
        return false
    }
    for (i in rows) {
        if (rows[i].printstatus == 1) {
            layer.msg("有发货单已打印物流单，不能登记物流公司！！", function () {
            });
            return;
        }
    }
    layer.open({
        type: 2,
        title: '填写物流',
        shade: [0.8, '#393D49'],
        maxmin: false, //开启最大化最小化按钮
        area: ['300px', '400px'],
        content: "cusLogistice",
        btn: ['确认', '关闭'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
            var wlgs = posData;
            if (wlgs == null || wlgs == undefined || wlgs == '') {
                layer.msg("物流公司不能为空！！", function () {
                });
                return;
            }
            var list = new Array();
            for (i in rows) {
                list.push({"id": rows[i].id, "wlgs": wlgs});
            }
            $.ajax({
                url: pageContext + "/fhOrdersController/cusRegLogistics",
                data: JSON.stringify(list),
                contentType: 'application/json;charset=UTF-8',
                type: "POST",
                dataType: "json",
                async: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                    }
                }
            });

        }, error: function (index) {
            layer.close(index);
        }
    });

}

/**
 * @Description 打印网络订单
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-01-20 13:52
 **/
function openPrintWxorders() {
    var rows = $('#tbody').bootstrapTable("getSelections");
    var idBuff = "";
    for (var i = rows.length - 1; i >= 0; i--) {
        if (rows[i].sourcetype != 2) {
            layer.msg("此功能只对网络发货单开展！！", function () {
            });
            return;
        }
        if (rows[i].status < 2) {
            layer.msg("只有财务审核之后的网络发货单才能打印拣货单！！", function () {
            });
            return;
        }
        if (rows[i].batchcode != null && rows[i].batchcode != undefined && rows[i].batchcode != "") {
            layer.msg("只有不按批次生成的发货单才能进行该操作！！", function () {
            });
            return;
        }
        idBuff += rows[i].id + ',';
    }
    layer.confirm('确定打印拣货单，此操作将会改变打印状态？',
        {btn: ['确认', '取消']},
        function (index) {
            layer.close(index);
            layer.open({
                type: 2,
                title: '打印拣货单',
                shade: [0.8, '#393D49'],
                maxmin: true, //开启最大化最小化按钮
                anim: 3,
                area: ['100%', '100%'],
                content: pageContext + "/wxOrderController/printWxOrderPicking/" + idBuff
            });
        });
}


/**
 * @Description 客服审核 -網絡訂單
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-01-22 17:31
 **/
function wxcusAudit() {
    var thisTable = $('#tbody').bootstrapTable("getSelections");         //获取当前表格
    if (thisTable.length < 1) {
        layer.msg("请选择一行！！", function () {
        });
        return;
    }
    if (thisTable.length > 1) {
        layer.msg("不支持选中多行操作！！", function () {
        });
        return;
    }
    if (thisTable[0].sourcetype != 2) {
        layer.msg("此功能只对网络发货单开展！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: '订单详情',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['820px', '580px'],
        content: "wxorderbatchdetail?fhid=" + thisTable[0].id + "&cus=1",
        btn: ['确认客服审核', '关闭'], //可以无限个按钮
        yes: function (index, layero) {
            if (thisTable[0].status != 0) {
                layer.msg("只有待处理状态才能进行该操作！！", function () {
                });
                layer.close(index);
            } else {
                var id = thisTable[0].id;      // 获取单id
                $.ajax({
                    url: pageContext + "/fhOrdersController/wxFhorderCusAudit/" + id,
                    type: "POST",
                    async: false,
                    dataType: "json",
                    success: function (data) {
                        layer.msg(data.msg);
                        if (data.success) {
                            layer.close(index);
                            LoadingFhordersList();
                        }
                    }
                })
            }
        }, error: function (index) {
            layer.close(index);
        }

    });

}


/**
 * @Description 財務审核 -網絡訂單
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-01-22 17:31
 **/
function wxfinancial() {
    var thisTable = $('#tbody').bootstrapTable("getSelections");         //获取当前表格
    if (thisTable.length < 1) {
        layer.msg("请选择一行！！", function () {
        });
        return;
    }
    if (thisTable.length > 1) {
        layer.msg("不支持选中多行操作！！", function () {
        });
        return;
    }
    if (thisTable[0].sourcetype != 2) {
        layer.msg("此功能只对网络发货单开展！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: '订单详情',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['800px', '580px'],
        content: "wxorderbatchdetail?fhid=" + thisTable[0].id,
        btn: ['确认财务审核', '关闭'], //可以无限个按钮
        yes: function (index) {
            if (thisTable[0].cusaudit) {
                if (thisTable[0].status < 2) {
                    var id = thisTable[0].id;      // 获取单id
                    $.ajax({
                        url: pageContext + "/fhOrdersController/wxFhorderCwAudit/" + id,
                        type: "POST",
                        async: false,
                        dataType: "json",
                        success: function (data) {
                            layer.msg(data.msg);
                            if (data.success) {
                                layer.close(index);
                                LoadingFhordersList();
                            }
                        }
                    })
                } else {
                    layer.msg("该网络发货单当前状态不允许财务审核！！", function () {
                    });
                    layer.close(index);
                }
            } else {
                layer.msg("只有客服审核操作后才能进行财务审核！！", function () {
                });
                layer.close(index);
            }

        }, error: function (index) {
            layer.close(index);
        }

    });
}


//网络发货单文件组审核
function wxdocAudit() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        if (!obj.wxjhprint) {
            layer.msg("该网络发货单还未打印拣货单！！", function () {
            });
            return;
        }
        if (!obj.hasgoods) {
            layer.msg("该网络发货单拣货操作还未完成！！", function () {
            });
            return;
        }
        layer.open({
            type: 2,
            title: '网络发货单文件组审核',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['850px', '450px'], //宽高
            content: pageContext + "/fhOrdersController/toFhorderDocaudit?fhid=" + obj.id,
            btn: ['确认审核', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                //发送修改请求
                $.ajax({
                    url: pageContext + "/fhOrdersController/wxFhorderDocAudit/" + obj.id,
                    dataType: "json",
                    async: true,
                    type: "POST",   //请求方式
                    success: function (data) {
                        if (data.success) {
                            layer.close(index);
                            $('#tbody').bootstrapTable('refresh', queryParams);
                        } else {
                            layer.msg(data.msg);
                        }

                    }, error: function () {
                    }
                });
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
            , cancel: function () {
                //开启该代码可禁止点击该按钮关闭
                //return false;
            }
        });
    } else {
        layer.msg("请选择一条要文件审核的网络发货单！！", function () {
        });
        return;
    }
}

/**
 * @Description 导出网络发货单-下单数据与拣货数据的对比文件
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-02-05 13:05
 **/
function exportContrastExcel() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length == 1) {
        var obj = rows[0];
        if (obj.sourcetype != 2) {
            layer.msg("只针对网络发货单进行该操作！！", function () {
            });
            return;
        }
        if (!obj.hasgoods) {
            layer.msg("该网络发货单拣货操作还未完成！！", function () {
            });
            return;
        }
        window.location.href = pageContext + "/fhOrdersController/exportContrastExcel/" + obj.id;
    } else {
        layer.msg("请选择一条要导出对比文件的网络发货单！！", function () {
        });
        return;
    }
}


/**
 * @Description 打印多個网络订单
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-01-20 13:52
 **/
function printWxorders() {
    var rows = $('#tbody').bootstrapTable("getSelections");
    var idBuff = "";
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].sourcetype != 2) {
            layer.msg("此功能只对网络发货单开展！！", function () {
            });
            return;
        }
        if (rows[i].status < 2) {
            layer.msg("只有财务审核之后的网络发货单才能打印拣货单！！", function () {
            });
            return;
        }
        if (rows[i].batchcode == null || rows[i].batchcode == undefined || rows[i].batchcode == "") {
            layer.msg("只有按批次生成的发货单才能进行该操作！！", function () {
            });
            return;
        }
        idBuff += rows[i].id + ',';
    }
    layer.confirm('确定打印拣货单，此操作将会改变打印状态？',
        {btn: ['确认', '取消']},
        function (index) {
            layer.close(index);
            layer.open({
                type: 2,
                title: '按批次打印拣货单',
                shade: [0.8, '#393D49'],
                maxmin: true, //开启最大化最小化按钮
                anim: 3,
                area: ['100%', '100%'],
                content: pageContext + "/wxOrderController/printFhorderPickings/" + idBuff
            });
        });
}


//多個發貨單進行文件組审核
function wxdocAudits() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    var idbuff = "";
    var idList = new Array();
    for (var i = 0; i < rows.length; i++) {
        idbuff += rows[i].id + ",";
        idList.push(rows[i].id);
    }
    if (rows != null) {
        layer.open({
            type: 2,
            title: '文件组审核',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['100%', '100%'], //宽高
            content: "fhorderlist-docaudit?idbuff=" + idbuff,
            btn: ['确认审核', '取消'], //可以无限个按钮
            yes: function (index, layero) {
                $.ajax({
                    url: pageContext + "/fhOrdersController/docAuditList",
                    data: JSON.stringify(idList),
                    contentType: 'application/json;charset=UTF-8',
                    dataType: "json",
                    async: true,
                    type: "POST",   //请求方式
                    success: function (data) {
                        alert(data.msg);
                        if (data.success) {
                            layer.close(index);
                            $('#tbody').bootstrapTable('refresh', queryParams);
                        } else {
                            layer.msg(data.msg);
                        }
                    }, error: function () {
                    }
                });
            }, btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }, cancel: function () {
            }
        });
    } else {
        layer.msg("请至少选择一条要文件审核的发货单！！", function () {
        });
        return;
    }
}

/**
 * @Description 撤销发货单
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/4/14 10:58
 **/
function refundFhorder() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows == null || rows.length > 1) {
        layer.msg("请选择一行发货单进行退款操作！！", function () {
        });
        return;
    } else if (rows[0].batchcode == null || rows[0].batchcode == undefined || rows[0].batchcode == "") {
        layer.msg("只有按批次生成的发货单才能進行退款操作！！", function () {
        });
        return;
    } else if (rows[0].ordercode.indexOf("FW") >= 0) {
        layer.msg("该发货单已结清！！", function () {
        });
        return;
    }
    layer.open({
        type: 2,
        title: rows[0].ordercode + '退款界面',
        shade: [0.8, '#393D49'],
        maxmin: true, // 开启最大化最小化按钮
        area: ['520px', '250px'], // 宽高
        content: pageContext + "/fhOrdersController/getRefundFhorder/" + rows[0].id,
        btn: ['确认', '取消'], // 可以无限个按钮
        yes: function (index, layero) {
            $.ajax({
                url: pageContext + "/fhOrdersController/refundFhorderByid/" + rows[0].id,
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        $('#tbody').bootstrapTable('refresh', queryParams);
                    }
                }, error: function () {
                }
            });
        }
    });
}


//批次发货单打印（首批货）
function printFhOrderListReport() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows != null && rows.length > 0) {
        var idbuff = "";
        for (var i = 0; i < rows.length; i++) {
            if (rows[i].status < 2) {
                layer.msg("财务审核过后才能打印首批货！！", function () {
                });
                return;
            } else if (rows[i].hasgoods != 1) {
                layer.msg("只有已揀貨的發貨單才能打印首批货！！", function () {
                });
                return;
            }
            idbuff += rows[i].id + ",";
        }
        layer.open({
            type: 2,
            title: '打印发货单(首批货)',
            shade: [0.8, '#393D49'],
            maxmin: true, //开启最大化最小化按钮
            area: ['100%', '100%'],
            btn: ["确认打印", "取消"],
            content: pageContext + "/fhOrdersController/printfhorderList/" + idbuff,
            yes: function (index, layero) {
                $(function () {
                    $.ajax({
                        url: pageContext + "/fhOrdersController/printConfirm",
                        data: {"idArr": idbuff},
                        dataType: "json",
                        async: true,
                        type: "POST",   //请求方式
                        success: function (data) {
                            alert(data.msg);
                        }, error: function () {
                            layer.close(index);
                        }
                    });
                });
                layer.close(index);
            }
            , btn2: function (index, layero) {
                //按钮【取消】的回调
                layer.close(index);
            }
        });
    } else {
        layer.msg("请至少选择一条需要确认打印的发货单！！", function () {
        });
        return;
    }
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

/**
 * @Description发货转退货操作
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018/6/8 19:43
 **/
function fhconvertReturn() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows.length != 1) {
        layer.msg("请选择一条发货单进行转退货操作！！", function () {
        });
        return;
    }
    if (rows[0].status > 3) {
        layer.msg("当前状态不支持转退货操作！！", function () {
        });
        return;
    }
    layer.confirm('确定要对发货单:' + rows[0].ordercode + ",进行发货转退货操作？", {
        btn: ['确定', '取消'] //按钮
    }, function (index) {
        $.ajax({
            url: pageContext + "/storeReturnController/fhorderConvertStoreReturnByfhid/" + rows[0].id,
            type: "post",
            dataType: "json",
            async: false,
            cache: false,
            success: function (data) {
                alert(data.msg);
                if (data.success) {
                    LoadingFhordersList();
                    layer.close(index);
                }
            }
        });
    }, function (index) {
        layer.close(index);
    });
}

//查询指定的款，条码的发货记录
function selectFhInfoBySelective() {
    layer.open({
        type: 2,
        title: '商品发货明细',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'],
        content: "product-fhinfo",
        btn: ['确认', '取消'], //可以无限个按钮
        yes: function (index, layero) {
            var posData = $(layero).find("iframe")[0].contentWindow.formData();
        }, error: function (index) {
            layer.close(index);
        }
    });
}

/**
 * @Description发货单转让
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-07-26 13:03
 **/
function fhorderTransfer() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows.length != 1) {
        layer.msg("请选择一条发货单进行转让操作！！", function () {
        });
        return;
    }
    if (rows[0].status == 3 || rows[0].status == 4 || rows[0].status == 5) {
        layer.msg("发货单状态不满足，不能进行转换操作！！", function () {
        });
        return;
    }
    layer.prompt({title: '请输入你要转给店的店号，！！', formType: 0}, function (value, index, elem) {
        if (value == '') {
            layer.msg("店号不能为空！！", function () {
            });
            return;
        } else {
            $.ajax({
                url: pageContext + "/fhOrdersController/fhorderTransferToStoreByid/" + rows[0].id + "/" + value,
                type: "post",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        LoadingFhordersList();
                        layer.close(index);
                    }
                }
            });
        }
    });
}

/**
 * @Description发货单追加商品
 * @params
 * @return
 * @throws
 * @author 肖亮亮
 * @date 2018-09-18 15:30
 **/
function fhdetailSpAppend() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows.length != 1) {
        layer.msg("请选择一条发货单进行商品追加操作！！", function () {
        });
        return;
    }
    if (rows[0].status > 1 || rows[0].docaudit) {
        layer.msg("该发货单的状态不满足追加条件！", function () {
        });
        return;
    }
    if (rows[0].sourcetype != 3) {
        layer.msg("只有退货类型的无订单发货单才支持该操作！", function () {
        });
        return;
    }
    selectionobj = rows[0];
    layer.open({
        type: 2,
        title: '无订单商品追加界面',
        shade: [0.8, '#393D49'],
        maxmin: true, //开启最大化最小化按钮
        area: ['100%', '100%'], //宽高
        content: 'fhdetailsp-append',
        btn: ['关闭'], //可以无限个按钮
        yes: function (index, layero) {
            LoadingFhordersList();
            layer.close(index);
        }
    });
}

//当前选中的发货单信息
var selectionobj;

function getFhorderInfos() {
    return selectionobj;
}

function appendNotScanWxOrders() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows.length != 1) {
        layer.msg("请选择一条发货单进行商品追加操作！！", function () {
        });
        return;
    }
    if (rows[0].sourcetype != 2) {
        layer.msg("只支持网络发货单进行该操作！", function () {
        });
        return;
    }
    if (rows[0].status == 5) {
        layer.msg("该网络发货单已撤单，不能追加！", function () {
        });
        return;
    }
    layer.open({
        type: 1,
        title: '追加网络订单',
        area: ['300px', '200px'],
        shade: [0.8, '#393D49'],
        btn: ["确定追加", "取消"],
        content: '<form class="p10">' +
        '<table>' +
        '<tr><td  class="pb-10">网络订单号：</td><td  class="pb-10"><input id="wxordercode" type="text" class="form-control"></td></tr>' +
        '<tr><td>麻袋号：</td><td><input id="wlbagno" type="text" class="form-control"/></td></tr>' +
        '</table>' +
        '</form>',
        yes: function (index) {
            var wxordercode = $("#wxordercode").val();
            var wlbagno = $("#wlbagno").val();
            if (wxordercode == '') {
                layer.msg("网络订单号不能为空!!", function () {
                });
                return;
            } else if (wlbagno == '') {
                layer.msg("麻袋号不能为空!!", function () {
                });
                return;
            }
            $.ajax({
                url: pageContext + "/fhOrdersController/appendNotScanWxOrders/" + wxordercode + "/" + rows[0].id,
                data: {"wlbagno": wlbagno},
                dataType: "json",
                async: true,
                type: "POST",   //请求方式
                success: function (data) {
                    alert(data.msg);
                    if (data.success) {
                        LoadingFhordersList();
                        layer.close(index);
                    }
                }
            });
        }, error: function (index) {
            layer.close(index);
        }
    });
}

//将撤单状态的发货单明细生成一个新的退货无订单
function createForwardFhOrderByfhid() {
    var rows = $('#tbody').bootstrapTable('getSelections');
    if (rows.length != 1) {
        layer.msg("只支持单行操作！", function () {
        });
        return;
    }
    if (rows[0].status != 5) {
        layer.msg("只有撤单状态的发货单才能进行该操作！", function () {
        });
        return;
    }
    layer.prompt({title: '请输入店号！！', formType: 0}, function (value, index, elem) {
        if (value != '') {
            $.ajax({
                url: pageContext + "/fhOrdersController/createForwardFhOrderByfhid/" + rows[0].id + "/" + value,
                type: "post",
                dataType: "json",
                async: false,
                cache: false,
                success: function (data) {
                    layer.alert(data.msg);
                    if (data.success) {
                        layer.close(index);
                        $('#tbody').bootstrapTable('refresh', queryParams);
                    }
                },
                error: function () {
                    layer.alert("请求失败！！");
                }
            });
        } else {
            layer.msg("请输入店号！", function () {
            });
        }
    });
}

function exportFhdetailInfos() {
    var zdstatrtTime = $("#zdstatrtTime").val();
    var zdendTime = $("#zdendTime").val();
    var ordercode = $("#ordercode").val();
    var mdmc = $("#mdmc").val();
    var auditstartTime = $("#auditstartTime").val();
    var auditendTime = $("#auditendTime").val();
    var status = $("#status").val();
    var hasgoods = $("#hasgoods").val();
    var fhbatchno = $("#fhbatchno").val();
    var docaudit = $("#docaudit").val();
    var cusaudit = $("#cusaudit").val();
    var cusbind = $("#cusbind").val();
    var printstartTime = $("#printstartTime").val();
    var printendTime = $("#printendTime").val();
    var printstatus = $("#printstatus").val();
    var mdcode = $("#mdcode").val();
    var sourcetype = $("#sourcetype").val();
    var wxjhprint = $("#wxjhprint").val();
    var batchcode = $("#batchcode").val();
    var bz = $("#bz").val();
    var whsid = $("#whsid").val();
    var traderid = $("#traderid").val();
    var angle = $("#angle").val();
    window.location.href = pageContext + "/fhdetailSpController/exportFhdetailInfos?"
        + "zdstatrtTime=" + zdstatrtTime
        + "&zdendTime=" + zdendTime
        + "&ordercode=" + ordercode
        + "&mdmc=" + mdmc
        + "&auditstartTime=" + auditstartTime
        + "&auditendTime=" + auditendTime
        + "&status=" + status
        + "&hasgoods=" + hasgoods
        + "&fhbatchno=" + fhbatchno
        + "&docaudit=" + docaudit
        + "&cusaudit=" + cusaudit
        + "&cusbind=" + cusbind
        + "&printstartTime=" + printstartTime
        + "&printendTime=" + printendTime
        + "&printstatus=" + printstatus
        + "&mdcode=" + mdcode
        + "&sourcetype=" + sourcetype
        + "&wxjhprint=" + wxjhprint
        + "&batchcode=" + batchcode
        + "&bz=" + bz
        + "&whsid=" + whsid
        + "&traderid=" + traderid
        + "&angle=" + angle;
}